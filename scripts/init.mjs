import { readFileSync, writeFileSync, existsSync } from "fs";
import { createInterface } from "readline";

function toKebabCase(str) {
	return str
		.replace(/([a-z])([A-Z])/g, "$1-$2")
		.replace(/[\s_]+/g, "-")
		.toLowerCase()
		.replace(/[^a-z0-9-]/g, "");
}

function toPascalCase(str) {
	return str
		.split(/[\s-_]+/)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
		.join("");
}

function isValidKebabCase(str) {
	return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(str);
}

function question(rl, query) {
	return new Promise((resolve) => rl.question(query, resolve));
}

function parseArgs() {
	const args = process.argv.slice(2);
	const result = {};

	for (let i = 0; i < args.length; i++) {
		if (args[i].startsWith("--")) {
			const key = args[i].slice(2);
			const value = args[i + 1];
			if (value && !value.startsWith("--")) {
				result[key] = value;
				i++;
			} else {
				result[key] = true;
			}
		}
	}

	return result;
}

async function main() {
	const args = parseArgs();
	let id, name, description;

	const manifestPath = "manifest.json";
	if (existsSync(manifestPath)) {
		const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
		if (manifest.id !== "my-obsidian-plugin") {
			console.log(
				"⚠️  The plugin has already been initialized with the ID:",
				manifest.id
			);
			console.log("If you want to reinitialize, edit manifest.json manually");
			process.exit(0);
		}
	}

	if (args.id && args.name) {
		id = args.id;
		name = args.name;
		description = args.description || "";
	} else {
		const rl = createInterface({
			input: process.stdin,
			output: process.stdout,
		});

		console.log("\n🚀 Initialization of the Obsidian Plugin\n");

		id = await question(rl, "Plugin ID (kebab-case, e.g: mi-plugin): ");
		name = await question(rl, "Plugin name (e.g: Mi Plugin): ");
		description = await question(
			rl,
			"Description (optional, Enter to omit): "
		);

		rl.close();
	}

	if (!isValidKebabCase(id)) {
		console.error(
			"❌ Error: The ID must be in kebab-case (only lowercase letters, numbers and hyphens)"
		);
		process.exit(1);
	}

	const kebabId = id;
	const pascalName = toPascalCase(name);
	const pascalPluginName = pascalName + "Plugin";
	const pascalSettingsTabName = pascalPluginName + "SettingsTab";

	console.log("\n📝 Values to use:");
	console.log(`   ID: ${kebabId}`);
	console.log(`   Name: ${name}`);
	console.log(`   Description: ${description || "(empty)"}`);
	console.log(`   Class name: ${pascalPluginName}`);
	console.log(`   Settings tab name: ${pascalSettingsTabName}\n`);

	console.log("📄 Updating manifest.json...");
	const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
	manifest.id = kebabId;
	manifest.name = name;
	manifest.description = description || "";
	writeFileSync(manifestPath, JSON.stringify(manifest, null, "\t") + "\n");

	console.log("📄 Updating package.json...");
	const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
	packageJson.name = kebabId;
	packageJson.description = description || "";

	packageJson.scripts.css = packageJson.scripts.css.replace(
		/my-obsidian-plugin/g,
		kebabId
	);
	packageJson.scripts["css:build"] = packageJson.scripts["css:build"].replace(
		/my-obsidian-plugin/g,
		kebabId
	);
	writeFileSync("package.json", JSON.stringify(packageJson, null, "\t") + "\n");

	console.log("📄 Updating esbuild.config.mjs...");
	let esbuildConfig = readFileSync("esbuild.config.mjs", "utf8");
	esbuildConfig = esbuildConfig.replace(/my-obsidian-plugin/g, kebabId);
	writeFileSync("esbuild.config.mjs", esbuildConfig);

	console.log("📄 Updating src/main.tsx...");
	let mainTsx = readFileSync("src/main.tsx", "utf8");
	mainTsx = mainTsx.replace(/MyObsidianPlugin/g, pascalPluginName);
	mainTsx = mainTsx.replace(/my-obsidian-plugin/g, kebabId);
	mainTsx = mainTsx.replace(/Insert My Plugin/g, `Insert ${name}`);
	writeFileSync("src/main.tsx", mainTsx);

	console.log("📄 Updating src/components/App.tsx...");
	let appTsx = readFileSync("src/components/App.tsx", "utf8");
	appTsx = appTsx.replace(/my-obsidian-plugin/g, kebabId);
	writeFileSync("src/components/App.tsx", appTsx);

	console.log("📄 Updating src/settings-tab.ts...");
	let settingsTab = readFileSync("src/settings-tab.ts", "utf8");
	settingsTab = settingsTab.replace(/MyObsidianPluginSettingsTab/g, pascalSettingsTabName);
	settingsTab = settingsTab.replace(/MyObsidianPlugin/g, pascalPluginName);
	settingsTab = settingsTab.replace(/My Plugin Settings/g, `${name} Settings`);
	writeFileSync("src/settings-tab.ts", settingsTab);

	console.log("📄 Updating README.md...");
	let readme = readFileSync("README.md", "utf8");
	readme = readme.replace(
		/# Obsidian Plugin Starter Kit React \+ Tailwind CSS\n\nFind and replace `my-obsidian-plugin` with your own name/g,
		`# ${name}\n\n${description || "Obsidian plugin developed with React and Tailwind CSS"}`
	);
	writeFileSync("README.md", readme);

	console.log("\n✅ Initialization completed successfully!\n");
	console.log("📦 Next steps:");
	console.log("   1. Review the modified files");
	console.log("   2. Execute 'npm install' if necessary");
	console.log("   3. Execute 'npm run build' to compile the plugin\n");
}

main().catch((error) => {
	console.error("❌ Error:", error.message);
	process.exit(1);
});

