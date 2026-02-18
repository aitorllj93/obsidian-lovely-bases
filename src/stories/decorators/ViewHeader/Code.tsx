import type { Args } from "@storybook/react-vite"
import type { ViewOption } from "obsidian";
import { useEffect, useState } from "react";

import LucideIcon from "@/components/Obsidian/LucideIcon";

type Props = {
  args: Args;
  options: ViewOption[];
}

const Code = ({
  args,
  options
}: Props) => {
  const [yml, setYML] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const keys = options.flatMap(opt => opt.type === 'group' ?
      opt.items.map(i => i.key) :
      opt.key
    );

    const lines = keys
      .filter((key): key is string => typeof key === "string")
      .map((key) => {
        const value = args[key];

        if (value === undefined) return null;

        if (typeof value === "string") {
          return `${key}: "${value}"`;
        }

        if (typeof value === "boolean" || typeof value === "number") {
          return `${key}: ${value}`;
        }

        return null;
      })
      .filter(Boolean);

    setYML(lines.join("\n"));
  }, [args, options]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(yml);
      setCopied(true);

      setTimeout(() => setCopied(false), 1200);
    } catch {
      alert("Clipboard not available in this browser context.");
    }
  };

  return (
    <pre className="bg-background-secondary m-0 p-2.5">
      <code className="">
        {yml}
      </code>
      <div className="absolute top-2 right-2">
        <button
          type="button"
          onClick={copyToClipboard}
          className="cursor-pointer bg-border/50 hover:bg-border px-2 py-1 text-sm rounded border-none disabled:opacity-50 flex gap-2"
          aria-label="Copy YAML to clipboard"
          title="Copy"
        >
          <LucideIcon name="copy" className="size-4" />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </pre>
  )
};

export default Code;
