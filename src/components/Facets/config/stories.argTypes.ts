
import type { ArgTypes } from "@storybook/react-vite";

import { type NamespacedTranslationKey, translate } from "@/lib/i18n";

import {
  ACTIONS_CONFIG_DEFAULTS,
  ACTIVE_CONFIG_DEFAULTS,
  BACKGROUND_CONFIG_DEFAULTS,
  BADGES_CONFIG_DEFAULTS,
  CARDS_CONFIG_DEFAULTS,
  COLORS_CONFIG_DEFAULTS,
  CONTENTS_CONFIG_DEFAULTS,
  GROUPS_CONFIG_DEFAULTS,
  ICONS_CONFIG_DEFAULTS,
  LAYOUT_CONFIG_DEFAULTS,
  MEDIA_CONFIG_DEFAULTS,
  TITLES_CONFIG_DEFAULTS,
} from "./defaults";

import type {
  ActionsConfig,
  ActiveConfig,
  BackgroundConfig,
  BadgesConfig,
  CardsConfig,
  ColorsConfig,
  ContentsConfig,
  FacetsConfig,
  GroupsConfig,
  IconsConfig,
  LayoutConfig,
  MediaConfig,
  TitlesConfig,
} from "./types";


const t = (key: NamespacedTranslationKey<"facets">) =>
  translate("en", "facets", key);

export const LAYOUT_CONFIG_ARG_TYPES: ArgTypes<LayoutConfig> = {
  layoutItemSize: {
    control: { type: "range", min: 50, max: 800, step: 10 },
    name: t("layout.size.title"),
    description: "The size of the items in pixels.",
    table: {
      category: t("layout.title"),
      defaultValue: {
        summary: LAYOUT_CONFIG_DEFAULTS.layoutItemSize.toString(),
      }
    }
  },
  layoutGap: {
    control: { type: "range", min: 0, max: 100, step: 1 },
    name: t("layout.gap.title"),
    description: "Gap between cards in pixels.",
    table: {
      category: t("layout.title"),
      defaultValue: {
        summary: LAYOUT_CONFIG_DEFAULTS.layoutGap.toString(),
      }
    }
  },
  layoutItemBorder: {
    control: {
      type: "select",
      labels: {
        none: t("layout.border.none"),
        solid: t("layout.border.solid"),
        dashed: t("layout.border.dashed"),
        dotted: t("layout.border.dotted"),
      }
    },
    name: t("layout.border.title"),
    description: "Border style",
    options: [
      "none",
      "solid",
      "dashed",
      "dotted",
    ],
    table: {
      category: t("layout.title"),
      defaultValue: {
        summary: LAYOUT_CONFIG_DEFAULTS.layoutItemBorder.toString(),
      }
    }
  },
  layoutItemSpacing: {
    control: { type: "range", min: 0, max: 100, step: 1 },
    name: t("layout.spacing.title"),
    description: "Inner content spacing in pixels.",
    table: {
      category: t("layout.title"),
      defaultValue: {
        summary: LAYOUT_CONFIG_DEFAULTS.layoutItemSpacing.toString(),
      }
    }
  },
}

export const BACKGROUND_CONFIG_ARG_TYPES: ArgTypes<BackgroundConfig> = {
  backgroundProperty: {
    control: { type: "text" },
    name: t("background.property.title"),
    description: "Background property",
    table: {
      category: t("background.title"),
      type: {
        summary: "Property",
      },
      defaultValue: {
        summary: BACKGROUND_CONFIG_DEFAULTS.backgroundProperty?.toString(),
      }
    }
  },
  backgroundGradient: {
    control: {
      type: "select",
      labels: {
        dark: t("background.gradient.dark"),
        light: t("background.gradient.light"),
        none: t("background.gradient.none"),
      }
    },
    name: t("background.gradient.title"),
    description: "Gradient",
    options: [
      "dark",
      "light",
      "none",
    ],
    table: {
      category: t("background.title"),
      defaultValue: {
        summary: BACKGROUND_CONFIG_DEFAULTS.backgroundGradient?.toString(),
      }
    }
  },
  backgroundInferFrom: {
    control: {
      type: "select",
      labels: {
        active: t("background.inferFrom.active"),
        "first-item": t("background.inferFrom.first-item"),
      }
    },
    name: t("background.inferFrom.title"),
    description: "Infer property from",
    options: [
      "active",
      "first-item",
    ],
    table: {
      category: t("background.title"),
      defaultValue: {
        summary: BACKGROUND_CONFIG_DEFAULTS.backgroundProperty?.toString(),
      }
    }
  }
}

