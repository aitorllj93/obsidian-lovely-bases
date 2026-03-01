import type { ViewOption } from "obsidian";

import { detectLocale, type NamespacedTranslationKey, translate } from "@/lib/i18n";

import { ACTIONS_CONFIG_DEFAULTS, ACTIVE_CONFIG_DEFAULTS, BACKGROUND_CONFIG_DEFAULTS, BADGES_CONFIG_DEFAULTS, CARDS_CONFIG_DEFAULTS, COLORS_CONFIG_DEFAULTS, CONTENTS_CONFIG_DEFAULTS, GROUPS_CONFIG_DEFAULTS, ICONS_CONFIG_DEFAULTS, LAYOUT_CONFIG_DEFAULTS, MEDIA_CONFIG_DEFAULTS, TITLES_CONFIG_DEFAULTS } from "./defaults";

const locale = detectLocale();
const t = (key: NamespacedTranslationKey<'facets'>) => translate(locale, 'facets', key);

export const LAYOUT_CONFIG_VIEW_OPTIONS: ViewOption[] = [
  {
    type: "group",
    displayName: t('layout.title'),
    items: [
      {
        key: "layoutItemSize",
        default: LAYOUT_CONFIG_DEFAULTS.layoutItemSize,
        type: "slider",
        displayName: t('layout.size.title'),
        min: 50,
        max: 800,
        step: 10,
      },
      {
        key: "layoutGap",
        default: LAYOUT_CONFIG_DEFAULTS.layoutGap,
        type: "slider",
        displayName: t('layout.gap.title'),
        min: 0,
        max: 100,
        step: 1,
      },
      {
        key: "layoutItemBorder",
        default: LAYOUT_CONFIG_DEFAULTS.layoutItemBorder,
        type: "dropdown",
        displayName: t('layout.border.title'),
        options: {
          none: t('layout.border.none'),
          solid: t('layout.border.solid'),
          dashed: t('layout.border.dashed'),
          dotted: t('layout.border.dotted'),
        }
      },
      {
        key: "layoutItemSpacing",
        default: LAYOUT_CONFIG_DEFAULTS.layoutItemSpacing,
        type: "slider",
        displayName: t('layout.spacing.title'),
        min: 0,
        max: 100,
        step: 1,
      },
    ]
  }
];

export const BACKGROUND_CONFIG_VIEW_OPTIONS: ViewOption[] = [
  {
    type: "group",
    displayName: t('background.title'),
    items: [
      {
        key: 'backgroundProperty',
        default: BACKGROUND_CONFIG_DEFAULTS.backgroundProperty,
        type: 'property',
        displayName: t('background.property.title'),
      },
      {
        key: 'backgroundGradient',
        default: BACKGROUND_CONFIG_DEFAULTS.backgroundGradient,
        type: 'dropdown',
        displayName: t('background.gradient.title'),
        shouldHide: (config) => !config.get('backgroundProperty'),
        options: {
          'dark': t('background.gradient.dark'),
          'light': t('background.gradient.light'),
          'none': t('background.gradient.none'),
        }
      },
      {
        key: 'backgroundInferFrom',
        default: BACKGROUND_CONFIG_DEFAULTS.backgroundInferFrom,
        type: 'dropdown',
        displayName: t('background.inferFrom.title'),
        shouldHide: (config) => !config.get('backgroundProperty'),
        options: {
          'active': t('background.inferFrom.active'),
          'first-item': t('background.inferFrom.first-item')
        }
      }
    ]
  }
]

export const GROUPS_CONFIG_VIEW_OPTIONS: ViewOption[] = [
  {
    type: "group",
    displayName: t('groups.title'),
    items: [
      {
        key: "groupLayout",
        default: GROUPS_CONFIG_DEFAULTS.groupLayout,
        type: "dropdown",
        displayName: t('groups.layout.title'),
        options: {
          sections: t('groups.layout.sections'),
          grid: t('groups.layout.grid'),
        }
      },
      {
        key: "groupShape",
        default: GROUPS_CONFIG_DEFAULTS.groupShape,
        shouldHide: (config) => config.get("groupLayout") === "sections",
        type: "dropdown",
        displayName: t('groups.shape.title'),
        options: {
          folder: t('groups.shape.folder'),
          grid: t('groups.shape.notebook'),
        }
      },
      {
        key: "groupUngroupedItemsDisplay",
        default: GROUPS_CONFIG_DEFAULTS.groupUngroupedItemsDisplay,
        shouldHide: (config) => config.get("groupLayout") === "sections",
        type: "dropdown",
        displayName: t('groups.ungroupedItemsDisplay.title'),
        options: {
          group: t('groups.ungroupedItemsDisplay.group'),
          inline: t('groups.ungroupedItemsDisplay.inline'),
          hidden: t('groups.ungroupedItemsDisplay.hidden'),
        }
      },
      {
        key: "groupInferPropertiesFrom",
        default: GROUPS_CONFIG_DEFAULTS.groupInferPropertiesFrom,
        shouldHide: (config) => config.get("groupLayout") === "sections",
        type: "dropdown",
        displayName: t('groups.inferPropertiesFrom.title'),
        options: {
          none: t('groups.inferPropertiesFrom.none'),
          "first-item": t('groups.inferPropertiesFrom.first-item'),
          "linked-note": t('groups.inferPropertiesFrom.linked-note')
        }
      }
    ]
  }
];

