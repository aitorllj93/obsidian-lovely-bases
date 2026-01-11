---
alwaysApply: true
---

# Obsidian Bases Plugin Architecture

This project is an Obsidian plugin that extends "Bases Views" with custom visual views.

## View Structure

Each view follows a two-file pattern:

1. **Definition** in `src/views/{ViewName}/index.ts`:
   - Exports a `BaseViewDef` object with: `id`, `name`, `icon`, `factory`, `options`
   - The factory creates a `ReactBasesView` instance

2. **React Component** in `src/views/{ViewName}/{ViewName}View.tsx`:
   - Receives props of type `ReactBaseViewProps`
   - Must wrap content in a div with class `lovely-bases`

### New view example

```typescript
// src/views/MyView/index.ts
import { ReactBasesView } from "@/lib/view-class";
import type { BaseViewDef } from "@/types";
import MyViewComponent from "./MyViewView";

const MY_VIEW_ID = "my-view";

const MY_VIEW: BaseViewDef = {
	id: MY_VIEW_ID,
	name: "My View",
	icon: "lucide-icon-name",
	factory: (controller, containerEl) =>
		new ReactBasesView(MY_VIEW_ID, MyViewComponent, controller, containerEl),
	options: () => [
		// ViewOption[] - sliders, dropdowns, toggles, properties, groups
	],
};

export default MY_VIEW;
```

```typescript
// src/views/MyView/MyViewView.tsx
import type { ReactBaseViewProps } from "@/types";

const MyViewView = ({ data, isEmbedded }: ReactBaseViewProps) => {
	return (
		<div className="lovely-bases" style={{ height: "100%", width: "100%" }}>
			{/* Content */}
		</div>
	);
};

export default MyViewView;
```

## View Registration

Views are registered in `src/views/index.ts`:

```typescript
import MY_VIEW from "@/views/MyView";

const VIEWS: BaseViewDef[] = [
	// ... other views
	MY_VIEW,
];
```

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

## Path Alias

The project uses `@/*` as alias for `src/*`:

```typescript
import { cn } from "@/lib/utils";
import { useConfigValue } from "@/hooks/use-config-value";
import type { ReactBaseViewProps } from "@/types";
```

## View Options (ViewOption)

Available types for `options()`:

- `dropdown`: Selector with options
- `slider`: Numeric slider control
- `toggle`: Boolean on/off
- `property`: Bases property selector
- `group`: Groups multiple options

```typescript
options: () => [
	{
		type: "dropdown",
		displayName: "Layout",
		key: "layout",
		default: "vertical",
		options: { horizontal: "Horizontal", vertical: "Vertical" },
	},
	{
		type: "slider",
		displayName: "Card size",
		min: 50,
		max: 800,
		key: "cardSize",
		default: 100,
	},
	{
		type: "group",
		displayName: "Image",
		items: [
			{ type: "property", displayName: "Image Property", key: "imageProperty", default: "note.cover" },
			{ type: "toggle", displayName: "Show Image", key: "showImage", default: true },
		],
	},
],
```
