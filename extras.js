/* Rodada 4 — recursos extras (guias, agenda, parceiros, novas calculadoras, comunidade, acessibilidade) */
(function(){
const X={
 verify:['verify with the tax office','在税务局核实'],lgpd:['Data processed with consent','数据经同意后处理'],nda:['Confidentiality agreement in every case','每个案件均签保密协议'],dig:['Online meetings and e-signature','线上会议与电子签名'],
 g_eb:['Free guides','免费指南'],g_h:['Learn before you decide','决策前先了解'],g_l:['Straight-to-the-point content on auctions, taxes and management. 3–5 minute reads.','关于拍卖、税务与管理的精炼内容，3–5分钟读完。'],
 a_eb:['Schedule','预约'],a_h:['Pick the best time to talk','选择合适的沟通时间'],a_l:['Free 30-minute online meeting. Pick a day and time and confirm via WhatsApp.','30分钟免费线上会议。选择日期和时间，通过WhatsApp确认。'],
 p_eb:['Ecosystem','生态'],p_h:['One hub for everything your assets need','满足资产需求的一站式平台'],p_l:['We are building a network of verified partners. Clients and members will get special conditions.','我们正在建立经过验证的合作伙伴网络，客户与会员享受专属条件。'],p_cta:['Become a partner','成为合作伙伴']};
const K={'Ler guia':['Read guide','阅读指南'],'min de leitura':['min read','分钟阅读'],'Confirmar pelo WhatsApp':['Confirm on WhatsApp','通过WhatsApp确认'],'Escolha um dia':['Pick a day','请选择日期'],'Escolha um horário':['Pick a time','请选择时间'],'Horário escolhido':['Selected time','已选时间'],
 'dias':['days','天'],'horas':['hours','小时'],'min':['min','分'],'seg':['sec','秒'],'para a CBS substituir o PIS/COFINS':['until CBS replaces PIS/COFINS','距CBS取代PIS/COFINS'],
 'Em breve':['Coming soon','即将推出'],'Link da simulação copiado':['Simulation link copied','模拟链接已复制'],'🔗 Copiar link desta simulação':['🔗 Copy link to this simulation','🔗 复制此模拟链接'],
 'Você está offline. As calculadoras continuam funcionando.':['You are offline. Calculators still work.','您已离线，计算器仍可使用。'],'Conexão restabelecida':['Back online','网络已恢复']};
Object.entries(K).forEach(([k,v])=>D[k]=v);
const xs=$$('[data-x]');xs.forEach(e=>e.dataset.xpt=e.innerHTML);
function applyX(){xs.forEach(e=>{const t=X[e.dataset.x];e.innerHTML=LANG!=='pt'&&t?(LANG==='en'?t[0]:t[1]):e.dataset.xpt});renderGuides();renderPartners();renderAgenda();tick()}
const _apply=window.applyLang;window.applyLang=function(l){_apply(l);applyX()};
$('#langSel').onchange=e=>applyLang(e.target.value);

/* ---- Contagem regressiva até 01/01/2027 (CBS) ---- */
const alvo=new Date('2027-01-01T00:00:00-03:00');
function tick(){const ms=alvo-Date.now(),el=$('#countdown');if(!el)return;if(ms<=0){el.innerHTML='';return}
  const d=Math.floor(ms/864e5),h=Math.floor(ms/36e5)%24,m=Math.floor(ms/6e4)%60,s=Math.floor(ms/1e3)%60;
  el.innerHTML=[[d,'dias'],[h,'horas'],[m,'min'],[s,'seg']].map(x=>`<div><b>${x[0]}</b><span>${L(x[1])}</span></div>`).join('');el.title=L('para a CBS substituir o PIS/COFINS')}
setInterval(tick,1000);

/* ---- Guias ---- */
const GUIDES=[
 {i:'🏛️',c:'Leilão',t:'Leilão judicial × extrajudicial: qual escolher?',en:'Judicial vs out-of-court auctions: which to choose?',zh:'司法拍卖与非司法拍卖：如何选择？',m:4,b:`<h4>Leilão judicial</h4><p>Acontece dentro de um processo, por ordem de um juiz, geralmente para pagar dívidas do proprietário. Costuma ter dois pregões: no primeiro, o lance mínimo é a avaliação; no segundo, pode haver lances a partir de 50% (salvo regra diferente no edital). Admite parcelamento (art. 895 do CPC).</p><h4>Leilão extrajudicial</h4><p>Realizado pelo banco ou credor quando o devedor deixa de pagar um financiamento com alienação fiduciária (Lei 9.514/97). É mais rápido e o imóvel costuma vir com a dívida do banco quitada, mas pode estar ocupado.</p><h4>Como decidir</h4><p>Compare o desconto real (use a calculadora de custo total), o risco de ocupação, a existência de recursos no processo e as condições de pagamento. O "mais barato" nem sempre é o melhor negócio.</p>`},
 {i:'🔑',c:'Leilão',t:'Imóvel ocupado: o que fazer depois de arrematar',en:'Occupied property: what to do after winning',zh:'被占用的房产：拍得后怎么办',m:3,b:`<h4>Primeiro, a negociação</h4><p>Muitas desocupações se resolvem com acordo: prazo combinado e, às vezes, uma ajuda de custo para mudança. Costuma ser mais barato e rápido que o caminho judicial.</p><h4>Imissão na posse</h4><p>Se não houver acordo, pede-se ao juiz a imissão na posse. No leilão judicial, isso costuma ocorrer no próprio processo; no extrajudicial, por ação própria.</p><h4>Coloque no custo</h4><p>Prazo e custo de desocupação devem entrar no cálculo antes do lance, junto com o tempo sem poder alugar ou vender.</p>`},
 {i:'💊',c:'Tributário',t:'Monofásico no Simples: sua empresa pode ter pago a mais',en:'Single-phase taxes in Simples Nacional: you may have overpaid',zh:'简易税制中的单一环节税：您可能多缴了',m:4,b:`<h4>O que é</h4><p>Alguns produtos (medicamentos, cosméticos, autopeças, bebidas frias, combustíveis) têm PIS/COFINS cobrado uma única vez, no fabricante ou importador. Quem revende não deveria pagar de novo.</p><h4>Onde está o erro</h4><p>No Simples, se essas receitas não forem segregadas no PGDAS-D, o DAS cobra PIS/COFINS novamente sobre elas.</p><h4>Como recuperar</h4><p>Revisão dos itens por NCM, retificação das declarações dos últimos 5 anos e pedido de restituição ou compensação. Comece pela calculadora de créditos tributários.</p>`},
 {i:'⏳',c:'Tributário',t:'Reforma tributária: o que muda para sua empresa até 2033',en:'Tax reform: what changes for your company until 2033',zh:'税制改革：到2033年企业将发生哪些变化',m:5,b:`<h4>Novos tributos</h4><p>A EC 132/2023 e a LC 214/2025 criam a CBS (federal, substitui PIS/COFINS) e o IBS (estadual e municipal, substitui ICMS e ISS), além do Imposto Seletivo.</p><h4>Cronograma</h4><p>2026 é ano de teste, com alíquotas simbólicas. A CBS passa a valer em 2027 e a transição do ICMS/ISS para o IBS vai até 2033.</p><h4>O que fazer agora</h4><p>Revisar créditos antigos antes da extinção do PIS/COFINS, simular o impacto do novo modelo nos preços e reavaliar o regime tributário, inclusive a opção de empresas do Simples por recolher IBS/CBS por fora.</p>`},
 {i:'🏠',c:'Empresarial',t:'Holding familiar: vantagens, custos e mitos',en:'Family holding: benefits, costs and myths',zh:'家族控股：优势、成本与误区',m:4,b:`<h4>Vantagens</h4><p>Organiza a sucessão em vida, evita inventário demorado, reduz conflitos com regras claras e pode reduzir custos de transmissão.</p><h4>Custos</h4><p>Constituição, ITBI na integralização de imóveis (em alguns casos), contabilidade e tributação dos aluguéis pela pessoa jurídica.</p><h4>Mitos</h4><p>Holding não é blindagem contra dívidas já existentes nem serve para todo patrimônio. A reforma tornou o ITCMD progressivo, o que muda a conta em vários estados.</p>`},
 {i:'📈',c:'Empresarial',t:'5 indicadores que todo empresário deveria olhar todo mês',en:'5 KPIs every business owner should check monthly',zh:'企业主每月应关注的5个指标',m:3,b:`<h4>1. Margem de contribuição</h4><p>Quanto sobra de cada venda para pagar os custos fixos.</p><h4>2. Ponto de equilíbrio</h4><p>Quanto você precisa vender para não ter prejuízo.</p><h4>3. Ciclo de caixa</h4><p>Dias entre pagar fornecedores e receber dos clientes.</p><h4>4. Carga tributária efetiva</h4><p>Impostos divididos pelo faturamento. Compare regimes todo ano.</p><h4>5. Inadimplência</h4><p>Percentual das vendas que não foi recebido no prazo.</p>`}];
function renderGuides(){const g=$('#guideGrid');if(!g)return;g.innerHTML=GUIDES.map((x,i)=>`<article class="card guide reveal in"><div class="ic">${x.i}</div><span class="tag">${L(x.c)}</span><span class="rt">⏱ ${x.m} ${L('min de leitura')}</span><h3>${LANG==='en'?x.en:LANG==='zh'?x.zh:x.t}</h3><button class="btn sm ghost" data-guide="${i}">${L('Ler guia')} →</button></article>`).join('');
  $$('[data-guide]').forEach(b=>b.onclick=()=>{const x=GUIDES[b.dataset.guide];track('guide',{i:b.dataset.guide});openModal(`<div class="art"><span class="tag">${L(x.c)}</span><h3>${x.t}</h3>${LANG!=='pt'?'<p class="note">(Full article in Portuguese / 全文为葡萄牙语)</p>':''}${x.b}<div class="cta-row"><a class="btn" href="#contato" onclick="closeModal()">${L('Falar com especialista')}</a></div></div>`)})}

/* ---- Agenda ---- */
let selDay=null,selSlot=null;
function renderAgenda(){const dEl=$('#days');if(!dEl)return;const days=[];const d=new Date();while(days.length<10){d.setDate(d.getDate()+1);if(d.getDay()%6)days.push(new Date(d))}
  const loc=LANG==='en'?'en-US':LANG==='zh'?'zh-CN':'pt-BR';
  dEl.innerHTML=days.map(x=>{const k=x.toISOString().slice(0,10);return `<button data-day="${k}" class="${selDay===k?'on':''}">${x.toLocaleDateString(loc,{weekday:'short'})}<small>${x.toLocaleDateString(loc,{day:'2-digit',month:'2-digit'})}</small></button>`}).join('');
  $$('[data-day]').forEach(b=>b.onclick=()=>{selDay=b.dataset.day;selSlot=null;renderAgenda()});
  const sEl=$('#slots');if(!selDay){sEl.innerHTML=`<p class="micro">${L('Escolha um dia')}</p>`;$('#agendaOk').innerHTML='';return}
  const seed=[...selDay].reduce((a,c)=>a+c.charCodeAt(0),0);
  sEl.innerHTML=['09:00','10:00','11:00','14:00','15:00','16:00','17:00'].map((h,i)=>{const busy=(seed+i*7)%5===0;return `<button data-slot="${h}" ${busy?'disabled style="opacity:.35;text-decoration:line-through"':''} class="${selSlot===h?'on':''}">${h}</button>`}).join('');
  $$('[data-slot]').forEach(b=>b.onclick=()=>{selSlot=b.dataset.slot;renderAgenda()});
  if(selSlot){const txt=`${new Date(selDay+'T12:00').toLocaleDateString(loc)} ${selSlot}`;$('#agendaOk').innerHTML=`<p>${L('Horário escolhido')}: <b>${txt}</b></p><a class="btn wa" style="margin-top:10px" target="_blank" rel="noopener" href="${waLink(`Olá! Gostaria de agendar o diagnóstico para ${txt} (horário de Brasília).`)}" id="agWa">${L('Confirmar pelo WhatsApp')}</a>`;$('#agWa').onclick=()=>{track('schedule',{d:selDay,h:selSlot});const a=DB.get('agenda',[]);a.push({d:selDay,h:selSlot,t:Date.now()});DB.set('agenda',a)}}
  else $('#agendaOk').innerHTML=`<p class="micro">${L('Escolha um horário')}</p>`}

/* ---- Parceiros ---- */
const PARTS=[['🏘️','Corretores de imóveis','Real estate brokers','房产经纪'],['📐','Engenheiros e vistoria','Engineers & inspection','工程师与验房'],['🛠️','Reformas','Renovation','装修'],['📜','Despachantes e cartórios','Registry services','登记代办'],['🧮','Contadores','Accountants','会计师'],['⚖️','Advogados parceiros','Partner lawyers','合作律师'],['🏦','Crédito e câmbio','Credit & FX','信贷与外汇'],['🛡️','Seguros','Insurance','保险']];
function renderPartners(){const g=$('#partnerGrid');if(!g)return;g.innerHTML=PARTS.map(p=>`<div class="card partner"><div class="ic">${p[0]}</div><h3 style="font-size:1.05rem">${LANG==='en'?p[2]:LANG==='zh'?p[3]:p[1]}</h3><p>${L('Em breve')}</p></div>`).join('')}
$('#bePartner').onclick=()=>{openModal(`<h3>${LANG==='pt'?'Seja parceiro':LANG==='en'?'Become a partner':'成为合作伙伴'}</h3><form id="ptF"><label>Nome / empresa</label><input required><label>Área de atuação</label><select>${PARTS.map(p=>`<option>${p[1]}</option>`).join('')}</select><label>Cidade/UF</label><input required><label>WhatsApp</label><input required inputmode="tel"><br><br><button class="btn">Enviar</button></form>`);
  $('#ptF').onsubmit=e=>{e.preventDefault();const f=e.target.elements;const d={n:f[0].value,a:f[1].value,c:f[2].value,t:f[3].value,d:Date.now()};const l=DB.get('partners',[]);l.push(d);DB.set('partners',l);track('partner_lead');open(waLink(`Olá! Quero ser parceiro: ${d.n}, ${d.a}, ${d.c}.`),'_blank','noopener');closeModal();toast('Obrigado! Entraremos em contato.')}};
D['Obrigado! Entraremos em contato.']=['Thanks! We will get in touch.','谢谢！我们会与您联系。'];

/* ---- Novas calculadoras ---- */
function c8(){const fat=num('sp_fat'),serv=$('#sp_at').value==='serv',folha=num('sp_folha'),iss=num('sp_iss')/100,fat12=fat;
  const tab=serv?[[180e3,.06,0],[360e3,.112,9360],[720e3,.135,17640],[1.8e6,.16,35640],[3.6e6,.21,125640],[4.8e6,.33,648e3]]:[[180e3,.04,0],[360e3,.073,5940],[720e3,.095,13860],[1.8e6,.107,22500],[3.6e6,.143,87300],[4.8e6,.19,378e3]];
  const f=tab.find(t=>fat12<=t[0])||tab[tab.length-1],ef=Math.max(0,(fat12*f[1]-f[2])/fat12),simples=fat*ef;
  const presBase=serv?.32:.08,irpj=fat*presBase*.15+Math.max(0,fat*presBase-240e3)*.10,csll=fat*(serv?.32:.12)*.09,pc=fat*.0365,inss=folha*.2,pres=irpj+csll+pc+fat*iss+inss;
  const best=simples<pres?'Simples Nacional':'Lucro Presumido';
  $('#r8').innerHTML=row(L('Simples: alíquota efetiva'),pct(ef*100))+row('Simples',brl(simples))+row('Presumido: IRPJ + CSLL',brl(irpj+csll))+row('Presumido: PIS/COFINS',brl(pc))+row(serv?'ISS':'ICMS',brl(fat*iss))+row(L('INSS patronal (20%)'),brl(inss))+row('Presumido',brl(pres))+
   `<div class="big">${best}</div><div class="micro">${L('Diferença anual')}: ${brl(Math.abs(pres-simples))}</div><p class="note">${L('Estimativa simplificada: não considera fator R, ICMS-ST, sublimites estaduais nem a reforma. Valide com seu contador.')}</p>`+actions('sp',`Simples × Presumido: ${best}, diferença ${brl(Math.abs(pres-simples))}/ano.`)}
function c9(){const mer=num('lf_mer'),lei=num('lf_lei'),ent=mer*num('lf_ent')/100,pv=mer-ent,n=num('lf_pz')*12,i=Math.pow(1+num('lf_jur')/100,1/12)-1;
  const amort=pv/n;let juros=0,saldo=pv;for(let k=0;k<n;k++){juros+=saldo*i;saldo-=amort}
  const totF=ent+pv+juros,p1=amort+pv*i;
  $('#r9').innerHTML=row(L('Entrada'),brl(ent))+row(L('1ª parcela (SAC)'),brl(p1))+row(L('Juros totais'),brl(juros),'neg')+row(L('Total pago financiando'),brl(totF),'neg')+row(L('Custo total no leilão'),brl(lei),'pos')+
   `<div class="big">${brl(totF-lei)}</div><div class="micro">${L('Economia estimada comprando em leilão')}</div><p class="note">${L('Tabela SAC sem seguros e taxas. Não considera o rendimento do dinheiro à vista.')}</p>`+actions('lf',`Leilão × financiamento: economia ${brl(totF-lei)}.`)}
function cmpInit(){const el=$('#cmpIn');if(!el||el.dataset.ok)return;el.dataset.ok=1;el.innerHTML=[1,2,3].map(k=>`<div class="cmp-row"><b>${L('Imóvel')} ${k}</b><div><label>${L('Mercado')}</label><input class="money" id="cm${k}m" value="${[480,350,620][k-1]}.000"></div><div><label>${L('Custo total')}</label><input class="money" id="cm${k}c" value="${[340,290,410][k-1]}.000"></div><div><label>${L('Meses p/ vender')}</label><input type="number" id="cm${k}p" value="${[12,8,18][k-1]}"></div></div>`).join('');
  $$('#cmpIn input').forEach(e=>{e.addEventListener('input',()=>{if(e.classList.contains('money'))fmtMoney(e);c10()})})}
function c10(){cmpInit();const r=[1,2,3].map(k=>{const m=num(`cm${k}m`),c=num(`cm${k}c`),p=Math.max(num(`cm${k}p`),1),d=m?(1-c/m)*100:0;return {k,d,mes:d/p}}).sort((a,b)=>b.mes-a.mes);
  $('#r10').innerHTML=r.map((x,i)=>row(`${i===0?'🥇 ':i===1?'🥈 ':'🥉 '}${L('Imóvel')} ${x.k}`,`${pct(x.d)} · ${pct(x.mes)}/${L('mês')}`,i===0?'pos':'')).join('')+`<p class="note">${L('Ordenado pelo desconto ao mês até a venda.')}</p>`+actions('cmp',`Comparação: melhor opção imóvel ${r[0].k} (${pct(r[0].d)} de desconto).`)}
Object.assign(D,{'Simples: alíquota efetiva':['Simples: effective rate','简易税制：实际税率'],'INSS patronal (20%)':['Employer social security (20%)','雇主社保(20%)'],'Diferença anual':['Annual difference','年度差额'],'Estimativa simplificada: não considera fator R, ICMS-ST, sublimites estaduais nem a reforma. Valide com seu contador.':['Simplified estimate: ignores factor R, ICMS-ST, state sub-limits and the reform. Check with your accountant.','简化估算：未考虑R因子、ICMS-ST、州级限额及税改。请咨询会计。'],
 'Entrada':['Down payment','首付'],'1ª parcela (SAC)':['1st installment (SAC)','首期(SAC)'],'Juros totais':['Total interest','总利息'],'Total pago financiando':['Total paid with financing','贷款总支付'],'Custo total no leilão':['Total cost at auction','拍卖总成本'],'Economia estimada comprando em leilão':['Estimated savings buying at auction','拍卖购买预计节省'],'Tabela SAC sem seguros e taxas. Não considera o rendimento do dinheiro à vista.':['SAC amortization without insurance/fees. Ignores the return on cash.','SAC等额本金，不含保险与费用，未考虑现金收益。'],
 'Imóvel':['Property','房产'],'Mercado':['Market','市场价'],'Meses p/ vender':['Months to sell','出售月数'],'mês':['mo','月'],'Ordenado pelo desconto ao mês até a venda.':['Ranked by discount per month until sale.','按出售前每月折扣排序。']});
const _calc=window.calcAll;window.calcAll=function(){_calc();try{c8();c9();c10()}catch(e){console.error(e)}};
$$('#c8 input,#c8 select,#c9 input').forEach(e=>e.addEventListener('input',()=>{c8();c9()}));

/* ---- Link compartilhável da simulação ---- */
const note=$('#p-calc > p.note');const sh=document.createElement('button');sh.className='btn sm dark';sh.style.cssText='float:right;margin-left:10px';sh.id='shareSim';note.prepend(sh);
function shLabel(){sh.textContent=L('🔗 Copiar link desta simulação')}shLabel();
sh.onclick=()=>{const inp={};$$('#p-calc input,#p-calc select').forEach(e=>{if(e.id)inp[e.id]=e.type==='checkbox'?e.checked:e.value});const c=$('#p-calc .calc.on')?.id;
  const url=location.href.split('#')[0]+'#sim-'+btoa(unescape(encodeURIComponent(JSON.stringify({c,inp})))).replace(/=+$/,'');navigator.clipboard?.writeText(url).then(()=>toast('Link da simulação copiado'),()=>toast('Não foi possível copiar'));track('sim_share')};
function loadSim(){const m=location.hash.match(/^#sim-(.+)$/);if(!m)return;try{const o=JSON.parse(decodeURIComponent(escape(atob(m[1]))));Object.entries(o.inp).forEach(([k,v])=>{const e=document.getElementById(k);if(e)e.type==='checkbox'?e.checked=v:e.value=v});openCalc(o.c||'c1');setTimeout(()=>$('#hub').scrollIntoView(),60)}catch(e){}}

/* ---- Acessibilidade ---- */
let fs=DB.get('fs',100);const setFs=v=>{fs=Math.min(130,Math.max(85,v));document.documentElement.style.fontSize=fs+'%';DB.set('fs',fs)};setFs(fs);
$('#fsUp').onclick=()=>setFs(fs+5);$('#fsDown').onclick=()=>setFs(fs-5);
if(DB.get('hc'))document.documentElement.classList.add('hc');
$('#hcBtn').onclick=()=>{document.documentElement.classList.toggle('hc');DB.set('hc',document.documentElement.classList.contains('hc'))};

/* ---- Dicas (tooltips) nos campos técnicos ---- */
const TIPS={l_itbi:'Imposto municipal de transmissão. Em SP capital é 3%; varia por cidade.',l_com:'Normalmente 5% sobre o lance, pago ao leiloeiro.',t_das:'Divida o DAS pago pelo faturamento do mês.',h_base:'Percentual do valor de mercado usado como base do ITCMD na doação de quotas.',o_cdi:'Taxa de referência da renda fixa. Use a taxa atual.'};
Object.entries(TIPS).forEach(([id,t])=>{const lb=$(`#${id}`)?.closest('div')?.querySelector('label');if(lb){const s=document.createElement('span');s.className='tip';s.textContent='?';s.title=t;s.tabIndex=0;s.setAttribute('aria-label',t);lb.append(s)}});

/* ---- Comunidade: perfil, conquistas, ranking, notificações ---- */
const BADGES=[['🌱','Boas-vindas',u=>true],['✍️','Primeiro tópico',u=>DB.get('posts',[]).some(p=>p.email===u.email)],['💬','Conversador (5 respostas)',u=>DB.get('posts',[]).reduce((a,p)=>a+p.r.filter(r=>r.a===u.nome).length,0)>=5],['🧮','Simulador (3 salvas)',u=>DB.get('sims_'+u.email,[]).length>=3],['🗳️','Votante',u=>!!DB.get('myvote')],['❤️','Popular (5 curtidas)',u=>DB.get('posts',[]).filter(p=>p.email===u.email).reduce((a,p)=>a+p.l.length,0)>=5],['⭐','Colaborador (30 pts)',u=>(u.pts||0)>=30]];
function enhanceConta(){const u=me(),box=$('#contaBox');if(!u||!box||box.querySelector('#profF'))return;
  const prof=DB.get('prof_'+u.email,{bio:'',cidade:''});
  const users=Object.values(DB.get('users',{})).sort((a,b)=>(b.pts||0)-(a.pts||0)).slice(0,5);
  const extra=document.createElement('div');
  extra.innerHTML=`<h4 style="margin:18px 0 6px">${L('Conquistas')}</h4><div class="badges">${BADGES.map(b=>`<span class="bdg ${b[2](u)?'got':''}" title="${b[2](u)?L('Conquistado'):L('Bloqueado')}">${b[0]} ${b[1]}</span>`).join('')}</div>
   <h4 style="margin:18px 0 6px">${L('Meu perfil')}</h4><form id="profF" class="inline"><div><label>${L('Cidade/UF')}</label><input id="pf_c" value="${esc(prof.cidade)}" maxlength="60"></div><div><label>${L('Sobre mim')}</label><input id="pf_b" value="${esc(prof.bio)}" maxlength="140" placeholder="Ex.: investidor em leilões em SP"></div><div><button class="btn sm">${L('Salvar perfil')}</button></div></form>
   <h4 style="margin:18px 0 6px">${L('Ranking da comunidade')}</h4><div class="leader">${users.map(x=>`<div><span>${esc(x.nome)}</span><span class="lvl">${x.pts||0} pts</span></div>`).join('')}</div>`;
  box.insertBefore(extra,box.querySelector('.cta-row'));
  $('#profF').onsubmit=e=>{e.preventDefault();DB.set('prof_'+u.email,{cidade:$('#pf_c').value.trim(),bio:$('#pf_b').value.trim()});toast('Perfil salvo')}}
Object.assign(D,{'Conquistas':['Achievements','成就'],'Conquistado':['Unlocked','已解锁'],'Bloqueado':['Locked','未解锁'],'Meu perfil':['My profile','我的资料'],'Cidade/UF':['City/State','城市/州'],'Sobre mim':['About me','关于我'],'Salvar perfil':['Save profile','保存资料'],'Ranking da comunidade':['Community ranking','社区排行'],'Perfil salvo':['Profile saved','资料已保存'],'nova(s) resposta(s) nos seus tópicos':['new reply(ies) on your topics','条您话题的新回复']});
function notif(){const u=me(),tab=$('[data-t=p-forum]');if(!tab)return;tab.querySelector('.notif')?.remove();if(!u)return;
  const seen=DB.get('seen_'+u.email,0),n=DB.get('posts',[]).filter(p=>p.email===u.email).reduce((a,p)=>a+p.r.filter(r=>(r.d||0)>seen&&r.a!==u.nome).length,0);
  if(n){const s=document.createElement('span');s.className='notif';s.textContent=n;s.title=n+' '+L('nova(s) resposta(s) nos seus tópicos');tab.append(s)}}
$('[data-t=p-forum]').addEventListener('click',()=>{const u=me();if(u){DB.set('seen_'+u.email,Date.now());setTimeout(notif,50)}});
const _rc=window.renderConta;window.renderConta=function(){_rc();enhanceConta();notif()};
const _rf=window.renderForum;window.renderForum=function(){_rf();forumExtras()};
function forumExtras(){const ta=$('#np_b');if(ta&&!ta.dataset.cc){ta.dataset.cc=1;const c=document.createElement('div');c.className='chars';ta.after(c);const up=()=>c.textContent=`${ta.value.length}/2000`;ta.addEventListener('input',up);up()}
  // bio do autor ao passar o mouse
  $$('#forumBox article.post').forEach(a=>{})}

/* ---- Captura de UTM / origem para os leads ---- */
try{const q=new URLSearchParams(location.search),utm={};['utm_source','utm_medium','utm_campaign','utm_term','utm_content','gclid','fbclid'].forEach(k=>{if(q.get(k))utm[k]=q.get(k)});if(Object.keys(utm).length)DB.set('utm',{...utm,ref:document.referrer,t:Date.now()});else if(!DB.get('utm')&&document.referrer)DB.set('utm',{ref:document.referrer,t:Date.now()})}catch(e){}
$('#leadForm').addEventListener('submit',()=>setTimeout(()=>{const l=DB.get('leads',[]);if(l.length&&l[l.length-1].form&&!l[l.length-1].utm){l[l.length-1].utm=DB.get('utm');l[l.length-1].lang=LANG;l[l.length-1].mode=document.documentElement.dataset.mode;DB.set('leads',l)}},0));

/* ---- Métricas: profundidade de rolagem e tempo na página ---- */
const marks=[25,75,100];addEventListener('scroll',()=>{const h=document.documentElement,p=h.scrollTop/(h.scrollHeight-h.clientHeight)*100;marks.forEach(m=>{if(p>=m-1&&!DB.get('s'+m)){DB.set('s'+m,1);track('scroll_'+m)}})},{passive:true});
[30,120,300].forEach(s=>setTimeout(()=>track('time_'+s+'s'),s*1000));

/* ---- Offline / online ---- */
addEventListener('offline',()=>toast('Você está offline. As calculadoras continuam funcionando.'));addEventListener('online',()=>toast('Conexão restabelecida'));

/* ---- Atalho: "/" foca a busca do fórum ou do glossário ---- */
addEventListener('keydown',e=>{if(e.key==='/'&&!/input|textarea|select/i.test(document.activeElement.tagName)){const t=$('#fq')&&$('#p-forum').classList.contains('on')?$('#fq'):$('#glq');if(t&&t.offsetParent){e.preventDefault();t.focus()}}});

/* ---- Inicialização ---- */
renderConta();applyX();calcAll();loadSim();
addEventListener('hashchange',loadSim);
const _shl=window.applyLang;window.applyLang=function(l){_shl(l);shLabel();calcAll();renderConta()};
})();
