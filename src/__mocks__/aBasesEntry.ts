import type { BasesEntry, TFile } from "obsidian";

import { aFile } from "./aFile";
import { aValue } from "./aValue";

export class MockBasesEntry implements BasesEntry {
  constructor(
    public readonly file: TFile,
    private readonly _frontmatter: Record<string, unknown>,
    _overrides?: Partial<BasesEntry>,
  ) {
    Object.assign(this, _overrides);
  }

  getValue(propertyId) {
    const [source, property] = propertyId.split('.');

    if (source === 'file') {
      if (property === 'name') {
        return aValue(this.file.basename);
      }
      return aValue(this.file[property]);
    }

    if (source === 'formula') {
      return this.resolveFormula(property);
    }

    return aValue(this._frontmatter[property])
  }

  private resolveFormula(formulaName: string) {
    if (formulaName === 'image') {
      if ('banner' in this._frontmatter) {
        return aValue(this._frontmatter.banner);
      }
      if ('cover' in this._frontmatter) {
        return aValue(this._frontmatter.cover);
      }
    }

    if (formulaName === 'video') {
      if ('trailer' in this._frontmatter) {
        return aValue(this._frontmatter.trailer);
      }
      if ('banner' in this._frontmatter) {
        return aValue(this._frontmatter.banner);
      }
      if ('cover' in this._frontmatter) {
        return aValue(this._frontmatter.cover);
      }
    }

    if (formulaName === 'icon') {
      if ('icon' in this._frontmatter) {
        return aValue(this._frontmatter.icon);
      }
    }

    if (formulaName === 'color') {
      if ('color' in this._frontmatter) {
        return aValue(this._frontmatter.color);
      }
    }

    if (formulaName === 'badge') {
      if ('badge' in this._frontmatter) {
        return aValue(this._frontmatter.badge);
      }
      if ('read' in this._frontmatter) {
        return aValue(this._frontmatter.read);
      }
      if ('rating' in this._frontmatter) {
        return aValue(this._frontmatter.rating);
      }
    }

    if (formulaName === 'badgeIcon') {
      if ('badgeIcon' in this._frontmatter) {
        return aValue(this._frontmatter.badgeIcon);
      }

      if ('read' in this._frontmatter) {
        return aValue('check');
      }
      if ('rating' in this._frontmatter) {
        return aValue('star');
      }
    }

    if (formulaName === 'badgeColor') {
      if ('badgeColor' in this._frontmatter) {
        return aValue(this._frontmatter.badgeColor);
      }

      if ('read' in this._frontmatter) {
        return aValue('#768D21');
      }
      if ('rating' in this._frontmatter) {
        return aValue('#F7D042');
      }
    }

    if (formulaName === 'hover') {
      if ('url' in this._frontmatter) {
        return aValue(this._frontmatter.url);
      }
    }

    if (formulaName === 'groupTitle') {
      if ('sectionTitle' in this._frontmatter) {
        return aValue(this._frontmatter.sectionTitle)
      }
    }

    if (formulaName === 'groupSubtitle') {
      if ('sectionSubtitle' in this._frontmatter) {
        return aValue(this._frontmatter.sectionSubtitle)
      }
    }

    return aValue(undefined);
  }
}

export const aBasesEntry = (
  overrides: Partial<BasesEntry> = {},
  fm: Record<string, unknown> = {},
): BasesEntry => {
  return new MockBasesEntry(
    overrides.file ?? aFile(),
    fm,
    overrides,
  );
}
