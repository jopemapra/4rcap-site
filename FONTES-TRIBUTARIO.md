# Fontes: landing tributária e anúncios

Base legal de cada afirmação usada na `lp-tributario.html`, no `ANUNCIOS-TRIBUTARIO.md` e nos criativos (`criativos/`).
Primeiro vem a fonte oficial (lei, decisão), depois os artigos de apoio.

> **STF, STJ e normas.receita conferidos em 17/11/2026; Planalto e gov.br inacessíveis desta máquina, conferir antes de publicar.**
> Legenda usada abaixo:
> - **conferido no texto oficial em nov/2026**: a página oficial foi aberta nesta revisão e o trecho citado foi lido nela.
> - **a conferir**: o texto oficial não pôde ser aberto daqui (Planalto e gov.br não respondem; normasinternet2, onde fica a íntegra dos atos da Receita, é recusado pelo proxy). O conteúdo vem de artigos de apoio e do conhecimento consolidado. Abrir o link oficial antes de publicar.
> Também tentados sem sucesso: legislacao.presidencia.gov.br, normas.leg.br, www.camara.leg.br, www.lexml.gov.br.

---

## 1. Prazo de 5 anos para pedir de volta
**Na landing e no anúncio C:** "O prazo é de 5 anos, contado de cada pagamento", "Hoje dá para revisar os DAS pagos desde nov/2021. Esse pagamento sai do prazo em 20/11/2026; os seguintes saem um por mês." (A landing calcula o mês e a data pela data do visitante.)

**Fontes oficiais**
- CTN (Lei 5.172/1966), **art. 165** (direito à restituição do tributo pago indevidamente ou a maior) e **art. 168, I** (o direito se extingue em 5 anos, contados da extinção do crédito tributário): https://www.planalto.gov.br/ccivil_03/leis/l5172.htm · *a conferir*
  (Não citamos o art. 166, que trata de tributo indireto com repasse do encargo, para não abrir essa discussão.)
- LC 118/2005, art. 3º: no lançamento por homologação, a extinção do crédito ocorre no momento do pagamento, então o prazo conta de cada pagamento. https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp118.htm · *a conferir*
- LC 123/2006, art. 21, III: o DAS vence no **dia 20 do mês seguinte** ao da competência. https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp123.htm · *a conferir*

**Regra de contagem usada na landing e nos criativos:**
- Cada DAS sai do prazo no **aniversário de 5 anos do próprio pagamento**. Como o vencimento é no dia 20, até o dia 20 de nov/2026 ainda está no prazo o DAS pago em nov/2021 (competência out/2021); a partir do dia 21, o mais antigo passa a ser o de dez/2021.
- Por isso a janela da landing é: mesmo mês, 5 anos antes; se hoje for depois do dia 20, avança um mês. Os criativos `prazo-*-AAAA-MM.png` usam a mesma regra.
- Se o DAS foi pago com atraso, vale a data do pagamento real. Por isso o texto diz "dos últimos 5 anos" e não "5 anos garantidos".

---

## 2. Monofásico no Simples Nacional: retificar e pedir restituição
**Na landing:** "Se a receita não foi separada no PGDAS-D, o DAS pode ter incluído PIS/Cofins que não era devido."

**Fontes oficiais**
- LC 123/2006, art. 18, §4º-A (segregação das receitas no PGDAS-D, inclusive as sujeitas à tributação concentrada/monofásica): https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp123.htm · *a conferir*
- LC 123/2006, **art. 21, §§ 5º e seguintes** (o CGSN regula a compensação e a restituição de valores do Simples Nacional recolhidos indevidamente ou a maior): mesmo link · *a conferir*
- **Resolução CGSN 140/2018**, arts. 128 a 132 (restituição e compensação no Simples Nacional; retificação do PGDAS-D antes do pedido). Ementa conferida em normas.receita (idAto 92278, publicada em 24/05/2018: "Dispõe sobre o Regime Especial Unificado de Arrecadação de Tributos e Contribuições devidos pelas Microempresas e Empresas de Pequeno Porte (Simples Nacional)"). A numeração dos artigos e parágrafos é *a conferir* no texto oficial: https://normas.receita.fazenda.gov.br/sijut2consulta/link.action?idAto=92278
- Receita Federal, análise de declarações retidas em malha (PGDAS-D): https://www.gov.br/pt-br/servicos/solicitar-analise-de-declaracoes-retidas-em-malha-pgdas-d · *a conferir*

