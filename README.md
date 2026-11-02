# 4RCAP · site, hub e landing pages

**4 frentes. 1 resultado: retorno.** Leilões, recuperação tributária, consultoria empresarial e assessoria de investimentos.

## Arquivos principais
- `index.html` + `style.css` + `theme2.css` + scripts `*.js`: site/hub completo (calculadoras, comunidade, crivo de qualificação, PT/EN/中文).
- `lp-*.html` + `lp2.css` + `lp.js`: landing pages de conversão, uma por serviço (para anúncios). `lp-index.html` lista todas.
- `supabase.sql` / `supabase.js`: recebimento de leads no Supabase (ver `SUPABASE.md`).

## Configurar
- Site: bloco `CONFIG` no topo de `app.js` (marca, WhatsApp, Supabase, dados ANCORD).
- Landing pages: `LP_CONFIG` no topo de `lp.js` (mesmos valores).

## Documentação
`DEPLOY.md` (publicar), `SUPABASE.md` (leads), `CONVERSAO.md` (plano de conversão e testes A/B), `BENCHMARK.md`, `MELHORIAS.md` (registro de 420 melhorias), `NOMES*.md` (pesquisa de nomes).

Versões anteriores das landings em `v1/`.
