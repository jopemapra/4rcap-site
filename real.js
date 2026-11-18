/* Landing Lucro Real e Presumido (lp-real.html): simulador PIS/Cofins x CBS, formulário e WhatsApp.
   Script próprio desta página (as outras landings usam lp.js). MANTER IGUAL ao LP_CONFIG do lp.js: */
const CFG={whatsapp:'5511943787719',supabaseUrl:'',supabaseAnonKey:'',metaPixelId:'1122691790655912',gtmId:''};
/* Regras do simulador.
   Reduções de alíquota por classificação tributária: tabela da Calculadora de Tributos da Receita Federal
   (github.com/ReceitaFederal/calculadora-rtc-regime-regular, base V0059):
     000001 tributação integral 0% · 200047 bares e restaurantes 40% · 200034 alimentos do Anexo VII 60% · cesta básica 100%.
   A alíquota da CBS de 2027 não está na tabela oficial (só as de teste de 2026): o visitante parte de 8,8%, valor do exemplo da documentação.
   cp = parte do faturamento gasta com compras que geram crédito (valor típico, ajustável na tela). O mix do mercado é premissa nossa. */
const ATV={ind:{n:'indústria',red:0,cp:55,t:'tributação integral, sem redução de alíquota'},
 merc:{n:'mercado ou atacarejo',red:.45,cp:75,t:'redução média de 45%: metade das vendas em alimentos com redução de 60% e 15% em cesta básica com alíquota zero'},
 rest:{n:'restaurante',red:.4,cp:40,t:'redução de 40% de bares e restaurantes'},
 serv:{n:'serviços',red:0,cp:25,t:'tributação integral, sem redução de alíquota'}};
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const brl=n=>(isFinite(n)?n:0).toLocaleString('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0});
const num=v=>parseFloat(String(v).replace(/\./g,'').replace(',','.'))||0,pc=x=>x.toLocaleString('pt-BR',{maximumFractionDigits:2})+'%';
const store={get(k,d){try{return JSON.parse(localStorage.getItem('lp_'+k))??d}catch(e){return d}},set(k,v){try{localStorage.setItem('lp_'+k,JSON.stringify(v))}catch(e){}}};
function track(ev,d={}){window.dataLayer&&dataLayer.push({event:ev,svc:'real',...d});try{if(window.fbq){ev==='lead'?fbq('track','Lead',{content_category:'real'}):fbq('trackCustom',ev,{svc:'real'})}}catch(e){}}
if(CFG.gtmId){window.dataLayer=window.dataLayer||[];dataLayer.push({'gtm.start':Date.now(),event:'gtm.js'});const g=document.createElement('script');g.async=true;g.src='https://www.googletagmanager.com/gtm.js?id='+encodeURIComponent(CFG.gtmId);document.head.appendChild(g)}
if(CFG.metaPixelId){!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',CFG.metaPixelId);fbq('track','PageView')}
try{const q=new URLSearchParams(location.search),u={};['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid','fbclid'].forEach(k=>q.get(k)&&(u[k]=q.get(k)));if(Object.keys(u).length)store.set('utm',u)}catch(e){}

/* ---------- simulador ---------- */
let SIM=null,mexeu=false,cpManual=false;
function calc(){const fat=num($('#q_fat').value),reg=$('#q_reg').dataset.v,a=ATV[$('#q_seg').dataset.v],cp=+$('#q_cp').value/100,cbs=+$('#q_cbs').value/100;
  $('#o_cp').textContent=Math.round(cp*100)+'%';$('#o_cbs').textContent=pc(cbs*100);
  if(fat<1000){SIM=null;$('#r_dif').textContent='Informe o faturamento';$('#mem').innerHTML='';$('#prem').textContent='';$('#v_h').textContent=$('#v_n').textContent='';return}
  const pres=reg==='pres',alH=pres?.0365:.0925,debH=fat*alH,crH=pres?0:fat*cp*alH,hoje=debH-crH;
  const ef=cbs*(1-a.red),debN=fat*ef,crN=fat*cp*ef,novo=debN-crN,dif=(novo-hoje)*12,mais=dif>0,k=x=>brl(Math.round(x/100)*100);
  const var_=hoje>0?(novo/hoje-1)*100:0;
  SIM={fat,reg:pres?'Lucro Presumido':'Lucro Real',seg:a.n,cp,cbs,hoje,novo,dif,mais};
  $('#r_dif').innerHTML=Math.abs(dif)<12000?`Praticamente igual<small>A CBS simulada fica perto do que a empresa paga hoje de PIS e Cofins.</small>`
   :`~${k(Math.abs(dif))} ${mais?'a mais':'a menos'} por ano<small>${mais?'A CBS simulada fica '+pc(Math.abs(Math.round(var_)))+' acima do PIS e da Cofins de hoje. Isso pesa no preço e na margem.':'A CBS simulada fica '+pc(Math.abs(Math.round(var_)))+' abaixo do PIS e da Cofins de hoje. Vale conferir se o preço acompanha.'}</small>`;
  const mx=Math.max(hoje,novo,1);$('#b_h').style.width=(hoje/mx*100)+'%';$('#b_n').style.width=(novo/mx*100)+'%';$('#v_h').textContent=k(hoje)+'/mês';$('#v_n').textContent=k(novo)+'/mês';
  $('#mem').innerHTML=[['Faturamento',k(fat),k(fat)],['Alíquota sobre a receita',pc(alH*100),a.red?`${pc(cbs*100)} − ${Math.round(a.red*100)}% = ${pc(ef*100)}`:pc(ef*100)],['Imposto sobre as vendas',k(debH),k(debN)],
   ['Crédito sobre as compras ('+Math.round(cp*100)+'% do faturamento)',pres?'não tem':'− '+k(crH),'− '+k(crN)]].map(r=>`<tr><td>${r[0]}</td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('')+`<tr class="tt"><td>A pagar por mês</td><td>${k(hoje)}</td><td>${k(novo)}</td></tr>`;
  $('#prem').innerHTML=`Premissas: ${pres?'Presumido paga 3,65% sobre a receita, sem créditos':'Lucro Real paga 9,25% com crédito sobre as compras'} · ${a.t} · crédito da CBS na mesma alíquota efetiva das vendas · fora da conta: IBS de 0,1%, ICMS e ISS. Reduções conforme a tabela da <a href="https://github.com/ReceitaFederal/calculadora-rtc-regime-regular" target="_blank" rel="noopener">Calculadora de Tributos da Receita Federal</a>. Ordem de grandeza, não cálculo fiscal.`;
  if(mexeu){const sl=$('#simL');sl.hidden=false;sl.textContent=`Sua simulação vai junto: ${SIM.reg}, ${a.n}, ${brl(fat)}/mês, CBS ~${k(Math.abs(dif))} ${mais?'a mais':'a menos'} por ano.`}}
$$('.seg').forEach(g=>g.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;g.dataset.v=b.dataset.v;[...g.children].forEach(x=>{x.classList.toggle('on',x===b);x.setAttribute('aria-pressed',x===b)});
  if(g.id==='q_seg'&&!cpManual)$('#q_cp').value=ATV[b.dataset.v].cp;mexeu=true;calc();track('calc_change')}));
$('#q_fat').addEventListener('input',e=>{const d=e.target.value.replace(/\D/g,'').slice(0,11);e.target.value=d?(+d).toLocaleString('pt-BR'):'';mexeu=true;calc()});
$('#q_cp').addEventListener('input',()=>{cpManual=true;mexeu=true;calc()});$('#q_cbs').addEventListener('input',()=>{mexeu=true;calc()});
calc();

/* ---------- navegação ---------- */
$$('[data-go]').forEach(a=>a.addEventListener('click',()=>track('cta',{to:a.dataset.go,from:a.id||a.closest('section,div')?.className||''})));
addEventListener('scroll',()=>{const f=$('#form').getBoundingClientRect();$('#stick').classList.toggle('on',scrollY>500&&(f.top>innerHeight||f.bottom<0))},{passive:true});

/* ---------- formulário ---------- */
const tel=$('#f_t');tel.addEventListener('input',()=>{if(tel.value.startsWith('+'))return;const d=tel.value.replace(/\D/g,'').slice(0,11);tel.value=d.length>10?d.replace(/(\d{2})(\d{5})(\d{4})/,'($1) $2-$3'):d.replace(/(\d{2})(\d{4})(\d{0,4})/,'($1) $2-$3').replace(/-$/,'')});
const okTel=v=>{const d=v.replace(/\D/g,'');return v.trim().startsWith('+')?d.length>=8:(d.length===10||d.length===11)&&+d.slice(0,2)>=11};
const SBU=()=>CFG.supabaseUrl&&CFG.supabaseAnonKey?CFG.supabaseUrl.replace(/\/$/,'')+'/rest/v1/leads':'';
const t0=Date.now();
$('#leadF').addEventListener('submit',async e=>{e.preventDefault();if($('#hp').value)return;const e2=$('#e2');
  const n=$('#f_n').value.trim(),t=tel.value.trim(),emp=$('#f_emp').value.trim(),papel=$('#f_papel').value;
  const bad=n.length<2?['f_n','Informe seu nome.']:!okTel(t)?['f_t','WhatsApp inválido: inclua o DDD.']:!$('#f_ok').checked?['f_ok','Precisamos do seu consentimento para entrar em contato.']:null;
  $$('#leadF [aria-invalid]').forEach(x=>x.removeAttribute('aria-invalid'));
  if(bad){e2.textContent=bad[1];const f=$('#'+bad[0]);f.setAttribute('aria-invalid','true');f.focus();track('form_error');return}
  e2.textContent='';const b=$('#leadF .btn');if(b.disabled)return;b.disabled=true;b.textContent='Enviando…';
  const wait=2000-(Date.now()-t0);if(wait>0)await new Promise(r=>setTimeout(r,wait));
  const s=mexeu?SIM:null,k=x=>brl(Math.round(x/1000)*1000);
  const fat=s?s.fat:0,pts=Math.min(100,(fat>=3e6?50:fat>=1e6?42:fat>=3e5?28:s?10:20)+({'Sócio ou diretor':30,'Financeiro ou fiscal':25,'Contador externo':12}[papel]||5)+(s&&Math.abs(s.dif)>=1e5?15:5)),tier=pts>=70?'A':pts>=45?'B':'C';
  const prot=new Date().toISOString().slice(2,10).replace(/-/g,'')+'-RE'+Math.random().toString(36).slice(2,5).toUpperCase();
  const resumo=s?`${s.reg}, ${s.seg}, faturamento ${brl(s.fat)}/mês, compras ~${Math.round(s.cp*100)}%, CBS a ${pc(s.cbs*100)}: ~${k(Math.abs(s.dif))} ${s.mais?'a mais':'a menos'} por ano`:'sem simulação (foi direto ao formulário)';
  const lead={nome:n,telefone:t,email:null,area:'Tributário',perfil:'LP real',mensagem:`${resumo}; empresa: ${emp||'não informada'}; contato: ${papel}`,score:pts,faixa:tier,protocolo:prot,idioma:'pt',versao:'lp',utm:store.get('utm',null),pagina:location.href,
   quiz:{papel,empresa:emp||null,...(s?{regime:s.reg,atividade:s.seg,faturamento:s.fat,compras:s.cp,cbs:s.cbs,hoje_mes:Math.round(s.hoje),cbs_mes:Math.round(s.novo),dif_ano:Math.round(s.dif)}:{})},
   consentimento:{lgpd:true,ts:new Date().toISOString(),texto:'v1',pagina:location.pathname}};
  track('lead',{tier});
  if(SBU()){try{await fetch(SBU(),{method:'POST',headers:{apikey:CFG.supabaseAnonKey,Authorization:'Bearer '+CFG.supabaseAnonKey,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify(lead),keepalive:true})}catch(err){track('lead_send_fail')}}
  const msg=`Olá! Sou ${n}${emp?', da '+emp:''} (${papel}). `+(s?`Fiz a simulação da Reforma no site: ${s.reg}, ${s.seg}, faturamento ${brl(s.fat)}/mês. A CBS ficou cerca de ${k(Math.abs(s.dif))} ${s.mais?'a mais':'a menos'} por ano que o PIS/Cofins de hoje. `:'Vi a página sobre a Reforma e a revisão de PIS e Cofins. ')+`Quero marcar a reunião de 30 minutos. Protocolo ${prot}.`;
  $('#fWrap').hidden=true;const r=$('#res');r.hidden=false;
  r.innerHTML=`<h3 id="resH" tabindex="-1">Falta um toque</h3><p class="bs">Sua mensagem está pronta. Envie pelo WhatsApp para marcar o horário.</p><a class="btn" id="waGo" target="_blank" rel="noopener" href="https://wa.me/${CFG.whatsapp}?text=${encodeURIComponent(msg)}">Abrir o WhatsApp e enviar</a><p class="micro" style="margin-top:10px">Respondemos em até 1 dia útil · protocolo <b>${prot}</b></p>`;
  $('#waGo').addEventListener('click',()=>track('wa_click'));$('#resH').focus()});
