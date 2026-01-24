import type { Meta, StoryObj } from "@storybook/react-vite";
import iconNodes from "lucide-static/icon-nodes.json";
import type { BasesEntry } from "obsidian";

import { aBasesViewConfig } from "@/__mocks__";
import { type NamespacedTranslationKey, translate } from "@/lib/i18n";
import Providers from "@/stories/decorators/Providers";

import { DEFAULTS } from "../constants";
import Card from "../index";
import type { CardConfig } from "../types";

const t = (key: NamespacedTranslationKey<"card">) =>
  translate("en", "card", key);

type StoryProps = {
  className?: string;
  entry: BasesEntry;
  isDraggable?: boolean;
} & CardConfig;

export const CardStory = ({
  className,
  entry,
  isDraggable = false,
  ...config
}: StoryProps) => {
  const obsConfig = aBasesViewConfig(config);
  return (
    <Card
      className={className}
      entry={entry}
      config={obsConfig}
      isDraggable={isDraggable}
      {...config}
    />
  );
};

export const WithVariants = (variants: StoryProps[]) => (props: Partial<StoryProps>) => {
  return (
    <div className="flex flex-wrap gap-4 w-full">
      {variants.map((variant, _) => (
        <CardStory
          key={_.toString()}
          {...{
            ...variant,
            ...props,
          }}
        />
      ))}
    </div>
  );
};

