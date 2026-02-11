import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentProps } from "react";

import { aBasesViewConfig } from "@/__mocks__";
import { DEFAULTS as CARD_DEFAULTS } from "@/components/Card/constants";
import CardMeta, { pickCardConfig } from "@/components/Card/stories/meta";
import type { CardConfig } from "@/components/Card/types";
import { type NamespacedTranslationKey, translate } from "@/lib/i18n";
import { pick } from "@/lib/utils";
import Providers from "@/stories/decorators/Providers";

import { DEFAULTS } from "../constants";
import Group from "../Group";
import type { GroupConfig } from "../types";

const t = (key: NamespacedTranslationKey<"group">) =>
  translate("en", "group", key);

export type StoryProps = Partial<Omit<ComponentProps<typeof Group>, "config" | "groupConfig" | "cardConfig">> & GroupConfig & CardConfig;

export const pickGroupConfig = <T extends GroupConfig>(props: T): GroupConfig => pick<GroupConfig>(props, [
  "groupBorder",
  "groupClickOnGroup",
  "groupColorProperty",
  "groupCounterPosition",
  "groupIconProperty",
  "groupInferPropertiesFromLinkedNotes",
  "groupShape",
  "groupSpacing",
  "groupTitlePosition"]
);

export const GroupStory = ({
  entries,
  groupKey,
  className,
  ...props
}: StoryProps) => {
  const groupConfig = pickGroupConfig(props);
  const cardConfig = pickCardConfig(props);
  const obsConfig = aBasesViewConfig({
    ...cardConfig,
    ...groupConfig,
  });
  return (
    <Group
      groupKey={groupKey}
      titleFont={cardConfig.titleFont}
      entries={entries}
      className={className}
      cardConfig={cardConfig}
      groupConfig={groupConfig}
      config={obsConfig}
    />
  );
};

export const meta = {
  title: "Design System/Group",
  component: GroupStory,
  parameters: {
    layout: "centered",
  },
  tags: ["internal"],
  argTypes: {
    // Folder-specific Properties
    groupShape: {
      control: "select",
      name: t("options.layoutAndDisplay.groupShape.title"),
      options: ["folder", "notebook"],
      description: "The shape of the groups.",
      table: {
        category: t("options.layoutAndDisplay.title"),
        defaultValue: { summary: DEFAULTS.groupShape },
      },
    },
    groupSpacing: {
      control: { type: "range", min: 0, max: 100, step: 1 },
      name: t("options.layoutAndDisplay.groupSpacing.title"),
      description: "The spacing between the groups.",
      table: {
        category: t("options.layoutAndDisplay.title"),
        defaultValue: { summary: DEFAULTS.groupSpacing.toString() },
      },
    },
    groupIconProperty: {
      control: "text",
      name: t("options.appearance.iconProperty.title"),
      description: "The property that contains the icon to display on folders.",
      table: {
        category: t("options.appearance.title"),
      },
    },
    groupColorProperty: {
      control: "text",
      name: t("options.appearance.colorProperty.title"),
      description:
        "The property that contains the color to display on folders.",
      table: {
        category: t("options.appearance.title"),
      },
    },
    groupCounterPosition: {
      control: "select",
      name: t("options.layoutAndDisplay.groupCounterPosition.title"),
      options: ["inside", "outside", "none"],
      description: "The position of the counter inside the folder.",
      table: {
        category: t("options.layoutAndDisplay.title"),
        defaultValue: { summary: DEFAULTS.groupCounterPosition },
      },
    },
    groupTitlePosition: {
      control: "select",
      name: t("options.layoutAndDisplay.groupTitlePosition.title"),
      options: ["inside", "outside", "none"],
      description: "The position of the title inside the folder.",
      table: {
        category: t("options.layoutAndDisplay.title"),
        defaultValue: { summary: DEFAULTS.groupTitlePosition },
      },
    },
    ...CardMeta.argTypes,
    groupKey: {
      table: {
        disable: true,
      },
    },
    entries: {
      table: {
        disable: true,
      },
    }
  },
  args: {
    ...DEFAULTS,
    ...CARD_DEFAULTS,
    layout: "polaroid",
    shape: "square",
    hoverProperty: undefined,
    hoverStyle: "none",
    properties: [],
    imageProperty: "formula.image",
    imageAspectRatio: 1,
    cardSize: 128,
    imageFit: "cover",
  },
  decorators: [
    Providers,
  ],
} satisfies Meta<typeof GroupStory>;

export default meta;

export type Story = StoryObj<typeof meta>;
