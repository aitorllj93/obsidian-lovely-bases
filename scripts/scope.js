const fs = require("fs");
const postcss = require("postcss");
const prefixer = require("postcss-prefix-selector");

const manifest = JSON.parse(fs.readFileSync("manifest.json", "utf8"));
const css = fs.readFileSync(`build/${manifest.id}/styles.css`, "utf8");

const out = postcss()
	.use(
		prefixer({
			prefix: `.${manifest.id}`,
			transform: (prefix, selector, prefixedSelector) => {
				if (selector.includes(':global')) {
					return selector.replace(/:global\(([^)]+)\)/g, '$1');
				}
				if (selector === ':root' || selector === ':host') {
					return prefix;
				}
				if (selector.includes(':root') || selector.includes(':host')) {
					return selector.replace(/:root|:host/g, prefix);
				}
				return prefixedSelector;
			},
		})
	)
	.use({
		postcssPlugin: 'dedupe-selectors',
		Rule(rule) {
			// Deduplicate comma-separated selectors (e.g., ".lovely-bases,.lovely-bases" -> ".lovely-bases")
			const selectors = rule.selectors;
			const unique = [...new Set(selectors)];
			if (unique.length !== selectors.length) {
				rule.selectors = unique;
			}
		}
	})
	.use({
		postcssPlugin: 'add-important',
		Declaration(decl) {
      // do not include it in css variables definitions
      if (decl.prop.startsWith('--')) {
        return;
      }
      // do not add !important inside @property rules (invalid CSS)
      if (decl.parent && decl.parent.type === 'atrule' && decl.parent.name === 'property') {
        return;
      }
			if (!decl.important) {
				decl.important = true;
			}
		}
	})
	.process(css).css;

fs.writeFileSync(`build/${manifest.id}/styles.css`, out);
