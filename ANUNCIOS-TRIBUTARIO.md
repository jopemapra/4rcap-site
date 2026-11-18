# Anúncios: recuperação tributária (destino: lp-tributario.html)

Todos os anúncios levam para a landing tributária, sempre com UTM, para o lead chegar ao Supabase com a origem certa.
Regra de ouro: **não prometer valor, resultado nem prazo de resposta da Receita**. Falar em "pode ter pago a mais", "simule" e "estimativa".
Escrita: sempre "Cofins" (não "COFINS"). Base legal de cada frase: `FONTES-TRIBUTARIO.md`.
Domínio: todos os links usam `https://[domínio a confirmar]/`. Troque pelo domínio real antes de subir (ver `DEPLOY.md`).

O que o anúncio promete tem de bater com a landing: a landing revisa **PIS e Cofins pagos no DAS** (monofásico no Simples), responde **em até 1 dia útil** e cobra **honorários só sobre o que for efetivamente recuperado**. Os anúncios não falam de ICMS, INSS, "diagnóstico em 10 dias" nem "pago em dobro", porque a página não trata disso.

---

## Esquema de UTM (vale para Meta e Google)

| Parâmetro | Meta | Google |
|---|---|---|
| `utm_source` | `meta` | `google` |
| `utm_medium` | `paid_social` | `cpc` |
| `utm_campaign` | `tributario` | `tributario` |
| `utm_content` | versão + criativo (tabela abaixo) | grupo de anúncios (`B-monofasico`, `A-geral`) |
| `utm_term` | não usar | `{keyword}` (ValueTrack) |

**Como a landing lê o `utm_content`:**
- **A primeira letra escolhe o ângulo do título da landing:** `A` = caixa parado, `B` = monofásico (pré-seleciona Simples Nacional), `C` = prazo de 5 anos. Outras letras (`D`, `R`) mostram o título padrão.
- **Palavras que pré-selecionam o segmento na simulação:** `farmacia`, `autopecas`, `bebidas`, `mercado`. Ex.: `B-farmacia-chat` abre com Simples e farmácia marcados.
- Use só letras minúsculas sem acento, números e hífen. Nada de espaço.

### Criativo → versão → `utm_content`

| Arquivo (pasta `criativos/`) | Versão no Meta | `utm_content` |
|---|---|---|
| sem arquivo: estático de texto "Imposto pago a mais é caixa parado." | A (caixa parado) | `A-caixa-parado` |
| `chat-feed.png` / `chat-story.png` | B (farmácia) | `B-farmacia-chat` |
| `planilha-feed-AAAA-MM.png` / `planilha-story-AAAA-MM.png` (trocar no dia 21) | B (monofásico) | `B-planilha` |
| `prazo-feed-AAAA-MM.png` / `prazo-story-AAAA-MM.png` (do mês corrente) | C (prazo) | `C-prazo` |
| `planilha-feed-AAAA-MM.png` (reuso) ou estático de texto | D (contador) | `D-contador` |
| `chat-feed.png` / `chat-story.png` (reuso) | R (retargeting) | `A-retarget` |

Para testar a versão B por segmento, duplique o conjunto e troque só a palavra: `B-autopecas-planilha`, `B-bebidas-planilha`.

---

## META (Facebook e Instagram)

Objetivo da campanha: **Leads** (conversão no site, evento `Lead` do Pixel) ou **Tráfego** no começo, se o Pixel ainda não tiver dados.
Posicionamentos: Feed e Stories do Instagram, Feed do Facebook. Nos Stories, o Meta põe o próprio botão embaixo: os criativos já deixam essa área livre.

### Versão A: "caixa parado" (dor + curiosidade)
**Texto principal:**
> Sua empresa pode ter pago imposto a mais, e esse dinheiro pode voltar para o caixa.
>
> Revisamos o PIS e a Cofins pagos no DAS nos últimos 5 anos, junto com o seu contador. Sem custo inicial: os honorários são um percentual apenas do que for efetivamente recuperado.
>
> Faça a simulação gratuita: 3 perguntas, cerca de 30 segundos.

**Título:** Quanto sua empresa pode recuperar? `(34/40)`  
**Descrição:** Simulação sem custo `(19/30)`  
**Botão:** Simular / Saiba mais  
**Criativo sugerido:** fundo off-white, texto grande "Imposto pago a mais é caixa parado." com "caixa parado" marcado em verde-limão e o logotipo Gera Caixa no canto. Sem foto de banco de imagem.  
**Link:** `https://[domínio a confirmar]/lp-tributario.html?utm_source=meta&utm_medium=paid_social&utm_campaign=tributario&utm_content=A-caixa-parado`

