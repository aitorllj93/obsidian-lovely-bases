
import { setIcon } from "obsidian";
import { useEffect, useRef } from "react";

import { cn } from "@/lib/utils";

type Props = {
	name: string;
	className?: string;
	style?: React.CSSProperties;
};

const LucideIcon = ({ name, className, style }: Props) => {
	const el = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		if (!el.current) {
			return;
		}

		el.current.innerHTML = "";
		setIcon(el.current, name);

		return () => {
			if (el.current) {
				el.current.innerHTML = "";
			}
		};
	}, [name]);

	return (
		<span
			ref={el}
			className={cn("[&>svg]:size-full [&>svg]:block", className)}
			style={style}
		/>
	);
};

export default LucideIcon;
