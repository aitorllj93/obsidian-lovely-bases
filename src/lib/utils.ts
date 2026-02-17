import { type ClassValue, clsx } from 'clsx';
import type { Ref, RefCallback, RefObject } from 'react';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mergeRefs<T>(...refs: Array<Ref<T> | undefined>) {
  return (value: T | null) => {
    for (const ref of refs) {
      if (!ref) return;
      if (typeof ref === "function") {
        (ref as RefCallback<T>)(value);
      } else {
        (ref as RefObject<T | null>).current = value;
      }
    };
  };
}

export function shallowEqual<T>(a: T, b: T): boolean {
  if (Object.is(a, b)) return true;
  if (typeof a !== 'object' || typeof b !== 'object' || !a || !b) return false;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every(key => Object.is((a as unknown)[key], (b as unknown)[key]));
}

export function arrayEqual<T>(a: T[], b: T[]): boolean {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  return a.length === 0 || a[0] === b[0];
}

export function pick<T extends object, K extends keyof T = keyof T>(obj: T, keys: K[]): Pick<T, K> {
  return keys.reduce((acc, key) => {
    acc[key] = obj[key];
    return acc;
  }, {} as Pick<T, K>);
};

export function chunk<T, R = T>(
  items: readonly T[],
  size: number,
  mapFn?: (item: T, i: number, row: number, col: number) => R,
): R[][] {
  if (size <= 0 || items.length === 0) return [];

  const out: R[][] = [];
  let row = -1;

  for (let i = 0; i < items.length; i++) {
    const col = i % size;
    if (col === 0) out[++row] = new Array<R>(Math.min(size, items.length - i));

    const item = items[i] as T;
    out[row][col] = mapFn ? mapFn(item, i, row, col) : (item as unknown as R);
  }

  return out;
}

/**
 * Execute `callback` after `frames` requestAnimationFrame(s).
 * Returns a function to cancel (cancels the pending RAF).
 */
export function afterRaf(callback: () => void, frames = 2): () => void {
  if (frames <= 0) {
    callback();
    return () => {};
  }

  let cancelled = false;
  let rafId: number | null = null;

  const tick = () => {
    if (cancelled) return;

    frames -= 1;

    if (frames === 0) {
      callback();
      return;
    }

    rafId = requestAnimationFrame(tick);
  };

  rafId = requestAnimationFrame(tick);

  return () => {
    cancelled = true;
    if (rafId != null) cancelAnimationFrame(rafId);
  };
}

export function isOdd(n: number) {
  return n % 2 !== 0;
}

export function isEven(n: number) {
  return n % 2 === 0;
}

export const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));
