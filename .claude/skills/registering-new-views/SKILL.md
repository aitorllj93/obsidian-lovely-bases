---
name: registering-new-views
description: Interactive skill for creating new Bases Views. Guides through adaptive questioning, then generates all necessary files.
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
   - If images mentioned → ask about `aspectRatio`, `imageFit`, `imageProperty`
   - If dates mentioned → ask about format, range display
   - If text mentioned → ask about truncation

### Level 4 - Layout (adaptive)

5. If mentions "cards", "grid", "list":
   - "Should the size be configurable?" → slider option
   - "Should gap between elements be configurable?" → slider option
   - "Should column count be configurable?" → slider or dropdown
   - "Can we reuse existing Card component?" → use `useCardConfig` hook

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
- src/views/{ViewName}/__fixtures__/configs.ts
- (Optional) src/views/{ViewName}/constants.ts - if many options
- (Optional) src/views/{ViewName}/types.ts - if complex types
- Update src/views/index.ts

**Configuration options**:
| Group | Option | Type | Default |
|-------|--------|------|---------|
| {group} | {option} | {type} | {default} |

**Features**:
- [x/] Uses virtualization
- [x/] Supports entry click
- [x/] Shows images
- [x/] Reuses Card component

Proceed to generate?
```

Wait for user confirmation before generating.

## Phase 3: Generation

Generate ALL these files:

### 1. `src/views/{ViewName}/index.ts`

**Simple view (inline options):**

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

**View reusing Card options:**

```typescript
import { CARD_CONFIG_OPTIONS } from "@/components/Card/constants";
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
		// Add view-specific options first
		...CARD_CONFIG_OPTIONS,
	],
};

export default {VIEW_NAME}_VIEW;
```

**Complex view (options in constants.ts):**

```typescript
import { ReactBasesView } from "@/lib/view-class";
import type { BaseViewDef } from "@/types";

import { {VIEW_NAME}_OPTIONS } from "./constants";
import {ViewName}View from "./{ViewName}View";

const {VIEW_NAME}_ID = "{view-id}";

const {VIEW_NAME}_VIEW: BaseViewDef = {
	id: {VIEW_NAME}_ID,
	name: "{Display Name}",
	icon: "lucide-{icon}",
	factory: (controller, containerEl) =>
		new ReactBasesView({VIEW_NAME}_ID, {ViewName}View, controller, containerEl),
	options: () => {VIEW_NAME}_OPTIONS,
};

export default {VIEW_NAME}_VIEW;
```

### 2. `src/views/{ViewName}/{ViewName}View.tsx`

**Simple view:**

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

**View using Card component:**

```typescript
import { useCardConfig } from "@/components/Card/hooks/use-card-config";
import type { CardConfig } from "@/components/Card/types";
import { Container } from "@/components/Obsidian/Container";
import type { ReactBaseViewProps } from "@/types";

export type {ViewName}Config = CardConfig;

const {ViewName}View = ({
	config,
	data,
	isEmbedded,
}: ReactBaseViewProps) => {
	const cardConfig = useCardConfig(config);

	return (
		<Container isEmbedded={isEmbedded}>
			{/* Use cardConfig for Card-based rendering */}
		</Container>
	);
};

export default {ViewName}View;
```

**View with grouped data:**

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
}: ReactBaseViewProps) => {
	const viewConfig = useConfig<{ViewName}Config>(config, {
		// Default values
	});

	return (
		<Container isEmbedded={isEmbedded} style={{ overflowY: "auto" }}>
			{data.groupedData.map((group) => (
				<YourComponent
					key={group.key?.toString() ?? ""}
					items={group.entries}
					{/* ... */}
				/>
			))}
		</Container>
	);
};

export default {ViewName}View;
```

**View with virtualization:**

```typescript
import { useCardConfig } from "@/components/Card/hooks/use-card-config";
import type { CardConfig } from "@/components/Card/types";
import { Container } from "@/components/Obsidian/Container";
import VirtualGrid from "@/components/VirtualGrid";
import type { ReactBaseViewProps } from "@/types";

export type {ViewName}Config = CardConfig;

const {ViewName}View = ({
	config,
	data,
	isEmbedded,
}: ReactBaseViewProps) => {
	const cardConfig = useCardConfig(config);

	return (
		<Container isEmbedded={isEmbedded} embeddedStyle={{ maxHeight: "60vh", overflowY: "auto" }}>
			<VirtualGrid
				minItemWidth={cardConfig.cardSize}
				cardConfig={cardConfig}
				config={config}
				items={data.data}
				estimateRowHeight={estimatedRowHeight}
			/>
		</Container>
	);
};

export default {ViewName}View;
```

