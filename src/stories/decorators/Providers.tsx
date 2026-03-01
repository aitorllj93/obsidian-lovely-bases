import type { Decorator } from "@storybook/react-vite";
import type { App, BasesEntryGroup, BasesPropertyId } from "obsidian";
import { useCallback, useEffect, useRef, useState } from "react";
import { fn } from "storybook/test";

import { toBasesEntryGroups } from "@/__fixtures__/utils";
import { createMockApp } from "@/__mocks__/create-mock-app";
import { createMockComponent } from "@/__mocks__/create-mock-component";
import { ObsidianProvider } from "@/components/Obsidian/Context";
import { cn } from "@/lib/utils";

const Providers: Decorator = (Story, ctx) => {
  const [ops, setOpts] = useState(1);
  const theme = ctx.globals.theme ?? 'Flexoki Light';
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const params = ctx.parameters.obsidian;
  const layout = ctx.parameters.layout;
  const themeClasses = theme.split(' ').map(t => t.toLowerCase());

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleEntryChanged = useCallback(() => {
    // mock re-grouping
    if (ctx.args.groupedData) {
      const firstItem = ctx.args.groupedData?.[0]?.entries?.[0];
      if (firstItem) {
        let key: BasesPropertyId | undefined;
        if ('status' in firstItem._frontmatter) {
          key = 'note.status';
        }

        if (key) {
          const allItems = (ctx.args.groupedData as BasesEntryGroup[]).flatMap(g => g.entries);
          ctx.args.groupedData = toBasesEntryGroups(allItems, key);
        }
      }
    }

    setOpts(ops + 1);
  }, [ctx.args, ops]);

  return (
    <div ref={containerRef} className={cn(
      layout !== "centered" && 'h-auto max-h-dvh w-full',
      themeClasses,
      'app-container bg-background',
    )}>
      {mounted && ops && containerRef.current && (
        <ObsidianProvider
          key={ops}
          value={{
            app: createMockApp(
              params,
              {
                workspace: {
                  openLinkText: ctx.args.onEntryClick ?? fn(),
                }
              } as Partial<App>,
              {
                entryFrontMatterChanged: handleEntryChanged,
              }
            ),
            component: createMockComponent(),
            containerEl: containerRef.current,
            isEmbedded: true,
          }}
        >
          <Story />
        </ObsidianProvider>
      )}
    </div>
  );
};

export default Providers;
