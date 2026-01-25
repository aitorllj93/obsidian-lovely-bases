import { execSync } from "node:child_process";
import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const vaultPath = process.argv[2];

if (!vaultPath) {
	console.error("Error: You must provide the path to the Obsidian vault");
	console.error("Usage: npm run install <path-to-vault>");
	console.error("Example: npm run install ~/Documents/MyVault");
	process.exit(1);
}

if (!existsSync(vaultPath)) {
	console.error(`Error: The vault does not exist at the path: ${vaultPath}`);
	process.exit(1);
}

try {
	execSync("npm run build:dev", { stdio: "inherit" });
} catch (error) {
	console.error("Error building the plugin", error);
	process.exit(1);
}

const manifest = JSON.parse(readFileSync("manifest.json", "utf8"));

const pluginsDir = join(vaultPath, ".obsidian", "plugins");
const pluginDir = join(pluginsDir, manifest.id);
const buildDir = join(process.cwd(), "build", manifest.id);

if (!existsSync(pluginsDir)) {
	console.log(`Creating plugins directory: ${pluginsDir}`);
	mkdirSync(pluginsDir, { recursive: true });
}

if (!existsSync(pluginDir)) {
	console.log(`Creating plugin directory: ${pluginDir}`);
	mkdirSync(pluginDir, { recursive: true });
}

const filesToCopy = ["main.js", "manifest.json", "styles.css"];
for (const file of filesToCopy) {
	const sourceFile = join(buildDir, file);
	if (!existsSync(sourceFile)) {
		console.error(`Error: The built file was not found: ${sourceFile}`);
		console.error("Make sure to run 'npm run build' first");
		process.exit(1);
	}
}

console.log(`Installing plugin in: ${pluginDir}`);
for (const file of filesToCopy) {
	const sourceFile = join(buildDir, file);
	const destFile = join(pluginDir, file);
	copyFileSync(sourceFile, destFile);
	console.log(`  ✓ Copied: ${file}`);
}

console.log("\nPlugin installed successfully!");
console.log(`Restart Obsidian or reload the plugin to see the changes.`);