export const GROUPS_CONFIG_ARG_TYPES: ArgTypes<GroupsConfig> = {
  groupLayout: {
    control: {
      type: "select",
      labels: {
        sections: t("groups.layout.sections"),
        grid: t("groups.layout.grid"),
      }
    },
    name: t("groups.layout.title"),
    description: "Groups layout",
    options: [
      "sections",
      "grid",
    ],
    table: {
      category: t("groups.title"),
      defaultValue: {
        summary: GROUPS_CONFIG_DEFAULTS.groupLayout.toString(),
      }
    }
  },
  groupLayoutDirection: {
    control: {
      type: "select",
      labels: {
        horizontal: t("groups.direction.horizontal"),
        notebook: t("groups.direction.vertical"),
      }
    },
    name: t("groups.direction.title"),
    description: "Direction",
    options: [
      "horizontal",
      "vertical",
    ],
    table: {
      category: t("groups.title"),
      defaultValue: {
        summary: GROUPS_CONFIG_DEFAULTS.groupLayoutDirection.toString(),
      }
    }
  },
  groupShape: {
    control: {
      type: "select",
      labels: {
        folder: t("groups.shape.folder"),
        notebook: t("groups.shape.notebook"),
      }
    },
    name: t("groups.shape.title"),
    description: "Groups shape",
    options: [
      "folder",
      "notebook",
    ],
    table: {
      category: t("groups.title"),
      defaultValue: {
        summary: GROUPS_CONFIG_DEFAULTS.groupShape.toString(),
      }
    }
  },
  groupUngroupedItemsDisplay: {
    control: {
      type: "select",
      labels: {
        group: t("groups.ungroupedItemsDisplay.group"),
        inline: t("groups.ungroupedItemsDisplay.inline"),
        hidden: t("groups.ungroupedItemsDisplay.hidden"),
      }
    },
    name: t("groups.ungroupedItemsDisplay.title"),
    description: "Ungrouped items display",
    options: [
      "group",
      "inline",
      "hidden"
    ],
    table: {
      category: t("groups.title"),
      defaultValue: {
        summary: GROUPS_CONFIG_DEFAULTS.groupUngroupedItemsDisplay.toString(),
      }
    }
  },
  groupInferPropertiesFrom: {
    control: {
      type: "select",
      labels: {
        none: t("groups.inferPropertiesFrom.none"),
        "first-item": t("groups.inferPropertiesFrom.first-item"),
        "linked-note": t("groups.inferPropertiesFrom.linked-note"),
      }
    },
    name: t("groups.inferPropertiesFrom.title"),
    description: "Infer properties from linked notes",
    options: [
      "none",
      "first-item",
      "linked-note",
    ],
    table: {
      category: t("groups.title"),
      defaultValue: {
        summary: GROUPS_CONFIG_DEFAULTS.groupInferPropertiesFrom.toString(),
      }
    }
  }
}

