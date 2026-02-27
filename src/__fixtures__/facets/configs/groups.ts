import type { GroupsConfigInput } from "@/components/Facets/config"

export const WithSectionsLayout: GroupsConfigInput = {
  groupLayout: "sections",
}

export const WithGridLayout: GroupsConfigInput = {
  groupLayout: "grid",
}

export const WithFolderShape: GroupsConfigInput = {
  groupShape: "folder",
}

export const WithNotebookShape: GroupsConfigInput = {
  groupShape: "notebook",
}

export const WithUngroupedItemsInSeparateGroup: GroupsConfigInput = {
  groupUngroupedItemsDisplay: "group",
}

export const WithUngroupedItemsInline: GroupsConfigInput = {
  groupUngroupedItemsDisplay: "inline",
}

export const WithUngroupedItemsHidden: GroupsConfigInput = {
  groupUngroupedItemsDisplay: "hidden",
}

export const WithInferPropertiesFromLinkedNotes: GroupsConfigInput = {
  groupInferPropertiesFrom: "linked-note",
}

export const WithInferPropertiesFromFirstItem: GroupsConfigInput = {
  groupInferPropertiesFrom: "first-item",
}