**Como funciona na prática:** retifica o PGDAS-D dos meses afetados e depois faz o pedido de restituição no Portal do Simples Nacional ou no e-CAC. A Receita pode reter a retificação em malha e pode usar o valor para compensar débitos em aberto (compensação de ofício).

**Restituição é o caminho principal.** No Simples, o valor pago a mais é **restituído**, ou compensado **só com o mesmo tributo e com o mesmo ente** (PIS com PIS, Cofins com Cofins, dentro do próprio Simples), conforme a LC 123, art. 21, e a Res. CGSN 140, art. 131 (numeração dos parágrafos a conferir no texto oficial). Como o PIS e a Cofins deixam de existir em 2027 (EC 132/2023), não haverá débito futuro desses tributos para compensar: por isso a landing fala em **restituição**.

### Tabela do Anexo I usada pelo simulador (comércio) · *conferir no texto oficial*
Fonte: LC 123/2006, Anexo I (redação da LC 155/2016). Alíquota efetiva = (RBT12 × alíquota nominal − parcela a deduzir) ÷ RBT12.

| Faixa | Receita bruta em 12 meses (RBT12) | Alíquota nominal | Parcela a deduzir | Cofins | PIS | PIS + Cofins no DAS |
|---|---|---|---|---|---|---|
| 1 | até R$ 180.000,00 | 4,00% | R$ 0 | 12,74% | 2,76% | 15,50% |
| 2 | de R$ 180.000,01 a R$ 360.000,00 | 7,30% | R$ 5.940,00 | 12,74% | 2,76% | 15,50% |
| 3 | de R$ 360.000,01 a R$ 720.000,00 | 9,50% | R$ 13.860,00 | 12,74% | 2,76% | 15,50% |
| 4 | de R$ 720.000,01 a R$ 1.800.000,00 | 10,70% | R$ 22.500,00 | 12,74% | 2,76% | 15,50% |
| 5 | de R$ 1.800.000,01 a R$ 3.600.000,00 | 14,30% | R$ 87.300,00 | 12,74% | 2,76% | 15,50% |
| 6 | de R$ 3.600.000,01 a R$ 4.800.000,00 | 19,00% | R$ 378.000,00 | 28,27% | 6,13% | 34,40% |

**Premissas do simulador (internas, não são lei):** 55% da receita em produtos monofásicos (Simples); 60 meses; correção pela Selic estimada em **+22%**, que é **conservadora** (cálculo interno dá cerca de 32% para uma restituição pedida em 11/2026, somando a Selic mês a mês desde cada pagamento; a conferir com a tabela oficial da Receita); faixa de ×0,7 a ×1,15, arredondada a R$ 1 mil.
Exemplo usado no criativo de chat: R$ 130 mil/mês → RBT12 R$ 1,56 mi (faixa 4) → efetiva 9,26% → ~R$ 1.026/mês de PIS+Cofins sobre monofásicos → R$ 61,6 mil em 60 meses → R$ 75,1 mil com Selic → **R$ 53 mil a R$ 86 mil**.

**Apoio**
- https://juridicocerto.com/p/thiago-reis2/artigos/das-do-simples-pago-a-maior-por-que-o-pedido-trava-se-o-pgdas-d-nao-for-retificado-antes-8027
- https://www.esimplesauditoria.com/recuperar-pis-e-cofins-monofasico
- https://www.jettax.com.br/blog/restituicao-do-simples-nacional/
- https://okai.com.br/noticia/2023-02-17/operacao-autorregularizacao-do-simples-nacional-com-foco-em-pis-e-cofins-com-indicacao-de-existencia-de-tributacao-monofasica

---

