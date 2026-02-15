import type { JSXElementConstructor } from "react";

export const WithVariants = <P extends object>(
  Component: JSXElementConstructor<P>,
  variants: Array<Partial<P>>,
) => (props: Partial<P>) => {
  return (
    <div className="flex flex-wrap gap-4 w-full">
      {variants.map((variant, i) => {
        const merged = { ...variant, ...props } as P;
        return <Component key={i.toString()} {...merged} />;
      })}
    </div>
  );
};
