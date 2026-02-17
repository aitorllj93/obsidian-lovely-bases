import type { Meta } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { WithSectionsLayout } from "@/__fixtures__/facets/configs";
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
  title: "Views/Facet Cards/Groups/Sections",
  component: View,
  args: {
    ...FacetCardsViewMeta.args,
    onEntryClick: fn(),
    ...WithSectionsLayout,
  },
} satisfies Meta<typeof View>;

export default meta;

export const FullExample = BaseFullExample;
export const Default = BaseDefault;
export const Counter = BaseCounter;
export const Spacing = BaseSpacing;
export const Borders = BaseBorders;
export const OutsideLabels = BaseOutsideLabels;