## 3. CBS no lugar de PIS/Cofins a partir de 2027
**Na landing e nos anúncios:** "Em 2027 a CBS substitui o PIS e a Cofins, e o DAS muda." / "O que foi pago a mais até lá continua revisável, mês a mês."

**Fontes oficiais**
- EC 132/2023 (art. 126 do ADCT): https://www.planalto.gov.br/ccivil_03/constituicao/emendas/emc/emc132.htm · *a conferir*
- LC 214/2025, que cria a CBS e define a transição: https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp214.htm · *a conferir*

**Resumo:** 2026 foi ano de teste (CBS de 0,9%, dispensada para quem entrega as obrigações acessórias). Em 1º/01/2027, PIS e Cofins deixam de existir. A EFD-Contribuições continua em 2027 para apurações que ainda faltam. O fim dos tributos não apaga o direito de pedir de volta o que foi pago a mais: cada pagamento continua com o seu prazo de 5 anos (§1).

**Apoio**
- https://www.reformatributaria.com/tecnologia/efd-contribuicoes-seguira-ativa-em-2027-para-regime-de-caixa-e-creditos-de-transicao-da-cbs/
- https://jornalcontabil.com.br/noticia/extincao-do-pis-cofins-e-entrada-da-cbs-exigem-atencao-das-empresas/
- https://documentacao.senior.com.br/exigenciaslegais/noticias/federal/2026/2026-11-09-sped-efd-contribuicoes-nota-tecnica-no-13-2026-adequacoes-decorrentes-da-transicao-para-a-cbs-a-partir-de-2027

---

## 4. Créditos antigos de PIS/Cofins na transição (LC 214/2025, arts. 378 a 383)
**Na landing:** "A Reforma não apaga o que foi pago a mais nos últimos anos." **Não usamos** "seus créditos expiram em 31/12/2026" (a frase da IntelliTasse), porque a lei não diz isso.
**Nos anúncios:** o argumento da escrituração só aparece no texto para **Lucro Real** (grupo "Lucro Real insumos" do Google). Simples Nacional não tem crédito escritural de PIS/Cofins: o caso dele é restituição (§2).

**O que a lei diz (Lucro Real/Presumido):**
- O saldo de créditos de PIS/Cofins que sobrar pode ser compensado com a CBS ou com outros tributos federais, ou ressarcido.
- O art. 378 pede que o crédito esteja na escrituração (EFD-Contribuições).
- Especialistas ainda discutem se créditos lançados depois de 31/12/2026 (os extemporâneos) serão aceitos. Por isso o recado seguro é "vale revisar ainda em 2026".
- O prazo de 5 anos continua correndo (**art. 378, que preserva a fluência do prazo; art. 383 trata dos créditos dos arts. 379-381**), e a forma de contar esse prazo também está em debate.

**Regulamentação:** IN RFB 2.344/2026. **Ementa oficial** (conferida em normas.receita em 17/11/2026; idAto 153636, ato de 18/09/2026, publicado em 21/09/2026):
> "Dispõe sobre a utilização de saldos credores da Contribuição para o PIS/Pasep e da Cofins para compensação com débitos próprios, nos termos do art. 5º da Lei Complementar nº 235, de 27 de agosto de 2026."

Alcance: **segundo a cobertura, restrita a etanol, limite R$ 750 mi em 2026 (conferir art. 1º).** A busca no índice oficial encontra os termos "etanol", "produtor" e "setecentos" no texto do ato, mas a íntegra fica em normasinternet2, que não abriu daqui. Antes de afirmar qualquer coisa sobre os demais setores, conferir se saiu ato novo.
https://normas.receita.fazenda.gov.br/sijut2consulta/link.action?idAto=153636

**Fonte oficial:** LC 214/2025, arts. 378 a 383: https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp214.htm · *a conferir*

