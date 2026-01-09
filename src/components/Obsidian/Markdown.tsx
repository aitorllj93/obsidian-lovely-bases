import {
  MarkdownRenderer,
  type TFile
} from "obsidian";
import { createElement, useEffect, useRef } from "react";
import { useObsidian } from "./Context";

type Props = {
	as?: "div" | "span" | "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
	className?: string;
  maxLength?: number;
	file: TFile;
};

// remove frontmatter from markdown
const removeFrontmatter = (markdown: string) => {
  return markdown.replace(/^---\n[\s\S]*?\n---\n?/, "");
};

const Markdown = ({ as = "div", className, file, maxLength }: Props) => {
	const { app, component } = useObsidian();

	const el = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (!el.current) {
			return;
		}

		app.vault.read(file).then((md) => {
			if (!el.current || !md) {
				return;
			}

      const contentToRender = maxLength ? removeFrontmatter(md).slice(0, maxLength) : md;

			void MarkdownRenderer.render(app, contentToRender, el.current, file.path, component);
		});
	}, [app, file, component, maxLength]);

	return createElement(as, { ref: el, className });
};

export default Markdown;
