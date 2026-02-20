import type { BasesPropertyId } from "obsidian";

export type Border = "none" | "solid" | "dotted" | "dashed";

export type LayoutConfig = {
  layoutItemSize: number;
  layoutGap: number;
  layoutItemBorder: Border;
  layoutItemSpacing: number;
}
export type LayoutConfigInput = Partial<LayoutConfig>;

export type GroupLayout = 'sections' | 'grid';
export type GroupShape = 'folder'  | 'notebook';
export type UngroupedItemsDisplay = 'group' | 'inline' | 'hidden';

export type GroupsConfig = {
  groupLayout: GroupLayout;
  groupShape: GroupShape;
  groupUngroupedItemsDisplay: UngroupedItemsDisplay;
  groupInferPropertiesFromLinkedNotes: boolean;
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

export type TitlePosition = 'none' | 'inside' | 'outside';

export type TitlesConfig = {
  titlePosition: TitlePosition;
  titleFont?: string;
  groupTitleProperty?: BasesPropertyId;
  groupSubtitleProperty?: BasesPropertyId;
}
export type TitlesConfigInput = Partial<TitlesConfig>;

export type ContentVisibility = 'always' | 'hover';

export type ContentsConfig = {
  contentVisibility: ContentVisibility;
  contentFont?: string;
  contentShowPropertyTitles: boolean;
  contentShowMarkdown: boolean;
  contentMarkdownMaxLength: number;
  contentMarkdownMaxHeight: number;
}
export type ContentsConfigInput = Partial<ContentsConfig>;

export type ImageFit = 'cover' | 'contain';

export type ImagesConfig = {
  imageProperty?: BasesPropertyId;
  mediaThumbnailProperty?: BasesPropertyId;
  imageAspectRatio: number;
  imageFit: ImageFit;
}
export type ImagesConfigInput = Partial<ImagesConfig>;

export type ColorApplyTo = 'image' | 'content' | 'both';

export type ColorsConfig = {
  colorProperty?: BasesPropertyId;
  colorApplyTo: ColorApplyTo;
}
export type ColorsConfigInput = Partial<ColorsConfig>;

export type IconsConfig = {
  iconProperty?: BasesPropertyId;
  iconFileExtensionAsFallback: boolean;
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
  GroupsConfig &
  CardsConfig &
  TitlesConfig &
  ContentsConfig &
  ImagesConfig &
  ColorsConfig &
  IconsConfig &
  BadgesConfig &
  ActionsConfig &
  {
    properties: BasesPropertyId[];
  };
export type FacetsConfigInput = Partial<FacetsConfig>;

