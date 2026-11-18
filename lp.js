/* Landing pages de conversão: 1 serviço, 1 oferta, 1 ação.
   Funil: calculadora-isca (2-3 campos) → resultado borrado → nome/WhatsApp → resultado + faixa + WhatsApp.
   Este arquivo é compartilhado por lp-tributario, lp2-tributario, lp-leilao, lp-investimentos e lp-empresarial:
   tudo que é específico de uma página fica condicionado a S==='trib' ou à existência do elemento. */
const LP_CONFIG={ // use os MESMOS valores do CONFIG em app.js
  marca:'Gera Caixa', whatsapp:'5511943787719', cnpj:'46.131.513/0001-32',
  waParceiro:'', // WhatsApp separado para contadores (opcional; vazio = usa o principal)
  supabaseUrl:'', supabaseAnonKey:'',
  gtmId:'', metaPixelId:'1122691790655912', // ex.: 'GTM-XXXXXXX' / '123456789012345'; vazios = nada é carregado
  gadsConversion:'', // conversão do Google Ads, ex.: 'AW-123456789/AbCdEfGh'; só é enviada se window.gtag existir
  assessor:'Seu Nome', credencial:'ANCORD nº 00000', intermediario:'NOME DA CORRETORA S.A.'};
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const brl=n=>(isFinite(n)?n:0).toLocaleString('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0});
const num=v=>parseFloat(String(v).replace(/\./g,'').replace(',','.'))||0;
const S=document.body.dataset.svc;
const store={get(k,d){try{return JSON.parse(localStorage.getItem('lp_'+k))??d}catch(e){return d}},set(k,v){try{localStorage.setItem('lp_'+k,JSON.stringify(v))}catch(e){}}};
const RM=()=>{try{return matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'}catch(e){return 'auto'}};
function track(ev,d={}){window.dataLayer&&dataLayer.push({event:ev,svc:S,...d});const l=store.get('ev',[]);l.push({ev,t:Date.now(),...d});store.set('ev',l.slice(-50));
  try{if(window.fbq){ev==='lead'?fbq('track','Lead',{content_category:S}):fbq('trackCustom',ev,{svc:S})}
    if(ev==='lead'&&LP_CONFIG.gadsConversion&&window.gtag)gtag('event','conversion',{send_to:LP_CONFIG.gadsConversion})}catch(e){}}
const wa=(m,n)=>`https://wa.me/${n||LP_CONFIG.whatsapp}?text=${encodeURIComponent(m)}`;
/* GTM / Meta Pixel: só carregam se configurados */
if(LP_CONFIG.gtmId){window.dataLayer=window.dataLayer||[];dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});const g=document.createElement('script');g.async=true;g.src='https://www.googletagmanager.com/gtm.js?id='+encodeURIComponent(LP_CONFIG.gtmId);document.head.appendChild(g)}
if(LP_CONFIG.metaPixelId){!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',LP_CONFIG.metaPixelId);fbq('track','PageView')}
/* utm */
try{const q=new URLSearchParams(location.search),u={};['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid','fbclid'].forEach(k=>q.get(k)&&(u[k]=q.get(k)));if(Object.keys(u).length)store.set('utm',u)}catch(e){}
/* máscaras */
$$('.money').forEach(i=>i.addEventListener('input',()=>{const d=i.value.split(',')[0].replace(/\D/g,'').slice(0,10);i.value=d?(+d).toLocaleString('pt-BR'):''}));
const tel=$('#f_t');tel&&tel.addEventListener('input',()=>{if(tel.value.startsWith('+'))return;const d=tel.value.replace(/\D/g,'').slice(0,11);tel.value=d.length>10?d.replace(/(\d{2})(\d{5})(\d{4})/,'($1) $2-$3'):d.replace(/(\d{2})(\d{4})(\d{0,4})/,'($1) $2-$3').replace(/-$/,'')});
/* erros ligados ao campo: aria-invalid + aria-describedby, rola até o campo e põe o foco nele */
function inv(f,eid,msg,html,fo){const e=$('#'+eid);if(e){html?e.innerHTML=msg:e.textContent=msg}
  if(!f)return;f.setAttribute('aria-invalid','true');const ds=(f.getAttribute('aria-describedby')||'').split(' ').filter(Boolean);if(!ds.includes(eid))f.setAttribute('aria-describedby',[...ds,eid].join(' '));
  const t=fo||f;t.scrollIntoView({block:'center',behavior:RM()});t.focus({preventScroll:true})}
$$('input').forEach(i=>['input','change'].forEach(ev=>i.addEventListener(ev,()=>i.removeAttribute('aria-invalid'))));
/* segment buttons */
const pick=(g,v)=>{const b=g&&g.querySelector(`button[data-v="${v}"]`);if(!b)return;g.querySelectorAll('button').forEach(x=>{x.classList.toggle('on',x===b);x.setAttribute('aria-pressed',x===b)});g.dataset.v=v;g.removeAttribute('aria-invalid')};
$$('.seg').forEach(g=>g.querySelectorAll('button').forEach(b=>b.onclick=()=>pick(g,b.dataset.v)));
/* cálculos por serviço: retornam {valor, linhas[], pontos(0-100), resumo} */
const SEGL={farm:'farmácia/perfumaria',auto:'autopeças/pneus',beb:'bebidas',merc:'mercado, conveniência ou atacado',mono:'monofásico',outro:'outro segmento'},REGL={simples:'Simples',pres:'Lucro Presumido',real:'Lucro Real'};
const r1k=n=>Math.max(1000,Math.round(n/1000)*1000);
/* LC 123/2006, Anexo I (comércio), com a redação da LC 155/2016: [receita bruta de 12 meses até, alíquota nominal, parcela a deduzir].
   Tabela do Anexo I a conferir no texto oficial da LC 123. */
const ANEXO1=[[180000,.04,0],[360000,.073,5940],[720000,.095,13860],[1800000,.107,22500],[3600000,.143,87300],[4800000,.19,378000]];
/* parte das vendas em produtos monofásicos, por segmento. merc (mercado, conveniência ou atacado) = 25%: a confirmar */
const MONO={farm:.55,auto:.55,beb:.55,mono:.55,merc:.25};
const pct=x=>(x*100).toLocaleString('pt-BR',{minimumFractionDigits:1,maximumFractionDigits:1});
const CALC={
 /* Tributário. Simples: receita de 12 meses = faturamento × 12; alíquota efetiva = (RBT12 × alíquota nominal − parcela a deduzir) / RBT12 (Anexo I);
    parte do PIS e da Cofins nessa alíquota = 15,5% nas faixas 1 a 5 (Cofins 12,74% + PIS 2,76%) e 34,4% na faixa 6 (28,27% + 6,13%);
    por mês = faturamento × parte monofásica × alíquota efetiva × parte do PIS/Cofins. Presumido/Real: faturamento × parte monofásica × 3,65% ou 9,25%.
    Depois: × 60 meses, + 22% de Selic (estimativa conservadora), faixa de ×0,7 a ×1,15 arredondada em R$ 1 mil.
    Premissas a validar: 55% de monofásicos (farmácia, autopeças, bebidas), 25% em mercado; Presumido/Real 18% (mercado 8%). "outro" nunca mostra valor. */
 trib(){const reg0=$('#q_reg').dataset.v||'simples',fat=num($('#q_fat').value),seg=$('#q_seg').dataset.v||'mono',outro=seg==='outro',m=60;
  const nsei=reg0==='nsei',reg=nsei?(fat<=4e5?'simples':'pres'):reg0,sl=SEGL[seg]||seg,rl=REGL[reg]+(nsei?' (a confirmar)':'');
  const p=Math.min(100,(fat>=1e6?45:fat>=2e5?35:fat>=5e4?22:8)+(outro?12:30)+(reg==='simples'?15:20)),base=['Base',`${rl} · ${sl} · ${brl(fat)}/mês`];
  if(outro){const qo=$('#q_out'),sim=!!qo&&qo.dataset.v==='sim';
   return {valor:0,outro:true,sim,seg:sl,reg:rl,linhas:[base],pontos:sim?p:Math.min(p,30),
    resumo:`${reg}, faturamento ${brl(fat)}/mês, outro segmento, vende produtos monofásicos: ${sim?'sim':'não'}${nsei?' (regime a confirmar)':''}`,
    rotulo:sim?'Depende de quanto das vendas são esses produtos: confirmamos na conversa, sem custo.':'Sem produtos monofásicos, esta revisão provavelmente não se aplica. Quer que um especialista confirme?'}}
  let mens,prem;
  if(reg==='simples'){const ms=MONO[seg]??.55,rbt=fat*12;let i=ANEXO1.findIndex(f=>rbt<=f[0]);if(i<0)i=ANEXO1.length-1;
   const ef=(rbt*ANEXO1[i][1]-ANEXO1[i][2])/rbt,share=i<5?.155:.344;mens=fat*ms*ef*share;
   prem=`~${Math.round(ms*100)}% das vendas em produtos monofásicos e que nenhum mês foi separado no PGDAS-D · alíquota efetiva estimada ${pct(ef)}% (Anexo I, faixa ${i+1})`}
  else{const ms=seg==='merc'?.08:.18;mens=fat*ms*(reg==='real'?.0925:.0365);
   prem=`~${Math.round(ms*100)}% das vendas em produtos monofásicos e que essa receita entrou na base do PIS e da Cofins em todos os meses`}
  const tot=mens*m,sel=tot*.22,v=tot+sel,rs=x=>x<1000?Math.max(100,Math.round(x/100)*100):Math.round(x/1000)*1000,sa=rs(sel*.7),sb=rs(sel*1.15);
  return {valor:v,min:r1k(v*.7),max:r1k(v*1.15),seg:sl,reg:rl,outro:false,linhas:[base,['Supomos',prem,1],['Já inclui correção pela Selic (estimativa conservadora)',sa===sb?`~${brl(sa)}`:`~${brl(sa)} a ${brl(sb)}`]],pontos:p,
   resumo:`${reg}, faturamento ${brl(fat)}/mês, segmento ${sl}${nsei?' (regime a confirmar)':''}`,
   rotulo:reg==='simples'?'Estimativa se nenhum mês foi separado':'Estimativa para os últimos 60 meses'}},
 leilao(){const mer=num($('#q_mer').value),cap=num($('#q_cap').value),pz=$('#q_pz').dataset.v||'3m';const custo=mer*0.62,desc=mer-custo;
  const p=Math.min(100,(cap>=mer*.6?40:cap>=mer*.3?25:5)+(pz==='ja'?35:pz==='3m'?22:8)+(mer>=3e5?20:12));
  return {valor:desc,linhas:[['Valor de mercado',brl(mer)],['Custo total típico em 2º leilão (~62%)',brl(custo)],['Recursos disponíveis',brl(cap)]],pontos:p,resumo:`imóvel ${brl(mer)}, recursos ${brl(cap)}, prazo ${pz}`,rotulo:'de desconto possível em leilão (estimativa)'}},
 inv(){const pat=num($('#q_pat').value),ap=num($('#q_ap').value),onde=$('#q_onde').dataset.v||'poup';const n=180,rb=Math.pow(1.10,1/12)-1,rp=Math.pow(1.065,1/12)-1;let a=pat,b=pat;for(let k=0;k<n;k++){a=a*(1+rb)+ap;b=b*(1+rp)+ap}
  const p=Math.min(100,(pat>=1e6?50:pat>=3e5?40:pat>=5e4?25:10)+(onde==='poup'?30:onde==='banco'?25:10)+(ap>=2000?15:5));
  return {valor:a-b,linhas:[['Em 15 anos, carteira a 10% a.a.',brl(a)],['Mesmo valor a 6,5% a.a. (poupança/banco)',brl(b)]],pontos:p,resumo:`patrimônio ${brl(pat)}, aporte ${brl(ap)}/mês, hoje em ${onde}`,rotulo:'de diferença em 15 anos (simulação)'}},
 real(){const fat=num($('#q_fat').value),seg=$('#q_seg').dataset.v||'ind',ano=$('#q_ano').dataset.v||'sim',pres=($('#q_reg')?.dataset.v||'real')==='pres',RG=pres?'Lucro Presumido':'Lucro Real';
  const SL={ind:'indústria',merc:'mercado ou atacarejo',rest:'restaurante ou alimentação',outro:'outra atividade'}[seg],AL={sim:'5 anos ou mais',nao:'menos de 5 anos',ns:'tempo a confirmar'}[ano];
  const p=Math.min(100,(fat>=3e6?50:fat>=1e6?40:fat>=3e5?28:12)+(seg==='outro'?12:25)+(ano==='sim'?25:ano==='ns'?15:10));
  return {valor:0,outro:true,real:true,seg:SL,reg:RG,linhas:[['Regime',RG],['Atividade',SL],['Faturamento médio',brl(fat)+'/mês'],['Tempo de empresa',AL]],pontos:p,
   resumo:`${RG} (${AL}), ${SL}, faturamento ${brl(fat)}/mês`,
   rotulo:ano==='nao'?'Dá para revisar o período desde a abertura da empresa. Vale a conversa.':'Pelo perfil, vale a reunião: dá para revisar até 5 anos de PIS e Cofins antes da virada para a CBS.'}},
 emp(){const fat=num($('#q_fat').value),mg=num($('#q_mg').value),dor=$('#q_dor').dataset.v||'margem';const ganho=fat*12*Math.min(.05,Math.max(.02,(15-mg)/100*.3));
  const p=Math.min(100,(fat>=4e5?45:fat>=1e5?32:12)+(dor==='sucessao'||dor==='socios'?30:22)+(mg<10?20:10));
  return {valor:ganho,linhas:[['Faturamento anual',brl(fat*12)],['Margem líquida atual',mg+'%']],pontos:p,resumo:`faturamento ${brl(fat)}/mês, margem ${mg}%, dor ${dor}`,rotulo:'de ganho anual possível com gestão (estimativa)'}}};
const faixa=r=>r.min?`${brl(r.min)} a ${brl(r.max)}`:brl(r.valor);
let R=null,cur=0;
function go(n){$$('.step').forEach(s=>s.classList.toggle('on',s.dataset.s==n));const p=$$('.prog i');if(p.length>1)p.forEach((x,i)=>x.classList.toggle('on',i<n));else if(p[0])p[0].style.width=(n/3*100)+'%';
  document.body.classList.toggle('done',n==3);const sb=$('.stick .btn');if(sb&&sb.dataset.l2)sb.textContent=n==2?sb.dataset.l2:sb.dataset.l1;
  if(cur&&cur!=n){const h=$(`.step[data-s="${n}"] h3`);if(h){h.tabIndex=-1;h.focus({preventScroll:true})}}cur=n}
/* limites da simulação tributária: devolve mensagem de erro ou '' */
function limTrib(){const fat=num($('#q_fat').value),reg=$('#q_reg').dataset.v;
  if(fat<10000)return 'Abaixo de R$ 10 mil por mês a estimativa fica pouco precisa. Se quiser, <a target="_blank" rel="noopener" id="e1wa" href="'+wa('Olá! Vim pelo site e quero falar sobre recuperação tributária.')+'">fale com a gente direto</a>.';
  if(reg==='simples'&&fat>400000)return 'O limite do Simples é R$ 4,8 milhões por ano (cerca de R$ 400 mil por mês). Confira o regime e tente de novo.';
  if(fat>50000000)return 'Confira o valor: use o faturamento médio de um mês.';return ''}
/* tributário: pergunta extra quando o segmento é "Outro" */
const qOut=$('#q_out');
if(S==='trib'&&qOut){const og=$('#q_outg'),om=$('#q_outm'),tl=$('#toLeadT');
  const sync=()=>{const o=$('#q_seg').dataset.v==='outro';og.hidden=!o;tl&&(tl.textContent=o?'Continuar':'Simular estimativa');
    om.textContent=!o?'':qOut.dataset.v==='sim'?'Depende de quanto das vendas são esses produtos: confirmamos na conversa, sem custo.':qOut.dataset.v==='nao'?'Sem produtos monofásicos, esta revisão provavelmente não se aplica. Quer que um especialista confirme?':''};
  $$('#q_seg button,#q_out button').forEach(b=>b.addEventListener('click',sync))}
/* Enter em qualquer campo da etapa 1 = simular */
$$('.step[data-s="1"] input').forEach(i=>i.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();$('#toLead').click()}}));
$('#toLead').onclick=()=>{const e1=$('#e1');const req=$$('.step[data-s="1"] input[required]').find(i=>!num(i.value));if(req){inv(req,'e1','Preencha os valores para calcular.');return}
  if(S==='trib'&&$('#q_seg')&&!$('#q_seg').dataset.v){const g=$('#q_seg');if(g.closest('[hidden]'))g.closest('[hidden]').hidden=false;inv(g,'e1','Escolha uma opção: a empresa vende algum destes produtos?',0,g.querySelector('button'));return}
  if(S==='trib'&&qOut&&$('#q_seg').dataset.v==='outro'&&!qOut.dataset.v){inv(qOut,'e1','Responda se a empresa vende algum destes produtos.',0,qOut.querySelector('button'));return}
  if(S==='trib'){const lm=limTrib();if(lm){inv($('#q_fat'),'e1',lm,1);track('calc_bound');const l=$('#e1wa');l&&(l.onclick=()=>track('wa_click',{from:'bound'}));return}}
  e1.textContent='';R=CALC[S]();const tz=$('#tz'),tq=tz.closest('.teaser');
  if(R.outro){tq&&tq.classList.add('nofig');tz.textContent=''}else{tq&&tq.classList.remove('nofig');tz.textContent=R.min?'R$ 00.000 a R$ 00.000':brl(R.valor)}
  $('#tzl').textContent=R.rotulo;const s2h=$('#s2h');s2h&&(s2h.textContent=R.outro?'Falta só o contato':'Sua estimativa está pronta');
  go(2);track('calc_done');if(matchMedia('(min-width:901px)').matches)setTimeout(()=>$('#f_n').focus(),100);else $('#box').scrollIntoView({block:'start',behavior:RM()})};
