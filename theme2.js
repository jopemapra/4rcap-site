/* Direção visual v2: remove emojis usados como ícones (em todo texto, inclusive o gerado por JS), ícone SVG no WhatsApp e seletor de idioma sem bandeiras. */
(function(){
const PICT=/[\p{Extended_Pictographic}\u{1F3FB}-\u{1F3FF}️⃣‍]\s?/gu,TEST=/[\p{Extended_Pictographic}️‍]/u,KEEP=/^[©®™♥♡]/;
const clean=s=>s.replace(PICT,m=>KEEP.test(m)?m:'');
function node(n){const p=n.parentElement;if(!p||p.closest('script,style,textarea,.keep'))return;if(TEST.test(n.data)){const v=clean(n.data);if(v!==n.data)n.data=v}}
function walk(r){if(r.nodeType===3){node(r);return}if(r.nodeType!==1)return;const it=document.createNodeIterator(r,NodeFilter.SHOW_TEXT);let n;while(n=it.nextNode())node(n)}
walk(document.body);
new MutationObserver(ms=>{for(const m of ms)m.addedNodes.forEach(walk)}).observe(document.body,{childList:true,subtree:true});
const ls=document.getElementById('langSel');if(ls){const t={pt:'PT',en:'EN',zh:'中文'};[...ls.options].forEach(o=>o.textContent=t[o.value]||o.textContent)}
const fab=document.getElementById('waFab');if(fab)fab.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 12 12 0 0 0 4.6 4c.6.3 1.1.4 1.5.5a3.6 3.6 0 0 0 1.6.1c.5-.1 1.5-.6 1.7-1.2s.2-1.1.1-1.2-.2-.2-.4-.3Z"/></svg>';
})();
