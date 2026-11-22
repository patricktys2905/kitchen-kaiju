import { afterEach, describe, expect, it } from 'vitest';
import { RESET_KEEPS, resetSave } from '../src/backup';

describe('🗑 reset save', () => {
  afterEach(() => { delete (globalThis as { localStorage?: unknown }).localStorage; });
  it('wipes progress but keeps settings, controls, name and Workshop tables (and other sites\' keys)', () => {
    const store: Record<string, string> = { 'kk-story-v1': '{}', 'kk-meta-v1': '{}', 'kk-side-bloblin-v1': '{}', 'kk-fresh-start': '0', 'other-app': 'x' };
    for (const k of RESET_KEEPS) store[k] = 'keep';
    const ls = { getItem: (k: string) => store[k] ?? null, setItem: (k: string, v: string) => { store[k] = v; }, removeItem: (k: string) => { delete store[k]; } };
    (globalThis as { localStorage?: unknown }).localStorage = new Proxy(ls, { ownKeys: () => Object.keys(store), getOwnPropertyDescriptor: (_t, k) => (k in store ? { enumerable: true, configurable: true, value: store[k as string] } : Object.getOwnPropertyDescriptor(ls, k)) });
    expect(resetSave()).toBe(4);
    expect(Object.keys(store).sort()).toEqual([...RESET_KEEPS, 'other-app'].sort());
  });
});
