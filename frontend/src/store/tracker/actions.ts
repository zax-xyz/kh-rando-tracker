export default {
  primary(
    // @ts-ignore
    { commit, dispatch, state },
    // @ts-ignore
    { client, cell, offset = 1, shift = false }
  ) {
    const items = state.clients[client];
    const item: { [key: string]: any } = items[cell];
    if (item.disabled) return;

    dispatch(
      "co_op/sendClick",
      { type: "user_primary", client, cell, offset },
      { root: true }
    );

    var level = item.level;
    const data = Boolean(item.data);
    const total = item.total + data;
    const end = total + 1;

    // Increment level with wrapping overflow based on total,
    // but not if locked but levelled - assume it is now unlocked for first time
    if (!level || item.opaque || shift) level = (level + end + offset) % end;

    // Shift click to indicate levelling without fully unlocking
    // I.e. levelling drive forms through its auto ability
    if (shift) {
      if (offset > 0 && level - offset === 0) level += 1;
      else if (offset < 0 && level === 1) level = 0;
    }

    if (level) {
      if (!shift) commit("setOpaque", { client, cell, opaque: true });
    } else {
      commit("setOpaque", { client, cell, opaque: false });
    }

    if (item.nobody && level === total)
      // Show data image on last level
      commit("setData", { client, cell, show: true });

    const group = item.group;

    const groupItems = [];
    if (group) {
      for (const key in items)
        if (items[key].group === group) groupItems.push(key);
    } else {
      groupItems.push(cell);
    }

    for (const item of groupItems)
      commit("setLevel", { client, cell: item, level });
  },

  // @ts-ignore
  secondary({ commit, dispatch, state }, { client, cell, offset = 1 }) {
    const item = state.clients[client][cell];
    if (item.disabled) return;

    const secondary = item.secondary;
    if (!secondary) return;

    dispatch(
      "co_op/sendClick",
      { type: "user_secondary", client, cell, offset },
      { root: true }
    );

    // Increment level with wrapping overflow based on total
    const end = 1 + (
      Array.isArray(secondary)
      ? secondary.length
      : (item.secondaryTotal || 1) + (item.secondaryMax || 0)
    );
    commit("setSecondaryLevel", {
      client,
      cell,
      level: (item.secondaryLevel + end + offset) % end,
    });
  },

  // @ts-ignore
  disable({ commit, dispatch }, { client, cell }) {
    dispatch(
      "co_op/sendClick",
      { type: "user_disable", client, cell },
      { root: true }
    );

    commit("disable", { client, cell });
  },
};