export const CARDS_CONFIG_ARG_TYPES: ArgTypes<CardsConfig> = {
  cardLayout: {
    control: {
      type: "select",
      labels: {
        horizontal: t("cards.layout.horizontal"),
        vertical: t("cards.layout.vertical"),
        overlay: t("cards.layout.overlay"),
        polaroid: t("cards.layout.polaroid"),
      }
    },
    name: t("cards.layout.title"),
    description: "Cards layout",
    options: [
      "horizontal",
      "vertical",
      "overlay",
      "polaroid"
    ],
    table: {
      category: t("cards.title"),
      defaultValue: {
        summary: CARDS_CONFIG_DEFAULTS.cardLayout.toString(),
      }
    }
  },
  cardShape: {
    control: {
      type: "select",
      labels: {
        square: t("cards.shape.square"),
        circle: t("cards.shape.circle"),
        rounded: t("cards.shape.rounded"),
      }
    },
    name: t("cards.shape.title"),
    description: "The shape of the cards.",
    options: [
      "square",
      "circle",
      "rounded"
    ],
    table: {
      category: t("cards.title"),
      defaultValue: {
        summary: CARDS_CONFIG_DEFAULTS.cardShape.toString(),
      }
    },
  },
  cardTilt: {
    control: {
      type: "select",
      labels: {
        none: t("cards.tilt.none"),
        clockwise: t("cards.tilt.clockwise"),
        counterclockwise: t("cards.tilt.counterclockwise"),
        alternating: t("cards.tilt.alternating"),
      }
    },
    name: t("cards.tilt.title"),
    description: "The tilt of the cards.",
    options: [
      "none",
      "clockwise",
      "counterclockwise",
      "alternating"
    ],
    table: {
      category: t("cards.title"),
      defaultValue: {
        summary: CARDS_CONFIG_DEFAULTS.cardTilt.toString(),
      }
    }
  },
  cardAdaptToSize: {
    control: { type: "boolean" },
    name: t("cards.adaptToSize.title"),
    description: "Adapt card size to content",
    table: {
      category: t("cards.title"),
      defaultValue: {
        summary: CARDS_CONFIG_DEFAULTS.cardAdaptToSize.toString(),
      }
    }
  },
  cardReverseContent: {
    control: { type: "boolean" },
    name: t("cards.reverseContent.title"),
    description: "Whether to reverse the order of image and content.",
    table: {
      category: t("cards.title"),
      defaultValue: {
        summary: CARDS_CONFIG_DEFAULTS.cardReverseContent.toString(),
      }
    }
  }
}

export const TITLES_CONFIG_ARG_TYPES: ArgTypes<TitlesConfig> = {
  titlePosition: {
    control: {
      type: "select",
      labels: {
        none: t("titles.position.none"),
        inside: t("titles.position.inside"),
        outside: t("titles.position.outside"),
        layout: t("titles.position.layout"),
      }
    },
    name: t("titles.position.title"),
    description: "Whether to show the title inside the item, outside, or not at all.",
    options: [
      "none",
      "inside",
      "outside",
      "layout"
    ],
    table: {
      category: t("titles.title"),
      defaultValue: {
        summary: TITLES_CONFIG_DEFAULTS.titlePosition.toString(),
      }
    }
  },
  titleFont: {
    control: { type: "text" },
    name: t("titles.font.title"),
    description: "The font family to apply to the titles.",
    table: {
      category: t("titles.title"),
      defaultValue: {
        summary: TITLES_CONFIG_DEFAULTS.titleFont?.toString(),
      }
    }
  },
  groupTitleProperty: {
    control: { type: "text" },
    name: t("titles.groupTitleProperty.title"),
    description: "Groups title property",
    table: {
      category: t("titles.title"),
      type: {
        summary: "Property",
      },
      defaultValue: {
        summary: TITLES_CONFIG_DEFAULTS.groupTitleProperty?.toString(),
      }
    }
  },
  groupSubtitleProperty: {
    control: { type: "text" },
    name: t("titles.groupSubtitleProperty.title"),
    description: "Groups subtitle property",
    table: {
      category: t("titles.title"),
      type: {
        summary: "Property",
      },
      defaultValue: {
        summary: TITLES_CONFIG_DEFAULTS.groupSubtitleProperty?.toString(),
      }
    }
  },
  groupTitleFont: {
    control: { type: "text" },
    name: t("titles.groupTitleFont.title"),
    description: "The font family to apply to the group titles.",
    table: {
      category: t("titles.title"),
      defaultValue: {
        summary: TITLES_CONFIG_DEFAULTS.groupTitleFont?.toString(),
      }
    }
  },
}

