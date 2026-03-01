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
    if (formulaName === 'background') {
      return aValue("https://img.freepik.com/free-vector/stylish-hexagonal-line-pattern-background_1017-19742.jpg");
    }

    if (formulaName === 'banner') {
      if ('banner' in this._frontmatter) {
        return aValue(this._frontmatter.banner);
      }
    }

    if (formulaName === 'image') {
      if ('cover' in this._frontmatter) {
        return aValue(this._frontmatter.cover);
      }
      if ('banner' in this._frontmatter) {
        return aValue(this._frontmatter.banner);
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

    if (formulaName === 'groupIcon') {
      if ('status' in this._frontmatter) {
        const ICONS = {
          open: 'circle-dashed',
          'in-progress': 'loader-2',
          done: 'check',
          blocked: 'ban',
          'wont-do': 'shield-ban',
        };
        const icon = ICONS[this._frontmatter.status as keyof typeof ICONS];
        if (icon) {
          return aValue(icon);
        }
      }
      if ('groupIcon' in this._frontmatter) {
        return aValue(this._frontmatter.groupIcon);
      }
      if ('icon' in this._frontmatter) {
        return aValue(this._frontmatter.icon);
      }
    }

    if (formulaName === 'icon') {
      if ('status' in this._frontmatter) {
        const ICONS = {
          open: 'circle-dashed',
          'in-progress': 'loader-2',
          done: 'check',
          blocked: 'ban',
          'wont-do': 'shield-ban',
        };
        const icon = ICONS[this._frontmatter.status as keyof typeof ICONS];
        if (icon) {
          return aValue(icon);
        }
      }
      if ('icon' in this._frontmatter) {
        return aValue(this._frontmatter.icon);
      }
    }

    if (formulaName === 'color') {
      if ('status' in this._frontmatter) {
        const COLORS = {
          open: '#205FA6',
          'in-progress': '#BC5215',
          done: '#67800B',
          blocked: '#5D409D',
          'wont-do': '#AF3029',
        };
        const color = COLORS[this._frontmatter.status as keyof typeof COLORS];
        if (color) {
          return aValue(color);
        }
      }
      if ('color' in this._frontmatter) {
        return aValue(this._frontmatter.color);
      }
    }

    if (formulaName === 'groupColor') {
      if ('status' in this._frontmatter) {
        const COLORS = {
          open: '#205FA6',
          'in-progress': '#BC5215',
          done: '#67800B',
          blocked: '#5D409D',
          'wont-do': '#AF3029',
        };
        const color = COLORS[this._frontmatter.status as keyof typeof COLORS];
        if (color) {
          return aValue(color);
        }
      }
      if ('groupColor' in this._frontmatter) {
        return aValue(this._frontmatter.groupColor);
      }
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
      if ('status' in this._frontmatter) {
        return aValue('');
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
      if ('status' in this._frontmatter) {
        const ICONS = {
          open: 'circle-dashed',
          'in-progress': 'loader-2',
          done: 'check',
          blocked: 'ban',
          'wont-do': 'shield-ban',
        };
        const icon = ICONS[this._frontmatter.status as keyof typeof ICONS];
        return icon ? aValue(icon) : null;
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
      if ('status' in this._frontmatter) {
        const COLORS = {
          open: '#205FA6',
          'in-progress': '#BC5215',
          done: '#67800B',
          blocked: '#5D409D',
          'wont-do': '#AF3029',
        };
        const color = COLORS[this._frontmatter.status as keyof typeof COLORS];
        return color ? aValue(color) : null;
      }
    }

    if (formulaName === 'hover') {
      if ('url' in this._frontmatter) {
        return aValue(this._frontmatter.url);
      }
    }

    if (formulaName === 'groupTitle') {
      if ('status' in this._frontmatter) {
        const GROUPS = {
          open: 'Open',
          'in-progress': 'In Progress',
          done: 'Done',
          blocked: 'Blocked',
          'wont-do': "Won't Do",
        };
        const group = GROUPS[this._frontmatter.status as keyof typeof GROUPS];
        if (group) {
          return aValue(group);
        }
      }
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
