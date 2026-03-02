

import * as Lucide from "lucide-react";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Streamdown } from "streamdown";

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

import { createMockApp } from "./create-mock-app";

// biome-ignore lint/complexity/noStaticOnlyClass: Mock para Storybook, necesita compatibilidad con tipos de Obsidian
export class Platform {
  static isMobile = false;
}

export { MockBooleanValue as BooleanValue, MockListValue as ListValue, MockNullValue as NullValue, MockNumberValue as NumberValue, MockStringValue as StringValue } from './aValue';
export type { BooleanValue as BooleanValueType, ListValue as ListValueType, NullValue as NullValueType, NumberValue as NumberValueType, StringValue as StringValueType } from 'obsidian';

export { MockTFile as TFile } from './aFile'
// Re-exportar TFile como tipo también para compatibilidad
export type { TFile as TFileType } from 'obsidian';

export { MockBasesEntry as BasesEntry } from './aBasesEntry';
export type { BasesEntry as BasesEntryType } from 'obsidian';

export { MockBasesEntryGroup as BasesEntryGroup } from './aBasesEntryGroup';
export type { BasesEntryGroup as BasesEntryGroupType } from 'obsidian';

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
		el.innerHTML = renderToStaticMarkup(
      React.createElement(Streamdown, {
        // biome-ignore lint/correctness/noChildrenProp: Mock obsidian rendering for Storybook
        children: markdown,
        mode: "static",
        className: "contents [&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
      })
    );
	},
};

const normalizeLucideName = (name: string) => {
  const pascal = name
    .trim()
    .replace(/(^\w|[-_\s]+\w)/g, (m) => m.replace(/[-_\s]+/, "").toUpperCase());
  return pascal;
};

export const setIcon = (el: HTMLElement, name: string): void => {
  const key = normalizeLucideName(name);
  // biome-ignore lint/suspicious/noExplicitAny: Disable any
  const Icon = (Lucide as any)[key] as React.ComponentType<any> | undefined;
  if (!Icon) return;
  el.innerHTML = renderToStaticMarkup(
    React.createElement(Icon, {
      style: {
        display: 'block',
        width: '100%',
        height: '100%',
      }
    })
  );
}

export const openExternal = (url: string): void => {
  window.open(url, '_blank');
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

