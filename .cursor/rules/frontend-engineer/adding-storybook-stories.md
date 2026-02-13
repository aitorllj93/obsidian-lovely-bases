---
description: "This rule provides instructions and good practices to for creating Storybook stories for Views"
alwaysApply: false
---

This document outlines best practices for creating Storybook stories for Views, based on the patterns established in `HeatmapCalendarView.stories.tsx` and `LinearCalendarView.stories.tsx`.

## File Structure

### File Naming
- Story files should be named `{ViewName}View.stories.tsx`
- Place stories in the same directory as the view component: `src/views/{ViewName}/{ViewName}View.stories.tsx`

### Fixtures Organization
- Create a `__fixtures__/configs/` directory within the view directory
- Export configuration objects from `__fixtures__/configs/{view-name}.ts` or `__fixtures__/configs/index.ts`
- Use descriptive names for config exports: `DEFAULT_BASE_CONFIG`, `FULL_BASE_CONFIG`, `{FEATURE}_BASE_CONFIG`

## Imports

### Import Order
1. Storybook types and utilities
2. Entry fixtures from `@/__fixtures__/entries`
3. Mock helpers from `@/__mocks__`
4. Story decorators from `@/stories/decorators`
5. View constant (e.g., `HEATMAP_CALENDAR_VIEW`) from the index
6. Config fixtures from `./__fixtures__/configs`
7. View component and config type

### Example Structure
```typescript
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { OCCURRENCES } from "@/__fixtures__/entries";
import { aBasesEntryGroup } from "@/__mocks__";
import {
  createViewRenderer,
  Providers,
  ViewWrapper,
} from "@/stories/decorators";

import HEATMAP_CALENDAR_VIEW from ".";
import {
  DEFAULT_BASE_CONFIG,
  FULL_BASE_CONFIG,
} from "./__fixtures__/configs";
import HeatmapCalendarView, {
  type HeatmapCalendarConfig,
} from "./HeatmapCalendarView";
```

## Meta Configuration

### Required Structure
```typescript
const View = createViewRenderer<ViewConfig>(ViewComponent);

const meta = {
  title: "Views/{View Name}",
  component: View,
  tags: ["autodocs"], // Add "status:testing" if needed
  decorators: [ViewWrapper, Providers],
  parameters: {
    layout: 'fullscreen',
    docs: {
      icon: VIEW_CONSTANT.icon,
      subtitle: "A concise, one-line description of what the view does and its use case.",
      description: {
        component: `### Features

- **Feature Name**: Description of the feature.
- **Another Feature**: Description of another feature.

### Configuration`,
      },
    },
  },
  argTypes: {
    // ... argTypes configuration
  },
} satisfies Meta<typeof View>;
```

### Title Format
- Use `"Views/{View Name}"` format
- Capitalize each word in the view name (e.g., "Heatmap Calendar", "Linear Calendar")

### Tags
- Always include `"autodocs"` for automatic documentation generation
- Add `"status:testing"` if the view is under active testing
- Add `"experimental"` for experimental features

### Decorators
- Use `[Providers, ViewWrapper]` for standard views
- Use `[Providers, ScrollViewWrapper]` for views that require scrolling (e.g., FacetCards)

### Documentation
- **Subtitle**: One-line description ending with a use case (e.g., "perfect for habit tracking")
- **Features**: Use bullet points with bold feature names followed by descriptions
- **Configuration**: Always end with `### Configuration` heading

## ArgTypes Configuration

### Organization
Group argTypes by logical categories using comments and `table.category`:

```typescript
argTypes: {
  // Data Properties
  dateProperty: {
    control: "text",
    name: "Date Property",
    description: "The property used to determine the date (required).",
    table: {
      category: "Data Properties",
    },
  },

  // Display
  layout: {
    control: "select",
    name: "Layout",
    description: "Orientation of the component.",
    options: ["horizontal", "vertical"],
    table: {
      category: "Display",
      defaultValue: { summary: "horizontal" },
    },
  },

  // Internal props (disabled)
  data: {
    table: {
      disable: true,
    },
  },
  groupedData: {
    table: {
      disable: true,
    },
  },
  onEntryClick: {
    table: {
      disable: true,
    },
  },
}
```

### Control Types
- `"text"` for string properties
- `"select"` for enum-like properties (always provide `options`)
- `"boolean"` for boolean properties
- `"number"` for numeric properties
- `"object"` for complex objects (e.g., arrays, custom objects)

### Naming
- Use descriptive `name` values with proper capitalization
- Use clear `description` values explaining what the property does
- Indicate if a property is required or optional in the description

### Default Values
- Always include `table.defaultValue` when applicable
- Use `{ summary: "value" }` format for display in Storybook docs

### Disabling Internal Props
- Always disable internal props: `data`, `groupedData`, `onEntryClick`, `onEntryHover`
- Use `table: { disable: true }` to hide them from controls

## Story Structure

### Story Type Definition
```typescript
type Story = StoryObj<typeof meta>;
```

### Required Stories

#### 1. FullExample
Showcase all features with comprehensive configuration:
```typescript
export const FullExample: Story = {
  args: {
    data: ENTRIES,
    groupedData: [aBasesEntryGroup('', GROUPED_ENTRIES)],
    onEntryClick: fn(),
    ...FULL_BASE_CONFIG,
  },
};
```

#### 2. Default
Show the default behavior with a description:
```typescript
export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "By default, the view displays [description of default behavior].",
      },
    }
  },
  args: {
    data: ENTRIES,
    groupedData: [aBasesEntryGroup('', ENTRIES)],
    onEntryClick: fn(),
    ...DEFAULT_BASE_CONFIG,
  },
};
```

### Feature-Specific Stories
Create stories for each major feature or configuration option:

