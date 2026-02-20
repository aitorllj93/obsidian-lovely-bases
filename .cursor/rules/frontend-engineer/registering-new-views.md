---
description: Interactive skill for creating new Bases Views. Guides through adaptive questioning, then generates all necessary files.
alwaysApply: false
---

# Creating New Views

This skill guides you through creating a new Bases View with all required files.

## Process Overview

```
Discovery → Confirmation → Generation → Verification
```

## Phase 1: Discovery - Ask These Questions Adaptively

Start with basic questions, then deepen based on responses.

### Level 1 - Basic (always ask)

1. **Name**: "What should this view be called?"
   - Derive: `id` (kebab-case), `ViewName` (PascalCase), filenames

2. **Purpose**: "What does this view do in one sentence?"
   - Use this to infer what options might be needed

### Level 2 - Visual (always ask)

3. **Icon**: "What icon represents this view?"
   - Suggest based on description or ask for lucide icon name
   - Format: `lucide-{icon-name}`

### Level 3 - Data (adaptive)

4. **Properties**: "What entry properties does it need to display?"
   - If images mentioned → ask about `aspectRatio`, `mediaFit`, `mediaProperty`
   - If dates mentioned → ask about format, range display
   - If text mentioned → ask about truncation

### Level 4 - Layout (adaptive)

5. If mentions "cards", "grid", "list":
   - "Should the size be configurable?" → slider option
   - "Should gap between elements be configurable?" → slider option
   - "Should column count be configurable?" → slider or dropdown

### Level 5 - Interaction (adaptive)

6. If likely to have many elements:
   - "Does it need virtualization for performance with long lists?"

7. If has clickable elements:
   - Confirm will use `onEntryClick` handler

### Level 6 - Additional (adaptive)

8. "Any other configuration option the user should have?"

## Phase 2: Confirmation

Before generating, present this summary:

```markdown
## View Summary

**Name**: {ViewName}
**ID**: {view-id}
**Icon**: lucide-{icon}
**Description**: {description}

**Files to generate**:
- src/views/{ViewName}/index.ts
- src/views/{ViewName}/{ViewName}View.tsx
- src/views/{ViewName}/{ViewName}View.stories.tsx
- src/views/{ViewName}/__fixtures__/configs/index.ts
- src/views/{ViewName}/__fixtures__/configs/default.ts
- src/views/{ViewName}/__fixtures__/configs/full.ts
- Update src/views/index.ts

**Configuration options**:
| Group | Option | Type | Default |
|-------|--------|------|---------|
| {group} | {option} | {type} | {default} |

**Features**:
- [x/] Uses virtualization
- [x/] Supports entry click
- [x/] Shows images

Proceed to generate?
```

Wait for user confirmation before generating.

## Phase 3: Generation

Generate ALL these files:

### 1. `src/views/{ViewName}/index.ts`

```typescript
import { ReactBasesView } from "@/lib/view-class";
import type { BaseViewDef } from "@/types";
import {ViewName}View from "./{ViewName}View";

const {VIEW_NAME}_ID = "{view-id}";

const {VIEW_NAME}_VIEW: BaseViewDef = {
	id: {VIEW_NAME}_ID,
	name: "{Display Name}",
	icon: "lucide-{icon}",
	factory: (controller, containerEl) =>
		new ReactBasesView({VIEW_NAME}_ID, {ViewName}View, controller, containerEl),
	options: () => [
		{
			type: "group",
			displayName: "{GroupName}",
			items: [
				// Options go here based on conversation
			],
		},
	],
};

export default {VIEW_NAME}_VIEW;
```

### 2. `src/views/{ViewName}/{ViewName}View.tsx`

```typescript
import { Container } from "@/components/Obsidian/Container";
import { useConfig } from "@/hooks/use-config";
import type { ReactBaseViewProps } from "@/types";

export type {ViewName}Config = {
	// Type each config option
};

const {ViewName}View = ({
	config,
	data,
	isEmbedded,
	onEntryClick,
	onEntryHover,
}: ReactBaseViewProps) => {
	const viewConfig = useConfig<{ViewName}Config>(config, {
		// Default values for each option
	});

	return (
		<Container isEmbedded={isEmbedded}>
			{/* Implement view content */}
		</Container>
	);
};

export default {ViewName}View;
```

### 3. `src/views/{ViewName}/{ViewName}View.stories.tsx`

```typescript
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { VIRTUAL_SCROLL_ARTICLES_ENTRIES } from "@/__fixtures__/entries";
import { aBasesEntryGroup } from "@/__mocks__";
import {
	createViewRenderer,
	Providers,
	ScrollViewWrapper,
} from "@/stories/decorators";

import {VIEW_NAME}_VIEW from ".";
import {
	DEFAULT_BASE_CONFIG,
	FULL_BASE_CONFIG,
} from "./__fixtures__/configs";
import {ViewName}View, { type {ViewName}Config } from "./{ViewName}View";

const View = createViewRenderer<{ViewName}Config>({ViewName}View);

const meta = {
	title: "Views/{Display Name}",
	component: View,
	tags: ["autodocs", "experimental"],
  decorators: [ScrollViewWrapper, Providers],
	parameters: {
		layout: "fullscreen",
		docs: {
			icon: {VIEW_NAME}_VIEW.icon,
			subtitle: "{Short description from conversation}",
			description: {
				component: `### Features

