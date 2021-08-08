import { Game } from "../settings";
import type { Item as BaseItem } from "../types";

export const CHEST = "other/chest";

export type Item = BaseItem & {
  data?: string[] | string;
  minimal?: string;

  popupTitle?: string;
  popupItems?: string[];
  correspondingItem: string;

  // set in the loop below
  id?: number;
};

export type Items = { [key: string]: Item };

export const item = (options: Partial<Item>): Item => ({
  total: 1,
  showFirst: false,
  level: 0,
  opaque: options.level ? true : false,
  secondaryTotal: options.secondary ? 1 : 0,
  secondaryMax: false,
  secondaryLevel: 0,
  disabled: false,
  isMinimal: false,
  correspondingItem: "",
  ...options,
});

export const mapItems = (keys: Array<string | [string, Partial<Item>]>, defaults: Item) =>
  Object.fromEntries(
    keys.map(k =>
      // each element is either a string to be used as a key and given the defaults, or an array of
      // the key and options to add to the defaults, e.g. ["final", { category: "Final Form" }]
      !Array.isArray(k) ? [k, { ...defaults }] : [k[0], { ...defaults, ...k[1] }],
    ),
  );

export type State = {
  [key: string]: {
    [key in Game]: Items;
  };
};

export const state: State = {
  self: {} as State["self"],
};
