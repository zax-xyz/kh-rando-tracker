#!/usr/bin/env python3
import asyncio
import json
import random
import string
import uuid

import websockets

ROOMS = {}
USERS = {}

CHARS = string.ascii_lowercase + string.digits


async def dispatch(websocket, message):
    for user in USERS[websocket]['room']['users']:
        if user == websocket:
            continue

        await user.send(message)


async def main(websocket, path):
    try:
        data = json.loads(await websocket.recv())

        if data['type'] == 'join_room':
            data['room'] = data['room'].strip()

            room = ROOMS[data['room']]
            num_users = len(room['users'])

            if num_users >= room['size']:
                await websocket.send(json.dumps({
                    'type': 'error',
                    'message': 'Full room',
                }))
                return

            room['users'].add(websocket)

            user_id = str(uuid.uuid4())

            USERS[websocket] = {
                'room': room,
                'id': user_id,
            }

            await websocket.send(json.dumps({
                'type': 'room_joined',
                'id': data['room'],
            }))

            await dispatch(websocket, json.dumps({
                'type': 'user_joined',
                'id': user_id,
            }))

            for user in USERS:
                if user == websocket:
                    continue

                await websocket.send(json.dumps({
                    'type': 'user_joined',
                    'id': USERS[user]['id'],
                }))
        elif data['type'] == 'create_room':
            size = int(data['size'])
            while True:
                room = ''.join(random.choice(CHARS) for _ in range(8))
                if room not in ROOMS:
                    # imagine not having do-while loops
                    break

            ROOMS[room] = {
                'name': room,
                'size': size,
                'users': {websocket},
            }
            USERS[websocket] = {
                'room': ROOMS[room],
                'id': str(uuid.uuid4()),
            }
            print('Room created:', room)

            await websocket.send(json.dumps({
                'type': 'room_created',
                'id': room,
            }))

        async for message in websocket:
            message = json.loads(message)
            message['id'] = USERS[websocket]['id']

            await dispatch(websocket, json.dumps(message))
    finally:
        room = USERS[websocket]['room']
        room['users'].remove(websocket)

        user_id = USERS[websocket]['id']
        del USERS[websocket]

        if not room['users']:
            name = room['name']
            del ROOMS[name]
            print('Room closed:', name)
        else:
            for user in room['users']:
                await user.send(json.dumps({
                    'type': 'user_left',
                    'id': user_id,
                }))


loop = asyncio.get_event_loop()

loop.run_until_complete(websockets.serve(main, '0.0.0.0', 8765))
print('Server started')
loop.run_forever()
