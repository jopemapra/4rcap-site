# Benchmark de design e CRO: landing pages 4RCAP

Data: 02/11/2026

## 0. O que deu para abrir

O ambiente bloqueia o acesso direto aos sites. Todas as tentativas de WebFetch falharam com "host fora dos domínios permitidos da sessão" (ENOTFOUND):
btgpactual.com, xpi.com.br, warren.com.br, nubank.com.br, mercury.com, ramp.com, stripe.com, taxgroup.com.br, rosenbaum.adv.br.
Parei de tentar depois de 9 falhas seguidas. Para análise ao vivo, esses domínios precisam ser liberados nas configurações de rede da sessão.

O WebSearch funcionou, mas só devolveu resumos de texto, sem visual:
- Recuperação tributária: os primeiros resultados orgânicos são blogs e portais (jus.com.br, contabeis, netcpa) e páginas de consultorias como Tax Group (taxgroup.com.br/solutions/recuperacao-de-creditos-tributarios), Tributo Devido e AmdJus. O argumento que mais se repete é "recupere tributos pagos a mais nos últimos 5 anos", junto com avisos sobre créditos fictícios e risco de glosa. Isso mostra que nesse mercado **confiança e segurança jurídica** pesam mais que promessa de valor.
- Leilão de imóveis: aparecem dois modelos. Um é a assessoria jurídica de escritório (Rosenbaum Advogados, rosenbaum.adv.br), que vende segurança: leitura do processo, ônus, imissão na posse. O outro é a assessoria de plataforma (leilaoimovel.com.br), que vende facilidade com a promessa "assessoria completa e gratuita" e oferece um relatório jurídico avulso. Há também ofertas agressivas ("com 30 mil já dá pra começar", via tally.so) que são o **contraexemplo**: tom de guru que um público premium rejeita.

**Atenção:** as descrições de paleta, tipografia e estrutura dos sites de referência (seção 1) vêm do meu conhecimento desses sites até 2025/2026, **não de uma visita feita hoje**. Headlines e CTAs entre aspas são aproximados e podem ter mudado. Confira antes de citar.

## 1. Sites de referência (de memória, sem verificação ao vivo)

