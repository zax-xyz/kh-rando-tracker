import { Game } from "../settings";
import type { Item as BaseItem } from "../types";

export const CHEST = "other/chest";

export type Item = BaseItem & {
  data?: string[] | string;
  minimal?: string;

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

// preload all the number images we have
const nums: Set<number> = new Set();
for (let i = 1; i <= 20; i++) nums.add(i);
for (let i = 25; i <= 50; i += 5) nums.add(i);
for (let i = 60; i <= 100; i += 10) nums.add(i);
for (let i = 21; i < 100; i += 3) nums.add(i);

nums.forEach(i => {
  // Apparently creating an image object like this loads it even if it's not added to the page
  const image = new Image();
  image.src = `/img/progression/${i + 1}.png`;
});
