import {
  type BasesEntry,
  BasesEntryGroup,
  type PaneType,
  type TFile,
} from "obsidian";

// I don't like this depending on components
import type { FacetsConfig } from "@/components/Facets/config";
import { getPropertyValue } from "./obsidian/entry";
import { isWikiLink, parseWikilink } from "./properties";

export type NavigateActionKind = "open" | "open_external" | "expand";

export type GenericNavigateAction = {
  kind: NavigateActionKind;
};

export type ExpandNavigateAction = {
  kind: "expand";
};

export type OpenNavigateAction = {
  kind: "open";
  url: string;
  source?: string;
};

export type OpenExternalNavigateAction = {
  kind: "open_external";
  url: string;
};

export type NavigateAction =
  | ExpandNavigateAction
  | OpenNavigateAction
  | OpenExternalNavigateAction;

export type NavigateActions = {
  primary: NavigateAction;
  mod?: NavigateAction;
} & Partial<Record<PaneType, NavigateAction>>;

export const isOpenExternalAction = (
  action: NavigateAction,
): action is OpenNavigateAction => action.kind === "open_external";

export const isOpenAction = (
  action: NavigateAction,
): action is OpenNavigateAction => action.kind === "open";

export const isExpandAction = (
  action: NavigateAction,
): action is ExpandNavigateAction => action.kind === "expand";

export const getGroupNavigationActions = (
  data: BasesEntryGroup,
  { groupActionClickBehavior }: Pick<FacetsConfig, "groupActionClickBehavior">,
  file?: TFile,
): NavigateActions => {
  const openAction: OpenNavigateAction = {
    kind: "open",
    url: file?.path ?? data.entries[0]?.file.path,
  };

  let expandAction: ExpandNavigateAction | undefined;

  if (groupActionClickBehavior === "expand") {
    expandAction = {
      kind: "expand",
    };
  }

  return {
    primary: expandAction ?? openAction,
    mod: openAction,
  };
};

const getLinkPropertyAction = (
  data: BasesEntry,
  { actionLinkProperty }: Pick<FacetsConfig, "actionLinkProperty">,
): OpenNavigateAction | OpenExternalNavigateAction | null => {
  if (!actionLinkProperty) {
    return null;
  }

  const link = getPropertyValue(data, actionLinkProperty);

  if (!link) {
    return null;
  }

  if (isWikiLink(link)) {
    return {
      kind: "open",
      url: parseWikilink(link),
    };
  }

  return {
    kind: "open_external",
    url: link,
  };
};

export const getEntryNavigationActions = (
  data: BasesEntry,
  config: Pick<FacetsConfig, "actionLinkProperty">,
): NavigateActions => {
  const openAction: OpenNavigateAction = {
    kind: "open",
    url: data.file.path,
  };

  const openLinkAction = getLinkPropertyAction(data, config);

  return {
    primary: openLinkAction ?? openAction,
    mod: openAction,
  };
};

export const getNavigationActions = (
  data: BasesEntry | BasesEntryGroup,
  config: Pick<FacetsConfig, "actionLinkProperty" | "groupActionClickBehavior">,
  file?: TFile,
): NavigateActions => {
  return data instanceof BasesEntryGroup
    ? getGroupNavigationActions(data, config, file)
    : getEntryNavigationActions(data, config);
};

export const openExternal = (url: string): void => {
  window.open(url, '_blank');
}
