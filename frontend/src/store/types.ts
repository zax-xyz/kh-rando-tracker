import type { IconStyle } from "./settings";

export type Item = {
  total: number;
  level: number;
  showFirst: boolean;
  numbers?: number[];
  opaque: boolean;

  // for icons displayed in the corner activated by right-click
  secondaryLevel: number;
  secondary?: string | string[];
  secondaryTotal: number;
  secondaryMax: boolean;
  secondaryNumbers?: number[];
  secondaryAuto?: number[];

  disabled: boolean;

  cls?: string; // just used for styling the specific items/groups of items
  group?: string; // used for levelling multiple items at once, e.g. summons

  // the corresponding hint setting key for this item
  setting?: string;

  // the category to be used for customising icon styles, e.g. "worlds", "drive", etc.
  category?: string;
  // the IconStyle to exclude for this item. used because some items don't have icons in
  // a particular style despite all others in the category having ones. e.g. STT and 'Classic'
  categoryExclude?: IconStyle;

  // show based on setting
  show?: string;
  dontShow?: string;

  isMinimal: boolean;
};

export interface RootState {
  drag: boolean;
  edit: boolean;
  version: string;
  currVersion: string;
}
