import type { Meta } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { WithNotebookShape } from "@/__fixtures__/facets/configs";
import ProjectFoldersViewMeta, {
  Borders as BaseBorders,
  Counter as BaseCounter,
  Default as BaseDefault,
  FullExample as BaseFullExample,
  InlineUngroupedContent as BaseInlineUngroupedContent,
  OutsideLabels as BaseOutsideLabels,
  Spacing as BaseSpacing,
  View
} from "./meta";

const meta = {
  ...ProjectFoldersViewMeta,
  title: "Views/Project Folders/Notebooks",
  component: View,
  args: {
    ...ProjectFoldersViewMeta.args,
    onEntryClick: fn(),
    ...WithNotebookShape,
  },
} satisfies Meta<typeof View>;

export default meta;

export const FullExample = BaseFullExample;
export const Default = BaseDefault;
export const Counter = BaseCounter;
export const Spacing = BaseSpacing;
export const Borders = BaseBorders;
export const OutsideLabels = BaseOutsideLabels;
export const InlineUngroupedContent = BaseInlineUngroupedContent;

