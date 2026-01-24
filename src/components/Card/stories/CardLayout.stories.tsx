import type { Meta } from "@storybook/react-vite";

import { ARTICLE_ENTRIES } from "@/__fixtures__/entries";
import { Providers } from "@/stories/decorators";

import { DEFAULTS } from "../constants";
import type Card from "../index";

import CardMeta, { type Story } from "./meta";

const meta = {
  ...CardMeta,
  title: "Design System/Card/Layouts",
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

export const Default: Story = {
  args: {
    entry: ARTICLE_ENTRIES[0],
    ...DEFAULTS,
    properties: ["note.author", "note.published", "note.excerpt"],
  },
};

export const Horizontal: Story = {
  args: {
    entry: ARTICLE_ENTRIES[0],
    ...DEFAULTS,
    layout: "horizontal",
    shape: "square",
    hoverProperty: "note.url",
    hoverStyle: "overlay",
    properties: ["note.author", "note.published"],
    imageProperty: "note.banner",
    imageAspectRatio: 0.85,
    cardSize: 400,
    imageFit: "cover",
    reverseContent: true,
    showPropertyTitles: false,
    showTitle: true,
    showContent: true,
    contentMaxLength: 100,
    overlayContentVisibility: "always",
    badgeProperty: "note.read",
    badgeIcon: "check",
    badgeColor: "#768D21",
    tilt: "none",
    linkProperty: 'note.url',
    titleFont: 'Impact, Georgia, Arial Black, Trebuchet MS',
    contentFont: 'Arial, Verdana, Tahoma, Segoe UI, Roboto',
    badgesFont: 'Comic Sans MS, Courier New, Consolas, Arial Narrow, Impact',
  },
};

export const Vertical: Story = {
  args: {
    entry: ARTICLE_ENTRIES[0],
    ...DEFAULTS,
    layout: "vertical",
    shape: "square",
    hoverProperty: undefined,
    hoverStyle: "none",
    properties: ["note.author", "note.published", "note.excerpt"],
    imageProperty: "note.banner",
    imageAspectRatio: 0.85,
    cardSize: 340,
    imageFit: "cover",
    reverseContent: false,
    showPropertyTitles: false,
    showTitle: true,
    showContent: false,
    contentMaxLength: 200,
    overlayContentVisibility: "always",
    badgeProperty: "note.read",
    badgeIcon: "check",
    badgeColor: "#768D21",
    tilt: "none",
    linkProperty: 'note.url',
    titleFont: 'Impact, Georgia, Arial Black, Trebuchet MS',
    contentFont: 'Arial, Verdana, Tahoma, Segoe UI, Roboto',
    badgesFont: 'Comic Sans MS, Courier New, Consolas, Arial Narrow, Impact',
  },
};

export const Overlay: Story = {
  args: {
    entry: ARTICLE_ENTRIES[0],
    ...DEFAULTS,
    layout: "overlay",
    shape: "square",
    hoverProperty: undefined,
    hoverStyle: "none",
    properties: [],
    imageProperty: "note.banner",
    imageAspectRatio: 1.5,
    cardSize: 340,
    imageFit: "cover",
    reverseContent: false,
    showPropertyTitles: false,
    showTitle: true,
    showContent: true,
    contentMaxLength: 200,
    overlayContentVisibility: "always",
    badgeProperty: "note.read",
    badgeIcon: "check",
    badgeColor: "#768D21",
    tilt: "none",
    linkProperty: 'note.url',
    titleFont: 'Impact, Georgia, Arial Black, Trebuchet MS',
    contentFont: 'Arial, Verdana, Tahoma, Segoe UI, Roboto',
    badgesFont: 'Comic Sans MS, Courier New, Consolas, Arial Narrow, Impact',
  },
};

export const Polaroid: Story = {
  args: {
    entry: ARTICLE_ENTRIES[0],
    ...DEFAULTS,
    layout: "polaroid",
    shape: "square",
    hoverProperty: undefined,
    hoverStyle: "none",
    properties: [],
    imageProperty: "note.banner",
    imageAspectRatio: 1,
    cardSize: 340,
    imageFit: "cover",
    reverseContent: false,
    badgeProperty: "note.read",
    badgeIcon: "check",
    badgeColor: "#768D21",
    tilt: "none",
    linkProperty: 'note.url',
    titleFont: 'Impact, Georgia, Arial Black, Trebuchet MS',
    contentFont: 'Arial, Verdana, Tahoma, Segoe UI, Roboto',
    badgesFont: 'Comic Sans MS, Courier New, Consolas, Arial Narrow, Impact',
  },
};
