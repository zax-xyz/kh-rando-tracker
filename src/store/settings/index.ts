import mutations from "../tracker/mutations";
import actions from "./actions";
import { state } from "./state";

export enum IconStyle {
  CLASSIC = "Classic",
  DEFAULT = "Default",
  MINIMAL = "Minimal",
}

export enum Game {
  KH1 = "kh1",
  KH2 = "kh2",
  KH2_IC = "kh2_ic",
  KH3 = "kh3",
  COM = "com",
  DAYS = "days",
  BBS = "bbs",
  CODED = "coded",
  DDD = "ddd",
}

export const settings = {
  namespaced: true,
  state,
  actions,
  mutations,
};
