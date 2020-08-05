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
    """Relay a message from a user to all the other users in the room"""
    for user in filter(lambda u: u != websocket,
                       USERS[websocket]['room']['users']):
        await user.send(message)


async def main(websocket, _):
    """Handle client connection to server"""
    try:
        data = json.loads(await websocket.recv())

        if data['type'] == 'join_room':
            data['room'] = data['room'].strip()

            try:
                room = ROOMS[data['room']]
            except KeyError:
                return await websocket.send(json.dumps({
                    'type': 'error',
                    'message': 'Room not found',
                }))

            if len(room['users']) >= room['size']:
                return await websocket.send(json.dumps({
                    'type': 'error',
                    'message': 'Room is full',
                }))

            room['users'].add(websocket)

            # Generate random user id and save
            user_id = str(uuid.uuid4())
            USERS[websocket] = {
                'room': room,
                'id': user_id,
            }

            await websocket.send(json.dumps({
                'type': 'room_joined',
                'id': data['room'],
            }))

            # Tell the other users in the room about the user joining
            await dispatch(websocket, json.dumps({
                'type': 'user_joined',
                'id': user_id,
            }))

            for user in filter(lambda u: u != websocket, USERS):
                # Tell the user about all the other users in the room
                await websocket.send(json.dumps({
                    'type': 'user_joined',
                    'id': USERS[user]['id'],
                }))
        elif data['type'] == 'create_room':
            size = data['size']
            if not isinstance(size, int):
                return await websocket.send(json.dumps({
                    'type': 'error',
                    'message': 'Size must be of type integer'
                }))

            while True:
                # Create random room id, making sure it doesn't already exist
                room = ''.join(random.choice(CHARS) for _ in range(8))
                if room not in ROOMS:
                    # imagine not having do-while loops
                    break

            # Save room and user
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

        # Relay all subsequent messages to the other clients in the room
        async for message in websocket:
            message = json.loads(message)
            message['id'] = USERS[websocket]['id']

            await dispatch(websocket, json.dumps(message))
    finally:
        # Client disconnected from server
        await dispatch(websocket, json.dumps({
            'type': 'user_left',
            'id': USERS[websocket]['id']
        }))

        room = USERS[websocket]['room']

        # Remove user
        room['users'].remove(websocket)
        del USERS[websocket]

        if not room['users']:
            # If no more users in the room, close it
            name = room['name']
            del ROOMS[name]
            print('Room closed:', name)


loop = asyncio.get_event_loop()

loop.run_until_complete(websockets.serve(main, '0.0.0.0', 8765))
print('Server started')
loop.run_forever()
