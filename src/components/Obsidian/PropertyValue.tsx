import type { RenderContext, Value } from "obsidian";
import { createElement, memo, useEffect, useRef } from "react";

type PropertyValueProps = {
	as: "div" | "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	className?: string;
	renderContext: RenderContext;
	value: Value;
};

const PropertyValue = memo(
	({ renderContext, as, className, value }: PropertyValueProps) => {
		const el = useRef<HTMLDivElement>(null);

		useEffect(() => {
			if (!el.current) {
				return;
			}

			el.current.innerHTML = "";
			value.renderTo(el.current, renderContext);

			return () => {
				if (!el.current) {
					return;
				}
				el.current.innerHTML = "";
			};
		}, [value, renderContext]);

		return createElement(as, { ref: el, className }, el.current?.innerHTML);
	},
	(prevProps, nextProps) => {
		return prevProps.value === nextProps.value;
	},
);

PropertyValue.displayName = "PropertyValue";

export default PropertyValue;
