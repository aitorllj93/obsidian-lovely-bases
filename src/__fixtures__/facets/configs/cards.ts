import type { CardsConfigInput } from "@/components/Facets/config";

export const WithVerticalLayout: CardsConfigInput = {
  cardLayout: "vertical",
}

export const WithHorizontalLayout: CardsConfigInput = {
  cardLayout: "horizontal",
}

export const WithOverlayLayout: CardsConfigInput = {
  cardLayout: "overlay",
}

export const WithPolaroidLayout: CardsConfigInput = {
  cardLayout: "polaroid",
}

export const WithSquareShape: CardsConfigInput = {
  cardShape: "square",
}

export const WithRoundedShape: CardsConfigInput = {
  cardShape: "rounded",
}

export const WithCircleShape: CardsConfigInput = {
  cardShape: "circle",
}

export const WithClockwiseTilt: CardsConfigInput = {
  cardTilt: "clockwise",
}

export const WithCounterclockwiseTilt: CardsConfigInput = {
  cardTilt: "counterclockwise",
}

export const WithAlternatingTilt: CardsConfigInput = {
  cardTilt: "alternating",
}

export const WithoutTilt: CardsConfigInput = {
  cardTilt: "none",
}

export const WithAdaptiveContentSize: CardsConfigInput = {
  cardAdaptToSize: true,
}

export const WithoutAdaptiveContentSize: CardsConfigInput = {
  cardAdaptToSize: false,
}

export const WithContentReversed: CardsConfigInput = {
  cardReverseContent: true,
}

export const WithoutContentReversed: CardsConfigInput = {
  cardReverseContent: false,
}
