import type { Decorator } from "@storybook/react-vite";
import type { App } from "obsidian";
import { useEffect, useRef, useState } from "react";
import { fn } from "storybook/test";

import { cn } from "@/lib/utils";

import { createMockApp } from "../../__mocks__/create-mock-app";
import { createMockComponent } from "../../__mocks__/create-mock-component";
import { ObsidianProvider } from "../../components/Obsidian/Context";

const Providers: Decorator = (Story, ctx) => {
  const theme = ctx.globals.theme ?? 'Flexoki Light';
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const params = ctx.parameters.obsidian;
  const layout = ctx.parameters.layout;
  const themeClasses = theme.split(' ').map(t => t.toLowerCase());

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div ref={containerRef} className={cn(
      layout !== "centered" && 'h-auto max-h-dvh w-full',
      themeClasses,
      'app-container bg-background',
    )}>
      {mounted && containerRef.current && (
        <ObsidianProvider
          value={{
            app: createMockApp(params, {
              workspace: {
                openLinkText: ctx.args.onEntryClick ?? fn(),
              }
            } as unknown as Partial<App>),
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
