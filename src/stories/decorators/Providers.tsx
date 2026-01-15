import type { Decorator } from "@storybook/react-vite";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import { createMockApp } from "../../__mocks__/create-mock-app";
import { createMockComponent } from "../../__mocks__/create-mock-component";
import { ObsidianProvider } from "../../components/Obsidian/Context";

const Providers: Decorator = (Story, ctx) => {
  const theme = ctx.globals.theme ?? 'Flexoki Light';
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const themeClasses = theme.split(' ').map(t => t.toLowerCase());

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div ref={containerRef} className={cn(
      'h-full w-full',
      themeClasses,
      'bg-background',
    )}>
      {mounted && containerRef.current && (
        <ObsidianProvider
          value={{
            app: createMockApp(),
            component: createMockComponent(),
            containerEl: containerRef.current,
            isEmbedded: false,
          }}
        >
          <Story />
        </ObsidianProvider>
      )}
    </div>
  );
};

export default Providers;
