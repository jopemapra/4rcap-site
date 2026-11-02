# Conversão: diagnóstico e plano

## Diagnóstico da página principal (index.html)
Medido com navegador automático em 01/11/2026:
- Tamanho: 24,5 telas no computador e 38,7 no celular
- 43 botões, 51 links, 7 formulários, 20 seções, cerca de 2.550 palavras
- Formulário principal com 10 campos
- 4 serviços na mesma página

Conclusão: ela funciona como site institucional / hub, não como página de conversão para anúncios.

## Landing pages de conversão (lp-*.html)
- 1 serviço, 1 oferta, 1 ação. Sem menu: só 3 links (WhatsApp, voltar ao formulário e CTA fixo).
- 3,2 a 4,3 telas. Formulário visível na primeira tela, inclusive no celular.
- Funil em 3 etapas:
  1. Calculadora de 3 perguntas (micro-compromisso, sem pedir dados).
  2. Resultado borrado + nome, WhatsApp e e-mail ("desbloquear").
  3. Resultado completo + faixa A/B/C + botão de WhatsApp com mensagem pronta e protocolo.
- Correção de e-mail, validação de DDD, antirrobô, UTM, envio ao Supabase (preencher LP_CONFIG em lp.js).
- Eventos para GTM/GA4: `view`, `calc_done`, `lead`, `wa_click`, `form_error`, `cta_repeat`.

## Para onde mandar o tráfego
| Anúncio sobre… | Link |
|---|---|
| Recuperação de impostos / Simples / monofásico | lp-tributario.html |
| Imóveis de leilão | lp-leilao.html |
| Investimentos / sair da poupança | lp-investimentos.html |
| Gestão, margem, holding | lp-empresarial.html |
| Marca, conteúdo, indicação | index.html (hub) |

## Metas de referência (B2B / serviços financeiros)
- Visita → início da calculadora: 25–40%
- Calculadora → lead: 30–50% (o resultado borrado é o que puxa)
- Visita → lead: 5–12% numa landing focada (o hub tende a ficar em 1–3%)
- Lead A/B → conversa no WhatsApp: acima de 40%, respondendo em até 5 minutos

Benchmarks variam por canal e verba. Os números reais só aparecem com tráfego.

## Primeiros testes A/B (um de cada vez, ~1.000 visitas por variante)
1. Título: dor ("pode ter pago a mais") × ganho ("pode recuperar até…")
2. Resultado borrado × resultado aberto com formulário depois
3. Botão: "Ver minha estimativa" × "Calcular agora"
4. Pedir WhatsApp e e-mail × só WhatsApp
5. Com × sem bloco de garantia

## O que mais aumenta conversão a partir daqui (fora do código)
- Responder o WhatsApp em menos de 5 minutos: é o fator nº 1 de fechamento.
- Prova social real: 2 ou 3 casos com números e autorização do cliente, e avaliações no Google.
- Foto e nome de quem atende (confiança para o público de 45 a 65 anos).
- Pixel do Meta e tag do Google Ads instalados antes de começar a anunciar.
