import type { LayoutConfigInput } from "@/components/Facets/config";
import { CONTAINER_WIDTHS, SPACINGS } from "@/lib/sizes";

export const WithGap6XS: LayoutConfigInput = {
  layoutGap: SPACINGS["6XS"],
};

export const WithGap5XS: LayoutConfigInput = {
  layoutGap: SPACINGS['5XS']
}

export const WithGap2XS: LayoutConfigInput = {
  layoutGap: SPACINGS['2XS']
}

export const WithoutGap: LayoutConfigInput = {
  layoutGap: 0,
};

export const WithBorderSolid: LayoutConfigInput = {
  layoutItemBorder: "solid",
};

export const WithBorderDotted: LayoutConfigInput = {
  layoutItemBorder: "dotted",
};

export const WithBorderDashed: LayoutConfigInput = {
  layoutItemBorder: "dashed",
};

/** 64px */
export const WithSize9XS: LayoutConfigInput = {
  layoutItemSize: CONTAINER_WIDTHS["9XS"],
};

/** 96px */
export const WithSize8XS: LayoutConfigInput = {
  layoutItemSize: CONTAINER_WIDTHS["8XS"],
};

/** 128px */
export const WithSize7XS: LayoutConfigInput = {
  layoutItemSize: CONTAINER_WIDTHS["7XS"],
};

/** 160px */
export const WithSize6XS: LayoutConfigInput = {
  layoutItemSize: CONTAINER_WIDTHS["6XS"],
};

/** 192px */
export const WithSize5XS: LayoutConfigInput = {
  layoutItemSize: CONTAINER_WIDTHS["5XS"],
};

/** 224px */
export const WithSize4XS: LayoutConfigInput = {
  layoutItemSize: CONTAINER_WIDTHS["4XS"],
};

/** 256px */
export const WithSize3XS: LayoutConfigInput = {
  layoutItemSize: CONTAINER_WIDTHS["3XS"],
};

/** 288px */
export const WithSize2XS: LayoutConfigInput = {
  layoutItemSize: CONTAINER_WIDTHS["2XS"],
};

/** 320px */
export const WithSizeXS: LayoutConfigInput = {
  layoutItemSize: CONTAINER_WIDTHS.XS
};

/** 384px */
export const WithSizeSM: LayoutConfigInput = {
  layoutItemSize: CONTAINER_WIDTHS.SM
};

/** 448px */
export const WithSizeMD: LayoutConfigInput = {
  layoutItemSize: CONTAINER_WIDTHS.MD
};

/** 512px */
export const WithSizeLG: LayoutConfigInput = {
  layoutItemSize: CONTAINER_WIDTHS.LG,
};

/** 576px */
export const WithSizeXL: LayoutConfigInput = {
  layoutItemSize: CONTAINER_WIDTHS.XL
};

/** 672px */
export const WithSize2XL: LayoutConfigInput = {
  layoutItemSize: CONTAINER_WIDTHS["2XL"],
};

/** 768px */
export const WithSize3XL: LayoutConfigInput = {
  layoutItemSize: CONTAINER_WIDTHS["3XL"],
};

/** 896px */
export const WithSize4XL: LayoutConfigInput = {
  layoutItemSize: CONTAINER_WIDTHS["4XL"],
};

/** 1024px */
export const WithSize5XL: LayoutConfigInput = {
  layoutItemSize: CONTAINER_WIDTHS["5XL"],
};

/** 1152px */
export const WithSize6XL: LayoutConfigInput = {
  layoutItemSize: CONTAINER_WIDTHS["6XL"],
};

/** 1280px */
export const WithSize7XL: LayoutConfigInput = {
  layoutItemSize: CONTAINER_WIDTHS["7XL"],
};

/** 64px (8px padding) */
export const WithSize9XSAndSpacing: LayoutConfigInput = {
  layoutItemSize: CONTAINER_WIDTHS["9XS"] + (SPACINGS["9XS"] * 2),
  layoutItemSpacing: SPACINGS["9XS"],
};

/** 96px (12px padding) */
export const WithSize8XSAndSpacing: LayoutConfigInput = {
  layoutItemSize: CONTAINER_WIDTHS["8XS"] + (SPACINGS["8XS"] * 2),
  layoutItemSpacing: SPACINGS["8XS"],
};

/** 128px (16px padding) */
export const WithSize7XSAndSpacing: LayoutConfigInput = {
  layoutItemSize: CONTAINER_WIDTHS["7XS"] + (SPACINGS["7XS"] * 2),
  layoutItemSpacing: SPACINGS["7XS"],
};

