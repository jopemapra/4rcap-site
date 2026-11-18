// Gera os PNGs dos criativos "print nativo".
// Uso: python3 -m http.server 8765 (na raiz do repo) e depois:
//   node criativos/render.js                     -> chat + prazo e planilha do mês atual e do próximo
//   node criativos/render.js 2026-11 2026-12     -> prazo e planilha só desses meses (chat também é refeito)
// Saída: criativos/chat-{feed,story}.png, prazo-{feed,story}-AAAA-MM.png, planilha-{feed,story}-AAAA-MM.png
// Rotina mensal (DEPLOY.md): no dia 21, rodar com o mês seguinte e trocar os criativos de prazo (anúncio C) e de planilha (B-planilha).
const { chromium } = require('playwright');
const path = require('path');
const OUT = __dirname;
const pad = n => String(n).padStart(2, '0');
const ym = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}`;
const now = new Date();
const REAL = process.argv.includes('real');
const months = process.argv.slice(2).filter(a => /^\d{4}-\d{2}$/.test(a));
if (!months.length) months.push(ym(now), ym(new Date(now.getFullYear(), now.getMonth() + 1, 1)));
const SIZES = [['feed', 1350], ['story', 1920]];
(async () => {
  const b = await chromium.launch();
  const shot = async (qs, file, h) => {
    const p = await b.newPage({ viewport: { width: 1080, height: h }, deviceScaleFactor: 1 });
    await p.goto(`http://localhost:8765/criativos/print-nativo.html?${qs}`);
    await p.waitForTimeout(300);
    await p.screenshot({ path: path.join(OUT, file) });
    await p.close();
    console.log('ok', file);
  };
  if (REAL) { // campanha Lucro Real: node criativos/render.js real
    for (const c of ['data', 'presumido', 'chat', 'comparativo', 'lista']) for (const [f, h] of [...SIZES, ['tiktok', 1920]]) {
      const p = await b.newPage({ viewport: { width: 1080, height: h }, deviceScaleFactor: 1 });
      await p.goto(`http://localhost:8765/criativos/real.html?c=${c}&f=${f}`); await p.waitForTimeout(500);
      await p.screenshot({ path: path.join(OUT, `real-${c}-${f}.png`) }); await p.close(); console.log('ok', `real-${c}-${f}.png`);
    }
    await b.close(); return;
  }
  for (const c of ['chat']) for (const [f, h] of SIZES) await shot(`c=${c}&f=${f}`, `${c}-${f}.png`, h);
  for (const m of months) for (const c of ['prazo', 'planilha']) for (const [f, h] of SIZES) await shot(`c=${c}&f=${f}&m=${m}`, `${c}-${f}-${m}.png`, h);
  await b.close();
})();