### 3. `src/views/{ViewName}/{ViewName}View.stories.tsx`

**Simple view stories:**

```typescript
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { VIRTUAL_SCROLL_ARTICLES_ENTRIES } from "@/__fixtures__/entries";
import { aBasesEntryGroup } from "@/__mocks__";
import {
	createViewRenderer,
	Providers,
	ViewWrapper,
} from "@/stories/decorators";

import {VIEW_NAME}_VIEW from ".";
import {
	DEFAULT_CONFIG,
	FULL_CONFIG,
} from "./__fixtures__/configs";
import {ViewName}View, { type {ViewName}Config } from "./{ViewName}View";

const View = createViewRenderer<{ViewName}Config>({ViewName}View);

const meta = {
	title: "Views/{Display Name}",
	component: View,
	tags: ["autodocs", "status:testing"],
	decorators: [Providers, ViewWrapper],
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
		...FULL_CONFIG,
	},
};

export const Default: Story = {
	parameters: {
		docs: {
			description: {
				story: "By default, the view displays...",
			},
		},
	},
	args: {
		data: VIRTUAL_SCROLL_ARTICLES_ENTRIES,
		groupedData: [aBasesEntryGroup("", VIRTUAL_SCROLL_ARTICLES_ENTRIES)],
		onEntryClick: fn(),
		...DEFAULT_CONFIG,
	},
};
```

**View with Card component (reuse CardMeta argTypes):**

```typescript
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import {
	VIRTUAL_SCROLL_ARTICLES_ENTRIES,
	VIRTUAL_SCROLL_BOOKS_ENTRIES,
} from "@/__fixtures__/entries";
import CardMeta from "@/components/Card/stories/meta";
import {
	createViewRenderer,
	Providers,
	ScrollViewWrapper,
} from "@/stories/decorators";

import {VIEW_NAME}_VIEW from ".";
import {
	DEFAULT_CONFIG,
	FULL_CONFIG,
	HORIZONTAL_LAYOUT_CONFIG,
	OVERLAY_LAYOUT_CONFIG,
} from "./__fixtures__/configs";
import {ViewName}View, { type {ViewName}Config } from "./{ViewName}View";

const View = createViewRenderer<{ViewName}Config>({ViewName}View);

const meta = {
	title: "Views/{Display Name}",
	component: View,
	tags: ["autodocs", "status:testing"],
	decorators: [Providers, ScrollViewWrapper],
	parameters: {
		layout: "fullscreen",
		docs: {
			icon: {VIEW_NAME}_VIEW.icon,
			subtitle: "{Short description}",
			description: {
				component: `### Features

- **Feature 1**: Description
- **Feature 2**: Description

### Configuration`,
			},
		},
	},
	argTypes: {
		...CardMeta.argTypes,
		// Internal props (disabled)
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
		onEntryClick: fn(),
		...FULL_CONFIG,
	},
};

export const Default: Story = {
	parameters: {
		docs: {
			description: {
				story: "By default, the view displays cards in a vertical layout.",
			},
		},
	},
	args: {
		data: VIRTUAL_SCROLL_BOOKS_ENTRIES,
		onEntryClick: fn(),
		...DEFAULT_CONFIG,
	},
};

// === LAYOUT STORIES ===

export const HorizontalLayout: Story = {
	parameters: {
		docs: {
			description: {
				story: `Horizontal layout displays the image on the side.

\`\`\`yml
layout: horizontal
\`\`\`
`,
			},
		},
	},
	args: {
		data: VIRTUAL_SCROLL_ARTICLES_ENTRIES,
		onEntryClick: fn(),
		...HORIZONTAL_LAYOUT_CONFIG,
	},
};
```

**View with i18n translations:**

```typescript
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { ENTRIES } from "@/__fixtures__/entries";
import { aBasesEntryGroup } from "@/__mocks__";
import { type NamespacedTranslationKey, translate } from "@/lib/i18n";
import {
	createViewRenderer,
	Providers,
	ViewWrapper,
} from "@/stories/decorators";

import {VIEW_NAME}_VIEW from ".";
import { DEFAULT_CONFIG, FULL_CONFIG } from "./__fixtures__/configs";
import {ViewName}View, { type {ViewName}Config } from "./{ViewName}View";

const t = (key: NamespacedTranslationKey<"{viewName}">) =>
	translate("en", "{viewName}", key);

