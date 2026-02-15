import type { BasesQueryResult, Value } from "obsidian";

export class MockBasesQueryResult implements BasesQueryResult {
  constructor(
    public readonly data: BasesQueryResult['data'],
    public readonly groupedData: BasesQueryResult['groupedData'],
    public readonly properties: BasesQueryResult['properties'],
  ) {}

  getSummaryValue(): Value {
    throw new Error('Not implemented');
  }
}

export const aBasesQueryResult = (
  overrides: Partial<BasesQueryResult> = {},
): BasesQueryResult => {
  return new MockBasesQueryResult(
    overrides.data ?? [],
    overrides.groupedData ?? [],
    overrides.properties ?? []
  );
}
