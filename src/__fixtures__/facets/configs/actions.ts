import type { ActionsConfigInput } from "@/components/Facets/config";

export const WithLink: ActionsConfigInput = {
  actionLinkProperty: "formula.link",
}

export const WithGroupsExpand: ActionsConfigInput = {
  groupActionClickBehavior: 'expand',
}

export const WithGroupsNavigate: ActionsConfigInput = {
  groupActionClickBehavior: 'navigate',
}

export const WithoutGroupsAction: ActionsConfigInput = {
  groupActionClickBehavior: 'none',
}

export const WithHover: ActionsConfigInput = {
  actionHoverProperty: "formula.hover",
}

export const WithHoverOverlay: ActionsConfigInput = {
  actionHoverStyle: 'overlay',
}

export const WithHoverTooltip: ActionsConfigInput = {
  actionHoverStyle: 'tooltip',
}