export const CONTENTS_CONFIG_ARG_TYPES: ArgTypes<ContentsConfig> = {
  contentPosition: {
    control: {
      type: "select",
      labels: {
        inside: t("contents.position.inside"),
        layout: t("contents.position.layout"),
      }
    },
    name: t("contents.position.title"),
    description: "Where to show the content.",
    options: [
      "inside",
      "layout"
    ],
    table: {
      category: t("contents.title"),
      defaultValue: {
        summary: CONTENTS_CONFIG_DEFAULTS.contentPosition.toString(),
      }
    }
  },
  contentVisibility: {
    control: {
      type: "select",
      labels: {
        always: t("contents.visibility.always"),
        hover: t("contents.visibility.hover"),
      }
    },
    name: t("contents.visibility.title"),
    description: "When to show overlay content.",
    options: [
      "always",
      "hover"
    ],
    table: {
      category: t("contents.title"),
      defaultValue: {
        summary: CONTENTS_CONFIG_DEFAULTS.contentVisibility.toString(),
      }
    }
  },
  contentFont: {
    control: { type: "text" },
    name: t("contents.font.title"),
    description: "The font family to apply to the content.",
    table: {
      category: t("contents.title"),
      defaultValue: {
        summary: CONTENTS_CONFIG_DEFAULTS.contentFont?.toString(),
      }
    }
  },
  contentShowPropertyTitles: {
    control: { type: "boolean" },
    name: t("contents.showPropertyTitles.title"),
    description: "Whether to show the names of the displayed properties.",
    table: {
      category: t("contents.title"),
      defaultValue: {
        summary: CONTENTS_CONFIG_DEFAULTS.contentShowPropertyTitles.toString(),
      }
    }
  },
  contentShowMarkdown: {
    control: { type: "boolean" },
    name: t("contents.showMarkdown.title"),
    description: "Whether to show the content of the card.",
    table: {
      category: t("contents.title"),
      defaultValue: {
        summary: CONTENTS_CONFIG_DEFAULTS.contentShowMarkdown.toString(),
      }
    }
  },
  contentMarkdownMaxLength: {
    control: { type: "number" },
    name: t("contents.markdownMaxLength.title"),
    description: "The maximum length of the content to display.",
    table: {
      category: t("contents.title"),
      defaultValue: {
        summary: CONTENTS_CONFIG_DEFAULTS.contentMarkdownMaxLength.toString(),
      }
    }
  },
  contentMarkdownMaxHeight: {
    control: { type: "number" },
    name: t("contents.markdownMaxHeight.title"),
    description: "The maximum height of the content to display.",
    table: {
      category: t("contents.title"),
      defaultValue: {
        summary: CONTENTS_CONFIG_DEFAULTS.contentMarkdownMaxHeight.toString(),
      }
    }
  },
}

export const MEDIA_CONFIG_ARG_TYPES: ArgTypes<MediaConfig> = {
  mediaProperty: {
    control: { type: "text" },
    name: t("images.property.title"),
    description: "The property that contains the image to display on the cards.",
    table: {
      category: t("images.title"),
      type: {
        summary: "Property",
        detail: "Wikilink or URL"
      },
      defaultValue: {
        summary: MEDIA_CONFIG_DEFAULTS.mediaProperty?.toString(),
      }
    }
  },
  mediaAspectRatio: {
    control: { type: "range", min: 0.25, max: 2.5, step: 0.05 },
    name: t("images.aspectRatio.title"),
    description: "The aspect ratio of the image (width/height).",
    table: {
      category: t("images.title"),
      defaultValue: {
        summary: MEDIA_CONFIG_DEFAULTS.mediaAspectRatio?.toString(),
      }
    }
  },
  mediaFit: {
    control: {
      type: "select",
      labels: {
        contain: t("images.fit.contain"),
        cover: t("images.fit.cover"),
      }
    },
    name: t("images.fit.title"),
    description: "How the image should fit within its container.",
    options: [
      "contain",
      "cover"
    ],
    table: {
      category: t("images.title"),
      defaultValue: {
        summary: MEDIA_CONFIG_DEFAULTS.mediaFit?.toString(),
      }
    }
  },
  mediaThumbnailProperty: {
    control: { type: "text" },
    name: t("images.thumbnail.title"),
    description: "The thumbnail property that contains the image to display on the cards.",
    table: {
      category: t("images.title"),
      type: {
        summary: "Thumbnail Property",
        detail: "Wikilink or URL"
      },
      defaultValue: {
        summary: MEDIA_CONFIG_DEFAULTS.mediaThumbnailProperty?.toString(),
      }
    }
  },
}

