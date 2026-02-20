import type {
  ActionsConfig,
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

export const LAYOUT_CONFIG_DEFAULTS: LayoutConfig = {
  layoutItemSize: 290,
  layoutGap: 16,
  layoutItemBorder: "none",
  layoutItemSpacing: 0,
};

export const GROUPS_CONFIG_DEFAULTS: GroupsConfig = {
  groupLayout: "sections",
  groupShape: "folder",
  groupUngroupedItemsDisplay: "group",
  groupInferPropertiesFromLinkedNotes: true,
};

export const CARDS_CONFIG_DEFAULTS: CardsConfig = {
  cardLayout: "vertical",
  cardShape: "square",
  cardTilt: "none",
  cardAdaptToSize: false,
  cardReverseContent: false,
};

export const TITLES_CONFIG_DEFAULTS: TitlesConfig = {
  titlePosition: "inside",
  titleFont: undefined,
  groupTitleProperty: undefined,
  groupSubtitleProperty: undefined,
};

export const CONTENTS_CONFIG_DEFAULTS: ContentsConfig = {
  contentPosition: "inside",
  contentVisibility: "always",
  contentFont: undefined,
  contentShowPropertyTitles: true,
  contentShowMarkdown: false,
  contentMarkdownMaxLength: 0,
  contentMarkdownMaxHeight: 0,
};

export const MEDIA_CONFIG_DEFAULTS: MediaConfig = {
  mediaProperty: undefined,
  mediaThumbnailProperty: undefined,
  mediaAspectRatio: 1.5,
  mediaFit: "cover",
};

export const COLORS_CONFIG_DEFAULTS: ColorsConfig = {
  colorProperty: undefined,
  colorApplyTo: "both",
};

export const ICONS_CONFIG_DEFAULTS: IconsConfig = {
  iconProperty: undefined,
  iconFileExtensionAsFallback: true,
};

export const BADGES_CONFIG_DEFAULTS: BadgesConfig = {
  badgeProperty: undefined,
  badgeFont: undefined,
  badgeIconProperty: undefined,
  badgeColorProperty: undefined,
  groupCounterPosition: "inside",
};

export const ACTIONS_CONFIG_DEFAULTS: ActionsConfig = {
  actionLinkProperty: undefined,
  groupActionClickBehavior: 'expand',
  actionHoverProperty: undefined,
  actionHoverStyle: 'overlay',
};

export const FACETS_CONFIG_DEFAULTS: FacetsConfig = {
  ...LAYOUT_CONFIG_DEFAULTS,
  ...GROUPS_CONFIG_DEFAULTS,
  ...CARDS_CONFIG_DEFAULTS,
  ...TITLES_CONFIG_DEFAULTS,
  ...CONTENTS_CONFIG_DEFAULTS,
  ...MEDIA_CONFIG_DEFAULTS,
  ...COLORS_CONFIG_DEFAULTS,
  ...ICONS_CONFIG_DEFAULTS,
  ...BADGES_CONFIG_DEFAULTS,
  ...ACTIONS_CONFIG_DEFAULTS,
  properties: [],
};
