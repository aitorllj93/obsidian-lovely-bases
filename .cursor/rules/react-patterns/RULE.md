---
alwaysApply: true
---

# React Patterns for Lovely Bases

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

- Location: `src/hooks/use-{name}.ts`
- Naming: `use{NameInCamelCase}`

### Available hooks

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

## Contexts

### Available contexts

| Context | Provider | Hook | Purpose |
|---------|----------|------|---------|
| App | `AppProvider` | `useApp()` | Obsidian App instance |
| Config | `ConfigProvider` | `useConfig()` | View configuration |
| ContainerEl | `ContainerElProvider` | `useContainerEl()` | Container DOM element |
| EntriesStore | `EntriesStoreProvider` | `useEntriesStore()` | Entries store |
| Obsidian | `ObsidianProvider` | `useObsidian()` | Full context (app, config, data, etc.) |

### EntriesStoreProvider usage

Wrap components that need entry access:

```typescript
import { EntriesStoreProvider } from "@/contexts/entries-store";

const MyView = ({ data }: ReactBaseViewProps) => {
	return (
		<EntriesStoreProvider initialEntries={data.data}>
			<MyGrid items={data.data} />
		</EntriesStoreProvider>
	);
};
```

## Store Pattern with useSyncExternalStore

For externally changing data, use the store pattern:

```typescript
import { useSyncExternalStore } from "react";
import { useEntriesStore } from "@/contexts/entries-store";

export function useEntry(id: string) {
	const store = useEntriesStore();
	return useSyncExternalStore(
		store.subscribe,
		() => store.getEntry(id),
		() => store.getEntry(id),
	);
}
```

## Event Handlers

Name handlers with `handle` prefix:

```typescript
const handleClick = () => { /* ... */ };
const handleKeyDown = (e: React.KeyboardEvent) => { /* ... */ };
const handlePointerDown = (e: React.PointerEvent) => { /* ... */ };
const handleMouseEnter = () => { /* ... */ };
const handleMouseLeave = () => { /* ... */ };
```

## Refs

Use refs for:

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
