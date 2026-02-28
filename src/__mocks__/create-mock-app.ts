
import type { App, BasesEntry, TFile } from "obsidian"

import { ALL_ENTRIES } from "@/__fixtures__/entries";

import type { MockTFile } from "./aFile";

type MockAppParams = {
  markdown?: boolean;
}

const DEFAULT_MOCK_APP_PARAMS: MockAppParams = {
  markdown: true,
}

type AppEventHandlers = {
  entryFrontMatterChanged?: (entry: BasesEntry) => void;
}

export const createMockApp = (
  params: MockAppParams = DEFAULT_MOCK_APP_PARAMS,
  overrides?: Partial<App>,
  handlers?: AppEventHandlers,
): App => {
  return {
    fileManager: {
      processFrontMatter: (file: TFile, processor: (fm) => void) => {
        const entry = ALL_ENTRIES.find(entry => entry.file.path === file.path);
        if (entry) {
          // biome-ignore lint/suspicious/noExplicitAny: mock
          processor((entry as any)._frontmatter);
          handlers?.entryFrontMatterChanged?.(entry);
        }
      }
    },
    metadataCache: {
			getFirstLinkpathDest: (linkpath: string, _: string) => {
        const entry = ALL_ENTRIES.find(entry => entry.file.basename === linkpath);
        if (entry) {
          return entry.file;
        }
			},
			getFileCache: (file: TFile) => {
        const entry = ALL_ENTRIES.find(entry => entry.file.path === file.path);
        if (entry) {
          return {
            // biome-ignore lint/suspicious/noExplicitAny: Entry doesn't have a frontmatter property
            frontmatter: (entry as any)._frontmatter,
          };
        }
				return {
					frontmatter: {},
				};
			},
    },
		vault: {
			adapter: {
				getResourcePath: (path: string): string | null => {
					return `/mock-resource/${path}`;
				},
			},
			read: async (_file: TFile): Promise<string> => {
        if (!params.markdown) {
          return new Promise(() => {});
        }
				return (_file as MockTFile).content ?? '';
			},
		},
    workspace: {
			openLinkText: async (_linktext: string, _sourcePath: string, _newLeaf: boolean): Promise<void> => {
				// Stub method
			},
      trigger: (_event: string, _data: unknown) => {},
      ...(overrides?.workspace ?? {}),
    },
  } as unknown as App;
}
