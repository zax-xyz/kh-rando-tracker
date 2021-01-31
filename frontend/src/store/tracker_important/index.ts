import { state } from "./state";
import { getters } from "./getters";
import { mutations } from "./mutations";
import { actions } from "./actions";

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

[
  ...[...Array(27).keys()].map(i => `numbers/${i + 1}.png`),
  "numbers/max.png",
  "secondary/page.png",
  ...["jump", "quick", "dodge", "aerial", "glide"].map(g => `secondary/drive/${g}.png`),
  ...["bronze", "silver", "gold"].map(c => `secondary/crowns/${c}.png`),
  ...["pain_panic", "cerberus", "titan", "goddess", "paradox"].map(c => `secondary/cups/${c}.png`),
  ...["roxas", "xigbar", "luxord", "saix", "kingdom_hearts"].map(i => `nobody/${i}.png`),
  ...["depths", "mining", "engine", "transport"].map(i => `secondary/cor/${i}.png`),
  "secondary/lingering_will.png",
  "secondary/sephiroth.png",
  "secondary/triangle.png",
  "secondary/chest.png",
].forEach(src => {
  // Apparently creating an image object like this loads it even if it's not added to the page
  const image = new Image();
  image.src = `img/${src}`;
});