export const meta = {
  title: "Design System/Card",
  component: CardStory,
  parameters: {
    layout: "centered",
  },
  tags: ["internal"],
  argTypes: {
    // Display
    layout: {
      control: "select",
      name: t("options.layoutAndDisplay.layout.title"),
      description: "Orientation of the cards in the carousel.",
      options: ["horizontal", "vertical", "overlay", "polaroid"],
      table: {
        category: t("options.layoutAndDisplay.title"),
        defaultValue: { summary: DEFAULTS.layout },
      },
    },
    overlayContentVisibility: {
      control: "select",
      options: ["always", "hover"],
      name: t("options.layoutAndDisplay.contentVisibility.title"),
      description: "When to show overlay content.",
      table: {
        category: t("options.layoutAndDisplay.title"),
      },
    },
    cardSize: {
      control: { type: "range", min: 50, max: 800, step: 10 },
      name: t("options.layoutAndDisplay.cardSize.title"),
      description: "The size of the cards in pixels.",
      table: {
        category: t("options.layoutAndDisplay.title"),
        defaultValue: { summary: DEFAULTS.cardSize.toString() },
      },
    },
    shape: {
      control: "select",
      name: t("options.layoutAndDisplay.shape.title"),
      description: "The shape of the cards.",
      options: ["square", "circle", "rounded"],
      table: {
        category: t("options.layoutAndDisplay.title"),
        defaultValue: { summary: DEFAULTS.shape },
      },
    },
    tilt: {
      control: "select",
      name: t("options.layoutAndDisplay.tilt.title"),
      description: "The tilt of the cards.",
      options: ["none", "alternating"],
      table: {
        category: t("options.layoutAndDisplay.title"),
        defaultValue: { summary: DEFAULTS.tilt },
      },
    },
    // Image
    imageProperty: {
      control: "text",
      name: t("options.image.imageProperty.title"),
      description:
        "The property that contains the image to display on the cards.",
      table: {
        category: t("options.image.title"),
        defaultValue: { summary: DEFAULTS.imageProperty },
      },
    },
    imageAspectRatio: {
      control: { type: "range", min: 0.25, max: 2.5, step: 0.05 },
      name: t("options.image.imageAspectRatio.title"),
      description: "The aspect ratio of the image (width/height).",
      table: {
        category: t("options.image.title"),
        defaultValue: { summary: DEFAULTS.imageAspectRatio.toString() },
      },
    },
    imageFit: {
      control: "select",
      name: t("options.image.imageFit.title"),
      description: "How the image should fit within its container.",
      options: ["cover", "contain"],
      table: {
        category: t("options.image.title"),
        defaultValue: { summary: DEFAULTS.imageFit },
      },
    },
    reverseContent: {
      control: "boolean",
      name: t("options.image.reverseContent.title"),
      description: "Whether to reverse the order of image and content.",
      table: {
        category: t("options.image.title"),
        defaultValue: { summary: DEFAULTS.reverseContent.toString() },
      },
    },
    // Content
    showTitle: {
      control: "boolean",
      name: t("options.content.showTitle.title"),
      description: "Whether to show the title on each card.",
      table: {
        category: t("options.content.title"),
        defaultValue: { summary: DEFAULTS.showTitle.toString() },
      },
    },
    showPropertyTitles: {
      control: "boolean",
      name: t("options.content.showPropertyTitles.title"),
      description: "Whether to show the names of the displayed properties.",
      table: {
        category: t("options.content.title"),
        defaultValue: { summary: DEFAULTS.showPropertyTitles.toString() },
      },
    },
    showContent: {
      control: "boolean",
      name: t("options.content.showContent.title"),
      description: "Whether to show the content of the card.",
      table: {
        category: t("options.content.title"),
        defaultValue: { summary: DEFAULTS.showContent.toString() },
      },
    },
    contentMaxLength: {
      control: { type: "range", min: 0, max: 1000, step: 10 },
      name: t("options.content.contentMaxLength.title"),
      description: "The maximum length of the content to display.",
      table: {
        category: t("options.content.title"),
        defaultValue: { summary: DEFAULTS.contentMaxLength.toString() },
      },
    },
    // Appearance
    titleFont: {
      control: "text",
      name: t("options.appearance.titleFont.title"),
      description: "The font family to apply to the titles",
      table: {
        category: t("options.appearance.title"),
      },
    },
    contentFont: {
      control: "text",
      name: t("options.appearance.contentFont.title"),
      description: "The font family to apply to the content",
      table: {
        category: t("options.appearance.title"),
      },
    },
    badgesFont: {
      control: "text",
      name: t("options.appearance.badgesFont.title"),
      description: "The font family to apply to the badges",
      table: {
        category: t("options.appearance.title"),
      },
    },
    backgroundColorProperty: {
      control: "text",
      name: t("options.appearance.backgroundColorProperty.title"),
      description:
        "The property to display as a background color on the card (optional).",
      table: {
        category: t("options.appearance.title"),
      },
    },
    backgroundColorApplyTo: {
      control: "select",
      name: t("options.appearance.backgroundColorApplyTo.title"),
      description:
        "Wheter to apply the background color to the image, content or both",
      options: ["image", "content", "both"],
      table: {
        category: t("options.appearance.title"),
        defaultValue: { summary: DEFAULTS.backgroundColorApplyTo },
      },
    },
    iconProperty: {
      control: "text",
      name: t("options.appearance.iconProperty.title"),
      description: "The property to display as an icon on the card (optional).",
      table: {
        category: t("options.appearance.title"),
      },
    },
    // Badge
    badgeProperty: {
      control: "text",
      name: t("options.badges.badgeProperty.title"),
      description:
        "The property to display as a badge on the card (optional). The badge appears in the top-right corner of the card image.",
      table: {
        category: t("options.badges.title"),
      },
    },
    badgeIcon: {
      control: "select",
      name: t("options.badges.badgeIcon.title"),
      description:
        "The Lucide icon name to display alongside the badge text (optional). See https://lucide.dev/icons for available icons.",
      options: Object.keys(iconNodes),
      table: {
        category: t("options.badges.title"),
      },
    },
    badgeColor: {
      control: "color",
      name: t("options.badges.badgeColor.title"),
      description:
        "The background color of the badge in hex format (e.g., #D0A215). Text color is automatically calculated for contrast.",
      table: {
        category: t("options.badges.title"),
      },
    },
    linkProperty: {
      control: "text",
      name: t("options.interactivity.linkProperty.title"),
      description: "The property to display as a link on the card (optional).",
      table: {
        category: t("options.interactivity.title"),
      },
    },
    hoverStyle: {
      control: "select",
      name: t("options.interactivity.hoverStyle.title"),
      description: "How to display the hover property.",
      options: ["overlay", "tooltip", "none"],
      table: {
        category: t("options.interactivity.title"),
        defaultValue: { summary: DEFAULTS.hoverStyle },
      },
    },
    hoverProperty: {
      control: "text",
      name: t("options.interactivity.hoverProperty.title"),
      description:
        "The property to display when hovering over a card (optional).",
      table: {
        category: t("options.interactivity.title"),
      },
    },
    // Internals
    entry: {
      table: {
        disable: true,
      },
    },
    properties: {
      table: {
        disable: true,
      },
    },
    className: {
      table: {
        disable: true,
      },
    },
    isDraggable: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    Providers,
  ],
} satisfies Meta<typeof CardStory>;

export default meta;

export type Story = StoryObj<typeof meta>;
