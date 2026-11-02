# Registro de melhorias — v2 (31/10/2026)

Como trocar o nome da marca, o WhatsApp e o modo: abra `app.js` e edite o bloco `CONFIG` no topo do arquivo.
Versões da página: `#modo-com` mostra a versão comercial (consultoria), `#modo-oab` a versão jurídica. Idiomas: `#lang-pt`, `#lang-en` e `#lang-zh`, ou o seletor no menu. `#admin` abre o painel de leads.

## Arquitetura e configuração
1. HTML, CSS e JS em arquivos separados
2. Bloco CONFIG central (marca, CNPJ, WhatsApp, telefone, e-mail, modo)
3. CNPJ real 46.131.513/0001-32 aplicado no rodapé, na política de privacidade e no schema
4. Marca aplicada automaticamente em todos os pontos (`.brand`)
5. localStorage protegido com try/catch, para não quebrar em navegador restrito
6. Função de rastreamento de eventos compatível com dataLayer (GTM/GA4)
7. Backup da v1 (`v1-backup.html`)

## Duas visões (pedido do usuário)
8. Modo Comercial: copy mais direta, selo "mais procurado", cenários numéricos
9. Modo Jurídico (OAB): copy sóbria, sem selo nem cenários, compromissos éticos
10. Rodapé comercial: deixa claro que não se trata de serviço advocatício e que o judicial fica com advogados parceiros
11. Rodapé OAB: menção ao Código de Ética e ao Provimento 205/2021
12. Alternância de versão pelo rodapé e pela URL (#modo-…)
13. Versão escolhida fica salva no navegador

## Internacional (pedido do usuário)
14. Seletor PT / EN / 中文 no menu
15. Detecção automática do idioma do navegador
16. Idioma por URL (#lang-en / #lang-zh), bom para anúncios segmentados
17. Atributo `lang` atualizado (acessibilidade e SEO)
18. Tags hreflang
19. Fonte Noto Sans SC para o chinês
20. Nova seção "Investidor internacional" (CPF, procuração apostilada, câmbio oficial e registro no Banco Central, IR de não residente)
21. Aviso sobre restrições a imóvel rural e faixa de fronteira (Lei 5.709/1971)
22. Item "International" no menu
23. Cerca de 110 blocos de texto traduzidos (hero, serviços, comparativo, método, hub, formulário, rodapé, cookies)

## Hero e conversão
24. Headline orientada a benefício (versão comercial)
25. Pill de prova ("atendimento em todo o Brasil")
26. CTA principal leva ao quiz (micro-compromisso)
27. Microcopy de redução de risco abaixo dos CTAs
28. Contadores animados
29. Seletor "Qual seu objetivo?" que personaliza o conteúdo e já indica a calculadora certa
30. Objetivo escolhido preenche a área no formulário
31. Objetivo lembrado na próxima visita
32. Barra de urgência sobre a reforma tributária (pode ser fechada e a escolha é lembrada)
33. Bloco "Cada mês sem revisão prescreve", ligado à calculadora de prazo
34. Quarta dor adicionada: reforma tributária
35. Serviços reescritos com 5 entregáveis cada
36. Linha "Para quem é" em cada serviço
37. Teses tributárias concretas (monofásico, Tema 69, folha, PER/DCOMP, IBS/CBS)
38. Leilão extrajudicial, de bancos e alienação fiduciária citados
39. Tabela comparativa "sozinho × com assessoria"
40. Prazo estimado em cada etapa do método
41. Blocos "é para você / não é para você" (qualificam o lead)
42. Cenários numéricos rotulados como ilustrativos (sem depoimento falso)
43. Quiz de 4 perguntas com barra de progresso, botão voltar, resultado, prioridade e WhatsApp pré-preenchido
44. Resultado do quiz enviado junto com o lead
45. CTA fixo no rodapé da tela no celular
46. Botão flutuante de WhatsApp com mensagem pronta
47. Botão "voltar ao topo"
48. Modal de intenção de saída com isca (checklist) que captura e-mail
49. Checklist do arrematante com 21 pontos
50. Newsletter no rodapé
51. Botões de serviço preenchem a área no formulário

## Calculadoras (de 4 para 7)
52. Máscara de valores em reais (1.000.000)
53. Custo do arremate: leilão judicial × extrajudicial
54. Custo do arremate: campo de valor de mercado e desconto real
55. Custo do arremate: desocupação separada da reforma
56. Custo do arremate: parcelamento do art. 895 do CPC (25% de entrada + 30x)
57. Custo do arremate: barra de composição de custos com legenda
58. Custo do arremate: veredito verde, amarelo ou vermelho
59. Nova: lance máximo recomendado, com slider de margem
60. ROI: comparação com o CDI líquido de IR
61. ROI: rentabilidade de aluguel
62. ROI: veredito
63. Créditos: Simples Nacional com % de produtos monofásicos e alíquota do DAS
64. Créditos: Presumido e Real com ICMS e folha
65. Créditos: estimativa de correção pela Selic
66. Créditos: nota sobre a modulação do Tema 69
67. Créditos: campos mudam conforme o regime
68. Nova: calculadora de prazo de prescrição (meses perdidos e perda por mês)
69. Ponto de equilíbrio: resultado atual e margem de segurança
70. Nova: holding × inventário (ITCMD, custos, base de quotas)
71. Botão Salvar em todas (exige conta, o que gera cadastro)
72. Botão Copiar em todas
73. Botão "Enviar ao especialista" leva a simulação ao WhatsApp
74. Resultados fixos ao rolar no desktop
75. aria-live nos resultados
76. Aviso legal atualizado (EC 132/2023, LC 214/2025)

## Comunidade
77. Pontos e níveis (Iniciante → Referência)
78. +5 pontos no cadastro, +3 por tópico, +2 por simulação salva, +1 por resposta
79. Avatares com iniciais e cor
80. Curtidas
81. Busca no fórum
82. Ordenação por recentes ou populares
83. Categoria "Geral"
84. Tópico fixado com regras
85. Excluir os próprios tópicos
86. Denunciar tópico
87. Tempo relativo ("há 3 h")
88. Limite de caracteres
89. Selo de nível ao lado do nome
90. Painel da conta com KPIs e histórico de simulações
91. Exportar dados (LGPD)
92. Excluir conta com dupla confirmação
93. Aceite de termos no cadastro
94. Glossário com 26 termos e busca sem acento
95. Roadmap com 6 fases e votação (exige login)
96. Nova fase: marketplace de parceiros (o "hub de todos os serviços")
97. Nome no menu com avatar e opção de sair

## Formulário e dados
98. Validação com mensagens por campo
99. Máscara de telefone
100. Honeypot anti-spam
101. Rascunho salvo automaticamente
102. Campo de perfil (PF, empresa, contador)
103. Placeholder com exemplo concreto
104. Modal de sucesso com WhatsApp e isca
105. Botão "prefiro WhatsApp"
106. Autocomplete nos campos
107. Painel #admin com KPIs, lista de leads e CSV
108. Banner de cookies com opção "somente essenciais" e reabertura pelo rodapé
109. Política de privacidade (LGPD art. 7º, controlador, encarregado)
110. Termos de uso
111. Telefone, e-mail e horário exibidos ao lado do formulário

## SEO, acessibilidade e performance
112. Open Graph e Twitter Card
113. JSON-LD ProfessionalService com CNPJ
114. JSON-LD FAQPage
115. Meta keywords e theme-color
116. Favicon SVG embutido
117. Logo em SVG
118. Link "pular para o conteúdo"
119. Foco visível
120. Suporte a prefers-reduced-motion
121. aria-labels, roles e aria-expanded
122. Menu hambúrguer no celular
123. Item de menu ativo conforme a rolagem
124. Barra de progresso de leitura
125. Animações de entrada (IntersectionObserver)
126. Tema claro e escuro, seguindo a preferência do sistema e lembrado
127. Fontes Playfair Display e Inter com preconnect
128. Estilos de impressão
129. FAQ com 13 perguntas, filtro por categoria e marcador customizado
130. Escape fecha o modal e clique fora também
131. Cookie e números do hero ajustados para tela pequena

**Subtotal v2: 131.**
## Rodada 3 (31/10, noite)
132. Calculadoras traduzidas para EN/ZH: rótulos, vereditos, notas e legendas
133. Quiz traduzido: perguntas, opções, resultado e botões
134. FAQ traduzido, inclusive as categorias
135. Glossário traduzido, com busca nos dois idiomas
136. Checklist de 21 pontos em EN e ZH
137. Termos de uso em EN e ZH
138. Política de privacidade em EN e ZH
139. Mensagens de aviso (toasts) traduzidas
140. Botões Salvar, Copiar e Enviar traduzidos
141. Sugestão personalizada do seletor de objetivo traduzida
142. Categorias do fórum traduzidas
143. Placeholder da busca do glossário traduzido
144. Conteúdo dinâmico redesenhado ao trocar de idioma, sem recarregar
145. Nova pergunta no FAQ: "Estrangeiro pode arrematar?"
146. Novo termo no glossário: CPF
147. **Correção:** abrir uma calculadora escondia o formulário de login (bug da v2)
148. Links diretos para cada calculadora (#calc-c1 a #calc-c7), bons para anúncios e posts
149. Link direto para o fórum (#forum)
150. Última calculadora usada é lembrada
151. Valores digitados nas calculadoras são lembrados
152. Botão "Restaurar valores"
153. Abas navegáveis pelas setas do teclado
154. aria-selected e tabindex nas abas
155. aria-pressed nas sub-abas das calculadoras
156. Foco devolvido ao elemento de origem ao fechar o modal
157. Escape também fecha o menu mobile
158. Legenda acessível na tabela comparativa
159. Rótulos aria nos grupos de abas
160. Meta robots
161. og:site_name
162. format-detection (evita que o iPhone transforme números em links de telefone)
163. Título no botão do WhatsApp

**Subtotal até a rodada 3: 163.**
## Rodada 4: conteúdo, agenda, ecossistema, novas calculadoras e comunidade
164. Faixa de confiança com link para verificar o CNPJ na Receita
165. Selo de LGPD
166. Selo de sigilo
167. Selo de atendimento 100% digital
168. Contagem regressiva até a CBS (01/01/2027)
169. Seção "Guias gratuitos"
170. Guia: leilão judicial × extrajudicial
171. Guia: imóvel ocupado após o arremate
172. Guia: monofásico no Simples
173. Guia: reforma tributária até 2033
174. Guia: holding familiar (vantagens, custos e mitos)
175. Guia: 5 indicadores mensais
176. Tempo de leitura em cada guia
177. Títulos dos guias em EN/ZH
178. Agenda com os próximos 10 dias úteis
179. Horários ocupados e livres na agenda
180. Confirmação do horário por WhatsApp
181. Agendamentos registrados no painel
182. Datas no formato de cada idioma
183. Seção de ecossistema de parceiros (a visão de hub)
184. Parceiros: corretores
185. Parceiros: engenheiros e vistoria
186. Parceiros: reformas
187. Parceiros: despachantes e cartórios
188. Parceiros: contadores
189. Parceiros: advogados parceiros
190. Parceiros: crédito e câmbio
191. Parceiros: seguros
192. Formulário "Quero ser parceiro"
193. Calculadora Simples Nacional × Lucro Presumido
194. Calculadora leilão × financiamento (tabela SAC)
195. Calculadora para comparar 3 imóveis, com ranking
196. Link compartilhável de qualquer simulação
197. Simulação compartilhada abre já preenchida
198. Controle de tamanho da fonte (A− / A+)
199. Modo de alto contraste
200. Dicas (?) nos campos técnicos
201. Sete conquistas para membros
202. Perfil com cidade e bio
203. Ranking da comunidade
204. Notificação de novas respostas nos seus tópicos
205. Contador de caracteres ao criar tópico
206. Captura de UTM, gclid, fbclid e página de origem
207. UTM, idioma e versão anexados a cada lead
208. Medição de rolagem em 25%, 75% e 100%
209. Medição de tempo na página (30 s, 2 min, 5 min)
210. Aviso quando a conexão cai ou volta
211. Atalho "/" para buscar no fórum ou no glossário
212. Scripts carregados com defer (página abre mais rápido)
213. Item "Guias" no menu
214. **Correção:** tradução do menu deslocada após o novo item
215. **Correção:** estouro horizontal no celular com fonte maior
216. Novas seções traduzidas para EN/ZH

## Rodada 5: honorários, radar e qualificação de leads
217. Seção "Como funcionam os honorários" (fixo, sobre o resultado, recorrente)
218. Radar de leilões: lista de interesse por cidade, tipo, faixa de valor e desconto
219. Contador de inscritos no radar
220. Formulário: valor aproximado envolvido
221. Formulário: melhor horário para contato
222. Formulário: "como nos conheceu?"
223. Pontuação automática do lead (valor + quiz)
224. Limite de um envio por minuto (anti-spam)
225. Temas de interesse na newsletter
226. Mapa do site no rodapé
227. Aviso para quem está com JavaScript desligado
228. Manifest de app (pode ser instalado na tela inicial)
229. Dado estruturado HowTo (método)
230. Dado estruturado WebSite com os 3 idiomas
231. Título e descrição da página mudam conforme o idioma
232. og:locale conforme o idioma
233. Medidor de força da senha
234. Opção de mostrar a senha (cadastro e login)
235. Fórum: editar os próprios tópicos
236. Fórum: marcar resposta como útil
237. Fórum: filtro "sem resposta"
238. Fórum: cidade e bio do autor ao passar o mouse
239. Foco do teclado preso dentro do modal
240. Tema acompanha a mudança do sistema
241. Calculadoras não aceitam valores negativos
242. Widget "Precisa de ajuda?" com atalhos para o WhatsApp
243. Atalho em inglês no widget para investidores estrangeiros
244. Checklist de documentos para a revisão tributária
245. Teste de maturidade empresarial (8 perguntas, com nota e veredito)
246. Avaliação de atendimento (moderada, não é publicada automaticamente)
247. Calculadora de parcelamento judicial (art. 895 do CPC)
248. Calculadora de preço de venda (markup)
249. Nomes das novas calculadoras traduzidos
250. Glossário: Fator R
251. Glossário: PGDAS-D
252. Glossário: Lucro Presumido
253. Glossário: leiloeiro oficial
254. Glossário: avaliação judicial
255. Glossário: Apostila de Haia
256. FAQ: "Preciso ir presencialmente ao leilão?"
257. FAQ: "Quanto tempo leva para receber os créditos?"
258. FAQ: "Vocês são advogados?"
259. Painel: indicadores de agenda, radar, parceiros e avaliações
260. Painel: CSV com qualificação, UTM, idioma e versão
261. Painel: funil de eventos
262. Honorários e radar traduzidos para EN/ZH

## Rodada 6: compartilhamento, indicação e privacidade
263. Barra de compartilhamento (WhatsApp, LinkedIn, Facebook, copiar link)
264. "Indique um amigo" com código próprio do membro
265. Captura do código de indicação pela URL
266. Indicação anexada ao lead
267. Número de protocolo para cada lead
268. Botão para copiar o protocolo
269. Protocolo incluído na mensagem de WhatsApp
270. Rascunho também guarda área, perfil, valor, horário e origem
271. Contador de caracteres na mensagem do formulário
272. Erros do formulário ligados aos campos (leitores de tela)
273. Teclado numérico ou decimal correto no celular
274. Tecla "enviar" no teclado do celular
275. Busca nas perguntas frequentes
276. "Esta resposta ajudou?" no FAQ
277. Glossário: atalho para a calculadora relacionada
278. Guias: botão "próximo guia"
279. Guias: enviar por WhatsApp
280. Agenda: adicionar ao Google Agenda
281. Agenda: horário convertido para o fuso de quem visita
282. Feed "na comunidade agora" no Hub
283. Link copiável em cada título de seção
284. Widget de ajuda fecha com Esc
285. Widget de ajuda fecha ao clicar fora
286. CTA fixo do celular muda conforme o objetivo escolhido
287. Oferta do checklist no celular após 60 s (não há intenção de saída no toque)
288. Botão "apagar todos os meus dados" na política de privacidade
289. Resultado do quiz salvo na conta
290. Aviso quando um link de simulação está inválido
291. Métricas só são registradas se o visitante aceitar os cookies
292. Eventos com mais de 90 dias são apagados
293. ~~Renderização sob demanda (content-visibility)~~ removida: causava áreas em branco ao pular para âncoras. Substituída pela correção do painel de ajuda, que abria sozinho (CSS anulava o atributo hidden)
294. dns-prefetch do WhatsApp
295. Limite de tamanho na mensagem do formulário
296. Cor de seleção de texto da marca
297. Barra de rolagem estilizada
298. Alvos de toque com 44 px no celular
299. Foco acessível ao navegar por âncoras
300. Contador de respostas novas no título da aba do navegador
301. Guia de publicação e personalização (DEPLOY.md)


## Rodada 7: Assessoria de Investimentos (ANCORD)
302. Quarta frente de serviço: Assessoria de Investimentos
303. Vínculo com a corretora visível no próprio cartão (Res. CVM 178, art. 24, e Ofício-Circular SMI 2/2024)
304. Aviso CVM no rodapé (vínculo, riscos, FGC, rentabilidade passada, Res. 179), presente nas duas versões
305. Campos novos no CONFIG: assessor, credencial ANCORD e intermediário
306. Opção "Investir melhor" no seletor de objetivo
307. Opção de investimentos no quiz, com recomendação própria
308. Área "Investimentos" no formulário e no FAQ
309. Calculadora "Meta de patrimônio" (juros compostos, inflação, aporte necessário)
310. Glossário: suitability, assessor de investimento, FGC
311. FAQ: "Preciso mudar de corretora?" e "Quanto custa a assessoria?"
312. Seção de serviços com grade de 4 cartões e títulos atualizados
313. Tudo traduzido para EN/ZH


## Rodada 8: Supabase
314. Envio automático ao Supabase de leads, newsletter, radar, parceiros, agendamentos e avaliações
315. Fila de reenvio quando a rede ou o servidor falham (testado)
316. Lead enviado com protocolo, pontuação, UTM, idioma, versão, indicação e respostas do quiz
317. SQL com tabelas, validações e segurança: o site só insere, ninguém lê (testado em Postgres)
318. Coluna de status para acompanhar o funil e visão `leads_recentes`
319. `SUPABASE_STATUS()` para diagnóstico
320. Guia SUPABASE.md, incluindo aviso de novos leads via webhook/Zapier


## Rodada 9: captação e qualificação de leads (100 melhorias)
321. Crivo de qualificação: formulário em etapas
322. Crivo Leilões (7 perguntas: objetivo, recursos, pagamento, edital, experiência, região, decisor)
323. Crivo Tributário (7: regime, faturamento, segmento, idade, revisão anterior, contador, decisor)
324. Crivo Empresarial (6: dor, faturamento, equipe, urgência, orçamento, decisor)
325. Crivo Investimentos (6: patrimônio, objetivo, horizonte, situação atual, reação a risco, abertura de conta)
326. Pontuação por resposta
327. Classificação em faixas A (quente), B (morno) e C (frio)
328. Critérios de desqualificação (sem recursos, MEI, sem orçamento, recusa de conta)
329. Urgência (leilão em até 15 dias ou caso urgente) sobe o lead para a faixa A
330. Próximo passo diferente por faixa (A: WhatsApp e agenda; B: diagnóstico; C: conteúdo)
331. Explicação respeitosa dos motivos de desqualificação
332. Resumo das respostas no WhatsApp, com protocolo e faixa
333. Protocolo próprio do crivo
334. Barra de progresso e botão voltar no crivo
335. Progresso salvo a cada resposta
336. Retomar o crivo de onde parou
337. Aviso para quem voltou ao site com crivo incompleto
338. Crivo preenchido com dados da conta ou do rascunho
339. Calculadoras preenchem perguntas do crivo (pula as já respondidas)
340. Sugestão de correção de e-mail digitado errado (gmail.con etc.)
341. Validação de DDD brasileiro real
342. Aceita telefone internacional (+código do país)
343. Nome com maiúsculas corretas
344. Crivo repetido em 24 h substitui o anterior (sem duplicados)
345. Tempo de preenchimento registrado
346. Eventos por etapa (mostra em qual pergunta as pessoas desistem)
347. Crivo traduzido para EN/ZH (perguntas, opções e resultados)
348. Seção "Descubra se faz sentido" com 4 cartões e status (feito / continuar)
349. Botão de crivo em cada cartão de serviço
350. Chamada para o crivo em 6 calculadoras, conforme o resultado
351. Atalho para o crivo no widget de ajuda
352. Chamada para o crivo no fim dos guias
353. Links diretos #crivo-leilao, #crivo-trib, #crivo-emp, #crivo-inv
354. Painel: ranking por faixa, com marcação de urgência
355. Supabase: colunas faixa, teste_ab e ultimo_cta, e visão ordenada pela faixa
356. Status de atendimento aberto/fechado (horário de Brasília)
357. Pedido de retorno por ligação
358. Teste A/B do título principal
359. Variante do teste registrada no lead
360. Título personalizado pela campanha (UTM), com 4 temas
361. Objetivo e área pré-selecionados pela campanha
362. Formulário rápido (só 3 campos)
363. Sugestão de e-mail no formulário principal
364. DDD validado no formulário principal
365. Telefone internacional no formulário principal
366. Nome formatado no formulário principal
367. Envio repetido em 24 h atualiza o lead em vez de duplicar
368. Próximos passos exibidos após o envio
369. Atalho para o crivo após o envio
370. Programa de indicação para contadores (seção e formulário)
371. Aula ao vivo mensal, com inscrição e data calculada automaticamente
372. Isca digital: checklist tributário em troca do e-mail
373. Isca digital: 10 perguntas sobre holding em troca do e-mail
374. Receber qualquer simulação por e-mail
375. Convite lateral para o crivo aos 45% de rolagem
376. Medição de cliques no WhatsApp (conversão)
377. Medição de cliques nos botões, por seção
378. Último botão clicado registrado no lead
379. Segunda chamada no topo: "Meu caso se encaixa?"
380. Frase de confiança nos formulários
381. CTA fixo do celular abre o crivo
382. Exemplo de telefone internacional em EN/ZH
383. Todas as novidades traduzidas para EN/ZH
384. Correção: um formulário podia ser confundido com outro e bloquear o envio seguinte
385. Correção: a visão SQL podia ser recriada sem erro
386. Origem do primeiro acesso (UTM inicial) guardada
387. Contagem de visitas (identifica quem volta)
388. Comportamento: calculadoras usadas
389. Comportamento: guias lidos
390. Comportamento: perguntas frequentes abertas
391. Tempo ativo na página
392. Pontuação de intenção, pelo comportamento
393. Pontuação combinada (perfil 70% + comportamento 30%)
394. Dispositivo registrado no lead
395. Registro do consentimento (versão e data)
396. Antirrobô: envio em menos de 3 s é bloqueado
397. Antirrobô: campo isca no crivo
398. Bloqueio de duplo clique no envio
399. Foco automático no primeiro campo com erro
400. Registro do campo que mais gera erro
401. Preferência de contato (WhatsApp, ligação ou e-mail)
402. Crivo: atalhos de teclado de 1 a 9
403. Crivo: aria-pressed nas opções
404. Crivo: tempo restante estimado
405. Crivo: "Por que perguntamos isso?" nas perguntas sensíveis
406. Crivo: opções com área de toque maior
407. Painel: leads ordenados pela pontuação combinada
408. Painel: taxa de conversão de visitas em leads
409. Painel: taxa de conclusão do crivo
410. Painel: cliques no WhatsApp
411. Painel: status do lead (novo → cliente)
412. Painel: resposta rápida no WhatsApp com mensagem pronta
413. Painel: exportar JSON completo
414. Supabase: colunas de preferência, dispositivo, comportamento, primeiro toque, consentimento e pontuação total
415. FAQ: "O que é o crivo?"
416. FAQ: "O que vocês fazem com as respostas?"
417. FAQ: "Quanto tempo leva o diagnóstico?"
418. FAQ: "Sou contador. Posso indicar clientes?"
419. Correção: o painel #admin aberto direto pela URL mostrava só a versão básica
420. Correção: erro ao exibir o resultado do crivo

**Total acumulado: 420 melhorias.**



## Próximas rodadas (backlog)
- Backend real (Supabase ou Firebase) para login, fórum e leads compartilhados
- Fotos e vídeo de apresentação do responsável
- Página própria por serviço (SEO) e blog com artigos completos
- Guias traduzidos por inteiro para EN/ZH
- Integração com CRM e e-mail de boas-vindas automático
- Radar de leilões (fase 3)
