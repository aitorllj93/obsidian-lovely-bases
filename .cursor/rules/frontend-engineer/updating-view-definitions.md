---
description: "This rule provides instruction for updating view definitions and storybook argTypes"
alwaysApply: false
---

## Options Structure in View Definitions

The `options` in view definitions (`BaseViewDef`) should follow these guidelines based on the `HeatmapCalendar` and `LinearCalendar` examples:

### Organization with Groups (Recommended for complex views)

For views with many options, use groups (`type: "group"`) to organize them logically:

```typescript
options: () => [
  {
    type: "group",
    displayName: "Data Properties",
    items: [
      {
        type: "property",
        displayName: "Date Property",
        key: "dateProperty",
      },
      {
        type: "property",
        displayName: "Track Property",
        key: "trackProperty",
      },
      {
        type: "dropdown",
        displayName: "Track Type",
        key: "trackType",
        default: "",
        options: {
          "": "Auto-detect",
          number: "Number",
          boolean: "Boolean (Yes/No)",
        },
      },
    ],
  },
  {
    type: "group",
    displayName: "Display",
    items: [
      {
        type: "dropdown",
        displayName: "Layout",
        key: "layout",
        default: "horizontal",
        options: {
          horizontal: "Horizontal",
          vertical: "Vertical",
        },
      },
      {
        type: "toggle",
        displayName: "Show Labels",
        key: "showLabels",
        default: true,
      },
    ],
  },
]
```

### Simple Organization (For simple views)

For views with few options, you can omit groups and put options directly:

```typescript
options: () => [
  {
    type: "dropdown",
    displayName: "Focus",
    key: "focus",
    default: "full",
    options: {
      full: "Full",
      half: "Half",
      quarter: "Quarter",
    },
  },
  {
    type: "property",
    displayName: "Start Date Property",
    key: "startDateProperty",
    default: "note.created",
  },
  {
    type: "text",
    displayName: "Reference Date (YYYY-MM-DD)",
    key: "date",
    default: "",
    placeholder: "YYYY-MM-DD",
  },
]
```

### Available Item Types

1. **`property`**: Bases property selector
   ```typescript
   {
     type: "property",
     displayName: "Date Property",
     key: "dateProperty",
     default: "note.created", // optional
   }
   ```

2. **`dropdown`**: Selector with predefined options
   ```typescript
   {
     type: "dropdown",
     displayName: "Layout",
     key: "layout",
     default: "horizontal",
     options: {
       horizontal: "Horizontal",
       vertical: "Vertical",
     },
   }
   ```

3. **`toggle`**: Boolean switch
   ```typescript
   {
     type: "toggle",
     displayName: "Show Labels",
     key: "showLabels",
     default: true,
   }
   ```

4. **`text`**: Text field
   ```typescript
   {
     type: "text",
     displayName: "Start Date (YYYY-MM-DD)",
     key: "startDate",
     placeholder: "YYYY-MM-DD", // optional
     default: "", // optional
   }
   ```

5. **`slider`**: Numeric slider control
   ```typescript
   {
     type: "slider",
     displayName: "Min Value",
     key: "minValue",
     default: 0,
     min: 0,
     max: 100,
     step: 1,
   }
   ```

### Common Categories for Groups

- **"Data Properties"**: Properties that define what data to use
- **"Date Range"**: Date range configuration
- **"Display"**: Visualization and layout options
- **"Colors"**: Color and scheme configuration
- **"Value Range"**: Numeric ranges and scales

## argTypes Structure in Stories

The `argTypes` in `.stories.tsx` files should reflect the same organization as `options`:

### With Categories (When using groups)

```typescript
argTypes: {
  // Data Properties
  dateProperty: {
    control: "text",
    name: "Date Property",
    description: "The property used to determine the date of the entry (required).",
    table: {
      category: "Data Properties",
    },
  },
  trackProperty: {
    control: "text",
    name: "Track Property",
    description: "The property used to calculate the intensity (required).",
    table: {
      category: "Data Properties",
    },
  },
  trackType: {
    control: "select",
    name: "Track Type",
    description: "How to interpret the tracked property value.",
    options: ["number", "boolean", "text", "list"],
    table: {
      category: "Data Properties",
    },
  },
  // Display
  layout: {
    control: "select",
    name: "Layout",
    description: "Orientation of the grid.",
    options: ["horizontal", "vertical"],
    table: {
      category: "Display",
      defaultValue: { summary: "horizontal" },
    },
  },
  showLabels: {
    control: "boolean",
    name: "Show Labels",
    table: {
      category: "Display",
      defaultValue: { summary: "true" },
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

### Without Categories (When not using groups)

```typescript
argTypes: {
  focus: {
    control: "select",
    options: ["full", "half", "quarter"],
    name: "Focus",
    description: "The time span to display ('full', 'half', or 'quarter').",
    table: { defaultValue: { summary: "full" } },
  },
  startDateProperty: {
    control: "text",
    name: "Start Date Property",
    description: "The property used for the event's start date (required).",
  },
  endDateProperty: {
    control: "text",
    name: "End Date Property",
    description: "The property used for the event's end date (optional).",
  },
  // Internal props (disabled)
  data: {
    table: {
      disable: true,
    },
  },
}
```

### Control Types in argTypes

- **`"text"`**: For text properties and Bases properties
- **`"select"`**: For dropdowns (must include `options: [...]`)
- **`"boolean"`**: For toggles
- **`"number"`**: For sliders and numeric values
- **`"object"`**: For arrays and complex objects

### argTypes Properties

- **`control`**: Storybook control type (`"text"`, `"select"`, `"boolean"`, `"number"`, `"object"`)
- **`name`**: Human-readable name to display in controls
- **`description`**: Property description (recommended for important properties)
- **`options`**: Array of options for `select` controls
- **`table.category`**: Category for grouping in documentation (should match groups in `options`)
- **`table.defaultValue`**: Default value shown in documentation (`{ summary: "..." }`)
- **`table.disable`**: Disables the property in controls (use for internal props like `data`, `groupedData`, `onEntryClick`)

### Best Practices

1. **Consistency**: Categories in `argTypes` should match groups in `options`
2. **Descriptions**: Include clear descriptions for properties that aren't obvious
3. **Default values**: Specify `defaultValue` in `table` to show default values in documentation
4. **Internal props**: Always disable internal props like `data`, `groupedData`, `onEntryClick`, `onEntryHover` with `table: { disable: true }`
5. **Order**: Keep the same order in `argTypes` as in `options` for easier navigation
6. **Names**: Use descriptive names in `name` that match `displayName` in `options`

## Reference Examples

- **Complex view with groups**: `src/views/HeatmapCalendar/index.ts` and `src/views/HeatmapCalendar/HeatmapCalendarView.stories.tsx`
- **Simple view without groups**: `src/views/LinearCalendar/index.tsx` and `src/views/LinearCalendar/LinearCalendarView.stories.tsx`