/** 160px (24px padding) */
export const WithSize6XSAndSpacing: LayoutConfigInput = {
  layoutItemSize: CONTAINER_WIDTHS["6XS"] + (SPACINGS["6XS"] * 2),
  layoutItemSpacing: SPACINGS["6XS"],
};

/** 192px (24px padding) */
export const WithSize5XSAndSpacing: LayoutConfigInput = {
  layoutItemSize: CONTAINER_WIDTHS["5XS"] + (SPACINGS["5XS"] * 2),
  layoutItemSpacing: SPACINGS["5XS"],
};

/** 224px (40px padding) */
export const WithSize4XSAndSpacing: LayoutConfigInput = {
  layoutItemSize: CONTAINER_WIDTHS["4XS"] + (SPACINGS["4XS"] * 2),
  layoutItemSpacing: SPACINGS["4XS"],
};

/** 256px (48px padding) */
export const WithSize3XSAndSpacing: LayoutConfigInput = {
  layoutItemSize: CONTAINER_WIDTHS["3XS"] + (SPACINGS["3XS"] * 2),
  layoutItemSpacing: SPACINGS["3XS"],
};

/** 288px (56px padding) */
export const WithSize2XSAndSpacing: LayoutConfigInput = {
  layoutItemSize: CONTAINER_WIDTHS["2XS"] + (SPACINGS["2XS"] * 2),
  layoutItemSpacing: SPACINGS["2XS"],
};

/** 320px (64px padding) */
export const WithSizeXSAndSpacing: LayoutConfigInput = {
  layoutItemSize: CONTAINER_WIDTHS.XS + (SPACINGS.XS * 2),
  layoutItemSpacing: SPACINGS.XS,
};

/** 384px (72px padding) */
export const WithSizeSMAndSpacing: LayoutConfigInput = {
  layoutItemSize: CONTAINER_WIDTHS.SM + (SPACINGS.SM * 2),
  layoutItemSpacing: SPACINGS.SM,
};

/** 448px (80px padding) */
export const WithSizeMDAndSpacing: LayoutConfigInput = {
  layoutItemSize: CONTAINER_WIDTHS.MD + (SPACINGS.MD * 2),
  layoutItemSpacing: SPACINGS.MD,
};

/** 512px (88px padding) */
export const WithSizeLGAndSpacing: LayoutConfigInput = {
  layoutItemSize: CONTAINER_WIDTHS.LG + (SPACINGS.LG * 2),
  layoutItemSpacing: SPACINGS.LG,
};

/** 576px (96px padding) */
export const WithSizeXLAndSpacing: LayoutConfigInput = {
  layoutItemSize: CONTAINER_WIDTHS.XL + (SPACINGS.XL * 2),
  layoutItemSpacing: SPACINGS.XL,
};

/** 672px (104px padding) */
export const WithSize2XLAndSpacing: LayoutConfigInput = {
  layoutItemSize: CONTAINER_WIDTHS["2XL"] + (SPACINGS["2XL"] * 2),
  layoutItemSpacing: SPACINGS["2XL"],
};

/** 768px (112px padding) */
export const WithSize3XLAndSpacing: LayoutConfigInput = {
  layoutItemSize: CONTAINER_WIDTHS["3XL"] + (SPACINGS["3XL"] * 2),
  layoutItemSpacing: SPACINGS["3XL"],
};

/** 896px (120px padding) */
export const WithSize4XLAndSpacing: LayoutConfigInput = {
  layoutItemSize: CONTAINER_WIDTHS["4XL"] + (SPACINGS["4XL"] * 2),
  layoutItemSpacing: SPACINGS["4XL"],
};

/** 1024px (128px padding) */
export const WithSize5XLAndSpacing: LayoutConfigInput = {
  layoutItemSize: CONTAINER_WIDTHS["5XL"] + (SPACINGS["5XL"] * 2),
  layoutItemSpacing: SPACINGS["5XL"],
};

/** 1152px (136px padding) */
export const WithSize6XLAndSpacing: LayoutConfigInput = {
  layoutItemSize: CONTAINER_WIDTHS["6XL"] + (SPACINGS["6XL"] * 2),
  layoutItemSpacing: SPACINGS["6XL"],
};

/** 1280px (144px padding) */
export const WithSize7XLAndSpacing: LayoutConfigInput = {
  layoutItemSize: CONTAINER_WIDTHS["7XL"] + (SPACINGS["7XL"] * 2),
  layoutItemSpacing: SPACINGS["7XL"],
};
