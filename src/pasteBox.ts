// 📥 A small in-page paste box (an HTML textarea over the game): the player pastes with Ctrl+V / long-press, so the
// browser never shows a clipboard-permission popup, and window.prompt (blocked in some PWAs) is not needed. Resolves with the text, or null if cancelled.
/** check(text) returns an error to show inline (the box stays open), or null to accept and close. */
export function pasteBox(title: string, placeholder = '', check?: (text: string) => string | null): Promise<string | null> {
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
    const msg = document.createElement('div');
    msg.style.cssText = 'min-height:20px;margin-top:8px;font-size:15px;font-weight:700;color:#ffb347;';
    const row = document.createElement('div');
    row.style.cssText = 'display:flex;gap:10px;justify-content:flex-end;margin-top:12px;';
    const mk = (label: string, bg: string) => { const b = document.createElement('button'); b.textContent = label; b.style.cssText = `font:900 16px Nunito,Arial,sans-serif;padding:10px 18px;border-radius:12px;border:2px solid ${bg};background:#2a1d14;color:#fff;cursor:pointer;`; return b; };
    const cancel = mk('CANCEL', '#a89680'), ok = mk('➕ ADD', '#8dff6a');
    const done = (v: string | null) => { wrap.remove(); resolve(v); };
    cancel.onclick = () => done(null);
    const submit = () => { const v = ta.value.trim(); if (!v) { msg.textContent = 'Paste a line first (Ctrl+V, or long-press → Paste).'; return; } const why = check?.(v) ?? null; if (why) { msg.textContent = '⚠ ' + why; ta.select(); return; } done(v); };
    ok.onclick = submit;
    wrap.onclick = e => { if (e.target === wrap) done(null); };
    ta.onkeydown = e => { e.stopPropagation(); if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit(); } if (e.key === 'Escape') done(null); };
    row.append(cancel, ok);
    box.append(h, ta, msg, row);
    wrap.append(box);
    document.body.append(wrap);
    setTimeout(() => ta.focus(), 30);
  });
}

