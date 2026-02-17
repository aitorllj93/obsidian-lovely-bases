import type { Meta } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { WithFolderShape, WithGridLayout } from "@/__fixtures__/facets/configs";
import FacetCardsViewMeta, {
  Borders as BaseBorders,
  Counter as BaseCounter,
  Default as BaseDefault,
  FullExample as BaseFullExample,
  OutsideLabels as BaseOutsideLabels,
  Spacing as BaseSpacing,
  View
} from "./groupsMeta";

const meta = {
  ...FacetCardsViewMeta,
  title: "Views/Facet Cards/Groups/Folders",
  component: View,
  args: {
    ...FacetCardsViewMeta.args,
    onEntryClick: fn(),
    ...WithGridLayout,
    ...WithFolderShape,
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
