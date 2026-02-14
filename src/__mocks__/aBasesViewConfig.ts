import type { BasesPropertyId, BasesSortConfig, BasesViewConfig, Value } from "obsidian";

type QueryOptions = {
  groupBy?: BasesPropertyId;
  properties?: BasesPropertyId[];
}

export class MockBasesViewConfig<T = Record<string, unknown>> implements BasesViewConfig {

  get groupBy() {
    return this.queryOptions.groupBy;
  }

  constructor(
    public name: string,
    private config: T,
    private readonly queryOptions: QueryOptions = {},
  ) {}

  get(propertyId: BasesPropertyId) {
    return this.config[propertyId];
  }

  getAsPropertyId(propertyId: string) {
    return propertyId as BasesPropertyId;
  }

  getEvaluatedFormula(_view, _key): Value {
    throw new Error('Not implemented')
  }

  getDisplayName(propertyId: BasesPropertyId) {
    const [_, property] = propertyId.split('.');
    return property.charAt(0).toUpperCase() + property.slice(1);
  }

  getOrder() {
    return this.queryOptions.properties || [];
  }

  getSort(): BasesSortConfig[] {
    throw new Error('Not implemented')
  }

  set(key: string, value: unknown) {
    this.config[key] = value;
  }

}

export const aBasesViewConfig = <T extends Record<string, unknown>>(
  config?: T,
  options?: QueryOptions,
): BasesViewConfig => {
  return new MockBasesViewConfig('test', config || {}, options || {});
}
