import { type BasesEntry, BasesEntryGroup, type BasesViewConfig } from "obsidian";
import type { CSSProperties } from "react";
import type { FacetsConfig } from "./config";

export type CommonProps = {
  active?: boolean;
  id?: string;
  className?: string;
  config: BasesViewConfig;
  facetsConfig: FacetsConfig;
  index?: number;
  initialAnimation?: boolean;
  layoutIdPrefix?: string;
  onSetActive?: (isActive: boolean) => void;
  style?: CSSProperties;
}

export type EntryProps = CommonProps & {
  data: BasesEntry;
  isDraggable?: boolean;
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
