import type { Meta } from "@storybook/react-vite";

import { Providers, ViewWrapper } from "@/stories/decorators";

import FacetCardsViewMeta, {
  CircleShape as BaseCircleShape,
  Default as BaseDefault,
  FullExample as BaseFullExample,
  HorizontalLayout as BaseHorizontalLayout,
  OverlayLayout as BaseOverlayLayout,
  OverlayOnHoverLayout as BaseOverlayOnHoverLayout,
  PolaroidLayout as BasePolaroidLayout,
  RoundedShape as BaseRoundedShape,
  VerticalLayout as BaseVerticalLayout,
  View
} from "./meta";

const meta = {
  ...FacetCardsViewMeta,
  title: "Views/Facet Cards",
  tags: ["autodocs", "status:ready"],
  component: View,
  decorators: [ViewWrapper, Providers],
} satisfies Meta<typeof View>;

export default meta;

export const FullExample = BaseFullExample;
export const Default = BaseDefault;
export const HorizontalLayout = BaseHorizontalLayout;
export const VerticalLayout = BaseVerticalLayout;
export const OverlayLayout = BaseOverlayLayout;
export const OverlayOnHoverLayout = BaseOverlayOnHoverLayout;
export const PolaroidLayout = BasePolaroidLayout;
export const CircleShape = BaseCircleShape;
export const RoundedShape = BaseRoundedShape;
