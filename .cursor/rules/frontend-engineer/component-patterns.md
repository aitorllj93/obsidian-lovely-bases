---
description: "This rule provides common React patterns to apply to the components"
alwaysApply: false
---

# React Patterns

React patterns and conventions specific to this project.

## Component Memoization

Components receiving `entryId` should use `memo()` with custom comparator to avoid unnecessary re-renders:

```typescript
import { memo } from "react";

const MyComponent = memo(
	({ entryId, className }: Props) => {
		// ...
	},
	(prevProps, nextProps) => {
		return (
			prevProps.entryId === nextProps.entryId &&
			prevProps.className === nextProps.className
		);
	},
);

MyComponent.displayName = "MyComponent";

export default MyComponent;
```

## Custom Hooks

### Location and naming

Place Obsidian-related or reusable hooks in `src/hooks`. For component hooks, place them in `src/components/{component}/hooks`.

- File: `src/hooks/use-{name}.ts`
- Naming: `use{NameInCamelCase}`


## Event Handlers

Name handlers with `handle` prefix:

```typescript
import type { KeyboardEvent, PointerEvent } from 'react';

const handleClick = () => { /* ... */ };
const handleKeyDown = (e: KeyboardEvent) => { /* ... */ };
const handlePointerDown = (e: PointerEvent) => { /* ... */ };
const handleMouseEnter = () => { /* ... */ };
const handleMouseLeave = () => { /* ... */ };
```

## Refs

Use refs for things like:

- Elements needing measurement (`useElementWidth`)
- Links for Obsidian preview (`useEntryHover`)
- Drag positions (`dragStartPos`)

```typescript
const linkRef = useRef<HTMLAnchorElement>(null);
const scrollRef = useRef<HTMLDivElement>(null);
const dragStartPos = useRef<{ x: number; y: number } | null>(null);
```

## Virtualization

For long lists, use `@tanstack/react-virtual`:

```typescript
import { useVirtualizer } from "@tanstack/react-virtual";

const virtualizer = useVirtualizer({
	count: rows.length,
	getScrollElement: () => scrollRef.current,
	estimateSize: () => estimatedRowHeight,
	overscan: 6,
	gap,
});
```

## State Components

Handle hover/active states locally:

```typescript
const [isHovered, setIsHovered] = useState(false);

return (
	<div
		onMouseEnter={() => setIsHovered(true)}
		onMouseLeave={() => setIsHovered(false)}
	>
		{isHovered && <HoverOverlay />}
	</div>
);
```
