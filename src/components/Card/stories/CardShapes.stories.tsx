import type { Meta } from "@storybook/react-vite";

import { ARTICLE_ENTRIES } from "@/__fixtures__/entries";
import { Providers } from "@/stories/decorators";

import { DEFAULTS } from "../constants";
import type Card from "../index";

import CardMeta, { type Story } from "./meta";

const meta = {
  ...CardMeta,
  title: "Design System/Card/Shapes",
  tags: ["internal"],
  decorators: [
    Providers,
    (Story) => (
      <div
        style={{
          maxWidth: "340px",
        }}
      >
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;

export const Circle: Story = {
  args: {
    entry: ARTICLE_ENTRIES[0],
    ...DEFAULTS,
    layout: "vertical",
    shape: "circle",
    hoverProperty: undefined,
    hoverStyle: "none",
    properties: [],
    imageProperty: "note.banner",
    imageAspectRatio: 1,
    cardSize: 340,
    imageFit: "cover",
    reverseContent: false,
    showPropertyTitles: false,
    showTitle: false,
    showContent: false,
    contentMaxLength: 200,
    overlayContentVisibility: "always",
    badgeProperty: undefined,
    badgeIcon: undefined,
    badgeColor: undefined,
    tilt: "none",
    linkProperty: undefined,
  },
};

export const Rounded: Story = {
  args: {
    entry: ARTICLE_ENTRIES[0],
    ...DEFAULTS,
    layout: "overlay",
    shape: "rounded",
    hoverProperty: undefined,
    hoverStyle: "none",
    properties: [],
    imageProperty: "note.banner",
    imageAspectRatio: 1,
    cardSize: 340,
    imageFit: "cover",
    reverseContent: false,
    showPropertyTitles: false,
    showTitle: true,
    showContent: false,
    contentMaxLength: 200,
    overlayContentVisibility: "hover",
    badgeProperty: undefined,
    badgeIcon: undefined,
    badgeColor: undefined,
    tilt: "none",
    linkProperty: undefined,
  },
};
