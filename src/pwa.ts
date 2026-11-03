// Offline install + safe updates. A new version downloads in the background and is applied
// as soon as the player is on the menu (never mid-match).
import { registerSW } from 'virtual:pwa-register';

let applyUpdate: ((reload?: boolean) => Promise<void>) | null = null;
let updateReady = false;

export function initPwa(): void {
  if (!('serviceWorker' in navigator) || import.meta.env.DEV) return;
  applyUpdate = registerSW({
    onNeedRefresh() { updateReady = true; },
    onRegisteredSW(_url, reg) {
      if (!reg) return;
      // Look for a new version when the app comes back to the foreground, and every 30 minutes.
      const check = () => { if (navigator.onLine) void reg.update().catch(() => {}); };
      document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'visible') check(); });
      setInterval(check, 30 * 60 * 1000);
    },
  });
}

/** Call every frame while on the menu: if a new version is waiting, switch to it now. */
export function applyPendingUpdate(): void {
  if (updateReady && applyUpdate) {
    updateReady = false;
    void applyUpdate(true);
  }
}
