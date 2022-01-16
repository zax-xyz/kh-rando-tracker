import { ActionTree, MutationTree } from "vuex";
import { RootState } from "../types";

let socket: WebSocket;

const state = {
  room: "",
  joined: false,
  error: "",
  single: false,
};

export type State = typeof state;

const mutations: MutationTree<State> = {
  setRoom(state: State, room: string) {
    state.room = room;
  },

  setJoined(state: State, joined: boolean) {
    state.joined = joined;
  },

  setError(state: State, error: string) {
    state.error = error;
  },

  setSingle(state: State, single: boolean) {
    state.single = single;
  },
};

const actions: ActionTree<State, RootState> = {
  connect({ commit, dispatch }, payload: { openData: string }) {
    if (socket)
      // Ensure old connections are closed
      socket.close(1000);

    commit("setJoined", false);
    commit("setError", "");

    socket = new WebSocket(process.env.VUE_APP_WS as string);
    socket.addEventListener("error", () => {
      commit("setError", "Could not connect to server. (Server may be down)");
    });

    socket.addEventListener("open", () => {
      socket.send(payload.openData);
    });

    socket.addEventListener("message", e => {
      dispatch("handleMessage", { message: e.data });
    });
  },

  sendClick(_, payload) {
    if (!socket || payload.client !== "self") return;

    socket.send(JSON.stringify(payload));
  },

  join({ dispatch }, payload: { room: string }) {
    dispatch("connect", {
      openData: JSON.stringify({ type: "join_room", room: payload.room }),
    });
  },

  create({ commit, dispatch }, payload: { size: number; single: boolean }) {
    commit("setSingle", payload.single);
    dispatch("connect", {
      openData: JSON.stringify({ type: "create_room", size: payload.size, single: payload.single }),
    });
  },

  handleMessage({ commit, dispatch, state }, payload: { message: string }) {
    const msg = JSON.parse(payload.message);
    const client = state.single ? "self" : msg.id;

    switch (msg.type) {
      case "room_created":
        commit("setRoom", msg.id);
        commit("setJoined", true);
        break;

      case "room_joined":
        commit("setRoom", msg.id);
        commit("setJoined", true);
        commit("setSingle", msg.single ?? false);
        break;

      case "user_joined":
        dispatch("tracker/addClient", msg.id, { root: true });
        break;

      case "user_left":
        commit("tracker/removeClient", { client: msg.id }, { root: true });
        break;

      case "error":
        commit("setError", msg.message);
        break;

      case "user_primary":
        dispatch(
          "tracker/primary",
          {
            client,
            cell: msg.item,
            offset: msg.offset,
            shift: msg.shift,
            remote: true,
          },
          { root: true },
        );
        break;

      case "user_secondary":
        dispatch(
          "tracker/secondary",
          {
            client,
            cell: msg.item,
            offset: msg.offset,
            remote: true,
          },
          { root: true },
        );
        break;

      case "user_disable":
        dispatch("tracker/disable", { client, cell: msg.item, remote: true }, { root: true });
        break;

      case "user_corresponding":
        dispatch(
          "tracker/setCorrespondingItem",
          {
            client,
            cell: msg.item,
            other: msg.other,
            remote: true,
          },
          { root: true },
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
