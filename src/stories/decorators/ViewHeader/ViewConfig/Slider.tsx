
import type { SliderOption } from "obsidian";

type Props = {
  option: SliderOption;
  value: number;
  onChange: (val: number) => void
};

const Slider = ({ option, value, onChange }: Props) => (
  <div className="flex flex-col gap-1.5 py-1">
    <div className="text-[11px] opacity-70 px-1">{option.displayName}</div>
    <div className="flex options-center gap-3 px-1">
      <input
        type="range"
        min={option.min}
        max={option.max}
        step={option.step}
        value={value ?? option.default}
        onChange={(e) => onChange(Number.parseFloat(e.target.value))}
        className="flex-1 h-1 bg-popover rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:size-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-border"
      />
    </div>
  </div>
);

export default Slider;