| Site | Paleta | Tipografia | 1ª dobra | Prova | Confiança |
|---|---|---|---|---|---|
| BTG Pactual | Fundo branco/claro, azul-marinho institucional (#0B2B5B aprox.), azul vivo pontual | Sans grotesca proprietária, pesos médios, sem serif | Banner com foto editorial real ou cena de produto, headline curta e CTA "Abra sua conta" | "Maior banco de investimentos da América Latina", prêmios (Euromoney etc.) | Sobriedade, muito branco, foto real |
| XP | Preto e branco com amarelo XP como acento | Sans grotesca bold | Headline de impacto, CTA "Abra sua conta", às vezes formulário curto (nome/e-mail/celular) | Milhões de clientes, R$ bi sob custódia | Números grandes e institucionais |
| Nubank | Roxo #820AD1 com muito branco | Sans proprietária (Graphik/NuSans) | Foto real de pessoa ou cartão, CTA com campo de CPF dentro do hero | Número de clientes, nota em lojas de app | Um campo só, fricção mínima |
| Warren | Claro, com acentos rosa/coral | Sans geométrica | Headline conversacional, CTA "Comece a investir" | Patrimônio sob gestão, fundadores | Tom humano |
| Itaú BBA | Branco, laranja Itaú e azul-escuro | Itaú Display/Text (sans) | Institucional, sem formulário, "Fale com um especialista" | Rankings, league tables | Peso institucional |
| Stripe | Branco com gradiente-assinatura (exceção, não regra) | Sohne (grotesca), pesos 400–500 | "Financial infrastructure to grow your revenue", CTA "Start now" + "Contact sales" | Logos de clientes (Amazon, Shopify…), volume processado em US$ tri | Logos, produto real (UI) |
| Mercury | Off-white/creme e cinza quente, roxo-acinzentado; modo escuro editorial | Arcadia (sans) + serif fina pontual | "Banking that does more", com campo de e-mail + "Open account" | "Trusted by 200k+ companies", depoimentos de fundadores com foto | Foto real e calma, muito ar |
| Ramp | Branco/creme com amarelo-lima #E4F222 aprox. | Sans grotesca bold e compacta | "Save time and money", CTA com campo de e-mail "Get started" | "Customers save 5% on average", logos, G2 | Número de economia concreto |
| Wealthfront | Branco com roxo | Sans | Taxa/APY em destaque como número-herói | AUM, clientes | Número verificável |

## 2. Dez padrões dos melhores
1. **Fundo claro como padrão**, com o escuro reservado a seções pontuais (Stripe, Mercury, Ramp, BTG, Itaú).
2. **Uma sans grotesca bem feita domina.** Serif aparece, quando aparece, como acento fino e nunca em itálico decorativo (Mercury).
3. **Headline de 3 a 7 palavras, literal e com benefício.** Nada de metáfora ("Save time and money", Ramp).
4. **CTA com verbo concreto e campo embutido** no hero: e-mail ou CPF (Nubank, Mercury, Ramp).
5. **Um número-herói específico** ("5%", "200k+", APY) em vez de vários números redondos.
6. **Logos ou instituições logo abaixo da dobra**, em cinza monocromático (Stripe, Ramp).
7. **Produto ou pessoa real na imagem**: screenshot de UI ou foto editorial, nunca ilustração genérica.
8. **Cor de acento usada com parcimônia**, só em CTA e destaques (amarelo XP, lima Ramp).
9. **Layouts assimétricos e variados.** Cada seção tem uma composição diferente, sem grade de cards iguais.
10. **Transparência regulatória no rodapé e perto do CTA**: CNPJ, registro CVM/ANCORD, Bacen (BTG, XP).

## 3. Por que uma página "parece feita por IA"
- Navy + dourado + Playfair itálico: é o "premium" padrão de template, não de marca.
- Emojis ou ícones genéricos em círculos, e grade 3x3 de cards idênticos com cantos de 16–24px.
- Gradientes radiais, glow, glassmorphism.
- Copy vaga ("Transformamos o seu futuro financeiro com excelência"), números redondos sem fonte ("+1000 clientes"), depoimentos sem sobrenome nem foto.
- Todas as seções com o mesmo ritmo: título centralizado, sub, cards.

**O que os sites reais fazem diferente:** têm especificidade (números com fonte e data, nomes completos, CNPJ), restrição (1 fonte, 1 acento), hierarquia editorial (alinhamento à esquerda, linhas finas, tabelas), imagens reais e texto que um advogado aprovaria.

## 4. Especificação recomendada para a 4RCAP

### Paleta
| Token | Hex | Uso |
|---|---|---|
| ink | #0E1116 | Texto principal, seções escuras pontuais |
| paper | #F6F4EF | Fundo principal (off-white quente) |
| white | #FFFFFF | Superfícies e formulários |
| graphite | #4A4F57 | Texto secundário |
| line | #DAD6CC | Divisores de 1px |
| accent (verde-petróleo) | #0F5C4D | CTA primário e links |
| accent-hover | #0B4A3E | Hover |
| signal | #C8F169 | Destaque mínimo em números ou marcador (opcional, no máximo 1 por tela) |
| error | #B42318 | Erros de formulário |

**Sem dourado e sem navy.** O verde-petróleo transmite dinheiro e segurança sem cair no clichê.

### Tipografia (Google Fonts)
- Títulos: **Inter Tight** 600, tracking -0.02em. H1 56–64px no desktop e 36–40px no mobile.
- Texto: **Inter** 400/500, 17–18px, entrelinha 1.55.
- Números: **IBM Plex Mono** 500 ou Inter Tight com `font-variant-numeric: tabular-nums`.
- Acento opcional: **Instrument Serif** regular (não itálico), no máximo 1 palavra ou citação por página.

### Grid e forma
- 12 colunas, máximo 1200px, gutter 24px, margem lateral de 16px no mobile.
- Raio de 4–6px, bordas de 1px na cor `line` e sem sombras grandes.
- Seções alternam `paper`, `white` e uma faixa em `ink`.

### Ícones
- Lucide ou Phosphor em traço de 1.5px, 20–24px, na cor `ink`, sem círculo de fundo. É preferível usar números de etapa ("01, 02, 03") em mono a usar ícones.

### Números
- Formato BR completo: "R$ 2,4 milhões". Sempre com fonte e período ("créditos identificados em 2025, base de 140 empresas"). Tabular, grande (48–72px), com legenda pequena em `graphite`.

### Botões
- Primário: fundo `accent`, texto branco, 48px de altura, raio 6px, Inter 500 16px, rótulo com verbo + objeto ("Solicitar diagnóstico gratuito").
- Secundário: texto `ink` com sublinhado ou borda de 1px. Sem gradiente e sem ícone de seta animado.

### Fotos (placeholders)
- Fotos editoriais reais da equipe (sócio em reunião, mesa com documentos), com luz natural e leve dessaturação. Nada de banco de imagem com aperto de mão.
- Placeholder: retângulo `#E7E3DA` com legenda "Foto: sócio responsável, escritório".

### Primeira dobra: landing de recuperação tributária
- Layout em duas colunas: 7 de texto à esquerda e 5 de formulário em card branco à direita.
- Eyebrow (mono, 13px): "RECUPERAÇÃO DE CRÉDITOS TRIBUTÁRIOS · PMEs".
- H1: **"Sua empresa pode ter pago imposto a mais nos últimos 5 anos."**
- Sub: "Revisamos sua apuração de PIS, COFINS, ICMS e INSS sem custo inicial. Você só paga um percentual do que for efetivamente recuperado."
- Formulário com 4 campos: nome, e-mail corporativo, WhatsApp e regime tributário (select: Simples / Presumido / Real). CTA: **"Solicitar diagnóstico gratuito"**. Microcopy: "Resposta em até 2 dias úteis. Seus dados ficam protegidos (LGPD)."
- Faixa de prova logo abaixo, com 3 números específicos em mono e fonte citada, mais o CNPJ e "base legal: art. 165 do CTN".
- Seção seguinte: "Como funciona" em 4 passos numerados em linha horizontal, sem cards.

## 5. Headlines alternativas
1. "Imposto pago a mais é caixa parado. Vamos recuperá-lo."
2. "Recupere tributos dos últimos 5 anos. Pague só sobre o resultado."
3. "Diagnóstico tributário em 10 dias, sem custo inicial."
4. "O crédito já é da sua empresa. Nós cuidamos do processo."
5. "Menos imposto pago, mais caixa. Com segurança jurídica."

## Fontes
- Pesquisa (só resumos): https://www.taxgroup.com.br/solutions/recuperacao-de-creditos-tributarios/ · https://jus.com.br/artigos/104385/recuperacao-de-credito-tributario-o-que-e-e-como-funciona · https://netcpa.com.br/colunas/recuperacao-de-credito-tributario-em-crescimento-saiba-como-a-pratica-auxilia-empresas-que-precisam-de-fluxo-de-caixa/14761 · https://tributodevido.com.br/portal/recuperacao-creditos-tributarios-empresas-podem-reaver/ · https://www.rosenbaum.adv.br/direito-imobiliario-e-leiloes/advogado-leilao-de-imoveis · https://www.leilaoimovel.com.br/hotsite/venda-relatorio-juridico/imovel/2932916 · https://tally.so/r/nr7WG5
- Não abertos (bloqueados): btgpactual.com, xpi.com.br, warren.com.br, nubank.com.br, mercury.com, ramp.com, stripe.com.
