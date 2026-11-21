// 📥 A small in-page paste box (an HTML textarea over the game), for when the browser blocks clipboard reading
// or window.prompt (iOS Safari, installed PWAs). Resolves with the text, or null if cancelled.
export function pasteBox(title: string, placeholder = ''): Promise<string | null> {
  return new Promise(resolve => {
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,.55);';
    const box = document.createElement('div');
    box.style.cssText = 'width:min(92vw,560px);background:#140b05;border:3px solid #ffd24a;border-radius:16px;padding:16px;font-family:Nunito,Arial,sans-serif;color:#f1e4d2;box-sizing:border-box;';
    const h = document.createElement('div');
    h.textContent = title;
    h.style.cssText = 'font-weight:900;font-size:18px;color:#ffd24a;margin-bottom:10px;';
    const ta = document.createElement('textarea');
    ta.placeholder = placeholder;
    ta.rows = 4;
    ta.style.cssText = 'width:100%;box-sizing:border-box;font-size:16px;border-radius:10px;border:2px solid #8dff6a;background:#2a1d14;color:#fff;padding:8px;resize:none;';
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;gap:10px;justify-content:flex-end;margin-top:12px;';
    const mk = (label: string, bg: string) => { const b = document.createElement('button'); b.textContent = label; b.style.cssText = `font:900 16px Nunito,Arial,sans-serif;padding:10px 18px;border-radius:12px;border:2px solid ${bg};background:#2a1d14;color:#fff;cursor:pointer;`; return b; };
    const cancel = mk('CANCEL', '#a89680'), ok = mk('➕ ADD', '#8dff6a');
    const done = (v: string | null) => { wrap.remove(); resolve(v); };
    cancel.onclick = () => done(null);
    ok.onclick = () => done(ta.value.trim() || null);
    wrap.onclick = e => { if (e.target === wrap) done(null); };
    ta.onkeydown = e => { e.stopPropagation(); if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); done(ta.value.trim() || null); } if (e.key === 'Escape') done(null); };
    row.append(cancel, ok);
    box.append(h, ta, row);
    wrap.append(box);
    document.body.append(wrap);
    setTimeout(() => ta.focus(), 30);
  });
}

/** Reads the clipboard if the browser allows it (null when blocked, empty, or unsupported). */
export async function readClipboard(): Promise<string | null> {
  try { const t = await navigator.clipboard?.readText?.(); return t && t.trim() ? t.trim() : null; } catch { return null; }
}
