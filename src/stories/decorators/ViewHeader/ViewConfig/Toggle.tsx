
import type { ToggleOption } from "obsidian";

type Props = {
  option: ToggleOption;
  value: boolean;
  onChange: (val: boolean) => void;
};

const Toggle = ({ option, value, onChange }: Props) => (
  <div className="flex options-center justify-between py-1 px-1">
    <div className="text-[11px] opacity-70">{option.displayName}</div>
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`relative inline-flex h-4 w-7 options-center rounded-full transition-colors focus:outline-none ${value ? "bg-primary" : "bg-muted"}`}
    >
      <span
        className={`inline-block size-3 transform rounded-full bg-white transition-transform ${value ? "translate-x-3.5" : "translate-x-0.5"}`}
      />
    </button>
  </div>
);

export default Toggle;
