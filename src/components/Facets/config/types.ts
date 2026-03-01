import type { BasesPropertyId } from "obsidian";

export type Border = "none" | "solid" | "dotted" | "dashed";

export type LayoutConfig = {
  layoutItemSize: number;
  layoutGap: number;
  layoutItemBorder: Border;
  layoutItemSpacing: number;
}
export type LayoutConfigInput = Partial<LayoutConfig>;

export type BackgroundInferFrom = 'active' | 'first-item';
export type BackgroundGradient = "dark" | "light" | "none";

export type BackgroundConfig = {
  backgroundInferFrom: BackgroundInferFrom;
  backgroundGradient: BackgroundGradient;
  backgroundProperty?: BasesPropertyId;
}
export type BackgroundConfigInput = Partial<BackgroundConfig>;

export type GroupLayout = 'sections' | 'grid';
export type GroupShape = 'folder'  | 'notebook';
export type UngroupedItemsDisplay = 'group' | 'inline' | 'hidden';
export type GroupInferPropertiesFrom = 'none' | 'first-item' | 'linked-note';

export type GroupsConfig = {
  groupLayout: GroupLayout;
  groupShape: GroupShape;
  groupUngroupedItemsDisplay: UngroupedItemsDisplay;
  groupInferPropertiesFrom: GroupInferPropertiesFrom;
}
export type GroupsConfigInput = Partial<GroupsConfig>;

export type CardLayout = "vertical" | "horizontal" | "overlay" | "polaroid";
export type CardShape = "square" | "circle" | "rounded";
export type CardTilt = 'none' | 'clockwise' | 'counterclockwise' | 'alternating';

export type CardsConfig = {
  cardLayout: CardLayout;
  cardShape: CardShape;
  cardTilt: CardTilt;
  cardAdaptToSize: boolean;
  cardReverseContent: boolean;
}
export type CardsConfigInput = Partial<CardsConfig>;

export type TitlePosition = 'none' | 'inside' | 'outside' | 'layout';

export type TitlesConfig = {
  titlePosition: TitlePosition;
  titleFont?: string;
  groupTitleProperty?: BasesPropertyId;
  groupSubtitleProperty?: BasesPropertyId;
}
export type TitlesConfigInput = Partial<TitlesConfig>;

export type ContentPosition = 'inside' | 'layout';

export type ContentVisibility = 'always' | 'hover';


export type ContentsConfig = {
  contentPosition: ContentPosition;
  contentVisibility: ContentVisibility;
  contentFont?: string;
  contentShowPropertyTitles: boolean;
  contentShowMarkdown: boolean;
  contentMarkdownMaxLength: number;
  contentMarkdownMaxHeight: number;
}
export type ContentsConfigInput = Partial<ContentsConfig>;

export type MediaFit = 'cover' | 'contain';

export type MediaConfig = {
  mediaProperty?: BasesPropertyId;
  mediaThumbnailProperty?: BasesPropertyId;
  mediaAspectRatio: number;
  mediaFit: MediaFit;
}
export type MediaConfigInput = Partial<MediaConfig>;

export type ColorApplyTo = 'image' | 'content' | 'both';

export type ColorsConfig = {
  colorProperty?: BasesPropertyId;
  colorApplyTo: ColorApplyTo;
  groupColorProperty?: BasesPropertyId;
}
export type ColorsConfigInput = Partial<ColorsConfig>;

export type IconsConfig = {
  iconProperty?: BasesPropertyId;
  iconFileExtensionAsFallback: boolean;
  groupIconProperty?: BasesPropertyId;
}
export type IconsConfigInput = Partial<IconsConfig>;

export type GroupCounterPosition = 'none' | 'inside' | 'outside';

export type BadgesConfig = {
  badgeProperty?: BasesPropertyId;
  badgeFont?: string;
  badgeIconProperty?: BasesPropertyId;
  badgeColorProperty?: BasesPropertyId;
  groupCounterPosition: GroupCounterPosition;
}
export type BadgesConfigInput = Partial<BadgesConfig>;

export type ActiveEffect = 'none' | 'tilted' | 'bordered';

export type ActiveConfig = {
  activeEffect: ActiveEffect;
  activeMediaAspectRatio?: number;
}

export type ActiveConfigInput = Partial<ActiveConfig>;

export type ActionClickBehavior = 'expand' | 'navigate' | 'none';
export type ActionHoverStyle = 'overlay' | 'tooltip';

export type ActionsConfig = {
  actionLinkProperty?: BasesPropertyId;
  groupActionClickBehavior: ActionClickBehavior;
  actionHoverProperty?: BasesPropertyId;
  actionHoverStyle: ActionHoverStyle;
}
export type ActionsConfigInput = Partial<ActionsConfig>;

export type FacetsConfig = LayoutConfig &
  BackgroundConfig &
  GroupsConfig &
  CardsConfig &
  TitlesConfig &
  ContentsConfig &
  MediaConfig &
  ColorsConfig &
  IconsConfig &
  BadgesConfig &
  ActiveConfig &
  ActionsConfig &
  {
    properties: BasesPropertyId[];
  };
export type FacetsConfigInput = Partial<FacetsConfig>;

