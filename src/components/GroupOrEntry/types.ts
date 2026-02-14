import { type BasesEntry, BasesEntryGroup, type BasesViewConfig } from "obsidian";
import type { CardConfig } from "../Card/types"
import type { GroupConfig } from "../Group/types";

export type CommonProps = {
  cardConfig: CardConfig;
  className?: string;
  config: BasesViewConfig;
  groupConfig?: GroupConfig;
  layoutIdPrefix?: string;
}

export type EntryProps = CommonProps & {
  data: BasesEntry;
}

export type GroupProps = CommonProps & {
  data: BasesEntryGroup;
}

export type Props = EntryProps | GroupProps;

export const isGroup = (props: Props): props is GroupProps => {
  return props.data instanceof BasesEntryGroup;
}

export const isEntry = (props: Props): props is EntryProps => {
  return !isGroup(props);
}
