var socket;

const messageHandler = (event) => {
  const msg = JSON.parse(event.data);

  switch (msg.type) {
    case "room_created": {
      const room_id = msg.id;
      console.log(`Room created with ID ${room_id}`);

      const roomId = $("#room_id");
      roomId.classList.add("active");
      roomId.innerHTML = `Created room with ID: <code>${room_id}</code> (Give this to your teammates!)`

      break;
    }

    case "room_joined": {
      const room_id = msg.id;
      break;
    }

    case "user_joined": {
      const newGrid = $(".grid").cloneNode(true);
      newGrid.dataset.userId = msg.id;
      $("main").appendChild(newGrid);
      break;
    }

    case "user_left": {
      $(`.grid[data-user-id="${msg.id}"]`).remove();
      break;
    }

    case "user_primary": {
      const cell = $(`.grid[data-user-id="${msg.id}"]`).children[msg.item];
      handlePrimary({ currentTarget: cell }, msg.offset);
      break;
    }

    case "user_secondary": {
      const cell = $(`.grid[data-user-id="${msg.id}"]`).children[msg.item];
      handleSecondary({ currentTarget: cell });
      break;
    }

    case "user_disable": {
      const cell = $(`.grid[data-user-id="${msg.id}"]`).children[msg.item];
      handleDisable({ currentTarget: cell });
      break;
    }
  }
}

$("#co_op_join").onsubmit = (event) => {
  socket = new WebSocket(process.env.WS_URL);

  socket.addEventListener("open", (event) => {
    socket.send(JSON.stringify({
      type: "join_room",
      room: $("#co_op_join input").value,
    }));
  });

  socket.addEventListener("message", messageHandler);

  return false;
}

$("#co_op_create").onsubmit = (event) => {
  socket = new WebSocket(process.env.WS_URL);

  socket.addEventListener("open", (event) => {
    socket.send(JSON.stringify({
      type: "create_room",
      size: $("#co_op_create input").value || 2,
    }));
  });

  socket.addEventListener("message", messageHandler);

  return false;
}
