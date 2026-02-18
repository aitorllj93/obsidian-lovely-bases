import type { DropdownOption } from "obsidian";

type Props = {
  option: DropdownOption;
  value: string;
  onChange: (val: string) => void;
};

const Dropdown = ({ option, value, onChange }: Props) => (
  <div className="flex flex-col gap-1 py-1">
    <div className="text-[11px] opacity-70 px-1">{option.displayName}</div>
    <select
      value={value ?? option.default}
      onChange={(e) => onChange(e.target.value)}
      className="bg-popover text-xs rounded-md px-2 py-1.5 border-none outline-none focus:ring-1 ring-background-app appearance-none cursor-pointer"
    >
      {Object.entries(option.options ?? {}).map(([key, label]) => (
        <option key={key} value={key}>
          {label}
        </option>
      ))}
    </select>
  </div>
);

export default Dropdown;
