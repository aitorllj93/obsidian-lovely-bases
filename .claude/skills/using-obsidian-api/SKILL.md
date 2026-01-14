---
name: using-obsidian-api
description: "This rule provides instruction for interacting with the Obsidian API"
---

## Obsidian Bases API

### Main types

- `BasesEntry`: Represents a note/entry with properties
- `BasesViewConfig`: View configuration (user options)
- `BasesPropertyId`: Property identifier (string)
- `App`: Obsidian application instance
- `TFile`: Obsidian file

### Data access

```typescript
// Get property value
const value = entry.getValue(propertyId);

// Get property display name
const displayName = config.getDisplayName(propertyId);

// Get image (resolves internal and external paths)
import { getResourcePath } from "@/lib/obsidian/link";
const imageSrc = getResourcePath(app, imageUrl, entry.file.path);
```

### Context

The Obsidian context exposes shared Obsidian variables.

```typescript
const { app, component, containerEl, isEmbedded } = useObsidian();
```

### Available hooks

Define and use reusable hooks to wrap Obsidian features in `src/hooks` to simplify the workflow and increase reusability

```typescript
// Get config value with default
const layout = useConfigValue<"vertical" | "horizontal">("layout", "vertical");

// Get entry data
const entry = useEntry(entryId);

// Get entry property
const property = useProperty(entryId, propertyId);

// Get entry image
const imageSrc = useImage(entryId);

// Get entry title
const title = useTitle(entryId);

// Handler to open entry
const handleOpen = useEntryOpen(entryId);

// Handler for hover with preview
const handleHover = useEntryHover(entryId, linkRef);
```
