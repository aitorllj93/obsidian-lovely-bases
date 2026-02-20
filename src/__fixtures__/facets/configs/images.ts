import type { ImagesConfigInput } from "@/components/Facets/config";

export const WithImage: ImagesConfigInput = {
  imageProperty: "formula.image",
}

export const WithVideo: ImagesConfigInput = {
  imageProperty: "formula.video",
  mediaThumbnailProperty: "formula.image",
}

export const WithEmptyImage: ImagesConfigInput = {
  imageProperty: "formula.emptyImage",
}

export const WithoutImage: ImagesConfigInput = {
  imageProperty: undefined,
}

export const WithSquareImage: ImagesConfigInput = {
  imageAspectRatio: 1,
}

/** 4:5 (0.8) aspect ratio */
export const With4x5Image: ImagesConfigInput = {
  imageAspectRatio: 4/5,
}

/** 3:2 (1.5) aspect ratio */
export const With3x2Image: ImagesConfigInput = {
  imageAspectRatio: 3/2,
}

export const WithLandscapeImage: ImagesConfigInput = {
  imageAspectRatio: 1.6,
}

export const WithPortraitImage: ImagesConfigInput = {
  imageAspectRatio: 0.6,
}

export const WithImageContain: ImagesConfigInput = {
  imageFit: "contain",
}

export const WithImageCover: ImagesConfigInput = {
  imageFit: "cover",
}