export const CARDS_CONFIG_VIEW_OPTIONS: ViewOption[] = [
  {
    type: "group",
    displayName: t('cards.title'),
    items: [
      {
        key: "cardLayout",
        default: CARDS_CONFIG_DEFAULTS.cardLayout,
        type: "dropdown",
        displayName: t('cards.layout.title'),
        options: {
          vertical: t('cards.layout.vertical'),
          horizontal: t('cards.layout.horizontal'),
          overlay: t('cards.layout.overlay'),
          polaroid: t('cards.layout.polaroid'),
        }
      },
      {
        key: "cardShape",
        default: CARDS_CONFIG_DEFAULTS.cardShape,
        type: "dropdown",
        displayName: t('cards.shape.title'),
        options: {
          square: t('cards.shape.square'),
          rounded: t('cards.shape.rounded'),
          circle: t('cards.shape.circle'),
        }
      },
      {
        key: "cardTilt",
        default: CARDS_CONFIG_DEFAULTS.cardTilt,
        type: "dropdown",
        displayName: t('cards.tilt.title'),
        options: {
          none: t('cards.tilt.none'),
          clockwise: t('cards.tilt.clockwise'),
          counterclockwise: t('cards.tilt.counterclockwise'),
          alternating: t('cards.tilt.alternating'),
        }
      },
      {
        key: "cardReverseContent",
        default: CARDS_CONFIG_DEFAULTS.cardReverseContent,
        type: "toggle",
        displayName: t('cards.reverseContent.title'),
      }
    ]
  }
];

export const TITLES_CONFIG_VIEW_OPTIONS: ViewOption[] = [
  {
    type: "group",
    displayName: t('titles.title'),
    items: [
      {
        key: "titlePosition",
        default: TITLES_CONFIG_DEFAULTS.titlePosition,
        type: "dropdown",
        displayName: t('titles.position.title'),
        options: {
          none: t('titles.position.none'),
          inside: t('titles.position.inside'),
          outside: t('titles.position.outside'),
          layout: t('titles.position.layout'),
        }
      },
      {
        key: "titleFont",
        default: TITLES_CONFIG_DEFAULTS.titleFont,
        type: "text",
        displayName: t('titles.font.title'),
      },
      {
        key: 'groupTitleProperty',
        default: TITLES_CONFIG_DEFAULTS.groupTitleProperty,
        type: 'property',
        displayName: t('titles.groupTitleProperty.title'),
      },
      {
        key: 'groupSubtitleProperty',
        default: TITLES_CONFIG_DEFAULTS.groupSubtitleProperty,
        type: 'property',
        displayName: t('titles.groupSubtitleProperty.title'),
      },
    ]
  }
];

