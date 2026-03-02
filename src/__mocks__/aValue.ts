import type { BooleanValue, ListValue, NullValue, NumberValue, StringValue, Value } from "obsidian";

export class MockBooleanValue implements BooleanValue {

  static type = 'boolean';

	constructor(public value: boolean) {}

  toString(): string {
    return this.value.toString();
  }

  isTruthy(): boolean {
    return this.value;
  }

  equals(other: MockBooleanValue): boolean {
    return this.value === other.value;
  }

  looseEquals(other: MockBooleanValue): boolean {
    return this.value === other.value;
  }

  renderTo(el: HTMLElement) {
    el.textContent = this.value.toString();
  }
}

export class MockListValue implements ListValue {

  static type = 'list';

	constructor(public values: Value[]) {}

  toString(): string {
    return this.values.map(value => value.toString()).join(',');
  }

  renderTo(el: HTMLElement) {
    el.textContent = this.values.map(value => value.toString()).join(',');
  }
  isTruthy(): boolean {
    return this.values.some(value => value.isTruthy());
  }

  includes(value: Value): boolean {
    return this.values.some(v => v.equals(value));
  }

  length(): number {
    return this.values.length;
  }

  get(index: number): Value {
    return this.values[index];
  }

  set(index: number, value: Value): void {
    this.values[index] = value;
  }

  concat(other: MockListValue): ListValue {
    return new MockListValue([...this.values, ...other.values]);
  }

  equals(other: MockListValue): boolean {
    return this.values.every(value => other.includes(value));
  }

  looseEquals(other: MockListValue): boolean {
    return this.values.every(value => other.includes(value));
  }
}

export class MockNullValue implements NullValue {
  toString(): string {
    return 'null';
  }

  isTruthy(): boolean {
    return false;
  }

  equals(other: MockNullValue): boolean {
    return other.toString() === 'null';
  }

  looseEquals(other: MockNullValue): boolean {
    return other.toString() === 'null';
  }

  renderTo(el: HTMLElement) {
    el.textContent = 'null';
  }
}

export class MockNumberValue implements NumberValue {
  static type = 'number';

  constructor(public value: number) {}

  toString(): string {
    return this.value.toString();
  }

  isTruthy(): boolean {
    return this.value !== 0;
  }

  equals(other: MockNumberValue): boolean {
    return this.value === other.value;
  }

  looseEquals(other: MockNumberValue): boolean {
    return this.value === other.value;
  }

  renderTo(el: HTMLElement) {
    el.textContent = this.value.toString();
  }
}

export class MockStringValue implements StringValue {
  static type = 'string';

  constructor(public value: string) {}

  toString(): string {
    return this.value;
  }

  renderTo(el: HTMLElement) {
    el.textContent = this.value;
  }

  equals(other: MockStringValue): boolean {
    return this.value === other.value;
  }

  isTruthy(): boolean {
    return this.value !== '';
  }

  looseEquals(other: Value): boolean {
    return this.value === other.toString();
  }
}

export const aValue = (primitive: unknown): Value => {
  if (typeof primitive === 'string') {
    return new MockStringValue(primitive)
  }
  if (typeof primitive === 'number') {
    return new MockNumberValue(primitive)
  }
  if (typeof primitive === 'boolean') {
    return new MockBooleanValue(primitive)
  }
  if (Array.isArray(primitive)) {
    return new MockListValue(primitive.map(aValue))
  }

  if (primitive === undefined) {
    return new MockNullValue();
  }

  throw new Error(`Invalid primitive: ${primitive}`)
}
