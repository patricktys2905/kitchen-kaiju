// Offline install + safe updates. A new version downloads in the background and is applied
// only when the player is on the menu (never mid-match).
import { registerSW } from 'virtual:pwa-register';

let applyUpdate: ((reload?: boolean) => Promise<void>) | null = null;
let updateReady = false;

export function initPwa(): void {
  if (!('serviceWorker' in navigator) || import.meta.env.DEV) return;
  applyUpdate = registerSW({
    onNeedRefresh() { updateReady = true; },
  });
}

/** Call from the menu: if a new version is waiting, switch to it now. */
export function applyPendingUpdate(): void {
  if (updateReady && applyUpdate) {
    updateReady = false;
    void applyUpdate(true);
  }
}
