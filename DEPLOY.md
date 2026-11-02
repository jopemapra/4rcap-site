# Como publicar e personalizar a landing page

## 1. Personalizar (5 minutos)
Abra `app.js` e edite o bloco `CONFIG` no topo do arquivo:
- `marca`: **4RCAP** (definido em 01/11/2026). Conceito: 4 frentes, 4 R (Recuperar, Render, Reestruturar, Realizar valor) e 1 resultado: Retorno. Slogan: "4 frentes. 1 resultado: retorno." Antes de investir na marca, registre no INPI (classes 35 e 36) e compre 4rcap.com.br.
- `whatsapp`: número com DDI e DDD, só dígitos (ex.: `5511999998888`)
- `telefone` e `email`
- `assessor`, `credencial` e `intermediario`: seu nome, o número da certificação ANCORD e o nome da corretora ou distribuidora à qual você é vinculado. **Obrigatório** pela Res. CVM 178 antes de divulgar a assessoria de investimentos. Coloque também o logotipo da corretora ao lado do seu, conforme o contrato e o manual de marca dela.
- `modoPadrao`: `'com'` para a versão comercial (consultoria) ou `'oab'` para a versão jurídica

O nome já está aplicado no site, nas landing pages (`lp.js` → LP_CONFIG), no manifest e nos dados estruturados.

## 2. Publicar (grátis)
**Netlify ou Vercel:** arraste a pasta `landing/` para app.netlify.com/drop, ou conecte um repositório GitHub. Depois aponte seu domínio `.com.br` (comprado no registro.br) nas configurações de DNS.

Arquivos necessários: `index.html`, `style.css`, `app.js`, `i18n.js`, `i18n-dyn.js`, `extras.js`, `extras2.js`, `extras3.js`, `extras4.js`, `qualify.js`, `leads2.js`, `leads3.js`, `supabase.js`, `manifest.webmanifest`.
Não publique: `NOMES.md`, `MELHORIAS.md`, `DEPLOY.md`, `SUPABASE.md`, `supabase.sql`, `v1-backup.html`.

## 3. Receber os leads
Siga o `SUPABASE.md`: o envio de leads, newsletter, radar, parceiros, agendamentos e avaliações já está pronto, falta só colar a URL e a chave.

## 3b. Comunidade de verdade (próximo passo)
Hoje, contas, fórum, leads e agendamentos ficam no navegador de cada visitante. Para que todos vejam o mesmo fórum e você receba os leads:
1. Crie um projeto grátis no Supabase (supabase.com).
2. Crie as tabelas `leads`, `posts`, `replies`, `profiles`, `radar`, `partners`, `agenda`.
3. Ative o login por e-mail (Supabase Auth). Ele substitui o login local e cuida de senhas e de "esqueci a senha".
4. Troque as funções `DB.get`/`DB.set` em `app.js` por chamadas ao Supabase.

Caminho mais simples só para os leads: envie o formulário para um Google Form, Formspree ou webhook do seu CRM (RD Station, HubSpot).

## 4. Medição
Cole o Google Tag Manager no `<head>`. Os eventos já são enviados ao `dataLayer`: `lead`, `quiz_done`, `calc_open`, `sim_save`, `schedule`, `radar_signup`, `form_start`, `scroll_50` e outros. A coleta respeita a escolha de cookies do visitante.

## 5. Links úteis para anúncios
- `#calc-c1` … `#calc-c12` abrem cada calculadora
- `#lang-en` / `#lang-zh` abrem a página em inglês ou chinês
- `#modo-oab` / `#modo-com` escolhem a versão
- `?utm_source=...&utm_campaign=...` ficam registrados junto com o lead
- `#ref-CODIGO` registra quem indicou
- `#crivo-leilao`, `#crivo-trib`, `#crivo-emp`, `#crivo-inv` abrem o crivo de qualificação direto, ótimos para anúncios
- `?utm_campaign=` com leilao, tributario, empresa ou invest muda o título da página para o tema do anúncio
- `#admin` abre o painel local de leads