export const CONTENTS_CONFIG_VIEW_OPTIONS: ViewOption[] = [
  {
    type: "group",
    displayName: t('contents.title'),
    items: [
      {
        key: "contentPosition",
        default: CONTENTS_CONFIG_DEFAULTS.contentPosition,
        type: "dropdown",
        displayName: t('contents.position.title'),
        options: {
          inside: t('contents.position.inside'),
          layout: t('contents.position.layout'),
        }
      },
      {
        key: "contentVisibility",
        default: CONTENTS_CONFIG_DEFAULTS.contentVisibility,
        type: "dropdown",
        displayName: t('contents.visibility.title'),
        options: {
          always: t('contents.visibility.always'),
          hover: t('contents.visibility.hover'),
        }
      },
      {
        key: "contentFont",
        default: CONTENTS_CONFIG_DEFAULTS.contentFont,
        type: "text",
        displayName: t('contents.font.title'),
      },
      {
        key: "contentShowPropertyTitles",
        default: CONTENTS_CONFIG_DEFAULTS.contentShowPropertyTitles,
        type: "toggle",
        displayName: t('contents.showPropertyTitles.title'),
      },
      {
        key: "contentShowMarkdown",
        default: CONTENTS_CONFIG_DEFAULTS.contentShowMarkdown,
        type: "toggle",
        displayName: t('contents.showMarkdown.title'),
      },
      {
        key: "contentMarkdownMaxLength",
        default: CONTENTS_CONFIG_DEFAULTS.contentMarkdownMaxLength,
        shouldHide: (config) => config.get("contentShowMarkdown") === false,
        type: "slider",
        displayName: t('contents.markdownMaxLength.title'),
        min: 0,
        max: 1000,
        step: 10,
      },
      {
        key: "contentMarkdownMaxHeight",
        default: CONTENTS_CONFIG_DEFAULTS.contentMarkdownMaxHeight,
        shouldHide: (config) => config.get("contentShowMarkdown") === false,
        type: "slider",
        displayName: t('contents.markdownMaxHeight.title'),
        min: 0,
        max: 1000,
        step: 10,
      }
    ]
  }
];

export const MEDIA_CONFIG_VIEW_OPTIONS: ViewOption[] = [
  {
    type: "group",
    displayName: t('images.title'),
    items: [
      {
        key: "mediaProperty",
        default: MEDIA_CONFIG_DEFAULTS.mediaProperty,
        type: "property",
        displayName: t('images.property.title'),
      },
      {
        key: "mediaAspectRatio",
        default: MEDIA_CONFIG_DEFAULTS.mediaAspectRatio,
        shouldHide: (config) => config.get("mediaProperty") === undefined,
        type: "slider",
        displayName: t('images.aspectRatio.title'),
        min: 0.25,
        max: 2.5,
        step: 0.05,
      },
      {
        key: "mediaFit",
        default: MEDIA_CONFIG_DEFAULTS.mediaFit,
        shouldHide: (config) => config.get("mediaProperty") === undefined,
        type: "dropdown",
        displayName: t('images.fit.title'),
        options: {
          cover: t('images.fit.cover'),
          contain: t('images.fit.contain'),
        }
      },
      {
        key: "mediaThumbnailProperty",
        default: MEDIA_CONFIG_DEFAULTS.mediaThumbnailProperty,
        type: "property",
        displayName: t('images.thumbnail.title'),
      },
    ]
  }
];

export const COLORS_CONFIG_VIEW_OPTIONS: ViewOption[] = [
  {
    type: "group",
    displayName: t('colors.title'),
    items: [
      {
        key: "colorProperty",
        default: COLORS_CONFIG_DEFAULTS.colorProperty,
        type: "property",
        displayName: t('colors.property.title'),
      },
      {
        key: "colorApplyTo",
        default: COLORS_CONFIG_DEFAULTS.colorApplyTo,
        shouldHide: (config) => config.get("colorProperty") === undefined,
        type: "dropdown",
        displayName: t('colors.applyTo.title'),
        options: {
          image: t('colors.applyTo.image'),
          content: t('colors.applyTo.content'),
          both: t('colors.applyTo.both'),
        }
      },
      {
        key: "groupColorProperty",
        default: COLORS_CONFIG_DEFAULTS.groupColorProperty,
        type: "property",
        displayName: t('colors.groupsProperty.title'),
      },
    ]
  }
];

export const ICONS_CONFIG_VIEW_OPTIONS: ViewOption[] = [
  {
    type: "group",
    displayName: t('icons.title'),
    items: [
      {
        key: "iconProperty",
        default: ICONS_CONFIG_DEFAULTS.iconProperty,
        type: "property",
        displayName: t('icons.property.title'),
      },
      {
        key: "iconFileExtensionAsFallback",
        default: ICONS_CONFIG_DEFAULTS.iconFileExtensionAsFallback,
        type: "toggle",
        displayName: t('icons.fileExtensionAsFallback.title'),
      },
      {
        key: "groupIconProperty",
        default: ICONS_CONFIG_DEFAULTS.groupIconProperty,
        type: "property",
        displayName: t('icons.groupsProperty.title'),
      },
    ]
  }
];

