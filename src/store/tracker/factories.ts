import { IconStyle } from "../settings";
import type { Item } from "./state";

export const parseOptions = (options?: Partial<Item>): Partial<Item> => ({
  opaque: options?.level ? true : false,
  secondaryTotal: options?.secondary ? 1 : 0,
  ...options,
});

export const item = (options?: Partial<Item>): Item => ({
  total: 1,
  showFirst: false,
  level: 0,
  opaque: options?.level ? true : false,
  secondaryTotal: options?.secondary ? 1 : 0,
  secondaryMax: false,
  secondaryLevel: 0,
  disabled: false,
  isMinimal: false,
  correspondingItem: "",
  ...parseOptions(options),
});

export const world = (options?: Partial<Item>): Item => ({
  ...item({
    category: "worlds",
    categoryExclude: IconStyle.CLASSIC,
    ...options,
  }),
});

export const magic = (options?: Partial<Item>): Item => ({
  ...item({
    total: 3,
    category: "magic",
    cls: "magic",
    ...options,
  }),
});