**Apoio**
- Receita Federal e CFC, material de apoio sobre a EFD-Contribuições na transição: https://www.gov.br/receitafederal/pt-br/acesso-a-informacao/acoes-e-programas/programas-e-atividades/reforma-tributaria-do-consumo/curso/material-de-apoio/5o-modulo-cfc-rfb-obrigacoes-acessorias-efd-contribuicoes-guilherme.pdf
- PwC, gestão de saldos credores: https://www.pwc.com.br/pt/thinking-about-taxes/tax-intelligence/2026/tax-intelligence-raciocinios-ed-06_Gestao-de-saldos-credores.pdf
- https://www.reformatributaria.com/opiniao/creditos-de-pis-cofins-e-a-lc-214-2025-por-que-adotar-a-interpretacao-literal-do-art-378/
- https://www.reformatributaria.com/opiniao/creditos-de-pis-cofins-na-transicao-para-a-cbs-a-receita-federal-reduz-incertezas-mas-o-debate-juridico-continua/
- https://www.reformatributaria.com/iva/receita-prepara-instrucao-normativa-para-detalhar-uso-de-creditos-de-pis-cofins-na-cbs/
- https://online.crcsp.org.br/portal/noticias/noticia.asp?c=11042
- https://www.barbieriadvogados.com/?p=15036
- https://taxup.com.br/creditos-pis-cofins-transicao-cbs/
- https://apet.org.br/?p=130237
- https://apet.org.br/?p=143053
- https://escolasuperioresn.com.br/creditos-extemporaneos-pis-cofins-cbs

---

## 5. O Simples continua depois da Reforma
**Na landing:** "O DAS muda em 2027, mas o que já foi pago ainda pode ser revisado."

**Fonte oficial:** **Res. CGSN 186/2026, alterada pela Res. CGSN 194/2026 (DOU 28/09/2026): opção pelo Simples até 15/10/2026; opção pelo regime regular de IBS/CBS até 30/10/2026, valendo para jan–jun/2027; cancelamento entre 3/11 e 20/12/2026.**
- Ementas conferidas em normas.receita em 17/11/2026: Res. CGSN 186/2026 (idAto 150653, publicada em 17/04/2026) "Dispõe sobre os prazos e condições para o exercício de opção pelo Simples Nacional e, em relação aos optantes, pelo regime regular do IBS e da CBS no ano-calendário de 2027 [...]"; Res. CGSN 194/2026 (idAto 153801, publicada em 28/09/2026) "Altera a Resolução CGSN nº 186, de 9 de abril de 2026 [...]".
- As datas (15/10, 30/10, 3/11 a 20/12) são *a conferir* no texto dos artigos: a íntegra não abriu daqui.
- https://normas.receita.fazenda.gov.br/sijut2consulta/link.action?idAto=150653 · https://normas.receita.fazenda.gov.br/sijut2consulta/link.action?idAto=153801

**Apoio**
- https://viva.com.br/dinheiro/simples-nacional-2027-entenda-os-novos-prazos-e-as-opcoes-disponiveis.html
- https://investalk.bb.com.br/noticias/economia/simples-nacional-2027-veja-quem-pode-optar-e-o-prazo-para-escolher-o-regime
- https://movimentoeconomico.com.br/receita-federal/2026/09/18/simulador-da-receita-indica-impacto-de-cbs-e-ibs-nas-empresas-do-simples/

---

## 6. Multa quando a compensação é recusada
**Na landing:** "Pedido sem base técnica pode ser recusado. Se o valor já tiver sido compensado, o débito volta com juros e multa." (Na restituição não há débito: o tributo já foi pago.) **Não usamos** "multa de 50% em toda compensação negada".

**Fontes oficiais**
- Lei 9.430/1996, art. 74, §17 (multa isolada de 50% sobre compensação não homologada) e **art. 44: multa de ofício de 75%; qualificada de 100% (150% só na reincidência), redação da Lei 14.689/2023; STF Tema 863 limita a 100%.** https://www.planalto.gov.br/ccivil_03/leis/l9430.htm · *a conferir*
- **STF, Tema 736** (RE 796.939, rel. Min. Edson Fachin, julgado na sessão virtual de 10 a 17/03/2023): https://portal.stf.jus.br/jurisprudenciaRepercussao/verAndamentoProcesso.asp?incidente=4531713&numeroProcesso=796939&classeProcesso=RE&numeroTema=736 · **conferido no texto oficial em nov/2026**. Tese:
  > "É inconstitucional a multa isolada prevista em lei para incidir diante da mera negativa de homologação de compensação tributária por não consistir em ato ilícito com aptidão para propiciar automática penalidade pecuniária."
