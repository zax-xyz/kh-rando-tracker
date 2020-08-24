var socket: WebSocket;

const state = {
  room: "",
  joined: false,
  error: "",
};

type State = typeof state;

const mutations = {
  // @ts-ignore
  setRoom(state: State, payload: { room: string }) {
    state.room = payload.room;
  },

  // @ts-ignore
  setJoined(state: State, payload: { joined: boolean }) {
    state.joined = payload.joined;
  },

  // @ts-ignore
  setError(state: State, payload: { error: string }) {
    state.error = payload.error;
  },
};

const actions = {
  // @ts-ignore
  connect({ commit, dispatch }, payload: { openData: string }) {
    if (socket)
      // Ensure old connections are closed
      socket.close(1000);

    commit("setJoined", { joined: false });
    commit("setError", { error: "" });

    socket = new WebSocket("wss://tracker-ws.zaxu.xyz");
    socket.addEventListener("error", () => {
      commit("setError", {
        error: "Could not connect to server. (Server may be down)",
      });
    });

    socket.addEventListener("open", () => {
      socket.send(payload.openData);
    });

    socket.addEventListener("message", (e) => {
      dispatch("handleMessage", { message: e.data });
    });
  },

  sendClick(
    {},
    payload: { type: string; client: string; cell: string; offset: number }
  ) {
    if (!socket || payload.client) return;

    socket.send(
      JSON.stringify({
        type: payload.type,
        item: payload.cell,
        offset: payload.offset,
      })
    );
  },

  // @ts-ignore
  join({ dispatch }, payload: { room: string }) {
    dispatch("connect", {
      openData: JSON.stringify({ type: "join_room", room: payload.room }),
    });
  },

  // @ts-ignore
  create({ dispatch }, payload: { size: number }) {
    dispatch("connect", {
      openData: JSON.stringify({ type: "create_room", size: payload.size }),
    });
  },

  // @ts-ignore
  handleMessage({ commit, dispatch }, payload: { message: string }) {
    const msg = JSON.parse(payload.message);

    switch (msg.type) {
      case "room_created":
        commit("setRoom", { room: msg.id });
        commit("setJoined", { joined: true });
        break;

      case "room_joined":
        commit("setRoom", { room: msg.id });
        commit("setJoined", { joined: true });
        break;

      case "user_joined":
        commit("tracker/addClient", { client: msg.id }, { root: true });
        break;

      case "user_left":
        commit("tracker/removeClient", { client: msg.id }, { root: true });
        break;

      case "error":
        commit("setError", { error: msg.message });
        break;

      case "user_primary":
        dispatch(
          "tracker/primary",
          {
            client: msg.id,
            cell: msg.item,
            offset: msg.offset,
            shift: msg.shift,
          },
          { root: true }
        );
        break;

      case "user_secondary":
        dispatch(
          "tracker/secondary",
          {
            client: msg.id,
            cell: msg.item,
            offset: msg.offset,
          },
          { root: true }
        );
        break;

      case "user_disable":
        commit(
          "tracker/disable",
          { client: msg.id, cell: msg.item },
          { root: true }
        );
        break;
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