### Versão B: "monofásico" (segmento específico, costuma ser a mais barata por lead)
**Texto principal:**
> Farmácia, perfumaria, autopeças ou distribuidora de bebidas no Simples Nacional?
>
> Muitos desses produtos já têm PIS e Cofins recolhidos na indústria ou na importação. Se as receitas não foram separadas no PGDAS-D, o DAS pode ter cobrado PIS e Cofins a mais, e dá para revisar os pagamentos dos últimos 5 anos.
>
> Veja uma estimativa em cerca de 30 segundos. Seu contador continua o mesmo.

**Título:** PIS e Cofins a mais no DAS? `(27/40)`  
**Descrição:** Revisão dos últimos 5 anos `(26/30)`  
**Botão:** Simular  
**Criativos:** `chat-*.png` (conversa ilustrativa, farmácia) e `planilha-*-AAAA-MM.png` (planilha ilustrativa; troque pela do mês seguinte no dia 21, como o criativo de prazo). Suba os dois no mesmo conjunto, cada um com o seu link.  
**Links:**
- chat: `https://[domínio a confirmar]/lp-tributario.html?utm_source=meta&utm_medium=paid_social&utm_campaign=tributario&utm_content=B-farmacia-chat`
- planilha: `https://[domínio a confirmar]/lp-tributario.html?utm_source=meta&utm_medium=paid_social&utm_campaign=tributario&utm_content=B-planilha`

### Versão C: "prazo" (a urgência é só o relógio de 5 anos)
**Texto principal:**
> Todo mês, o pagamento mais antigo sai do prazo de 5 anos (art. 168 do CTN). Hoje dá para revisar os DAS pagos desde nov/2021, e esse pagamento sai do prazo em 20/11/2026. Em 2027 a CBS substitui o PIS e a Cofins no DAS, mas o que foi pago a mais até lá continua revisável, mês a mês.
>
> Simule quanto ainda está dentro do prazo. Sem custo inicial.

**Título:** O prazo de 5 anos anda todo mês `(31/40)`  
**Descrição:** Simulação sem custo `(19/30)`  
**Botão:** Saiba mais  
**Criativo:** `prazo-feed-AAAA-MM.png` e `prazo-story-AAAA-MM.png` do mês corrente (gerados por `node criativos/render.js`).  
**Link:** `https://[domínio a confirmar]/lp-tributario.html?utm_source=meta&utm_medium=paid_social&utm_campaign=tributario&utm_content=C-prazo`

**Atualização mensal (obrigatória):** o mês em "desde nov/2021" vale só até o dia 20 de nov/2026 (o DAS vence no dia 20 e cada pagamento sai do prazo no próprio aniversário). **No dia 21 de cada mês**, avance o mês e a data no texto (em 21/11/2026 vira "desde dez/2021, e esse pagamento sai do prazo em 20/12/2026") e troque os criativos `prazo-*-AAAA-MM.png` e `planilha-*-AAAA-MM.png` pelos do mês seguinte (rotina em `DEPLOY.md`). Se o anúncio não puder ser atualizado todo mês, troque a frase por **"Hoje ainda dá para revisar os DAS pagos dos últimos 5 anos."**
Não usar nesta versão: "evita perdas na transição", "seus créditos expiram", nem o argumento da escrituração da CBS (LC 214, art. 378), que só aparece no texto para Lucro Real (grupo do Google abaixo).

### Versão D: contador (parceria, sem tirar o cliente do contador)
**Texto principal:**
> Seu cliente do Simples vende medicamento, perfume ou autopeça? A gente confere o monofásico item a item e devolve o detalhamento para você validar. O cliente continua seu.

**Título:** Parceria para contadores `(24/40)`  
**Descrição:** Conferência por NCM `(19/30)`  
**Botão:** Saiba mais  
**Público:** interesses em contabilidade, contador, Conselho Regional de Contabilidade (CRC), escritório contábil; cargos "contador(a)", "analista contábil". Sem os interesses de varejo.  
**Link:** `https://[domínio a confirmar]/lp-tributario.html?utm_source=meta&utm_medium=paid_social&utm_campaign=tributario&utm_content=D-contador#parceiro` (abre direto no bloco de parceria; o clique no WhatsApp de parceiro gera `partner_click`).

### Retargeting: quem simulou e não deixou contato
**Texto principal:**
> Depois da simulação, vem a conferência por NCM, sem custo, junto com o seu contador.

**Título:** O próximo passo é conferir `(26/40)`  
**Descrição:** Sem custo, com seu contador `(27/30)`  
**Botão:** Saiba mais  
**Público:** pessoas que dispararam `calc_done` na landing nos últimos **7 a 30 dias**, **excluindo** quem disparou `Lead` (180 dias). O `lp.js` já manda o `calc_done` ao Pixel como evento personalizado (e o `lead` como `Lead`), então dá para montar o público personalizado direto no Meta. Se o Pixel ainda não tiver `calc_done` registrado, use "visitantes de lp-tributario.html nos últimos 30 dias, excluindo `Lead`".  
**Frequência:** no máximo 2 impressões por pessoa a cada 7 dias. Verba pequena (R$ 10 a 20 por dia).  
**Link:** `https://[domínio a confirmar]/lp-tributario.html?utm_source=meta&utm_medium=paid_social&utm_campaign=tributario&utm_content=A-retarget`

