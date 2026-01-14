import type { Decorator } from "@storybook/react-vite";
import { useEffect, useRef, useState } from "react";

import { createMockApp } from "../../__mocks__/create-mock-app";
import { createMockComponent } from "../../__mocks__/create-mock-component";
import { ObsidianProvider } from "../../components/Obsidian/Context";

const Providers: Decorator = (Story) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full">
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