- **Com falsidade, aplica-se a multa isolada do art. 18 da Lei 10.833/2003** (compensação "não declarada" ou com falsidade na declaração): https://www.planalto.gov.br/ccivil_03/leis/2003/l10.833.htm · *a conferir*
- **STF, Tema 863** (RE 736.090, rel. Min. Dias Toffoli): https://portal.stf.jus.br/jurisprudenciaRepercussao/verAndamentoProcesso.asp?incidente=4370056&numeroTema=863 · **conferido no texto oficial em nov/2026**. Tese:
  > "Até que seja editada lei complementar federal sobre a matéria, a multa tributária qualificada em razão de sonegação, fraude ou conluio limita-se a 100% (cem por cento) do débito tributário, podendo ser de até 150% (cento e cinquenta por cento) do débito tributário caso se verifique a reincidência definida no art. 44, § 1º-A, da Lei nº 9.430/96, incluído pela Lei nº 14.689/23, observando-se, ainda, o disposto no § 1º-C do citado artigo."

**Apoio**
- https://www.machadomeyer.com.br/pt/inteligencia-juridica/publicacoes-ij/tributario-ij/multa-de-50-sobre-compensacao-tributaria-nao-homologada-e-inconstitucional
- https://www.felsberg.com.br/stf-julga-inconstitucional-a-multa-isolada-sobre-pedidos-de-compensacao-e-ressarcimento-nao-homologados/
- https://www.migalhas.com.br/depeso/388227/stf-retira-multa-pela-negativa-de-homologacao-tributaria
- https://juris.damasio.com.br/jurisprudencia/julgado/1087/multa-automatica-pela-simples-negativa-do-pedido-de-compensacao-tributaria
- https://tributodevido.com.br/portal/multa-isolada-compensacao-nao-homologada/

---

### Premissas do simulador para Lucro Presumido e Lucro Real · *premissas internas, a validar*
- Alíquotas de PIS e Cofins: 0,65% + 3% = 3,65% no Presumido (cumulativo, Lei 9.718/1998) e 1,65% + 7,6% = 9,25% no Real (não cumulativo, Lei 10.637/2002, art. 2º, e Lei 10.833/2003, art. 2º) · *a conferir*
- Alíquota zero na revenda de produtos monofásicos pelo varejo/atacado: Lei 10.147/2000, art. 2º (medicamentos e perfumaria), e as leis específicas de autopeças (Lei 10.485/2002) e bebidas (Lei 13.097/2015) · *a conferir*
- Participação dos monofásicos na receita: 18% (segmentos com monofásico) e 8% (mercado). São premissas internas da Gera Caixa para a estimativa, **não** dados oficiais; ajustar quando houver base de clientes.
- O resultado é rotulado "Estimativa para os últimos 60 meses", nunca "teto": a participação real pode ser maior ou menor.

## 7. Insumos no Lucro Real (para quando atender esse público)
**Na landing:** só aparece de passagem ("Lucro Presumido ou Real? A simulação também serve"). **Nos anúncios:** grupo "Lucro Real insumos" do Google, criado **pausado** até existir uma seção própria na landing.

**Fontes oficiais**
- **STJ, REsp 1.221.170/PR, Temas 779 e 780** (rel. Min. Napoleão Nunes Maia Filho, julgado em 22/02/2018, acórdão publicado em 24/04/2018, trânsito em julgado em 29/06/2023): https://processo.stj.jus.br/repetitivos/temas_repetitivos/pesquisa.jsp?novaConsulta=true&tipo_pesquisa=T&cod_tema_inicial=779&cod_tema_final=780 · **conferido no texto oficial em nov/2026**. Tese firmada:
  > "(a) é ilegal a disciplina de creditamento prevista nas Instruções Normativas da SRF ns. 247/2002 e 404/2004, porquanto compromete a eficácia do sistema de não-cumulatividade da contribuição ao PIS e da COFINS, tal como definido nas Leis 10.637/2002 e 10.833/2003; e (b) o conceito de insumo deve ser aferido à luz dos critérios de essencialidade ou relevância, ou seja, considerando-se a imprescindibilidade ou a importância de determinado item - bem ou serviço - para o desenvolvimento da atividade econômica desempenhada pelo Contribuinte."
