/**
 * Mock del paquete obsidian para Storybook
 *
 * Este archivo proporciona implementaciones mock de las clases y funciones
 * del paquete obsidian que se usan en runtime, mientras re-exporta los tipos
 * directamente desde el paquete real (TypeScript los elimina en compilación).
 */

// Re-export todos los tipos desde el paquete real
// TypeScript elimina estos en tiempo de compilación, así que no causan problemas
// Nota: No re-exportamos BasesView y TFile como tipos porque también los exportamos como clases
export type {
	App,
	BasesEntry,
	BasesPropertyId,
	BasesQueryResult,
	BasesViewConfig,
	BasesViewFactory,
	Component,
	FrontMatterCache,
	GroupOption,
	Plugin,
	QueryController,
	RenderContext,
	Value,
	ViewOption,
} from 'obsidian';

// Importar Value como tipo para usarlo en ListValue
import type { Value } from 'obsidian';

// Clases Value mockeadas
// Estas se usan con `new` en el código, así que necesitan implementación real
export class StringValue {
	constructor(public value: string) {}

  toString(): string {
    return this.value;
  }

  renderTo(el: HTMLElement) {
    el.textContent = this.value;
  }
}

export class NumberValue {
	constructor(public value: number) {}

  toString(): string {
    return this.value.toString();
  }
}

export class BooleanValue {
	constructor(public value: boolean) {}

  toString(): string {
    return this.value.toString();
  }
}

export class ListValue {
	constructor(public values: Value[]) {}

  toString(): string {
    return this.values.map(value => value.toString()).join(',');
  }

  renderTo(el: HTMLElement) {
    el.textContent = this.values.map(value => value.toString()).join(',');
  }
}

export class NullValue {
  toString(): string {
    return 'null';
  }
}

// Clase TFile mockeada
// Se usa con `instanceof TFile`, así que necesita ser una clase real
// No re-exportamos el tipo TFile porque también exportamos la clase
export class TFile {
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
}

// Re-exportar TFile como tipo también para compatibilidad
export type { TFile as TFileType } from 'obsidian';

// Clase BasesView mockeada
// Se usa como clase base en ReactBasesView
// No re-exportamos el tipo BasesView porque también exportamos la clase
export class BasesView {
	// biome-ignore lint/suspicious/noExplicitAny: Mock para Storybook, necesita compatibilidad con tipos de Obsidian
	app: any;
	// biome-ignore lint/suspicious/noExplicitAny: Mock para Storybook, necesita compatibilidad con tipos de Obsidian
	config: any;
	// biome-ignore lint/suspicious/noExplicitAny: Mock para Storybook, necesita compatibilidad con tipos de Obsidian
	data: any;
	containerEl: HTMLElement;

	// biome-ignore lint/suspicious/noExplicitAny: Mock para Storybook, necesita compatibilidad con tipos de Obsidian
	constructor(controller: any) {
		this.app = controller?.app || createMockApp();
		this.config = controller?.config || createMockConfig();
		this.data = controller?.data || createMockData();
		this.containerEl = document.createElement('div');
	}

	onDataUpdated(): void {
		// Stub method
	}

	onunload(): void {
		// Stub method
	}
}

// Re-exportar BasesView como tipo también para compatibilidad
export type { BasesView as BasesViewType } from 'obsidian';

// Funciones mockeadas

/**
 * Normaliza un path de archivo
 */
export const normalizePath = (path: string): string => {
	return path.replace(/\\/g, '/');
};

/**
 * Keymap mockeado
 */
export const Keymap = {
	isModEvent: (evt: MouseEvent | KeyboardEvent): boolean => {
		return evt.ctrlKey || evt.metaKey || evt.altKey || evt.shiftKey;
	},
};

/**
 * MarkdownRenderer mockeado
 */
export const MarkdownRenderer = {
	render: async (
		_app: unknown,
		markdown: string,
		el: HTMLElement,
		_sourcePath: string,
		_component: unknown,
	): Promise<void> => {
		// En Storybook, simplemente renderizamos el markdown como texto plano
		// o podríamos usar una librería de markdown si fuera necesario
		el.textContent = markdown;
	},
};

// Funciones helper para crear mocks de objetos complejos

// biome-ignore lint/suspicious/noExplicitAny: Mock para Storybook, necesita compatibilidad con tipos de Obsidian
function createMockApp(): any {
	return {
		vault: {
			adapter: {
				getResourcePath: (path: string): string | null => {
					return `/mock-resource/${path}`;
				},
			},
			// biome-ignore lint/suspicious/noExplicitAny: Mock para Storybook
			read: async (_file: any): Promise<string> => {
				return '# Mock Content\n\nThis is mock content for Storybook.';
			},
		},
		metadataCache: {
			// biome-ignore lint/suspicious/noExplicitAny: Mock para Storybook
			getFirstLinkpathDest: (_linkpath: string, _sourcePath: string): any => {
				return null;
			},
			// biome-ignore lint/suspicious/noExplicitAny: Mock para Storybook
			getFileCache: (_file: any): any => {
				return {
					frontmatter: {},
				};
			},
		},
		workspace: {
			openLinkText: async (_linktext: string, _sourcePath: string, _newLeaf: boolean): Promise<void> => {
				// Stub method
			},
		},
	};
}

// biome-ignore lint/suspicious/noExplicitAny: Mock para Storybook, necesita compatibilidad con tipos de Obsidian
function createMockConfig(): any {
	return {
		// biome-ignore lint/suspicious/noExplicitAny: Mock para Storybook
		get: (_key: string): any => {
			return null;
		},
	};
}

// biome-ignore lint/suspicious/noExplicitAny: Mock para Storybook, necesita compatibilidad con tipos de Obsidian
function createMockData(): any {
	return {
		entries: [],
		groupedData: [],
	};
}

