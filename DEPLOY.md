# Como publicar e personalizar a landing page

## 1. Personalizar (5 minutos)
Abra `app.js` e edite o bloco `CONFIG` no topo do arquivo:
- `marca`: **Gera Caixa** (definido em 01/11/2026). Conceito: 4 frentes, 4 R (Recuperar, Render, Reestruturar, Realizar valor) e 1 resultado: Retorno. Slogan: "4 frentes. 1 resultado: retorno." Antes de investir na marca, registre no INPI (classes 35 e 36) e compre geracaixa.com.br.
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
Cole o Google Tag Manager no `<head>` (opcional para a lp-tributario: o evento `Lead` do Meta não depende de GTM; ver 6b). Os eventos já são enviados ao `dataLayer`: `lead`, `quiz_done`, `calc_open`, `sim_save`, `schedule`, `radar_signup`, `form_start`, `scroll_50` e outros. A coleta respeita a escolha de cookies do visitante.

## 5. Links úteis para anúncios
- `#calc-c1` … `#calc-c12` abrem cada calculadora
- `#lang-en` / `#lang-zh` abrem a página em inglês ou chinês
- `#modo-oab` / `#modo-com` escolhem a versão
- `?utm_source=...&utm_campaign=...` ficam registrados junto com o lead
- `#ref-CODIGO` registra quem indicou
- `#crivo-leilao`, `#crivo-trib`, `#crivo-emp`, `#crivo-inv` abrem o crivo de qualificação direto, ótimos para anúncios
- `?utm_campaign=` com leilao, tributario, empresa ou invest muda o título da página para o tema do anúncio
- `#admin` abre o painel local de leads

## 6. Antes de ligar os anúncios da lp-tributario (checklist)
Rode na pasta do site e só publique quando os itens estiverem resolvidos:

    grep -rn "a confirmar" lp-tributario.html privacidade.html lp.js ANUNCIOS-TRIBUTARIO.md
    grep -n "5500000000000" lp.js privacidade.html

**Dados que só o João pode informar** (ficam como **[a confirmar]** até lá; não inventar):
- `LP_CONFIG.whatsapp` em `lp.js` e o link de contato em `privacidade.html`: número real.
- Rodapé da `lp-tributario.html` e "Controlador" em `privacidade.html`: razão social, endereço (cidade/UF) e e-mail (Decreto 7.962/2013 e LGPD art. 41).
- Domínio: `canonical` e `og:image` da landing e o `[domínio a confirmar]` de todos os links do `ANUNCIOS-TRIBUTARIO.md`.
- `privacidade.html`: confirmar fornecedores, prazo de guarda (24 meses) e transferência internacional.

**Arquivos da landing que precisam subir juntos:** `lp-tributario.html`, `lp2.css`, `lp.js`, `privacidade.html` e a pasta **`/fonts`** inteira (as fontes são servidas pelo próprio site; sem a pasta, a página cai na fonte do sistema). Depois de publicar, abra a landing com o DevTools (aba Network, filtro "font") e confira que os `.woff2` voltam 200.
Não publique: `FONTES-TRIBUTARIO.md`, `ANUNCIOS-TRIBUTARIO.md`, `supabase.sql`, a pasta `criativos/`.

### 6a. Supabase: rodar as duas migrações antes de ir ao ar
No SQL Editor do Supabase, rode o `supabase.sql` inteiro (pode rodar de novo sem problema). As duas migrações do fim são obrigatórias:
1. `alter table public.leads alter column email drop not null;` (o e-mail ficou opcional no formulário; sem isso, lead sem e-mail é recusado).
2. `create unique index if not exists leads_protocolo_uq on public.leads(protocolo);` (impede lead duplicado quando a fila do navegador reenvia). Se der erro de duplicidade, rode a consulta comentada logo acima dela no arquivo e resolva as linhas repetidas.

Teste: faça uma simulação real com o seu número e confira a linha em `leads_recentes`. Se o envio falhar, a landing registra `lead_send_fail` e guarda o lead no navegador para reenviar.

### 6b. Pixel do Meta: conferir o evento Lead
O `Lead` do Meta sai direto do `lp.js` (`fbq`), **sem GTM**:
1. Preencha `LP_CONFIG.metaPixelId` em `lp.js` com o ID do Pixel e publique.
2. No Gerenciador de Eventos do Meta, abra **Testar eventos**, cole a URL da landing e abra pelo botão do próprio Meta.
3. Faça a simulação e envie o formulário. Devem aparecer `PageView` e **`Lead`** em poucos segundos. Com a extensão Meta Pixel Helper (Chrome) dá para ver o mesmo na página.
4. Só depois disso escolha `Lead` como evento de otimização da campanha.
Eventos da landing no `dataLayer` (para GTM/Google Ads, se usar): `calc_done`, `lead`, `wa_click`, `partner_click`, `lead_send_fail`. A conversão do Google Ads precisa de gtag ou GTM lendo `lead`.

### 6c. Rotina mensal (dia 21 de cada mês)
O DAS vence no dia 20 e cada pagamento sai do prazo de 5 anos no próprio aniversário. No dia 21, o pagamento mais antigo muda, então:
1. Rode o servidor local (`python3 -m http.server 8765`) e gere o criativo do mês seguinte: `node criativos/render.js AAAA-MM` (ex.: em 21/11/2026, `node criativos/render.js 2026-12`).
2. Abra `criativos/prazo-feed-AAAA-MM.png` e `prazo-story-AAAA-MM.png`, confira as datas e troque o criativo no anúncio C do Meta.
   Faça o mesmo com `planilha-feed-AAAA-MM.png` e `planilha-story-AAAA-MM.png` nos anúncios B-planilha (a planilha mostra as 60 competências dentro do prazo, então também muda todo mês).
3. No texto do anúncio C, avance o mês de "desde nov/2021" (ex.: vira "desde dez/2021"). Se não for possível manter isso todo mês, use "dos últimos 5 anos".
4. A landing atualiza sozinha (a janela é calculada pela data do visitante).