- **STF, Tema 756** (RE 841.979, rel. Min. Dias Toffoli): o REsp 1.221.170 ficou sobrestado por ele. O STF fixou que a discussão sobre o conceito de insumo é infraconstitucional (item II da tese), o que deixa valendo o entendimento do STJ. https://portal.stf.jus.br/jurisprudenciaRepercussao/verAndamentoProcesso.asp?incidente=4647544&numeroTema=756 · **conferido no texto oficial em nov/2026**.
- Receita Federal, Parecer Normativo Cosit nº 5/2018 (a Receita adotou esse entendimento): https://normas.receita.fazenda.gov.br · *a conferir*
- Leis 10.637/2002 (PIS) e 10.833/2003 (Cofins), regime não cumulativo · *a conferir*

---

## Frases que evitamos e por quê
| Frase | Por que não usar |
|---|---|
| "Seus créditos vão expirar em 31/12/2026" | A LC 214 mantém o saldo; o risco é de prova e escrituração, não de extinção automática |
| "Multa de 50% se a compensação for negada" | O STF derrubou essa multa em 2023 (Tema 736) |
| "Multa de 150% se errar" | A qualificada é de 100% e só chega a 150% na reincidência (Lei 14.689/2023; STF Tema 863) |
| "Recupere R$ X" ou "garantido" | Promete resultado; tudo é estimativa até conferir os documentos |
| "Pago em dobro" / "o Simples cobra de novo" | O monofásico não é cobrança em dobro do mesmo tributo; o DAS pode ter incluído PIS/Cofins que não era devido |
| "Diagnóstico em 10 dias" | A landing promete resposta em até 1 dia útil, não um prazo de diagnóstico |
| "Revisamos ICMS e INSS" | A landing e o simulador tratam só de PIS e Cofins no DAS |
| "Evita perdas na transição" | Não há perda automática em 2027 para o Simples; a urgência real é o prazo de 5 anos de cada pagamento |

---

## Campanha Lucro Real (lp-real.html e ANUNCIOS-LUCRO-REAL.md)
Afirmações novas e onde se apoiam. **Tudo a conferir no texto oficial antes de publicar** (Planalto inacessível desta máquina).

| Afirmação | Base |
|---|---|
| "PIS e Cofins acabam em 31/12/2026; em 2027 entra a CBS" | EC 132/2023 e LC 214/2025 (ver §3) |
| "A lei mantém o saldo, mas pede crédito escriturado" | LC 214/2025, arts. 378 a 383 (ver §4) |
| Indústria: insumos por essencialidade ou relevância | STJ, REsp 1.221.170 (ver §7); PN Cosit 5/2018 |
| Energia elétrica, aluguéis pagos a pessoa jurídica, frete e armazenagem na venda | Lei 10.637/2002 e Lei 10.833/2003, art. 3º (incisos de energia, aluguéis e frete na venda) |
| Mercados: monofásico e alíquota zero tributados por erro de cadastro | Leis 10.147/2000, 10.485/2002, 13.097/2015 (monofásico); Lei 10.925/2004 e correlatas (alíquota zero) |
| Restaurantes: ingredientes, embalagens e gás como insumo | Mesma regra de insumos (REsp 1.221.170); depende da atividade e de análise item a item |
| "Calculadora de CBS e IBS disponibilizada pela Receita Federal" | Ferramenta pública da Receita; conferir o endereço e o nome atual antes de citar |

Pontos de atenção: comércio (revenda) não tem crédito de "insumo" no sentido do STJ; para mercados o texto fala só de cadastro de produtos e das despesas com crédito previsto em lei. Nenhum item é prometido: a página diz "podem gerar crédito".
