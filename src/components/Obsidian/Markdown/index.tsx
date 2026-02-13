import { MarkdownRenderer, type TFile } from "obsidian";
import {
  type ComponentProps,
  type ComponentType,
  type CSSProperties,
  createElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

import { useObsidian } from "../Context";

import MarkdownSkeleton from "./Skeleton";
import { getContentToRender } from "./utils";

type Props = {
  as?: "div" | "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  className?: string;
  file: TFile;
  maxLength?: number;
  showEllipsis?: boolean;
  showSkeleton?: boolean;
  skeleton?: ComponentType<ComponentProps<typeof MarkdownSkeleton>>;
  style?: CSSProperties;
};

const Markdown = ({
  as = "div",
  className,
  file,
  maxLength,
  showEllipsis = false,
  showSkeleton = true,
  skeleton: Skeleton = MarkdownSkeleton,
  style,
}: Props) => {
  const { app, component } = useObsidian();
  const [isLoading, setIsLoading] = useState(true);
  const el = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let isMounted = true;
    if (!el.current) {
      return;
    }

    const loadContent = async () => {
      const md = await app.vault.read(file);

      if (!el.current || !md) {
        return;
      }

      el.current.innerHTML = "";
      const contentToRender = maxLength
        ? getContentToRender(md, maxLength, showEllipsis)
        : md;

      await MarkdownRenderer.render(
        app,
        contentToRender,
        el.current,
        file.path,
        component,
      );
      if (isMounted) {
        setIsLoading(false);
      }
    };

    loadContent();

    return () => {
      isMounted = false;
    };
  }, [app, file, component, maxLength, showEllipsis]);

  return (
    <div className="grid grid-cols-1 grid-rows-1">
      {showSkeleton && (
        <div
          className={cn(
            "col-start-1 row-start-1 min-h-0",
            !isLoading && "invisible",
          )}
        >
          <Skeleton />
        </div>
      )}
      {createElement(as, {
        ref: el,
        className: cn(
          "col-start-1 row-start-1 min-h-0",
          className,
          isLoading && "invisible",
        ),
        style,
      })}
    </div>
  );
};

export default Markdown;
