---
description: "This rule provides instruction for registering new views in the Obsidian plugin"
alwaysApply: false
---

# Registering new Views

This project allows to extend "Bases Views" with custom visual views.

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

**IMPORTANT**: The root container of each view must have the Container component. This ensures plugin styles don't affect other parts of Obsidian.

```typescript
// src/views/MyView/MyViewView.tsx
import { Container } from "@/components/Obsidian/Container";
import MyComponent from "@/components/MyComponent";
import { useConfig } from "@/hooks/use-config";
import type { ReactBaseViewProps } from "@/types";

export type MyViewConfig = {
  aspectRatio: number;
}

const MyViewView = ({ config, data, isEmbedded }: ReactBaseViewProps) => {
  const viewConfig = useConfig<MyViewConfig>(config, {
    aspectRatio: 1.5
  });

	return (
		<Container isEmbedded={isEmbedded}>
      <MyComponent data={data.data} myComponentConfig={viewConfig} />
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
