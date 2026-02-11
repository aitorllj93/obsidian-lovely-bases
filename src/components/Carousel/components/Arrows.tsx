import LucideIcon from "../../Obsidian/LucideIcon";

type Props = {
  onClick: () => void;
};

export function Previous({ onClick }: Props) {
  return (
    <button
      aria-label="Scroll left"
      className="h-10 w-10 absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/60 backdrop-blur-sm border border-border text-foreground shadow-md transition-opacity hover:bg-background/80 disabled:opacity-0"
      onClick={onClick}
      type="button"
    >
      <LucideIcon name="chevron-left" className="size-6" />
    </button>
  );
}

export function Next({ onClick }: Props) {
  return (
    <button
      aria-label="Scroll right"
      className="h-10 w-10 absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-background/60 backdrop-blur-sm border border-border text-foreground shadow-md transition-opacity hover:bg-background/80 disabled:opacity-0"
      onClick={onClick}
      type="button"
    >
      <LucideIcon name="chevron-right" className="size-6" />
    </button>
  );
}