$('#back1')?.addEventListener('click',()=>{go(1);$('#q_fat')?.focus()});
const DDD=new Set('11 12 13 14 15 16 17 18 19 21 22 24 27 28 31 32 33 34 35 37 38 41 42 43 44 45 46 47 48 49 51 53 54 55 61 62 63 64 65 66 67 68 69 71 73 74 75 77 79 81 82 83 84 85 86 87 88 89 91 92 93 94 95 96 97 98 99'.split(' '));
const okTel=v=>{const d=v.replace(/\D/g,'');if(v.trim().startsWith('+'))return d.length>=8;return (d.length===10||d.length===11)&&DDD.has(d.slice(0,2))};
const FIX={'gmail.con':'gmail.com','gmial.com':'gmail.com','gmai.com':'gmail.com','hotmial.com':'hotmail.com','hotmail.con':'hotmail.com','outlook.con':'outlook.com','yahoo.con':'yahoo.com'};
const fixMail=()=>{const f=$('#f_e');if(!f)return '';let m=f.value.trim().toLowerCase();const dm=m.split('@')[1];if(FIX[dm]){m=m.replace(dm,FIX[dm]);f.value=m;const e2=$('#e2');e2.textContent='Corrigimos para '+FIX[dm]+'.';e2.classList.add('info')}return m};
$('#f_e')?.addEventListener('change',fixMail);
/* envio do lead: fila local só para falha de rede, 5xx, 401, 403, 408 e 429 (nunca 400/422); 409 = já recebido */
const SBU=()=>LP_CONFIG.supabaseUrl&&LP_CONFIG.supabaseAnonKey?LP_CONFIG.supabaseUrl.replace(/\/$/,'')+'/rest/v1/leads':'';
const postLead=l=>fetch(SBU(),{method:'POST',headers:{apikey:LP_CONFIG.supabaseAnonKey,Authorization:'Bearer '+LP_CONFIG.supabaseAnonKey,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify(l),keepalive:true});
const reQ=s=>!s||s>=500||[401,403,408,429].includes(s),D7=7*864e5;
const fila={get:()=>store.get('fila',[]).map(x=>x&&x.lead?x:{d:Date.now(),lead:x}).filter(x=>x.lead&&Date.now()-x.d<D7),
  add(l){const q=fila.get();q.push({d:Date.now(),lead:l});store.set('fila',q.slice(-10))},
  drop(ok){store.set('fila',fila.get().filter(x=>!ok.has(x.lead.protocolo)).slice(-10))}}; // relê a fila antes de gravar e tira só os enviados
let flushing=false;
async function flush(){if(!SBU()||flushing)return;const q=fila.get();if(!q.length)return;flushing=true;const ok=new Set();
  try{for(const x of q){try{const rs=await postLead(x.lead);if(rs.ok||rs.status===409)ok.add(x.lead.protocolo);else if(!reQ(rs.status)){ok.add(x.lead.protocolo);track('lead_send_fail',{status:rs.status})}}catch(e){}}}
  finally{fila.drop(ok);flushing=false}}
const t0=Date.now();
$('#leadF').onsubmit=async e=>{e.preventDefault();if($('#hp').value)return; // só o honeypot descarta em silêncio
  const e2=$('#e2');e2.classList.remove('info');
  const n=$('#f_n').value.trim(),t=$('#f_t').value.trim(),m=fixMail(),mReq=!!$('#f_e')?.required;
  const bad=n.length<2?['f_n','Informe seu nome.']:!okTel(t)?['f_t','WhatsApp inválido: inclua o DDD.']:(m||mReq)&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(m)?['f_e','E-mail inválido.']:!$('#f_ok').checked?['f_ok','Precisamos do seu consentimento para responder a simulação.']:null;
  if(bad){e2.classList.remove('info');inv($('#'+bad[0]),'e2',bad[1]);track('form_error',{er:bad[1]});return}
  const b=e.submitter||$('#leadF .btn');if(b.disabled)return;b.disabled=true;const bt=b.innerHTML;b.textContent='Enviando…';
  const wait=2500-(Date.now()-t0);if(wait>0)await new Promise(r=>setTimeout(r,wait)); // rápido demais: espera, nunca descarta
  const tier=R.pontos>=70?'A':R.pontos>=45?'B':'C',prot=new Date().toISOString().slice(2,10).replace(/-/g,'')+'-'+S.slice(0,2).toUpperCase()+Math.random().toString(36).slice(2,5).toUpperCase();
  const mk=$('#f_mkt'),A=window.LP_ANG&&typeof window.LP_ANG==='object'?window.LP_ANG:null,ang=A&&A.ang||null;
  const lead={nome:n,telefone:t,email:m||null,area:{trib:'Tributário',real:'Tributário',leilao:'Leilão',inv:'Investimentos',emp:'Empresarial'}[S],perfil:'LP '+S,mensagem:R.resumo,score:R.pontos,faixa:tier,protocolo:prot,idioma:'pt',versao:'lp',utm:store.get('utm',null),pagina:location.href,
    quiz:{estimativa:Math.round(R.valor),linhas:R.linhas,...(R.min?{min:R.min,max:R.max}:{}),...(ang?{ang}:{}),...(A&&A.seg?{ang_seg:A.seg}:{})}};
  if(R.min)lead.valor=faixa(R);if(ang)lead.teste_ab='ang-'+ang;
  lead.consentimento={lgpd:true,ts:new Date().toISOString(),texto:'v1',pagina:location.pathname,...(mk?{optin_mkt:mk.checked}:{})};
  const L=store.get('leads',[]);const{nome:_n,telefone:_t,email:_e,...semPII}=lead;L.push({...semPII,d:Date.now()});store.set('leads',L.slice(-20)); // histórico local sem nome/contato
  track('lead',{tier,...(ang?{ang}:{})});
  if(SBU()){const falhou=s=>{track('lead_send_fail',{status:s||0});if(reQ(s)){fila.add(lead);setTimeout(flush,1e4)}};
    try{const rs=await postLead(lead);if(!rs.ok&&rs.status!==409)falhou(rs.status)}catch(err){falhou(0)}}
  if(S==='real'){ // Lucro Real: sem valor, só o próximo passo (reunião)
    const msg=`Olá! Sou ${n}. Vi a página sobre créditos de PIS/Cofins (${R.reg}, ${R.seg}, faturamento ${R.linhas[2][1]}). Quero marcar a reunião de 30 minutos. Protocolo ${prot}.`;
    $('#res').innerHTML=`<h3 id="resH" tabindex="-1">Próximo passo</h3><p class="out">${R.rotulo}</p>${R.linhas.map(l=>`<div class="row"><span>${l[0]}</span><b>${l[1]}</b></div>`).join('')}<p class="eyebrow" style="margin-top:18px">O que acontece agora</p><ol class="next"><li>Você manda a mensagem pronta no WhatsApp.</li><li>Respondemos em até 1 dia útil com horários para a reunião.</li><li>Na reunião, você vê o que vale revisar antes de decidir qualquer coisa.</li></ol><a class="btn" id="waGo" target="_blank" rel="noopener" href="${wa(msg)}">Marcar a reunião no WhatsApp</a><p class="micro" style="margin-top:8px">A mensagem já vai pronta · reunião sem custo · protocolo <b>${prot}</b></p><p class="micro">${document.body.dataset.disc}</p>`;
  }else if(S==='trib'){ // tributário: faixa (ou próximo passo, em "outro"), mensagem pronta e envio ao contador
    const fx=R.outro?'':faixa(R);let msg,share;
    if(R.outro){msg=`Olá! Sou ${n}. Fiz a simulação tributária no site (${R.seg}, ${R.reg}). ${R.sim?'A empresa vende alguns produtos monofásicos (medicamentos, cosméticos, autopeças ou bebidas).':'Pelo que sei, a empresa não vende produtos monofásicos.'} Quero que um especialista confirme. Protocolo ${prot}.`;
      share=`Fiz uma simulação tributária no site da Gera Caixa (${R.seg}, ${R.reg}). Vale a gente conferir se há produtos monofásicos nas vendas? Protocolo ${prot}.`}
    else{msg=`Olá! Sou ${n}. Fiz a simulação tributária no site (${R.seg}, ${R.reg}): estimativa de ${fx}. Protocolo ${prot}. Quero entender o próximo passo.`;
      share=`Fiz uma simulação tributária no site da Gera Caixa (${R.seg}, ${R.reg}): pode haver de ${fx} pagos a mais nos últimos 60 meses (estimativa). Protocolo ${prot}. Vale a gente conferir?`}
    $('#res').innerHTML=`<h3 id="resH" tabindex="-1">${R.outro?'Próximo passo':'Sua estimativa'}</h3>${R.outro?`<p class="out">${R.rotulo}</p>`:`<div class="big rg">${fx}</div><p class="micro" style="margin-top:0;text-align:left">${R.rotulo}</p>`}${R.linhas.map(l=>`<div class="row${l[2]?' tx':''}"><span>${l[0]}</span><b>${l[1]}</b></div>`).join('')}<p class="eyebrow" style="margin-top:18px">O que acontece agora</p><ol class="next"><li>Você manda a mensagem pronta no WhatsApp.</li><li>Respondemos em até 1 dia útil e dizemos quais arquivos separar.</li><li>Você recebe o detalhamento por mês antes de decidir qualquer coisa.</li></ol><a class="btn" id="waGo" target="_blank" rel="noopener" href="${wa(msg)}">${R.outro?'Falar no WhatsApp com um especialista':'Falar no WhatsApp com minha estimativa'}</a><p class="micro" style="margin-top:8px">A mensagem já vai pronta · conferir não tem custo · honorário só sobre o recuperado</p><a class="lk" id="shareCt" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(share)}">${R.outro?'Mandar para o meu contador':'Mandar esta estimativa para o meu contador'}</a><p class="micro">Protocolo <b>${prot}</b> · Atendimento seg a sex, 9h às 18h</p><p class="micro">${document.body.dataset.disc}</p>`;
    $('#shareCt').onclick=()=>track('share_contador');
  }else{
    const msg=`Olá! Sou ${n}. Fiz a simulação de ${lead.area} no site: ${brl(R.valor)} ${R.rotulo}. Protocolo ${prot}. Quero falar com um especialista.`;
    $('#res').innerHTML=`<span class="tier t${tier}">${tier==='A'?'Prioridade alta':tier==='B'?'Bom potencial':'Em análise'}</span><div class="big">${brl(R.valor)}</div><p class="micro" style="margin-top:0">${R.rotulo}</p>${R.linhas.map(l=>`<div class="row"><span>${l[0]}</span><b>${l[1]}</b></div>`).join('')}<a class="btn wa" id="waGo" target="_blank" rel="noopener" href="${wa(msg)}">Falar agora no WhatsApp →</a><p class="micro">Protocolo <b>${prot}</b> · Atendimento seg–sex, 9h–18h</p><p class="micro">${document.body.dataset.disc}</p>`;}
  b.disabled=false;b.innerHTML=bt;
  $('#tz').classList.add('on');go(3);$('#waGo').onclick=()=>track('wa_click');$('#box').scrollIntoView({block:'start',behavior:RM()});const rh=$('#resH');rh&&rh.focus({preventScroll:true})};
/* repetição do CTA e barra fixa no celular */
$$('[data-top]').forEach(a=>a.onclick=e=>{e.preventDefault();const s1=$('.step[data-s="1"]')?.classList.contains('on'),s2=$('.step[data-s="2"]')?.classList.contains('on'),bx=$('#box');
  bx.scrollIntoView({behavior:RM(),block:s2||bx.offsetHeight>innerHeight?'start':'center'});
  setTimeout(()=>{if(s2)$('#f_n')?.focus({preventScroll:true});else if(s1){const f=$$('.step[data-s="1"] .seg button').find(b=>!b.disabled&&b.offsetParent)||$('#q_fat')||$('.step[data-s="1"] input');f&&f.focus({preventScroll:true})}},400);track('cta_repeat')});
addEventListener('scroll',()=>{const r=$('#box').getBoundingClientRect();$('.stick').classList.toggle('on',r.bottom<0)},{passive:true});
$$('.wa-link').forEach(a=>a.href=wa('Olá! Vim pelo site e quero falar com um especialista.'));
$$('.cfg-cnpj').forEach(e=>e.textContent=LP_CONFIG.cnpj);$$('.cfg-marca').forEach(e=>e.textContent=LP_CONFIG.marca);
$$('.cfg-int').forEach(e=>e.textContent=LP_CONFIG.intermediario);$$('.cfg-cred').forEach(e=>e.textContent=LP_CONFIG.credencial);$$('.cfg-ass').forEach(e=>e.textContent=LP_CONFIG.assessor);
/* tributário: janela de 5 anos pela data do pagamento (o DAS vence no dia 20): até o dia 20, o mesmo mês de 5 anos atrás; depois, o mês seguinte */
if($('#win0')||$('.cfg-w0')){const MES='jan fev mar abr mai jun jul ago set out nov dez'.split(' '),fm=d=>MES[d.getMonth()]+'/'+d.getFullYear();
  const NOW=new Date(),W0=new Date(NOW.getFullYear()-5,NOW.getMonth()+(NOW.getDate()>20?1:0),1);
  if($('#win0'))$('#win0').textContent=fm(W0);if($('#win1'))$('#win1').textContent='20/'+String(W0.getMonth()+1).padStart(2,'0')+'/'+(W0.getFullYear()+5);$$('.cfg-w0').forEach(e=>e.textContent=fm(W0))}
/* tributário: pré-seleção vinda do anúncio (window.LP_ANG é definido pelo script inline do hero) */
const ANG=S==='trib'&&window.LP_ANG&&typeof window.LP_ANG==='object'?window.LP_ANG:null;
if(ANG){if(ANG.ang==='B'&&$('#q_reg'))pick($('#q_reg'),'simples');if(ANG.seg&&$('#q_seg'))pick($('#q_seg'),ANG.seg)}
$('#q_alt')?.addEventListener('click',()=>{$$('.qg').forEach(g=>g.hidden=false);const p=$('#q_pre');p&&(p.hidden=true);const bs=$('#q_bs');bs&&(bs.textContent='3 perguntas · cerca de 30 segundos');($('#q_reg button.on')||$('#q_reg button'))?.focus()});
/* tributário: caminho secundário para contadores */
const parc=$('#parc');if(parc){parc.href=wa(`Olá! Sou contador(a) e quero entender a parceria da Gera Caixa para clientes do Simples. Protocolo 4R-P-${Math.random().toString(36).slice(2,6).toUpperCase()}.`,LP_CONFIG.waParceiro);parc.onclick=()=>track('partner_click',ANG&&ANG.ang?{ang:ANG.ang}:{})}
/* reenvia leads que ficaram na fila: ao carregar e quando a conexão volta */
flush();addEventListener('online',flush);
track('view',ANG&&ANG.ang?{ang:ANG.ang}:{});go(1);
