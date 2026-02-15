import type { Meta } from "@storybook/react-vite";
import { fn } from "storybook/test";

import ProjectFoldersViewMeta, {
  Borders as BaseBorders,
  Counter as BaseCounter,
  Default as BaseDefault,
  FullExample as BaseFullExample,
  InlineUngroupedContent as BaseInlineUngroupedContent,
  OutsideLabels as BaseOutsideLabels,
  Shape as BaseShape,
  Spacing as BaseSpacing,
  View
} from "./meta";

const meta = {
  ...ProjectFoldersViewMeta,
  title: "Views/Project Folders",
  tags: ["autodocs"],
  component: View,
  args: {
    ...ProjectFoldersViewMeta.args,
    onEntryClick: fn(),
    groupShape: "folder",
  },
} satisfies Meta<typeof View>;

export default meta;

export const FullExample = BaseFullExample;
export const Default = BaseDefault;
export const Shape = BaseShape;
export const Counter = BaseCounter;
export const Spacing = BaseSpacing;
export const Borders = BaseBorders;
export const OutsideLabels = BaseOutsideLabels;
export const InlineUngroupedContent = BaseInlineUngroupedContent
