---
description: "This rule provides styling instructions to apply to the components"
alwaysApply: false
---

Guide for styling with Tailwind CSS v4 integrated with Obsidian variables.

## CSS Configuration

The `src/main.css` file defines the integration:

```css
@layer theme, base, components, utilities;
@import "tailwindcss/theme" layer(theme);
@import "tailwindcss/utilities" layer(utilities);
```

## Obsidian CSS Variables

Obsidian variables are mapped to semantic variables (mostly shadcn ones):

| Tailwind Variable | Obsidian Variable |
|-------------------|-------------------|
| `--background` | `--background-primary` |
| `--foreground` | `--text-normal` |
| `--card` | `--background-secondary` |
| `--muted` | `--color-base-20` |
| `--muted-foreground` | `--text-muted` |
| `--primary` | `--interactive-accent` |
| `--border` | `--background-modifier-border` |

### Usage in classes

```tsx
<div className="bg-background text-foreground border-border">
<div className="bg-card text-muted-foreground">
<button className="bg-primary text-primary-foreground">
```

## Palette Colors

Obsidian colors available (prefixed with `palette-` to avoid collisions):

```tsx
<div className="bg-palette-red" />
<div className="bg-palette-orange" />
<div className="bg-palette-yellow" />
<div className="bg-palette-green" />
<div className="bg-palette-cyan" />
<div className="bg-palette-blue" />
<div className="bg-palette-purple" />
<div className="bg-palette-magenta" />
```

## Typography

Fonts mapped from Obsidian:

```tsx
<p className="font-sans">Normal text (--font-text)</p>
<p className="font-serif">Serif text (--font-text)</p>
<code className="font-mono">Code (--font-monospace)</code>
```

## Class Merging with cn()

Use `cn()` from `@/lib/utils` to combine classes conditionally:

```typescript
import { cn } from "@/lib/utils";

<div className={cn(
	"base-classes flex items-center",
	isActive && "bg-primary",
	variant === "large" && "text-lg",
	className,
)} />
```
## Class Variance Authority (CVA)

For component variants, use `class-variance-authority`:

```typescript
import { cva } from "class-variance-authority";

const buttonVariants = cva(
	"inline-flex items-center justify-center rounded-md",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground",
				outline: "border border-input bg-background",
			},
			size: {
				default: "h-10 px-4 py-2",
				sm: "h-9 px-3",
				lg: "h-11 px-8",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);
```

## Formatting with Biome

### Configuration

- **Indentation**: Spaces
- **Quotes**: Double (`"`)
- **Imports**: Auto-organized
