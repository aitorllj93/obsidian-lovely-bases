import type { MediaConfigInput } from "@/components/Facets/config";

export const WithImage: MediaConfigInput = {
  mediaProperty: "formula.image",
}

export const WithVideo: MediaConfigInput = {
  mediaProperty: "formula.video",
  mediaThumbnailProperty: "formula.image",
}

export const WithEmptyImage: MediaConfigInput = {
  mediaProperty: "formula.emptyImage",
}

export const WithoutImage: MediaConfigInput = {
  mediaProperty: undefined,
}

export const WithSquareImage: MediaConfigInput = {
  mediaAspectRatio: 1,
}

/** 4:5 (0.8) aspect ratio */
export const With4x5Ratio: MediaConfigInput = {
  mediaAspectRatio: 4/5,
}

/** 3:2 (1.5) aspect ratio */
export const With3x2Ratio: MediaConfigInput = {
  mediaAspectRatio: 3/2,
}

export const WithLandscapeRatio: MediaConfigInput = {
  mediaAspectRatio: 1.6,
}

export const WithPortraitRatio: MediaConfigInput = {
  mediaAspectRatio: 0.6,
}

export const WithMediaContain: MediaConfigInput = {
  mediaFit: "contain",
}

export const WithMediaCover: MediaConfigInput = {
  mediaFit: "cover",
}
