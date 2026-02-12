import { accent, desaturate, linear } from "@/lib/colors";
import type { FolderColors } from "../types";

export const getFolderColors = (
  color?: string,
  containerElement?: HTMLElement,
): FolderColors => {
  const primary = color ?? accent(containerElement);
  const gradient = linear(primary, 0.2);
  const foreground = desaturate(primary, 0.2);

  const backBg =
    gradient ||
    "linear-gradient(135deg, var(--folder-back) 0%, var(--folder-tab) 100%)";
  const labelBg = "var(--card)";
  const tabBg = gradient || "var(--folder-tab)";
  const frontBg =
    gradient ||
    "linear-gradient(135deg, var(--folder-front) 0%, var(--folder-back) 100%)";

  return {
    backBg,
    labelBg,
    tabBg,
    frontBg,
    foreground,
  };
}
