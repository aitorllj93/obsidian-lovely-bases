const fs = require("fs");
const postcss = require("postcss");
const prefixer = require("postcss-prefix-selector");

const manifest = JSON.parse(fs.readFileSync("manifest.json", "utf8"));
const css = fs.readFileSync(`build/${manifest.id}/styles.css`, "utf8");

const out = postcss()
	.use(
		prefixer({
			prefix: `.${manifest.id}`,
			transform: function (prefix, selector, prefixedSelector, filePath, rule) {
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
		postcssPlugin: 'add-important',
		Declaration(decl) {
			if (!decl.important) {
				decl.important = true;
			}
		}
	})
	.process(css).css;

fs.writeFileSync(`build/${manifest.id}/styles.css`, out);
