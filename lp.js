/* Landing pages de conversão: 1 serviço, 1 oferta, 1 ação.
   Funil: calculadora-isca (2-3 campos) → resultado borrado → nome/WhatsApp/e-mail → resultado + faixa + WhatsApp. */
const LP_CONFIG={ // use os MESMOS valores do CONFIG em app.js
  marca:'4RCAP', whatsapp:'5500000000000', cnpj:'46.131.513/0001-32',
  supabaseUrl:'', supabaseAnonKey:'',
  assessor:'Seu Nome', credencial:'ANCORD nº 00000', intermediario:'NOME DA CORRETORA S.A.'};
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const brl=n=>(isFinite(n)?n:0).toLocaleString('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0});
const num=v=>parseFloat(String(v).replace(/\./g,'').replace(',','.'))||0;
const S=document.body.dataset.svc;
const store={get(k,d){try{return JSON.parse(localStorage.getItem('lp_'+k))??d}catch(e){return d}},set(k,v){try{localStorage.setItem('lp_'+k,JSON.stringify(v))}catch(e){}}};
function track(ev,d={}){window.dataLayer&&dataLayer.push({event:ev,svc:S,...d});const l=store.get('ev',[]);l.push({ev,t:Date.now(),...d});store.set('ev',l.slice(-300))}
const wa=m=>`https://wa.me/${LP_CONFIG.whatsapp}?text=${encodeURIComponent(m)}`;
/* utm */
try{const q=new URLSearchParams(location.search),u={};['utm_source','utm_medium','utm_campaign','utm_content','utm_term','gclid','fbclid'].forEach(k=>q.get(k)&&(u[k]=q.get(k)));if(Object.keys(u).length)store.set('utm',u)}catch(e){}
/* máscaras */
$$('.money').forEach(i=>i.addEventListener('input',()=>{const d=i.value.replace(/\D/g,'');i.value=d?(+d).toLocaleString('pt-BR'):''}));
const tel=$('#f_t');tel&&tel.addEventListener('input',()=>{if(tel.value.startsWith('+'))return;const d=tel.value.replace(/\D/g,'').slice(0,11);tel.value=d.length>10?d.replace(/(\d{2})(\d{5})(\d{4})/,'($1) $2-$3'):d.replace(/(\d{2})(\d{4})(\d{0,4})/,'($1) $2-$3').replace(/-$/,'')});
/* segment buttons */
$$('.seg').forEach(g=>g.querySelectorAll('button').forEach(b=>b.onclick=()=>{g.querySelectorAll('button').forEach(x=>x.classList.remove('on'));b.classList.add('on');g.dataset.v=b.dataset.v}));
/* cálculos por serviço: retornam {valor, linhas[], pontos(0-100), resumo} */
const CALC={
 trib(){const reg=$('#q_reg').dataset.v||'simples',fat=num($('#q_fat').value),seg=$('#q_seg').dataset.v||'mono';const m=60;
  let mens=0;if(reg==='simples')mens=fat*(seg==='mono'?.55:.15)*0.075*0.1365;else mens=fat*0.18*(reg==='real'?.0925:.0365)+(seg==='mono'?fat*.004:0);
  const tot=mens*m,sel=tot*.22,p=Math.min(100,(fat>=1e6?45:fat>=2e5?35:fat>=5e4?22:8)+(seg==='mono'?30:12)+(reg==='simples'?15:20));
  return {valor:tot+sel,linhas:[['Potencial em 60 meses',brl(tot)],['Correção Selic estimada',brl(sel)]],pontos:p,resumo:`${reg}, faturamento ${brl(fat)}/mês, segmento ${seg}`,rotulo:'pode ter a recuperar (estimativa)'}},
 leilao(){const mer=num($('#q_mer').value),cap=num($('#q_cap').value),pz=$('#q_pz').dataset.v||'3m';const custo=mer*0.62,desc=mer-custo;
  const p=Math.min(100,(cap>=mer*.6?40:cap>=mer*.3?25:5)+(pz==='ja'?35:pz==='3m'?22:8)+(mer>=3e5?20:12));
  return {valor:desc,linhas:[['Valor de mercado',brl(mer)],['Custo total típico em 2º leilão (~62%)',brl(custo)],['Recursos disponíveis',brl(cap)]],pontos:p,resumo:`imóvel ${brl(mer)}, recursos ${brl(cap)}, prazo ${pz}`,rotulo:'de desconto possível em leilão (estimativa)'}},
 inv(){const pat=num($('#q_pat').value),ap=num($('#q_ap').value),onde=$('#q_onde').dataset.v||'poup';const n=180,rb=Math.pow(1.10,1/12)-1,rp=Math.pow(1.065,1/12)-1;let a=pat,b=pat;for(let k=0;k<n;k++){a=a*(1+rb)+ap;b=b*(1+rp)+ap}
  const p=Math.min(100,(pat>=1e6?50:pat>=3e5?40:pat>=5e4?25:10)+(onde==='poup'?30:onde==='banco'?25:10)+(ap>=2000?15:5));
  return {valor:a-b,linhas:[['Em 15 anos, carteira a 10% a.a.',brl(a)],['Mesmo valor a 6,5% a.a. (poupança/banco)',brl(b)]],pontos:p,resumo:`patrimônio ${brl(pat)}, aporte ${brl(ap)}/mês, hoje em ${onde}`,rotulo:'de diferença em 15 anos (simulação)'}},
 emp(){const fat=num($('#q_fat').value),mg=num($('#q_mg').value),dor=$('#q_dor').dataset.v||'margem';const ganho=fat*12*Math.min(.05,Math.max(.02,(15-mg)/100*.3));
  const p=Math.min(100,(fat>=4e5?45:fat>=1e5?32:12)+(dor==='sucessao'||dor==='socios'?30:22)+(mg<10?20:10));
  return {valor:ganho,linhas:[['Faturamento anual',brl(fat*12)],['Margem líquida atual',mg+'%']],pontos:p,resumo:`faturamento ${brl(fat)}/mês, margem ${mg}%, dor ${dor}`,rotulo:'de ganho anual possível com gestão (estimativa)'}}};
let R=null;
function go(n){$$('.step').forEach(s=>s.classList.toggle('on',s.dataset.s==n));const p=$$('.prog i');if(p.length>1)p.forEach((x,i)=>x.classList.toggle('on',i<n));else if(p[0])p[0].style.width=(n/3*100)+'%'}
$('#toLead').onclick=()=>{const req=$$('.step[data-s="1"] input[required]').find(i=>!num(i.value));if(req){$('#e1').textContent='Preencha os valores para calcular.';req.focus();return}
  $('#e1').textContent='';R=CALC[S]();$('#tz').textContent=brl(R.valor);$('#tzl').textContent=R.rotulo;go(2);track('calc_done',{v:Math.round(R.valor)});setTimeout(()=>$('#f_n').focus(),100)};
const DDD=new Set('11 12 13 14 15 16 17 18 19 21 22 24 27 28 31 32 33 34 35 37 38 41 42 43 44 45 46 47 48 49 51 53 54 55 61 62 63 64 65 66 67 68 69 71 73 74 75 77 79 81 82 83 84 85 86 87 88 89 91 92 93 94 95 96 97 98 99'.split(' '));
const okTel=v=>{const d=v.replace(/\D/g,'');if(v.trim().startsWith('+'))return d.length>=8;return (d.length===10||d.length===11)&&DDD.has(d.slice(0,2))};
const FIX={'gmail.con':'gmail.com','gmial.com':'gmail.com','gmai.com':'gmail.com','hotmial.com':'hotmail.com','hotmail.con':'hotmail.com','outlook.con':'outlook.com','yahoo.con':'yahoo.com'};
const t0=Date.now();
$('#leadF').onsubmit=async e=>{e.preventDefault();if($('#hp').value||Date.now()-t0<2500)return;
  const n=$('#f_n').value.trim(),t=$('#f_t').value.trim();let m=$('#f_e').value.trim().toLowerCase();const dm=m.split('@')[1];if(FIX[dm])m=m.replace(dm,FIX[dm]),$('#f_e').value=m;
  const er=n.length<2?'Informe seu nome.':!okTel(t)?'WhatsApp inválido: inclua o DDD.':!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(m)?'E-mail inválido.':!$('#f_ok').checked?'Precisamos do seu consentimento para contato.':'';
  if(er){$('#e2').textContent=er;track('form_error',{er});return}
  const tier=R.pontos>=70?'A':R.pontos>=45?'B':'C',prot=new Date().toISOString().slice(2,10).replace(/-/g,'')+'-'+S.slice(0,2).toUpperCase()+Math.random().toString(36).slice(2,5).toUpperCase();
  const lead={nome:n,telefone:t,email:m,area:{trib:'Tributário',leilao:'Leilão',inv:'Investimentos',emp:'Empresarial'}[S],perfil:'LP '+S,mensagem:R.resumo,score:R.pontos,faixa:tier,protocolo:prot,idioma:'pt',versao:'lp',utm:store.get('utm',null),pagina:location.href,quiz:{estimativa:Math.round(R.valor),linhas:R.linhas}};
  const L=store.get('leads',[]);L.push({...lead,d:Date.now()});store.set('leads',L);track('lead',{tier});
  if(LP_CONFIG.supabaseUrl&&LP_CONFIG.supabaseAnonKey){try{await fetch(LP_CONFIG.supabaseUrl.replace(/\/$/,'')+'/rest/v1/leads',{method:'POST',headers:{apikey:LP_CONFIG.supabaseAnonKey,Authorization:'Bearer '+LP_CONFIG.supabaseAnonKey,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify(lead),keepalive:true})}catch(err){const q=store.get('fila',[]);q.push(lead);store.set('fila',q)}}
  const msg=`Olá! Sou ${n}. Fiz a simulação de ${lead.area} no site: ${brl(R.valor)} ${R.rotulo}. Protocolo ${prot}. Quero falar com um especialista.`;
  $('#res').innerHTML=`<span class="tier t${tier}">${tier==='A'?'Prioridade alta':tier==='B'?'Bom potencial':'Em análise'}</span><div class="big">${brl(R.valor)}</div><p class="micro" style="margin-top:0">${R.rotulo}</p>${R.linhas.map(l=>`<div class="row"><span>${l[0]}</span><b>${l[1]}</b></div>`).join('')}<a class="btn wa" id="waGo" target="_blank" rel="noopener" href="${wa(msg)}">Falar agora no WhatsApp →</a><p class="micro">Protocolo <b>${prot}</b> · Atendimento seg–sex, 9h–18h</p><p class="micro">${document.body.dataset.disc}</p>`;
  $('#tz').classList.add('on');go(3);$('#waGo').onclick=()=>track('wa_click');};
/* repetição do CTA e barra fixa no celular */
$$('[data-top]').forEach(a=>a.onclick=e=>{e.preventDefault();$('#box').scrollIntoView({behavior:'smooth',block:'center'});track('cta_repeat')});
addEventListener('scroll',()=>{const r=$('#box').getBoundingClientRect();$('.stick').classList.toggle('on',r.bottom<0)},{passive:true});
$$('.wa-link').forEach(a=>a.href=wa('Olá! Vim pelo site e quero falar com um especialista.'));
$$('.cfg-cnpj').forEach(e=>e.textContent=LP_CONFIG.cnpj);$$('.cfg-marca').forEach(e=>e.textContent=LP_CONFIG.marca);
$$('.cfg-int').forEach(e=>e.textContent=LP_CONFIG.intermediario);$$('.cfg-cred').forEach(e=>e.textContent=LP_CONFIG.credencial);$$('.cfg-ass').forEach(e=>e.textContent=LP_CONFIG.assessor);
track('view');go(1);