### Público (Meta, versões A, B e C)
- **Localização:** Brasil (ou seu estado, para começar com verba menor).
- **Idade:** 27 a 65 anos.
- **Interesses:** proprietários de pequenas empresas, empreendedorismo, Simples Nacional, contabilidade, Sebrae, gestão financeira. Na versão B, somar: farmácia, drogaria, autopeças, distribuidora de bebidas, cosméticos.
- **Comportamento:** administradores de páginas de empresas.
- **Verba de teste:** R$ 30 a 50 por dia por versão durante 5 a 7 dias. Depois, desligue a pior e aumente a melhor.

---

## GOOGLE (rede de pesquisa)

Quem pesquisa já está procurando a solução. Normalmente é o lead de maior intenção.

### Estrutura e URLs
- **URL final (todos os anúncios):** `https://[domínio a confirmar]/lp-tributario.html`
- **Sufixo do URL final** (nível do grupo de anúncios; o ValueTrack `{keyword}` é preenchido pelo Google):
  - Grupo `B-monofasico`: `utm_source=google&utm_medium=cpc&utm_campaign=tributario&utm_term={keyword}&utm_content=B-monofasico`
  - Grupo `A-geral`: `utm_source=google&utm_medium=cpc&utm_campaign=tributario&utm_term={keyword}&utm_content=A-geral`
  - Grupo `Lucro Real insumos` (pausado): `utm_source=google&utm_medium=cpc&utm_campaign=tributario&utm_term={keyword}&utm_content=A-lucro-real-insumos`
- Deixe a **codificação automática (gclid)** ligada; a landing guarda o `gclid` junto com o lead.

### Anúncio responsivo (grupos B-monofasico e A-geral): 15 títulos e 4 descrições
Contagem feita por código (limite do Google: 30 caracteres por título, 90 por descrição).

**Títulos**
1. Recupere Impostos Pagos a Mais `(30/30)`
2. Simule Grátis em 30 Segundos `(28/30)`
3. Revisão Tributária para PMEs `(28/30)`
4. Monofásico no Simples Nacional `(30/30)`
5. PIS e Cofins a Mais no DAS? `(27/30)`
6. Revisão dos Últimos 5 Anos `(26/30)`
7. Sem Custo Para Simular `(22/30)`
8. Pague Só Sobre o Recuperado `(27/30)`
9. Resposta em Até 1 Dia Útil `(26/30)`
10. Seu Contador Continua o Mesmo `(29/30)`
11. Farmácia no Simples? Simule `(27/30)`
12. Base Legal: Art. 165 do CTN `(27/30)`
13. Prazo de 5 Anos por Pagamento `(29/30)`
14. Simule Sua Estimativa Agora `(27/30)`
15. Gera Caixa Recuperação Tributária `(28/30)`

**Fixação:** deixe os títulos **sem fixar** (o Google combina melhor). Se quiser fixar algo no grupo `B-monofasico`, fixe só o título 4 ("Monofásico no Simples Nacional") na posição 1. Não fixe "Recupere Impostos Pagos a Mais" na posição 1.

**Descrições**
1. Revisamos PIS e Cofins pagos no DAS nos últimos 5 anos. Simule em cerca de 30 segundos. `(87/90)`
2. Sem custo inicial: honorários só sobre o valor efetivamente recuperado. Faça a simulação. `(89/90)`
3. Empresa do Simples com produtos monofásicos? Seu DAS pode ter cobrado PIS e Cofins a mais. `(90/90)`
4. Conferência item a item com seu contador e detalhamento por escrito. Comece grátis. `(83/90)`

### Palavras-chave (correspondência de frase, entre aspas)
**Grupo `B-monofasico`**
- "pis cofins monofásico"
- "monofásico simples nacional"
- "restituição pis cofins monofásico"
- "restituição pis cofins"
- "pis cofins farmácia simples nacional"
- "pis cofins autopeças simples"

**Grupo `A-geral`**
- "recuperação de crédito tributário"
- "recuperação tributária"
- "recuperar impostos pagos a mais"
- "revisão tributária empresa"
- "créditos tributários empresa"
- "consultoria tributária pme"

### Palavras negativas (evitam cliques que não viram cliente)
curso, apostila, pdf, concurso, vaga, emprego, salário, o que é, como fazer sozinho, grátis download, pessoa física, imposto de renda, restituição ir, mei, cpf, **exclusão icms base pis cofins**, tese do século