export const BADGES_CONFIG_VIEW_OPTIONS: ViewOption[] = [
  {
    type: "group",
    displayName: t('badges.title'),
    items: [
      {
        key: "badgeProperty",
        default: BADGES_CONFIG_DEFAULTS.badgeProperty,
        type: "property",
        displayName: t('badges.property.title'),
      },
      {
        key: "badgeFont",
        default: BADGES_CONFIG_DEFAULTS.badgeFont,
        shouldHide: (config) => config.get("badgeProperty") === undefined,
        type: "text",
        displayName: t('badges.font.title'),
      },
      {
        key: "badgeIconProperty",
        default: BADGES_CONFIG_DEFAULTS.badgeIconProperty,
        shouldHide: (config) => config.get("badgeProperty") === undefined,
        type: "property",
        displayName: t('badges.iconProperty.title'),
      },
      {
        key: "badgeColorProperty",
        default: BADGES_CONFIG_DEFAULTS.badgeColorProperty,
        shouldHide: (config) => config.get("badgeProperty") === undefined,
        type: "property",
        displayName: t('badges.colorProperty.title'),
      },
      {
        key: "groupCounterPosition",
        default: BADGES_CONFIG_DEFAULTS.groupCounterPosition,
        type: "dropdown",
        displayName: t('badges.counterPosition.title'),
        options: {
          none: t('badges.counterPosition.none'),
          inside: t('badges.counterPosition.inside'),
          outside: t('badges.counterPosition.outside'),
        }
      },
    ]
  }
];

export const ACTIVE_CONFIG_VIEW_OPTIONS: ViewOption[] = [
  {
    type: "group",
    displayName: t('active.title'),
    items: [
      {
        key: "activeEffect",
        default: ACTIVE_CONFIG_DEFAULTS.activeEffect,
        type: "dropdown",
        displayName: t('active.effect.title'),
        options: {
          none: t('active.effect.none'),
          tilted: t('active.effect.tilted'),
          bordered: t('active.effect.bordered')
        }
      },
      {
        key: 'activeMediaAspectRatio',
        default: ACTIVE_CONFIG_DEFAULTS.activeMediaAspectRatio,
        shouldHide: (config) => config.get("mediaProperty") === undefined,
        type: "slider",
        displayName: t('active.aspectRatio.title'),
        min: 0,
        max: 2.5,
        step: 0.05,
      },
    ]
  }
]

export const ACTIONS_CONFIG_VIEW_OPTIONS: ViewOption[] = [
  {
    type: "group",
    displayName: t('actions.title'),
    items: [
      {
        key: "actionLinkProperty",
        default: ACTIONS_CONFIG_DEFAULTS.actionLinkProperty,
        type: "property",
        displayName: t('actions.property.title'),
      },
      {
        key: "groupActionClickBehavior",
        default: ACTIONS_CONFIG_DEFAULTS.groupActionClickBehavior,
        type: "dropdown",
        displayName: t('actions.groupClickBehavior.title'),
        options: {
          none: t('actions.groupClickBehavior.none'),
          expand: t('actions.groupClickBehavior.expand'),
          navigate: t('actions.groupClickBehavior.navigate'),
        }
      },
      {
        key: 'actionHoverProperty',
        default: ACTIONS_CONFIG_DEFAULTS.actionHoverProperty,
        type: "property",
        displayName: t('actions.hoverProperty.title'),
      },
      {
        key: 'actionHoverStyle',
        default: ACTIONS_CONFIG_DEFAULTS.actionHoverStyle,
        shouldHide: (config) => config.get("actionHoverProperty") === undefined,
        type: "dropdown",
        displayName: t('actions.hoverStyle.title'),
        options: {
          overlay: t('actions.hoverStyle.overlay'),
          // tooltip: t('actions.hoverStyle.tooltip'),
        }
      }
    ]
  }
];

export const FACETS_CONFIG_VIEW_OPTIONS: ViewOption[] = [
  ...LAYOUT_CONFIG_VIEW_OPTIONS,
  ...BACKGROUND_CONFIG_VIEW_OPTIONS,
  ...GROUPS_CONFIG_VIEW_OPTIONS,
  ...CARDS_CONFIG_VIEW_OPTIONS,
  ...TITLES_CONFIG_VIEW_OPTIONS,
  ...CONTENTS_CONFIG_VIEW_OPTIONS,
  ...MEDIA_CONFIG_VIEW_OPTIONS,
  ...COLORS_CONFIG_VIEW_OPTIONS,
  ...ICONS_CONFIG_VIEW_OPTIONS,
  ...BADGES_CONFIG_VIEW_OPTIONS,
  ...ACTIVE_CONFIG_VIEW_OPTIONS,
  ...ACTIONS_CONFIG_VIEW_OPTIONS,
];
