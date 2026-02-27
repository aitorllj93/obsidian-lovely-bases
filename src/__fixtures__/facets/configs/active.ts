import type { ActiveConfigInput } from "@/components/Facets/config";

export const WithNoActiveEffect: ActiveConfigInput = {
  activeEffect: "none",
}

export const WithTiltedActiveEffect: ActiveConfigInput = {
  activeEffect: "tilted",
}

export const WithBorderedActiveEffect: ActiveConfigInput = {
  activeEffect: "bordered",
}

export const With16x9ActiveRatio: ActiveConfigInput = {
  activeMediaAspectRatio: 16/9,
}
