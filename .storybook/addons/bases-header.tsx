import { HeartIcon } from "@storybook/icons";
import React, { memo, useCallback, useEffect } from "react";
import { ToggleButton } from "storybook/internal/components";
import { useGlobals, useStorybookApi } from "storybook/manager-api";

export const BASES_HEADER_ADDON_ID = "obsidian.basesHeader";
export const BASES_HEADER_TOOL_ID = "obsidian.basesHeaderToggle";
export const PARAM_KEY = "obsidianShowHeader";

export const BasesHeaderToggle = memo(function MyAddonSelector() {
  const [globals, updateGlobals] = useGlobals();
  const api = useStorybookApi();

  const isActive = [true, "true"].includes(globals[PARAM_KEY]);

  const toggleMyTool = useCallback(() => {
    updateGlobals({
      [PARAM_KEY]: !isActive,
    });
  }, [isActive, updateGlobals]);

  useEffect(() => {
    api.setAddonShortcut(BASES_HEADER_ADDON_ID, {
      label: "Toggle Bases Header [8]",
      defaultShortcut: ["8"],
      actionName: "basesHeader",
      showInMenu: true,
      action: toggleMyTool,
    });
  }, [toggleMyTool, api]);

  return (
    <ToggleButton
      padding="small"
      variant="ghost"
      key={BASES_HEADER_TOOL_ID}
      pressed={isActive}
      ariaLabel="Bases Header"
      tooltip="Toggle bases header"
      onClick={toggleMyTool}
    >
      <HeartIcon />
    </ToggleButton>
  );
});