{List key features based on conversation}

### Configuration`,
			},
		},
	},
	argTypes: {
		// Generate argTypes for each config option
		// Example:
		// cardSize: {
		//   control: { type: "range", min: 50, max: 800, step: 10 },
		//   name: "Card Size",
		//   description: "The size of the cards.",
		//   table: {
		//     category: "Layout",
		//     defaultValue: { summary: "200" },
		//   },
		// },
		data: { table: { disable: true } },
		groupedData: { table: { disable: true } },
		onEntryClick: { table: { disable: true } },
		onEntryHover: { table: { disable: true } },
	},
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FullExample: Story = {
	args: {
		data: VIRTUAL_SCROLL_ARTICLES_ENTRIES,
		groupedData: [aBasesEntryGroup("", VIRTUAL_SCROLL_ARTICLES_ENTRIES)],
		onEntryClick: fn(),
		...FULL_BASE_CONFIG,
	},
};

export const Default: Story = {
	args: {
		data: VIRTUAL_SCROLL_ARTICLES_ENTRIES,
		groupedData: [aBasesEntryGroup("", VIRTUAL_SCROLL_ARTICLES_ENTRIES)],
		onEntryClick: fn(),
		...DEFAULT_BASE_CONFIG,
	},
};
```

### 4. `src/views/{ViewName}/__fixtures__/configs/index.ts`

```typescript
export { DEFAULT_BASE_CONFIG } from "./default";
export { FULL_BASE_CONFIG } from "./full";
```

### 5. `src/views/{ViewName}/__fixtures__/configs/default.ts`

```typescript
import type { {ViewName}Config } from "../../{ViewName}View";

export const DEFAULT_BASE_CONFIG: {ViewName}Config = {
	// Minimal config - only required options or most common defaults
};
```

### 6. `src/views/{ViewName}/__fixtures__/configs/full.ts`

```typescript
import type { {ViewName}Config } from "../../{ViewName}View";

export const FULL_BASE_CONFIG: {ViewName}Config = {
	// Complete config with all options explicitly set
};
```

### 7. Update `src/views/index.ts`

Add import and register in VIEWS array:

```typescript
import {VIEW_NAME}_VIEW from "@/views/{ViewName}";

export const VIEWS: BaseViewDef[] = [
	// ... existing views
	{VIEW_NAME}_VIEW,
];
```

## Phase 4: Verification

After generating, verify all files:

```
Verifying generated files...

├── src/views/{ViewName}/index.ts
│   ✓ Exports BaseViewDef
│   ✓ Factory uses ReactBasesView
│   ✓ Options defined

├── src/views/{ViewName}/{ViewName}View.tsx
│   ✓ Imports Container
│   ✓ Uses useConfig with type
│   ✓ Props typed as ReactBaseViewProps

├── src/views/{ViewName}/{ViewName}View.stories.tsx
│   ✓ Uses createViewRenderer
│   ✓ Has Providers, ScrollViewWrapper decorators
│   ✓ FullExample is first story

├── src/views/{ViewName}/__fixtures__/configs/
│   ✓ index.ts exports configs
│   ✓ default.ts exists
│   ✓ full.ts exists

└── src/views/index.ts
    ✓ View imported
    ✓ Added to VIEWS array

View "{ViewName}" created successfully.
```

## View Options Reference

| Type | Properties | Example |
|------|------------|---------|
| `text` | `displayName`, `key`, `default` | Title input |
| `dropdown` | `displayName`, `key`, `default`, `options: Record<string,string>` | Layout selector |
| `slider` | `displayName`, `key`, `default`, `min`, `max`, `step` | Card size |
| `toggle` | `displayName`, `key`, `default` | Show/hide title |
| `property` | `displayName`, `key`, `default` | Image property picker |
| `group` | `displayName`, `items: ViewOption[]` | Group related options |

### Option Example

```typescript
options: () => [
	{
		type: "group",
		displayName: "Layout",
		items: [
			{
				type: "slider",
				displayName: "Card Size",
				key: "cardSize",
				default: 200,
				min: 50,
				max: 800,
				step: 10,
			},
			{
				type: "dropdown",
				displayName: "Layout",
				key: "layout",
				default: "vertical",
				options: {
					horizontal: "Horizontal",
					vertical: "Vertical",
				},
			},
		],
	},
	{
		type: "group",
		displayName: "Image",
		items: [
			{
				type: "property",
				displayName: "Image Property",
				key: "mediaProperty",
			},
			{
				type: "toggle",
				displayName: "Show Image",
				key: "showImage",
				default: true,
			},
		],
	},
],
```

## Key Imports Quick Reference

```typescript
// View definition (index.ts)
import { ReactBasesView } from "@/lib/view-class";
import type { BaseViewDef } from "@/types";

// React component ({ViewName}View.tsx)
import { Container } from "@/components/Obsidian/Container";
import { useConfig } from "@/hooks/use-config";
import type { ReactBaseViewProps } from "@/types";

// Stories ({ViewName}View.stories.tsx)
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { VIRTUAL_SCROLL_ARTICLES_ENTRIES } from "@/__fixtures__/entries";
import { aBasesEntryGroup } from "@/__mocks__";
import { createViewRenderer, Providers, ScrollViewWrapper } from "@/stories/decorators";
```
