var socket;

function messageHandler(event) {
  const msg = JSON.parse(event.data);

  switch (msg.type) {
    case "room_created": {
      const room_id = msg.id;

      $("#room_id").innerHTML = `Created room with ID: <code>${room_id}</code> (Give this to your teammates!)`;

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

    case "error": {
      const msgElem = $("#co_op_message");
      msgElem.classList.add("active");
      msgElem.innerHTML = `Error: ${msg.message}`;
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

$("#co_op_join").onsubmit = () => {
  try {
    socket = new WebSocket(process.env.WS_URL);
  } catch (e) {
    const msgElem = $("#co_op_message");
    msgElem.classList.add("active");
    msgElem.innerHTML = "Could not connect to websocket server. (Server may be down)";
    console.error(e);
    return;
  }

  socket.addEventListener("open", () => {
    socket.send(JSON.stringify({
      type: "join_room",
      room: $("#co_op_join input").value,
    }));
  });

  socket.addEventListener("message", messageHandler);

  return false;
};

$("#co_op_create").onsubmit = () => {
  if (socket) // Ensure old connections are closed
    socket.close(1000);

  try {
    socket = new WebSocket(process.env.WS_URL);
  } catch {
    const msgElem = $("#co_op_message");
    msgElem.classList.add("active");
    msgElem.innerHTML = "Could not connect to websocket server. (Server may be down)";
    return;
  }

  let size = parseInt($("#co_op_create input").value);
  if (!size) {
    const msgElem = $("#co_op_message");
    msgElem.classList.add("active");
    msgElem.innerHTML = "Invalid or no size given, using default of 2."
    size = 2;
  }

  const roomId = $("#room_id");
  roomId.classList.add("active");
  roomId.innerHTML = `Creating room...`;

  socket.addEventListener("open", () => {
    socket.send(JSON.stringify({
      type: "create_room",
      size: size,
    }));
  });

  socket.addEventListener("message", messageHandler);

  return false;
};

const coOpColumnsElem = $("#co_op_columns");
try { coOpColumnsElem.value = localStorage.coOpColumns ?? null }
catch {}
coOpColumnsElem.oninput = event => {
  const columns = event.target.value;
  const main = $("main");

  main.style.gridTemplateColumns = columns ? `repeat(${columns}, auto)`: null;

  try { localStorage.coOpColumns = columns }
  catch {}
};
coOpColumnsElem.oninput({ target: coOpColumnsElem });
