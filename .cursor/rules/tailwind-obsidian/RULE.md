---
alwaysApply: true
---

# Tailwind CSS + Obsidian Integration

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

## Scoping Class

**IMPORTANT**: The root container of each view must have the `lovely-bases` class:

```tsx
const MyView = () => {
	return (
		<div className="lovely-bases" style={{ width: "100%"; height: "100%"; }}>
			{/* Content */}
		</div>
	);
};
```

This ensures plugin styles don't affect other parts of Obsidian.

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

## Formatting with Biome

### Configuration

- **Indentation**: Spaces
- **Quotes**: Double (`"`)
- **Imports**: Auto-organized

## Common Style Patterns

### Card

```tsx
<div className="bg-(--bases-cards-background) rounded shadow-md overflow-hidden transition-shadow hover:shadow-lg cursor-pointer border border-border" />
```

### Responsive grid

```tsx
<div
	style={{
		display: "grid",
		gridTemplateColumns: `repeat(${columnCount}, minmax(0, 1fr))`,
		gap: 16,
	}}
/>
```

### Embed states

```tsx
<div
	style={{
		height: "100%",
		width: "100%",
		...(isEmbedded ? { maxHeight: "60vh" } : {}),
	}}
/>
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