```typescript
export const FeatureName: Story = {
  parameters: {
    docs: {
      description: {
        story: `Description of what this story demonstrates.

\`\`\`yml
propertyName: value
anotherProperty: value
\`\`\`
`,
      },
    }
  },
  args: {
    data: ENTRIES,
    groupedData: [aBasesEntryGroup('', ENTRIES)],
    onEntryClick: fn(),
    ...FEATURE_CONFIG,
  },
};
```

### Story Naming Conventions
- Use PascalCase: `CustomDuration`, `ReverseColors`, `VerticalLayout`
- Use descriptive names that indicate what the story demonstrates
- Group related stories with section comments: `// === LAYOUT STORIES ===`

### Story Descriptions
- Always include `parameters.docs.description.story`
- Use markdown formatting for readability
- Include YAML code examples showing relevant configuration
- Use backticks for inline code: `` `propertyName` ``
- Use triple backticks with `yml` for code blocks

### Code Examples in Descriptions
- Use YAML format (`.yml`) for configuration examples
- Show actual property values from the config
- For dates, use formatted values: `${global.moment(config.date).format('YYYY-MM-DD')}`
- Keep examples concise and focused on the story's purpose

### Story Args Pattern
Always follow this pattern:
```typescript
args: {
  data: ENTRIES, // or appropriate fixture
  groupedData: [aBasesEntryGroup('', ENTRIES)], // or grouped entries
  onEntryClick: fn(), // always use fn() from storybook/test
  ...CONFIG_FIXTURE, // spread the config fixture
}
```

## Data Fixtures

### Entry Data
- Import entry fixtures from `@/__fixtures__/entries`
- Use appropriate fixtures for the view (e.g., `OCCURRENCES` for calendar views, `PLANS_ENTRIES` for timeline views)

### Grouped Data
- Use `aBasesEntryGroup('', entries)` for single groups
- Use `GROUPED_ENTRIES[index].entries` when testing grouping features
- Pass empty string `''` as the first argument for unnamed groups

### Event Handlers
- Always use `fn()` from `storybook/test` for `onEntryClick`
- Use `fn()` for `onEntryHover` if the view supports it

## Configuration Fixtures

### Naming Conventions
- `DEFAULT_BASE_CONFIG`: Minimal, default configuration
- `FULL_BASE_CONFIG`: Comprehensive configuration showing all features
- `{FEATURE}_BASE_CONFIG`: Configuration highlighting a specific feature
  - Examples: `VERTICAL_LAYOUT_CONFIG`, `CUSTOM_COLORS_CONFIG`, `BOOLEAN_TRACKING_CONFIG`

### Export Pattern
```typescript
// In __fixtures__/configs/{view-name}.ts
export const DEFAULT_BASE_CONFIG = {
  dateProperty: "date",
  // ... minimal required properties
} satisfies Partial<ViewConfig>;

export const FULL_BASE_CONFIG = {
  ...DEFAULT_BASE_CONFIG,
  // ... additional properties showing all features
} satisfies Partial<ViewConfig>;
```

## Best Practices Summary

1. **Consistency**: Follow the established patterns from existing stories
2. **Documentation**: Always include clear descriptions and code examples
3. **Organization**: Group related stories with section comments
4. **Naming**: Use descriptive, PascalCase names for stories
5. **Fixtures**: Reuse configuration fixtures rather than inline configs
6. **Completeness**: Include `FullExample` and `Default` stories at minimum
7. **Accessibility**: Ensure all stories use proper decorators and data structures
8. **Testing**: Use `fn()` for event handlers to enable interaction testing

## Example: Complete Story File Structure

```typescript
import type { Meta, StoryObj } from "@storybook/react-vite";
import { fn } from "storybook/test";

import { ENTRIES } from "@/__fixtures__/entries";
import { aBasesEntryGroup } from "@/__mocks__";
import {
  createViewRenderer,
  Providers,
  ViewWrapper,
} from "@/stories/decorators";

import VIEW_CONSTANT from ".";
import {
  DEFAULT_BASE_CONFIG,
  FULL_BASE_CONFIG,
  FEATURE_CONFIG,
} from "./__fixtures__/configs";
import ViewComponent, {
  type ViewConfig,
} from "./ViewComponent";

const View = createViewRenderer<ViewConfig>(ViewComponent);

const meta = {
  title: "Views/View Name",
  component: View,
  tags: ["autodocs"],
  decorators: [ViewWrapper, Providers],
  parameters: {
    layout: 'fullscreen',
    docs: {
      icon: VIEW_CONSTANT.icon,
      subtitle: "Description ending with use case.",
      description: {
        component: `### Features

- **Feature**: Description.

### Configuration`,
      },
    },
  },
  argTypes: {
    // ... organized argTypes
  },
} satisfies Meta<typeof View>;

export default meta;

type Story = StoryObj<typeof meta>;

export const FullExample: Story = {
  args: {
    data: ENTRIES,
    groupedData: [aBasesEntryGroup('', ENTRIES)],
    onEntryClick: fn(),
    ...FULL_BASE_CONFIG,
  },
};

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story: "Default behavior description.",
      },
    }
  },
  args: {
    data: ENTRIES,
    groupedData: [aBasesEntryGroup('', ENTRIES)],
    onEntryClick: fn(),
    ...DEFAULT_BASE_CONFIG,
  },
};

export const FeatureStory: Story = {
  parameters: {
    docs: {
      description: {
        story: `Feature description.

\`\`\`yml
property: value
\`\`\`
`,
      },
    }
  },
  args: {
    data: ENTRIES,
    groupedData: [aBasesEntryGroup('', ENTRIES)],
    onEntryClick: fn(),
    ...FEATURE_CONFIG,
  },
};
```
