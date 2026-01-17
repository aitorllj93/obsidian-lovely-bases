import type { BasesPropertyId, BasesViewConfig } from "obsidian";


export const aBasesViewConfig = <T extends Record<string, unknown>>(
  config?: T,
  order: BasesPropertyId[] = [],
): BasesViewConfig => {
  return {
    name: 'test',
    get(propertyId) {
      return config[propertyId]
    },
    getAsPropertyId(propertyId: string) {
      return propertyId as BasesPropertyId
    },
    getEvaluatedFormula(_view, _key) {
      throw new Error('Not implemented')
    },
    getDisplayName(propertyId) {
      const [_, property] = propertyId.split('.');
      return property.charAt(0).toUpperCase() + property.slice(1);
    },
    getOrder() {
      return order;
    },
    getSort() {
      throw new Error('Not implemented')
    },
    set(key, value) {
      (config as Record<string, unknown>)[key] = value;
    },
  }
}
