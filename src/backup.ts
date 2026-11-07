// Save backup: pack all Kitchen Kaiju progress into one text code you can copy to another device.
// EASY TO CUSTOMISE: KEYS lists what is included (everything the game stores starts with "kk-").
export const KEYS = () => Object.keys(localStorage).filter(k => k.startsWith('kk-'));

export function exportSave(): string {
  const data: Record<string, string> = {};
  for (const k of KEYS()) data[k] = localStorage.getItem(k) ?? '';
  const json = JSON.stringify({ v: 1, data });
  return 'KK1-' + btoa(unescape(encodeURIComponent(json)));
}

/** Restores a code from exportSave(); returns how many items were restored (0 = not a valid code). */
export function importSave(code: string): number {
  try {
    const raw = code.trim().replace(/^KK1-/, '');
    const obj = JSON.parse(decodeURIComponent(escape(atob(raw)))) as { v: number; data: Record<string, string> };
    if (obj.v !== 1 || typeof obj.data !== 'object') return 0;
    const keys = Object.keys(obj.data).filter(k => k.startsWith('kk-'));
    for (const k of keys) localStorage.setItem(k, obj.data[k]);
    return keys.length;
  } catch {
    return 0;
  }
}
