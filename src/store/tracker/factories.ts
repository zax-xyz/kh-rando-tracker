import { IconStyle } from "../settings";
import type { Item } from "./state";

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
  ...options,
});

export const world = (options?: Partial<Item>): Item => ({
  ...item(),
  category: "worlds",
  categoryExclude: IconStyle.CLASSIC,
  ...options,
});
