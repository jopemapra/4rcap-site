/* Landing pages de conversão: 1 serviço, 1 oferta, 1 ação.
   Funil: calculadora-isca (2-3 campos) → resultado borrado → nome/WhatsApp/e-mail → resultado + faixa + WhatsApp.
   Este arquivo é compartilhado por lp-tributario, lp2-tributario, lp-leilao, lp-investimentos e lp-empresarial:
   tudo que é específico de uma página fica condicionado a S==='trib' ou à existência do elemento. */
const LP_CONFIG={ // use os MESMOS valores do CONFIG em app.js
  marca:'4RCAP', whatsapp:'5500000000000', cnpj:'46.131.513/0001-32',
  waParceiro:'', // WhatsApp separado para contadores (opcional; vazio = usa o principal)
  supabaseUrl:'', supabaseAnonKey:'',
  gtmId:'', metaPixelId:'', // ex.: 'GTM-XXXXXXX' / '123456789012345'; vazios = nada é carregado
  assessor:'Seu Nome', credencial:'ANCORD nº 00000', intermediario:'NOME DA CORRETORA S.A.'};
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const brl=n=>(isFinite(n)?n:0).toLocaleString('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0});
const num=v=>parseFloat(String(v).replace(/\./g,'').replace(',','.'))||0;
const S=document.body.dataset.svc;
const store={get(k,d){try{return JSON.parse(localStorage.getItem('lp_'+k))??d}catch(e){return d}},set(k,v){try{localStorage.setItem('lp_'+k,JSON.stringify(v))}catch(e){}}};
function track(ev,d={}){window.dataLayer&&dataLayer.push({event:ev,svc:S,...d});const l=store.get('ev',[]);l.push({ev,t:Date.now(),...d});store.set('ev',l.slice(-300))}
const wa=(m,n)=>`https://wa.me/${n||LP_CONFIG.whatsapp}?text=${encodeURIComponent(m)}`;
/* GTM / Meta Pixel: só carregam se configurados */
if(LP_CONFIG.gtmId){window.dataLayer=window.dataLayer||[];dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});const g=document.createElement('script');g.async=true;g.src='https://www.googletagmanager.com/gtm.js?id='+encodeURIComponent(LP_CONFIG.gtmId);document.head.appendChild(g)}
if(LP_CONFIG.metaPixelId){!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',LP_CONFIG.metaPixelId);fbq('track','PageView')}
/* utm */
try{const q=new URLSearchParams(location.search),u={};['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid','fbclid'].forEach(k=>q.get(k)&&(u[k]=q.get(k)));if(Object.keys(u).length)store.set('utm',u)}catch(e){}
/* máscaras */
$$('.money').forEach(i=>i.addEventListener('input',()=>{const d=i.value.replace(/\D/g,'');i.value=d?(+d).toLocaleString('pt-BR'):''}));
const tel=$('#f_t');tel&&tel.addEventListener('input',()=>{if(tel.value.startsWith('+'))return;const d=tel.value.replace(/\D/g,'').slice(0,11);tel.value=d.length>10?d.replace(/(\d{2})(\d{5})(\d{4})/,'($1) $2-$3'):d.replace(/(\d{2})(\d{4})(\d{0,4})/,'($1) $2-$3').replace(/-$/,'')});
/* segment buttons */
const pick=(g,v)=>{const b=g&&g.querySelector(`button[data-v="${v}"]`);if(!b)return;g.querySelectorAll('button').forEach(x=>{x.classList.toggle('on',x===b);x.setAttribute('aria-pressed',x===b)});g.dataset.v=v};
$$('.seg').forEach(g=>g.querySelectorAll('button').forEach(b=>b.onclick=()=>pick(g,b.dataset.v)));
/* cálculos por serviço: retornam {valor, linhas[], pontos(0-100), resumo} */
const SEGL={farm:'farmácia/perfumaria',auto:'autopeças',beb:'bebidas',mono:'monofásico',outro:'outro'},REGL={simples:'Simples',pres:'Lucro Presumido',real:'Lucro Real'};
const r1k=n=>Math.max(1000,Math.round(n/1000)*1000);
const CALC={
 /* Premissas a validar: Simples mono 55% da receita, "outro" 15%; Presumido/Real mono 18%, "outro" 6%; Selic 22%; faixa ×0,7 a ×1,15 */
 trib(){const reg0=$('#q_reg').dataset.v||'simples',fat=num($('#q_fat').value),seg=$('#q_seg').dataset.v||'mono',mono=seg!=='outro',m=60;
  const nsei=reg0==='nsei',reg=nsei?(fat<=4e5?'simples':'pres'):reg0,sl=SEGL[seg]||seg,rl=REGL[reg]+(nsei?' (a confirmar)':'');
  let mens=0;if(reg==='simples')mens=fat*(mono?.55:.15)*0.075*0.1365;else mens=fat*(mono?.18:.06)*(reg==='real'?.0925:.0365)+(mono?fat*.004:0);
  const tot=mens*m,sel=tot*.22,v=tot+sel,p=Math.min(100,(fat>=1e6?45:fat>=2e5?35:fat>=5e4?22:8)+(mono?30:12)+(reg==='simples'?15:20));
  const prem=reg==='simples'?(mono?'~55% da receita em monofásicos; DAS efetivo ~7,5%':'15% da receita em monofásicos (a confirmar)'):(mono?'~18% da receita em monofásicos':'6% da receita em monofásicos (a confirmar)');
  return {valor:v,min:r1k(v*.7),max:r1k(v*1.15),seg:sl,reg:rl,outro:!mono,linhas:[['Base',`${rl} · ${sl} · ${brl(fat)}/mês`],['Premissa',prem],['Selic (estimada)',`~${brl(r1k(sel*.7))} a ${brl(r1k(sel*1.15))}`]],pontos:p,
   resumo:`${reg}, faturamento ${brl(fat)}/mês, segmento ${sl}${nsei?' (regime a confirmar)':''}`,
   rotulo:mono?'pode ter sido pago a mais nos últimos 60 meses, com correção estimada pela Selic (estimativa)':'pode ter sido pago a mais nos últimos 60 meses SE houver produtos monofásicos no mix (estimativa)'}},
 leilao(){const mer=num($('#q_mer').value),cap=num($('#q_cap').value),pz=$('#q_pz').dataset.v||'3m';const custo=mer*0.62,desc=mer-custo;
  const p=Math.min(100,(cap>=mer*.6?40:cap>=mer*.3?25:5)+(pz==='ja'?35:pz==='3m'?22:8)+(mer>=3e5?20:12));
  return {valor:desc,linhas:[['Valor de mercado',brl(mer)],['Custo total típico em 2º leilão (~62%)',brl(custo)],['Recursos disponíveis',brl(cap)]],pontos:p,resumo:`imóvel ${brl(mer)}, recursos ${brl(cap)}, prazo ${pz}`,rotulo:'de desconto possível em leilão (estimativa)'}},
 inv(){const pat=num($('#q_pat').value),ap=num($('#q_ap').value),onde=$('#q_onde').dataset.v||'poup';const n=180,rb=Math.pow(1.10,1/12)-1,rp=Math.pow(1.065,1/12)-1;let a=pat,b=pat;for(let k=0;k<n;k++){a=a*(1+rb)+ap;b=b*(1+rp)+ap}
  const p=Math.min(100,(pat>=1e6?50:pat>=3e5?40:pat>=5e4?25:10)+(onde==='poup'?30:onde==='banco'?25:10)+(ap>=2000?15:5));
  return {valor:a-b,linhas:[['Em 15 anos, carteira a 10% a.a.',brl(a)],['Mesmo valor a 6,5% a.a. (poupança/banco)',brl(b)]],pontos:p,resumo:`patrimônio ${brl(pat)}, aporte ${brl(ap)}/mês, hoje em ${onde}`,rotulo:'de diferença em 15 anos (simulação)'}},
 emp(){const fat=num($('#q_fat').value),mg=num($('#q_mg').value),dor=$('#q_dor').dataset.v||'margem';const ganho=fat*12*Math.min(.05,Math.max(.02,(15-mg)/100*.3));
  const p=Math.min(100,(fat>=4e5?45:fat>=1e5?32:12)+(dor==='sucessao'||dor==='socios'?30:22)+(mg<10?20:10));
  return {valor:ganho,linhas:[['Faturamento anual',brl(fat*12)],['Margem líquida atual',mg+'%']],pontos:p,resumo:`faturamento ${brl(fat)}/mês, margem ${mg}%, dor ${dor}`,rotulo:'de ganho anual possível com gestão (estimativa)'}}};
const faixa=r=>r.min?`${brl(r.min)} a ${brl(r.max)}`:brl(r.valor);
let R=null;
function go(n){$$('.step').forEach(s=>s.classList.toggle('on',s.dataset.s==n));const p=$$('.prog i');if(p.length>1)p.forEach((x,i)=>x.classList.toggle('on',i<n));else if(p[0])p[0].style.width=(n/3*100)+'%';
  document.body.classList.toggle('done',n==3);const sb=$('.stick .btn');if(sb&&sb.dataset.l2)sb.textContent=n==2?sb.dataset.l2:sb.dataset.l1}
/* limites da simulação tributária: devolve mensagem de erro ou '' */
function limTrib(){const fat=num($('#q_fat').value),reg=$('#q_reg').dataset.v;
  if(fat<10000)return 'Abaixo de R$ 10 mil por mês a estimativa fica pouco precisa. Se quiser, <a target="_blank" rel="noopener" id="e1wa" href="'+wa('Olá! Vim pelo site e quero falar sobre recuperação tributária.')+'">fale com a gente direto</a>.';
  if(reg==='simples'&&fat>400000)return 'O limite do Simples é R$ 4,8 milhões por ano (cerca de R$ 400 mil por mês). Confira o regime e tente de novo.';
  if(fat>50000000)return 'Confira o valor: use o faturamento médio de um mês.';return ''}
$('#toLead').onclick=()=>{const req=$$('.step[data-s="1"] input[required]').find(i=>!num(i.value));if(req){$('#e1').textContent='Preencha os valores para calcular.';req.focus();return}
  if(S==='trib'&&$('#q_seg')&&!$('#q_seg').dataset.v){$('#e1').textContent='Escolha o que a empresa mais vende.';$('#q_seg button').focus();return}
  if(S==='trib'){const lm=limTrib();if(lm){$('#e1').innerHTML=lm;track('calc_bound',{fat:num($('#q_fat').value)});const l=$('#e1wa');l&&(l.onclick=()=>track('wa_click',{from:'bound'}));return}}
  $('#e1').textContent='';R=CALC[S]();$('#tz').textContent=R.min?'R$ 00.000 a R$ 00.000':brl(R.valor);$('#tzl').textContent=R.rotulo;go(2);track('calc_done',{v:Math.round(R.valor)});if(matchMedia('(min-width:901px)').matches)setTimeout(()=>$('#f_n').focus(),100);else $('#box').scrollIntoView({block:'start'})};
const DDD=new Set('11 12 13 14 15 16 17 18 19 21 22 24 27 28 31 32 33 34 35 37 38 41 42 43 44 45 46 47 48 49 51 53 54 55 61 62 63 64 65 66 67 68 69 71 73 74 75 77 79 81 82 83 84 85 86 87 88 89 91 92 93 94 95 96 97 98 99'.split(' '));
const okTel=v=>{const d=v.replace(/\D/g,'');if(v.trim().startsWith('+'))return d.length>=8;return (d.length===10||d.length===11)&&DDD.has(d.slice(0,2))};
const FIX={'gmail.con':'gmail.com','gmial.com':'gmail.com','gmai.com':'gmail.com','hotmial.com':'hotmail.com','hotmail.con':'hotmail.com','outlook.con':'outlook.com','yahoo.con':'yahoo.com'};
const fixMail=()=>{const f=$('#f_e');let m=f.value.trim().toLowerCase();const dm=m.split('@')[1];if(FIX[dm]){m=m.replace(dm,FIX[dm]);f.value=m;const e2=$('#e2');e2.textContent='Corrigimos para '+FIX[dm]+'.';e2.classList.add('info')}return m};
$('#f_e').addEventListener('change',fixMail);
const t0=Date.now();
$('#leadF').onsubmit=async e=>{e.preventDefault();if($('#hp').value)return; // só o honeypot descarta em silêncio
  const e2=$('#e2');e2.classList.remove('info');
  const n=$('#f_n').value.trim(),t=$('#f_t').value.trim(),m=fixMail(),mReq=$('#f_e').required;
  const er=n.length<2?'Informe seu nome.':!okTel(t)?'WhatsApp inválido: inclua o DDD.':(m||mReq)&&!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(m)?'E-mail inválido.':!$('#f_ok').checked?'Precisamos do seu consentimento para responder a simulação.':'';
  if(er){e2.classList.remove('info');e2.textContent=er;track('form_error',{er});return}
  const b=e.submitter||$('#leadF .btn');if(b.disabled)return;b.disabled=true;const bt=b.innerHTML;b.textContent='Enviando…';
  const wait=2500-(Date.now()-t0);if(wait>0)await new Promise(r=>setTimeout(r,wait)); // rápido demais: espera, nunca descarta
  const tier=R.pontos>=70?'A':R.pontos>=45?'B':'C',prot=new Date().toISOString().slice(2,10).replace(/-/g,'')+'-'+S.slice(0,2).toUpperCase()+Math.random().toString(36).slice(2,5).toUpperCase();
  const mk=$('#f_mkt'),ang=window.LP_ANG||null;
  const lead={nome:n,telefone:t,email:m||null,area:{trib:'Tributário',leilao:'Leilão',inv:'Investimentos',emp:'Empresarial'}[S],perfil:'LP '+S,mensagem:R.resumo,score:R.pontos,faixa:tier,protocolo:prot,idioma:'pt',versao:'lp',utm:store.get('utm',null),pagina:location.href,
    quiz:{estimativa:Math.round(R.valor),linhas:R.linhas,...(R.min?{min:R.min,max:R.max}:{}),...(ang?{ang}:{})}};
  if(R.min)lead.valor=faixa(R);if(ang)lead.teste_ab='ang-'+ang;
  if(mk)lead.consentimento={lgpd:true,optin_mkt:mk.checked,ts:new Date().toISOString()};
  const L=store.get('leads',[]);const{nome:_n,telefone:_t,email:_e,...semPII}=lead;L.push({...semPII,d:Date.now()});store.set('leads',L.slice(-20)); // histórico local sem nome/contato
  track('lead',{tier,...(ang?{ang}:{})});
  if(LP_CONFIG.supabaseUrl&&LP_CONFIG.supabaseAnonKey){const fila=()=>{const q=store.get('fila',[]);q.push(lead);store.set('fila',q)};try{const rs=await fetch(LP_CONFIG.supabaseUrl.replace(/\/$/,'')+'/rest/v1/leads',{method:'POST',headers:{apikey:LP_CONFIG.supabaseAnonKey,Authorization:'Bearer '+LP_CONFIG.supabaseAnonKey,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify(lead),keepalive:true});if(!rs.ok)fila()}catch(err){fila()}}
  if(R.min){ // tributário: faixa, próximos passos, protocolo e envio ao contador
    const fx=faixa(R),msg=`Olá! Sou ${n}. Fiz a simulação tributária no site (${R.seg}, ${R.reg}): estimativa de ${fx}. Protocolo ${prot}. Quero entender o próximo passo.`,
      share=`Fiz uma simulação tributária no site da 4RCAP (${R.seg}, ${R.reg}): pode haver de ${fx} pagos a mais nos últimos 60 meses (estimativa). Protocolo ${prot}. Vale a gente conferir?`;
    $('#res').innerHTML=`<h3 id="resH" tabindex="-1">Sua estimativa</h3><div class="big rg">${fx}</div><p class="micro" style="margin-top:0;text-align:left">${R.rotulo}</p>${R.linhas.map(l=>`<div class="row"><span>${l[0]}</span><b>${l[1]}</b></div>`).join('')}<p class="eyebrow" style="margin-top:18px">O que acontece agora</p><ol class="next"><li>Você envia o protocolo no WhatsApp.</li><li>Respondemos em até 1 dia útil e dizemos quais arquivos separar.</li><li>Você recebe o detalhamento por mês antes de decidir qualquer coisa.</li></ol><a class="btn" id="waGo" target="_blank" rel="noopener" href="${wa(msg)}">Enviar protocolo no WhatsApp</a><a class="lk" id="shareCt" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent(share)}">Mandar esta estimativa para o meu contador</a><p class="micro">Protocolo <b>${prot}</b> · Atendimento seg a sex, 9h às 18h</p><p class="micro">${document.body.dataset.disc}</p>`;
    $('#shareCt').onclick=()=>track('share_contador');
  }else{
    const msg=`Olá! Sou ${n}. Fiz a simulação de ${lead.area} no site: ${brl(R.valor)} ${R.rotulo}. Protocolo ${prot}. Quero falar com um especialista.`;
    $('#res').innerHTML=`<span class="tier t${tier}">${tier==='A'?'Prioridade alta':tier==='B'?'Bom potencial':'Em análise'}</span><div class="big">${brl(R.valor)}</div><p class="micro" style="margin-top:0">${R.rotulo}</p>${R.linhas.map(l=>`<div class="row"><span>${l[0]}</span><b>${l[1]}</b></div>`).join('')}<a class="btn wa" id="waGo" target="_blank" rel="noopener" href="${wa(msg)}">Falar agora no WhatsApp →</a><p class="micro">Protocolo <b>${prot}</b> · Atendimento seg–sex, 9h–18h</p><p class="micro">${document.body.dataset.disc}</p>`;}
  b.disabled=false;b.innerHTML=bt;
  $('#tz').classList.add('on');go(3);$('#waGo').onclick=()=>track('wa_click');$('#box').scrollIntoView({block:'start'});const rh=$('#resH');rh&&rh.focus({preventScroll:true})};
/* repetição do CTA e barra fixa no celular */
$$('[data-top]').forEach(a=>a.onclick=e=>{e.preventDefault();const s2=$('.step[data-s="2"]').classList.contains('on'),bx=$('#box');bx.scrollIntoView({behavior:'smooth',block:s2||bx.offsetHeight>innerHeight?'start':'center'});if(s2)setTimeout(()=>$('#f_n').focus({preventScroll:true}),400);track('cta_repeat')});
addEventListener('scroll',()=>{const r=$('#box').getBoundingClientRect();$('.stick').classList.toggle('on',r.bottom<0)},{passive:true});
$$('.wa-link').forEach(a=>a.href=wa('Olá! Vim pelo site e quero falar com um especialista.'));
$$('.cfg-cnpj').forEach(e=>e.textContent=LP_CONFIG.cnpj);$$('.cfg-marca').forEach(e=>e.textContent=LP_CONFIG.marca);
$$('.cfg-int').forEach(e=>e.textContent=LP_CONFIG.intermediario);$$('.cfg-cred').forEach(e=>e.textContent=LP_CONFIG.credencial);$$('.cfg-ass').forEach(e=>e.textContent=LP_CONFIG.assessor);
/* tributário: janela de 5 anos calculada a partir de hoje (sem contagem regressiva) */
const MES='jan fev mar abr mai jun jul ago set out nov dez'.split(' '),fm=d=>MES[d.getMonth()]+'/'+d.getFullYear();
const NOW=new Date(),W0=new Date(NOW.getFullYear()-5,NOW.getMonth(),1),N1=new Date(NOW.getFullYear(),NOW.getMonth()+1,1),W2=new Date(N1.getFullYear()-5,N1.getMonth(),1);
if($('#win0')){$('#win0').textContent=fm(W0);$('#win1').textContent=fm(N1);$('#win2').textContent=fm(W0)}
$$('.cfg-w0').forEach(e=>e.textContent=fm(W0));
/* tributário: título conforme o anúncio (utm_content A/B/C) */
if(S==='trib'&&$('#h_h1')){
  const ANG={
   A:{eb:'Recuperação tributária · PMEs',h1:'Imposto pago a mais é <span>caixa parado</span>.',
      sub:'Sua empresa pode ter pago tributo a mais nos últimos 5 anos. Simule em 30 segundos quanto pode voltar. Sem custo inicial: honorário só sobre o que for efetivamente recuperado.'},
   B:{eb:'Simples Nacional · produtos monofásicos',h1:'Farmácia, autopeças ou bebidas no Simples? Seu DAS pode ter cobrado <span>PIS e Cofins a mais</span>.',
      sub:'Esses produtos já têm PIS e Cofins recolhidos na indústria. Se a receita não foi separada no PGDAS-D, o DAS pode ter incluído PIS e Cofins que não eram devidos. Dá para revisar os pagamentos dos últimos 5 anos.',
      rr:'PIS e Cofins já vêm pagos da indústria. Se o PGDAS-D não separou essa receita, o DAS pode ter cobrado a mais.',pre:{q_reg:'simples',q_seg:'farm'}},
   C:{eb:'Prazo de 5 anos · CBS em 2027',h1:'O prazo para pedir imposto de volta <span>anda todo mês</span>.',
      sub:'Hoje dá para revisar pagamentos desde {INICIO}. A cada mês, o mês mais antigo sai da conta. Simule quanto ainda está dentro do prazo.',
      rr:'Hoje dá para revisar pagamentos desde {INICIO}. Todo mês, um mês sai da conta.'}};
  let uc='';try{uc=new URLSearchParams(location.search).get('utm_content')||(store.get('utm',{})||{}).utm_content||''}catch(e){}
  const k=uc.trim().charAt(0).toUpperCase(),a=ANG[k];
  if(a){window.LP_ANG=k;$('#h_eb').textContent=a.eb;$('#h_h1').innerHTML=a.h1;$('#h_sub').textContent=a.sub.replace('{INICIO}',fm(W0));if(a.rr&&$('#h_rr'))$('#h_rr').textContent=a.rr.replace('{INICIO}',fm(W0));if(a.pre)Object.entries(a.pre).forEach(([id,v])=>pick($('#'+id),v))}
}
/* tributário: caminho secundário para contadores */
const parc=$('#parc');if(parc){parc.href=wa(`Olá! Sou contador(a) e quero entender a parceria da 4RCAP para clientes do Simples. Protocolo 4R-P-${Math.random().toString(36).slice(2,6).toUpperCase()}.`,LP_CONFIG.waParceiro);parc.onclick=()=>track('partner_click')}
/* reenvia leads que ficaram na fila (falha de rede ou do servidor) e tira da fila os aceitos */
(async()=>{const q=store.get('fila',[]);if(!q.length||!LP_CONFIG.supabaseUrl||!LP_CONFIG.supabaseAnonKey)return;const rest=[];
  for(const l of q){try{const rs=await fetch(LP_CONFIG.supabaseUrl.replace(/\/$/,'')+'/rest/v1/leads',{method:'POST',headers:{apikey:LP_CONFIG.supabaseAnonKey,Authorization:'Bearer '+LP_CONFIG.supabaseAnonKey,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify(l)});if(!rs.ok&&(rs.status>=500||[401,403,408,429].includes(rs.status)))rest.push(l)}catch(e){rest.push(l)}}
  store.set('fila',rest)})();
track('view',window.LP_ANG?{ang:window.LP_ANG}:{});go(1);