export const COLORS_CONFIG_ARG_TYPES: ArgTypes<ColorsConfig> = {
  colorProperty: {
    control: { type: "text" },
    name: t("colors.property.title"),
    description: "The property that contains the color to apply to the items.",
    table: {
      category: t("colors.title"),
      type: {
        summary: "Property",
        detail: "Hexadecimal Color",
      },
      defaultValue: {
        summary: COLORS_CONFIG_DEFAULTS.colorProperty?.toString(),
      }
    }
  },
  colorApplyTo: {
    control: {
      type: "select",
      labels: {
        image: t("colors.applyTo.image"),
        content: t("colors.applyTo.content"),
        both: t("colors.applyTo.both"),
      }
    },
    name: t("colors.applyTo.title"),
    description: "Wheter to apply the color to the image, content or both.",
    options: [
      "image",
      "content",
      "both"
    ],
    table: {
      category: t("colors.title"),
      defaultValue: {
        summary: COLORS_CONFIG_DEFAULTS.colorApplyTo?.toString(),
      }
    }
  },
  groupColorProperty: {
    control: { type: "text" },
    name: t("colors.groupsProperty.title"),
    description: "The property that contains the color to apply to the groups.",
    table: {
      category: t("colors.title"),
      type: {
        summary: "Property",
        detail: "Hexadecimal Color",
      },
      defaultValue: {
        summary: COLORS_CONFIG_DEFAULTS.groupColorProperty?.toString(),
      }
    }
  },
}

export const ICONS_CONFIG_ARG_TYPES: ArgTypes<IconsConfig> = {
  iconProperty: {
    control: { type: "text" },
    name: t("icons.property.title"),
    description: "The property that contains the icon to display on the cards.",
    table: {
      category: t("icons.title"),
      type: {
        summary: "Property",
        detail: "Lucide Icon https://lucide.dev/icons/",
      },
      defaultValue: {
        summary: ICONS_CONFIG_DEFAULTS.iconProperty?.toString(),
      }
    }
  },
  iconFileExtensionAsFallback: {
    control: { type: "boolean" },
    name: t("icons.fileExtensionAsFallback.title"),
    description: "Whether to use the file extension as a fallback for the icon.",
    table: {
      category: t("icons.title"),
      defaultValue: {
        summary: ICONS_CONFIG_DEFAULTS.iconFileExtensionAsFallback.toString(),
      }
    }
  },
  groupIconProperty: {
    control: { type: "text" },
    name: t("icons.groupsProperty.title"),
    description: "The property that contains the icon to display on the groups.",
    table: {
      category: t("icons.title"),
      type: {
        summary: "Property",
        detail: "Lucide Icon https://lucide.dev/icons/",
      },
      defaultValue: {
        summary: ICONS_CONFIG_DEFAULTS.groupIconProperty?.toString(),
      }
    }
  },
}

export const BADGES_CONFIG_ARG_TYPES: ArgTypes<BadgesConfig> = {
  badgeProperty: {
    control: { type: "text" },
    name: t("badges.property.title"),
    description: "The property to display as a badge on the card. The badge appears in the top-right corner of the card image.",
    table: {
      category: t("badges.title"),
      type: {
        summary: "Property",
      },
      defaultValue: {
        summary: BADGES_CONFIG_DEFAULTS.badgeProperty?.toString(),
      }
    }
  },
  badgeFont: {
    control: { type: "text" },
    name: t("badges.font.title"),
    description: "The font family to apply to the badges.",
    table: {
      category: t("badges.title"),
      defaultValue: {
        summary: BADGES_CONFIG_DEFAULTS.badgeFont?.toString(),
      }
    }
  },
  badgeIconProperty: {
    control: { type: "text" },
    name: t("badges.iconProperty.title"),
    description: "The Lucide icon name to display alongside the badge text (optional). See https://lucide.dev/icons for available icons.",
    table: {
      category: t("badges.title"),
      type: {
        summary: "Property",
        detail: "Lucide Icon https://lucide.dev/icons/",
      },
      defaultValue: {
        summary: BADGES_CONFIG_DEFAULTS.badgeIconProperty?.toString(),
      }
    }
  },
  badgeColorProperty: {
    control: { type: "text" },
    name: t("badges.colorProperty.title"),
    description: "The background color of the badge in hex format (e.g., #D0A215). Text color is automatically calculated for contrast.",
    table: {
      category: t("badges.title"),
      type: {
        summary: "Property",
        detail: "Hexadecimal Color",
      },
      defaultValue: {
        summary: BADGES_CONFIG_DEFAULTS.badgeColorProperty?.toString(),
      }
    }
  },
  groupCounterPosition: {
    control: {
      type: "select",
      labels: {
        none: t("badges.counterPosition.none"),
        inside: t("badges.counterPosition.inside"),
        outside: t("badges.counterPosition.outside"),
      }
    },
    name: t("badges.counterPosition.title"),
    description: "Group counter position",
    options: [
      "none",
      "inside",
      "outside",
    ],
    table: {
      category: t("badges.title"),
      defaultValue: {
        summary: BADGES_CONFIG_DEFAULTS.groupCounterPosition?.toString(),
      }
    }
  }
};

