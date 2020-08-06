var socket;

function createPRow(elem, text) {
  const row = document.createElement("div");
  row.classList.add("row", "message");

  const p = document.createElement("p");
  p.textContent = text;
  row.appendChild(p);

  elem.insertAdjacentElement("afterend", row);
}

function messageHandler(event, elem) {
  const msg = JSON.parse(event.data);

  switch (msg.type) {
    case "room_created": {
      $("#room_id").innerHTML = `Created room with ID: <code>${msg.id}</code> (Give this to your teammates!)`;
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
      createPRow(elem, `Error: ${msg.message}`);
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
  $(".row.message")?.remove();

  try {
    socket = new WebSocket(process.env.WS_URL);
  } catch (e) {
    createPRow(event.target, "Could not connect to server. (Server may be down)");
    console.error(e);
    return false;
  }

  socket.addEventListener("open", () => {
    socket.send(JSON.stringify({
      type: "join_room",
      room: $("#co_op_join input").value,
    }));
  });

  socket.addEventListener("message", e => messageHandler(e, event.target));

  return false;
};

$("#co_op_create").onsubmit = (event) => {
  if (socket) // Ensure old connections are closed
    socket.close(1000);

  $(".row.message")?.remove();

  try {
    socket = new WebSocket(process.env.WS_URL);
  } catch {
    createPRow(event.target, "Could not connect to server. (Server may be down)");
    return false;
  }

  let size = parseInt($("#co_op_create input").value);
  if (!size) {
    createPRow(event.target, "Invalid or no size given, using default of 2.");
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

  socket.addEventListener("message", e => messageHandler(e, event.target));

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
