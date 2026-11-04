// Gera os PNGs dos criativos "print nativo".
// Uso: python3 -m http.server 8765 (na raiz do repo) e depois node criativos/render.js
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  for (const c of ['chat', 'planilha', 'prazo']) for (const [f, h] of [['feed', 1350], ['story', 1920]]) {
    const p = await b.newPage({ viewport: { width: 1080, height: h }, deviceScaleFactor: 1 });
    await p.goto(`http://localhost:8765/criativos/print-nativo.html?c=${c}&f=${f}`);
    await p.waitForTimeout(300);
    await p.screenshot({ path: `criativos/${c}-${f}.png` });
    await p.close();
  }
  await b.close();
})();
