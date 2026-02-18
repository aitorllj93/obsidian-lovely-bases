import {
  type BasesEntry,
  type BasesEntryGroup,
  Keymap,
  type PaneType,
  type TFile,
} from "obsidian";
import { type KeyboardEvent, type MouseEvent, useCallback, useMemo } from "react";

import { useObsidian } from "@/components/Obsidian/Context";
import type { NavigateAction, NavigateActions } from "@/lib/navigate";
import { getNavigationActions, openExternal } from "@/lib/navigate";

import type { FacetsConfig } from "../config";

type NavigateFn = (event: React.MouseEvent | React.KeyboardEvent) => void;

type UseNavigateParams = {
  data: BasesEntry | BasesEntryGroup;
  config: Pick<FacetsConfig, "actionLinkProperty" | "groupActionClickBehavior">;
  file?: TFile;
  toggleExpanded?: (e: React.MouseEvent | React.KeyboardEvent) => void;
};

const resolveAction = (
  actions: NavigateActions,
  modEvent: PaneType | boolean,
): NavigateAction => {
  if (!modEvent) {
    return actions.primary;
  }

  if (typeof modEvent === "string") {
    return actions[modEvent] ?? actions.mod ?? actions.primary;
  }

  return actions.mod ?? actions.primary;
};

type NavigateHandlers = {
  [K in NavigateAction["kind"]]: (
    payload: Omit<Extract<NavigateAction, { kind: K }>, "kind">,
    modEvent: PaneType | boolean,
    event: React.MouseEvent | React.KeyboardEvent,
  ) => void;
};

function useDispatchNavigate(
  toggleExpanded?: (e: React.MouseEvent | React.KeyboardEvent) => void,
) {
  const { app } = useObsidian();
  const navigateHandlers = useMemo(() => {
    const handlers: NavigateHandlers = {
      expand(_, __, e) {
        toggleExpanded?.(e);
      },
      open({ url, source }, modEvent) {
        void app.workspace.openLinkText(url, source ?? "", modEvent);
      },
      open_external({ url }) {
        openExternal(url);
      },
    };
    return handlers;
  }, [app, toggleExpanded]);

  return useCallback(
    <K extends NavigateAction["kind"]>(
      action: Extract<NavigateAction, { kind: K }>,
      modEvent: PaneType | boolean,
      e: React.MouseEvent | React.KeyboardEvent,
    ) => {
      navigateHandlers[action.kind](action, modEvent, e);
    },
    [navigateHandlers],
  );
}

export function useNavigate({
  data,
  config,
  file,
  toggleExpanded,
}: UseNavigateParams): NavigateFn {
  const actions = useMemo(
    () => getNavigationActions(data, config, file),
    [data, config, file],
  );

  const dispatchNavigate = useDispatchNavigate(toggleExpanded);

  return useCallback(
    (event: MouseEvent | KeyboardEvent) => {
      const evt = event.nativeEvent;

      if (evt instanceof MouseEvent && evt.button !== 0 && evt.button !== 1)
        return;
      if (
        evt instanceof KeyboardEvent &&
        evt.key !== "Enter" &&
        evt.key !== " "
      )
        return;

      evt.preventDefault();
      evt.stopPropagation();
      const modEvent = Keymap.isModEvent(evt);

      const action = resolveAction(actions, modEvent);
      if (!action) return;

      dispatchNavigate(action, modEvent, event);
    },
    [actions, dispatchNavigate],
  );
}
