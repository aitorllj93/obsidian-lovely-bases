import type { PropsWithChildren } from "react";

import { cn } from "@/lib/utils";

type OverlayBackdropProps = {
  show?: boolean;
};

const OverlayBackdrop = ({ show }: OverlayBackdropProps) => {
  return (
    <div
      className={cn(
        "absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent pointer-events-none transition-opacity duration-300 ease-out",
        show ? "opacity-100" : "opacity-0",
      )}
    />
  );
};

type OverlayBodyProps = PropsWithChildren<{
  show?: boolean;
}>;

const OverlayBody = ({ children, show }: OverlayBodyProps) => {
  return (
    <div
      className={cn(
        "absolute bottom-0 left-0 right-0 transition-all duration-300 ease-out",
        show
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none",
      )}
    >
      {children}
    </div>
  );
};

export { OverlayBackdrop, OverlayBody };