(A exclusão do ICMS da base do PIS e da Cofins é outra tese e a landing não trata dela.)

### Grupo "Lucro Real insumos" (criar **PAUSADO**)
Só ativar quando a landing tiver uma seção própria para Lucro Real. Texto apoiado só na decisão do STJ (REsp 1.221.170/PR, Temas 779 e 780) e na LC 214, art. 378, conforme `FONTES-TRIBUTARIO.md` §4 e §7. Sem promessa de valor nem de prazo.

**Títulos**
1. Créditos de Insumos: Tema 779 `(29/30)`
2. Lucro Real: Crédito de Insumos `(30/30)`
3. Essencialidade ou Relevância `(28/30)`
4. Insumos: REsp 1.221.170/PR `(26/30)`
5. Conferência Item a Item `(23/30)`
6. Seu Contador Continua o Mesmo `(29/30)`
7. Gera Caixa Recuperação Tributária `(28/30)`

**Descrições**
1. STJ, Temas 779 e 780: insumo se mede pela essencialidade ou relevância para a atividade. `(88/90)`
2. Conferimos item a item quais gastos do Lucro Real podem gerar crédito de PIS e Cofins. `(86/90)`
3. Crédito de PIS/Cofins na transição para a CBS depende de escrituração (LC 214, art. 378). `(89/90)`
4. Sem custo inicial: honorários só sobre o valor efetivamente recuperado. Faça a simulação. `(89/90)`

**Palavras-chave:** "crédito pis cofins insumos", "insumos lucro real pis cofins", "tema 779 stj insumos", "essencialidade e relevância insumos".

### Configuração
- **Verba de teste:** R$ 40 a 60 por dia.
- **Lance:** "Maximizar cliques" na primeira semana; depois de 15 a 20 leads, mudar para "Maximizar conversões".
- **Frases de destaque:** "Sem custo inicial" `(17/25)`, "Resposta em 1 dia útil" `(22/25)`, "Seu contador continua" `(21/25)`, "Detalhamento por escrito" `(24/25)`.
- **Sitelinks:** perguntas frequentes, "Como funciona" e "Para contadores" (`#parceiro`), todos com o mesmo sufixo de URL do grupo.

---

## Checklist antes de ligar
- [ ] Domínio definido e trocado em todos os links deste arquivo (`[domínio a confirmar]`).
- [ ] Site publicado (Vercel/Netlify) e link da landing funcionando, com a pasta `/fonts` publicada.
- [ ] WhatsApp real em `LP_CONFIG` (lp.js): número, razão social, endereço e e-mail continuam **[a confirmar]** até o João informar.
- [ ] Supabase ligado (URL + chave anon em lp.js) e as duas migrações do `supabase.sql` rodadas (e-mail opcional + protocolo único).
- [ ] **Pixel do Meta:** com `LP_CONFIG.metaPixelId` preenchido, a landing dispara `PageView` e, ao enviar o formulário, o evento padrão **`Lead`** direto pelo `fbq`. **Não precisa de GTM para o `Lead` do Meta.** Conferir com o Meta Pixel Helper e no Gerenciador de Eventos (ver `DEPLOY.md`).
- [ ] **Eventos que existem na landing** (vão para o `dataLayer` e, com o Pixel ligado, também para o Meta como eventos personalizados): `calc_done` (simulação concluída), `lead` (formulário enviado; vira `Lead` no Meta), `wa_click` (clique no WhatsApp), `partner_click` (clique de contador no bloco de parceria), `lead_send_fail` (falha ao gravar o lead no Supabase; o lead fica na fila do navegador e é reenviado).
- [ ] **Google Ads:** a conversão do Google precisa de uma tag (gtag ou GTM) lendo o evento `lead` do `dataLayer`. Use `lead` como conversão principal e `wa_click` como secundária.
- [ ] Confirmado que você realmente oferece "honorários só sobre o valor efetivamente recuperado".
- [ ] Alguém pronto para responder o WhatsApp em até 1 dia útil (de preferência em minutos) nos horários dos anúncios.
- [ ] Anúncio C e criativo `prazo-*` do mês corrente (dia 21 de cada mês).

## Como ler os resultados (depois de 7 dias)
| Métrica | Bom sinal | Ação se estiver ruim |
|---|---|---|
| Taxa de clique (Meta) | acima de 1% | trocar o criativo e a primeira frase |
| Custo por clique (Google) | abaixo de R$ 4 | rever palavras-chave e negativas |
| Visita → simulação (`calc_done`) | acima de 25% | testar outro título na landing |
| Simulação → lead (`lead`) | acima de 30% | testar "só WhatsApp" no lugar de 3 campos |
| `lead_send_fail` | zero | conferir URL/chave do Supabase e as migrações |
| Leads faixa A/B | acima de 40% | apertar o público (segmento e faturamento) |
