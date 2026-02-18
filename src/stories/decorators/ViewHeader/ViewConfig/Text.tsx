import { cn } from "@/lib/utils";
import type { PropertyOption, TextOption } from "obsidian";

type Props = {
  option: PropertyOption | TextOption;
  value: string;
  onChange: (val: string) => void;
};

const Text = ({
  option,
  value,
  onChange,
}: Props) => {
  let valueStr = '';

  if (option.type === 'property') {
    const [_, prop] = value?.split('.') ?? [];
    valueStr = prop;
  }

  return (
    <div key={option.key} className="flex flex-col gap-1 py-1">
      <div className="text-[11px] opacity-70 px-1">{option.displayName}</div>
      <input
        type="text"
        value={valueStr ?? ''}
        disabled={option.type === 'property'}
        onChange={(e) => onChange(e.target.value)}
        className={cn(
          "bg-popover disabled:text-muted text-xs rounded-md px-2 py-1.5 border-none outline-none focus:ring-1 ring-background-app",
          option.type === "property" && 'capitalize'
        )}
      />
    </div>
  )
}

export default Text;
