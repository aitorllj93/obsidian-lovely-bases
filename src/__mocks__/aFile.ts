import type { TFile } from "obsidian"

export class MockTFile {
	// biome-ignore lint/suspicious/noExplicitAny: Mock para Storybook, necesita compatibilidad con tipos de Obsidian
	vault: any = null;
	basename: string = '';
	path: string = '';
	extension: string = '';
	name: string = '';
	// biome-ignore lint/suspicious/noExplicitAny: Mock para Storybook, necesita compatibilidad con tipos de Obsidian
	parent: any = null;
	stat: {
		ctime: number;
		mtime: number;
		size: number;
	} = {
		ctime: 0,
		mtime: 0,
		size: 0,
	};
  content?: string;
  constructor(overrides: Partial<TFile> & { content?: string } = {}) {
    Object.assign(this, overrides);
  }
}

export const aFile = (
  overrides: Partial<TFile> = {},
  content?: string,
): TFile => {
  const basename = overrides.basename ?? 'test';
  const extension = overrides.extension ?? 'md';
  const path = overrides.path ?? `${basename}.${extension}`;
  const name = overrides.name ?? `${basename}.${extension}`;

  return new MockTFile({
    ...overrides,
    basename,
    path,
    extension,
    name,
    content,
  });
}
