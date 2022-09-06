import { IconStyle } from "../settings";
import type { Item } from "./state";

export const parseOptions = (options?: Partial<Item>): Partial<Item> => ({
  opaque: Boolean(options?.level),
  secondaryTotal: options?.secondary ? 1 : 0,
  ...options,
});

export const item = (options?: Partial<Item>): Item => ({
  total: 1,
  showFirst: false,
  level: 0,
  opaque: Boolean(options?.level),
  secondaryTotal: options?.secondary ? 1 : 0,
  secondaryMax: false,
  secondaryLevel: 0,
  disabled: false,
  isMinimal: false,
  correspondingItem: "",
  ...parseOptions(options),
});

export const world = (options?: Partial<Item>): Item =>
  item({
    category: "worlds",
    categoryExclude: IconStyle.CLASSIC,
    ...options,
  });

export const magic = (options?: Partial<Item>): Item =>
  item({
    total: 3,
    category: "magic",
    cls: "magic",
    ...options,
  });

export const levelNumbers = [
  ...[...Array(15).keys()].map(i => i + 1),
  ...[...Array(6).keys()].map(i => 20 + i * 5),
  ...[...Array(5).keys()].map(i => 50 + i * 10),
  99,
];

export const levels = (options?: Partial<Item>): Item =>
  item({
    total: 27,
    level: 1,
    showFirst: true,
    numbers: levelNumbers,
    secondary: ["other/once_more", "other/second_chance", "other/survival_abilities"],
    cls: "levels",
    category: "levels",
    ...options,
  });

export const proof = (options?: Partial<Item>): Item =>
  item({
    secondary: ["bronze", "silver", "gold"].map(i => `other/${i}`),
    category: "proofs",
    ...options,
  });

export const wayfinder = (options?: Partial<Item>): Item =>
  item({
    secondary: ["bronze", "silver", "gold"].map(i => `other/${i}`),
    category: "wayfinders",
    ...options,
  });