export const ACTIVE_CONFIG_ARG_TYPES: ArgTypes<ActiveConfig> = {
  activeEffect: {
    control: {
      type: "select",
      labels: {
        none: t("active.effect.none"),
        tilted: t("active.effect.tilted"),
        bordered: t("active.effect.bordered"),
      }
    },
    name: t("active.effect.title"),
    description: "The effect to display when the item is active/hovered",
    options: [
      "none",
      "tilted",
      "bordered",
    ],
    table: {
      category: t("active.title"),
      defaultValue: {
        summary: ACTIVE_CONFIG_DEFAULTS.activeEffect?.toString(),
      }
    }
  },
  activeMediaAspectRatio: {
    control: { type: "range", min: 0.25, max: 2.5, step: 0.05 },
    name: t("active.aspectRatio.title"),
    description: "The aspect ratio of the active item (width/height).",
    table: {
      category: t("active.title"),
      defaultValue: {
        summary: ACTIVE_CONFIG_DEFAULTS.activeMediaAspectRatio?.toString(),
      }
    }
  },
}

export const ACTIONS_CONFIG_ARG_TYPES: ArgTypes<ActionsConfig> = {
  actionLinkProperty: {
    control: { type: "text" },
    name: t("actions.property.title"),
    description: "The property to display as a link on the card.",
    table: {
      category: t("actions.title"),
      type: {
        summary: "Property",
        detail: "Wikilink or URL",
      },
      defaultValue: {
        summary: ACTIONS_CONFIG_DEFAULTS.actionLinkProperty?.toString(),
      }
    }
  },
  groupActionClickBehavior: {
    control: {
      type: "select",
      labels: {
        none: t("actions.groupClickBehavior.none"),
        expand: t("actions.groupClickBehavior.expand"),
        navigate: t("actions.groupClickBehavior.navigate"),
      }
    },
    name: t("actions.groupClickBehavior.title"),
    description: "Group action click behavior",
    options: [
      "none",
      "expand",
      "navigate"
    ],
    table: {
      category: t("actions.title"),
      defaultValue: {
        summary: ACTIONS_CONFIG_DEFAULTS.groupActionClickBehavior?.toString(),
      }
    }
  },
  actionHoverProperty: {
    control: { type: "text" },
    name: t("actions.hoverProperty.title"),
    description: "The property to display when hovering over a card.",
    table: {
      category: t("actions.title"),
      type: {
        summary: "Property",
      },
      defaultValue: {
        summary: ACTIONS_CONFIG_DEFAULTS.actionHoverProperty?.toString(),
      }
    }
  },
  actionHoverStyle: {
    control: {
      type: "select",
      labels: {
        overlay: t("actions.hoverStyle.overlay"),
        tooltip: t("actions.hoverStyle.tooltip"),
      }
    },
    name: t("actions.hoverStyle.title"),
    description: "How to display the hover property.",
    options: [
      "overlay",
      "tooltip"
    ],
    table: {
      category: t("actions.title"),
      defaultValue: {
        summary: ACTIONS_CONFIG_DEFAULTS.actionHoverStyle?.toString(),
      }
    }
  },
}

export const FACETS_CONFIG_ARG_TYPES: ArgTypes<FacetsConfig> = {
  ...LAYOUT_CONFIG_ARG_TYPES,
  ...BACKGROUND_CONFIG_ARG_TYPES,
  ...GROUPS_CONFIG_ARG_TYPES,
  ...CARDS_CONFIG_ARG_TYPES,
  ...TITLES_CONFIG_ARG_TYPES,
  ...CONTENTS_CONFIG_ARG_TYPES,
  ...MEDIA_CONFIG_ARG_TYPES,
  ...COLORS_CONFIG_ARG_TYPES,
  ...ICONS_CONFIG_ARG_TYPES,
  ...BADGES_CONFIG_ARG_TYPES,
  ...ACTIVE_CONFIG_ARG_TYPES,
  ...ACTIONS_CONFIG_ARG_TYPES,
  properties: {
    table: {
      disable: true,
    }
  }
}
