import type { Meta } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { WithGridLayout, WithNotebookShape } from "@/__fixtures__/facets/configs";
import FacetCardsViewMeta, {
  Borders as BaseBorders,
  Counter as BaseCounter,
  Default as BaseDefault,
  FullExample as BaseFullExample,
  InlineUngroupedContent as BaseInlineUngroupedContent,
  OutsideLabels as BaseOutsideLabels,
  Spacing as BaseSpacing,
  View
} from "./groupsMeta";

const meta = {
  ...FacetCardsViewMeta,
  title: "Views/Facet Cards/Groups/Notebooks",
  component: View,
  args: {
    ...FacetCardsViewMeta.args,
    onEntryClick: fn(),
    ...WithGridLayout,
    ...WithNotebookShape,
    layoutItemSpacing: 50,
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