const View = createViewRenderer<{ViewName}Config>({ViewName}View);

const meta = {
	title: "Views/{Display Name}",
	component: View,
	tags: ["autodocs", "status:testing"],
	decorators: [Providers, ViewWrapper],
	parameters: {
		layout: "fullscreen",
		docs: {
			icon: {VIEW_NAME}_VIEW.icon,
			subtitle: "{Description}",
			description: {
				component: `### Features

- **Feature**: Description

### Configuration`,
			},
		},
	},
	argTypes: {
		someProperty: {
			control: "text",
			name: t("options.group.property.title"),
			description: "Description of the property.",
			table: {
				category: t("options.group.title"),
			},
		},
		// Internal props (disabled)
		data: { table: { disable: true } },
		groupedData: { table: { disable: true } },
		onEntryClick: { table: { disable: true } },
	},
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

// ... stories
```

### 4. `src/views/{ViewName}/__fixtures__/configs.ts`

**Single file for all configs (preferred pattern):**

```typescript
import type { {ViewName}Config } from "../{ViewName}View";

export const DEFAULT_CONFIG: {ViewName}Config = {
	// Minimal config - only required options or most common defaults
};

export const FULL_CONFIG: {ViewName}Config = {
	...DEFAULT_CONFIG,
	// Complete config with all options explicitly set
};

// Additional configs for specific stories
export const SOME_VARIANT_CONFIG: {ViewName}Config = {
	...DEFAULT_CONFIG,
	// Variant-specific overrides
};
```

**Config using Card defaults:**

```typescript
import { DEFAULTS as CARD_DEFAULTS } from "@/components/Card/constants";
import type { {ViewName}Config } from "../{ViewName}View";

export const DEFAULT_CONFIG: {ViewName}Config = {
	...CARD_DEFAULTS,
	properties: ["note.author"],
};

export const FULL_CONFIG: {ViewName}Config = {
	...DEFAULT_CONFIG,
	layout: "horizontal",
	cardSize: 400,
	imageProperty: "formula.image",
	// ... all other options
};

export const HORIZONTAL_LAYOUT_CONFIG: {ViewName}Config = {
	...CARD_DEFAULTS,
	layout: "horizontal",
	// ...
};

export const OVERLAY_LAYOUT_CONFIG: {ViewName}Config = {
	layout: "overlay",
	overlayContentVisibility: "always",
	// ...
};
```

### 5. (Optional) `src/views/{ViewName}/constants.ts`

**For complex views with many options:**

```typescript
import type { ViewOption } from "obsidian";
import { detectLocale, type NamespacedTranslationKey, translate } from "@/lib/i18n";
import type { {ViewName}Config } from "./types";

const locale = detectLocale();
const t = (key: NamespacedTranslationKey<"{viewName}">) => translate(locale, "{viewName}", key);

export const DEFAULTS: {ViewName}Config = {
	/* Group 1 */
	option1: "default",
	option2: undefined,
	/* Group 2 */
	option3: true,
};

export const {VIEW_NAME}_OPTIONS: ViewOption[] = [
	{
		type: "group",
		displayName: t("options.group1.title"),
		items: [
			{
				type: "dropdown",
				displayName: t("options.group1.option1.title"),
				key: "option1",
				default: DEFAULTS.option1,
				options: {
					value1: t("options.group1.option1.value1"),
					value2: t("options.group1.option1.value2"),
				},
			},
			{
				type: "property",
				displayName: t("options.group1.option2.title"),
				key: "option2",
				default: DEFAULTS.option2,
			},
		],
	},
	{
		type: "group",
		displayName: t("options.group2.title"),
		items: [
			{
				type: "toggle",
				displayName: t("options.group2.option3.title"),
				key: "option3",
				default: DEFAULTS.option3,
			},
		],
	},
];
```

### 6. (Optional) `src/views/{ViewName}/types.ts`

**For complex type definitions:**

```typescript
import type { BasesPropertyId } from "obsidian";

export type {ViewName}Config = {
	someProperty: BasesPropertyId;
	anotherProperty?: BasesPropertyId;
	layout?: "horizontal" | "vertical";
	showLabels?: boolean;
	minValue?: number;
	maxValue?: number;
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
│   ✓ Options defined (inline or from constants.ts)

├── src/views/{ViewName}/{ViewName}View.tsx
│   ✓ Imports Container
│   ✓ Uses useConfig or useCardConfig
│   ✓ Props typed as ReactBaseViewProps

├── src/views/{ViewName}/{ViewName}View.stories.tsx
│   ✓ Uses createViewRenderer
│   ✓ Has Providers decorator
│   ✓ Has ViewWrapper or ScrollViewWrapper decorator
│   ✓ FullExample is first story
│   ✓ Uses CardMeta.argTypes if Card-based

├── src/views/{ViewName}/__fixtures__/configs.ts
│   ✓ Exports DEFAULT_CONFIG
│   ✓ Exports FULL_CONFIG
│   ✓ Additional variant configs as needed

├── (Optional) src/views/{ViewName}/constants.ts
│   ✓ Exports DEFAULTS
│   ✓ Exports {VIEW_NAME}_OPTIONS

├── (Optional) src/views/{ViewName}/types.ts
│   ✓ Exports {ViewName}Config type

└── src/views/index.ts
    ✓ View imported
    ✓ Added to VIEWS array

View "{ViewName}" created successfully.
```

## View Options Reference

| Type | Properties | Example |
|------|------------|---------|
| `text` | `displayName`, `key`, `default`, `placeholder?` | Title input |
| `dropdown` | `displayName`, `key`, `default`, `options: Record<string,string>`, `shouldHide?` | Layout selector |
| `slider` | `displayName`, `key`, `default`, `min`, `max`, `step`, `shouldHide?` | Card size |
| `toggle` | `displayName`, `key`, `default`, `shouldHide?` | Show/hide title |
| `property` | `displayName`, `key`, `default`, `shouldHide?` | Image property picker |
| `group` | `displayName`, `items: ViewOption[]`, `shouldHide?` | Group related options |

### Option Example with Conditional Visibility

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
					overlay: "Overlay",
				},
			},
			{
				type: "dropdown",
				displayName: "Content Visibility",
				key: "overlayContentVisibility",
				default: "always",
				// Only show when layout is "overlay"
				shouldHide: (config) => config.get("layout") !== "overlay",
				options: {
					always: "Always",
					hover: "On Hover",
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
				key: "imageProperty",
				default: undefined,
			},
			{
				type: "slider",
				displayName: "Aspect Ratio",
				key: "imageAspectRatio",
				default: 1.5,
				min: 0.25,
				max: 2.5,
				step: 0.05,
				// Only show when imageProperty is set
				shouldHide: (config) => config.get("imageProperty") === undefined,
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

// For Card-based views
import { CARD_CONFIG_OPTIONS } from "@/components/Card/constants";

// React component ({ViewName}View.tsx)
import { Container } from "@/components/Obsidian/Container";
import { useConfig } from "@/hooks/use-config";
import type { ReactBaseViewProps } from "@/types";

// For Card-based views
import { useCardConfig } from "@/components/Card/hooks/use-card-config";
import type { CardConfig } from "@/components/Card/types";

// For virtualized views
import VirtualGrid from "@/components/VirtualGrid";

// Stories ({ViewName}View.stories.tsx)
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";
import { VIRTUAL_SCROLL_ARTICLES_ENTRIES } from "@/__fixtures__/entries";
import { aBasesEntryGroup } from "@/__mocks__";
import { createViewRenderer, Providers, ViewWrapper, ScrollViewWrapper } from "@/stories/decorators";

// For Card-based stories
import CardMeta from "@/components/Card/stories/meta";

// For i18n in constants.ts
import { detectLocale, type NamespacedTranslationKey, translate } from "@/lib/i18n";
import type { ViewOption } from "obsidian";
```

## Container Props Reference

The `Container` component accepts these props for styling:

```typescript
// Basic usage
<Container isEmbedded={isEmbedded}>

// With inline style
<Container isEmbedded={isEmbedded} style={{ overflowY: "auto" }}>

// With embedded-specific style (applies only when embedded)
<Container isEmbedded={isEmbedded} embeddedStyle={{ maxHeight: "60vh", overflowY: "auto" }}>

// Disable user selection
<Container isEmbedded={isEmbedded} style={{ userSelect: "none" }}>
```

## Decorator Selection

Choose the appropriate decorator based on view type:

| Decorator | Use Case |
|-----------|----------|
| `ViewWrapper` | Standard views, grouped data views |
| `ScrollViewWrapper` | Virtualized views, long scrollable lists |

## Story Tags Reference

| Tag | Meaning |
|-----|---------|
| `autodocs` | Auto-generate documentation |
| `status:testing` | View is in testing phase |
| `status:stable` | View is stable and production-ready |
| `experimental` | Experimental feature (deprecated, use `status:testing`) |
