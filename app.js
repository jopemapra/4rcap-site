/* ===== CONFIGURAÇÃO CENTRAL — troque aqui nome, contatos e modo ===== */
const CONFIG={
  marca:'4RCAP',                  // marca definida em 01/11/2026 (4 frentes, 4 R → Retorno)
  cnpj:'46.131.513/0001-32',
  whatsapp:'5500000000000',       // DDI+DDD+número, só dígitos
  telefone:'(00) 00000-0000',
  email:'contato@suamarca.com.br',
  // Assessoria de investimentos (Res. CVM 178/2023): o vínculo com o intermediário deve aparecer de forma clara
  assessor:'Seu Nome',            // nome do assessor certificado
  credencial:'ANCORD nº 00000',   // número da certificação/credenciamento
  intermediario:'NOME DA CORRETORA S.A.', // corretora/distribuidora à qual está vinculado
  // Supabase (receber leads). Project Settings > API: copie a Project URL e a chave anon/public
  supabaseUrl:'',                 // ex.: 'https://abcd1234.supabase.co'
  supabaseAnonKey:'',             // chave anon (pública). NUNCA use a service_role aqui
  modoPadrao:'com'                // 'com' = comercial/consultoria · 'oab' = jurídico (Provimento 205/2021)
};
/* =================================================================== */
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const DB={get(k,d=null){try{const v=localStorage.getItem('hub_'+k);return v?JSON.parse(v):d}catch(e){return d}},
          set(k,v){try{localStorage.setItem('hub_'+k,JSON.stringify(v))}catch(e){}},del(k){try{localStorage.removeItem('hub_'+k)}catch(e){}}};
const brl=n=>(isFinite(n)?n:0).toLocaleString('pt-BR',{style:'currency',currency:'BRL',maximumFractionDigits:0});
const pct=n=>(isFinite(n)?n:0).toLocaleString('pt-BR',{maximumFractionDigits:1})+'%';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const num=id=>{const e=document.getElementById(id);if(!e)return 0;const v=e.classList.contains('money')?e.value.replace(/\./g,'').replace(',','.'):e.value;return parseFloat(v)||0};
const row=(a,b,c='')=>`<div class="row ${c}"><span>${a}</span><span>${b}</span></div>`;
function toast(m){const t=$('#toast');t.textContent=L(m);t.classList.add('show');clearTimeout(t._t);t._t=setTimeout(()=>t.classList.remove('show'),2800)}
const waLink=msg=>`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
function track(ev,data={}){const l=DB.get('events',[]);l.push({ev,data,t:Date.now()});DB.set('events',l.slice(-500));if(window.dataLayer)dataLayer.push({event:ev,...data})}

/* ---------- Config, marca e modo ---------- */
$$('.brand').forEach(e=>e.textContent=CONFIG.marca);
$$('.cfg-cnpj').forEach(e=>e.textContent=CONFIG.cnpj);
$$('.cfg-tel').forEach(e=>e.textContent=CONFIG.telefone);
$$('.cfg-mail').forEach(e=>e.textContent=CONFIG.email);
document.title=document.title.replace('Patrimonium',CONFIG.marca).replace('4RCAP',CONFIG.marca);
$('#ano').textContent=new Date().getFullYear();
['#waFab','#waSticky'].forEach(s=>$(s).href=waLink(`Olá! Vim pelo site da ${CONFIG.marca} e gostaria de um diagnóstico.`));

function setMode(m){
  document.documentElement.dataset.mode=m;
  $$('[data-com]').forEach(e=>e.innerHTML=e.dataset[m]||e.dataset.com);
  $$('.only-com').forEach(e=>e.style.display=m==='com'?'':'none');
  $$('.only-oab').forEach(e=>e.style.display=m==='oab'?'':'none');
  DB.set('mode',m);
}
const qMode=(location.hash.match(/^#modo-(com|oab)$/)||[])[1];
setMode(qMode||DB.get('mode')||CONFIG.modoPadrao);
$$('[data-setmode]').forEach(a=>a.onclick=e=>{e.preventDefault();setMode(a.dataset.setmode);toast(a.dataset.setmode==='oab'?'Versão jurídica (OAB) ativada':'Versão comercial ativada');scrollTo({top:0})});

/* ---------- Tema ---------- */
const prefTheme=DB.get('theme')||'light';
document.documentElement.dataset.theme=prefTheme;
$('#themeBtn').onclick=()=>{const t=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=t;DB.set('theme',t);$('#themeBtn').dataset.t=t};$('#themeBtn').dataset.t=prefTheme;

/* ---------- Topbar ---------- */
if(DB.get('topClosed'))$('#topbar').style.display='none';
function closeTop(){$('#topbar').style.display='none';DB.set('topClosed',1)}

/* ---------- Menu mobile ---------- */
$('#burger').onclick=()=>{const m=$('#menu');m.classList.toggle('open');$('#burger').setAttribute('aria-expanded',m.classList.contains('open'))};
$$('#menu a').forEach(a=>a.addEventListener('click',()=>$('#menu').classList.remove('open')));

/* ---------- Scroll: progresso, topo, CTA fixo, menu ativo ---------- */
const secs=$$('main section[id], header');
addEventListener('scroll',()=>{
  const h=document.documentElement,p=h.scrollTop/(h.scrollHeight-h.clientHeight)*100;
  $('#progress').style.width=p+'%';
  $('#upBtn').classList.toggle('show',h.scrollTop>700);
  $('#stickyCta').classList.toggle('show',h.scrollTop>600&&!isVisible($('#contato')));
  let cur='';secs.forEach(s=>{if(s.getBoundingClientRect().top<120)cur=s.id});
  $$('.menu a').forEach(a=>a.classList.toggle('act',a.getAttribute('href')==='#'+cur));
  if(p>50&&!DB.get('s50')){DB.set('s50',1);track('scroll_50')}
},{passive:true});
function isVisible(el){const r=el.getBoundingClientRect();return r.top<innerHeight&&r.bottom>0}
$('#upBtn').onclick=()=>scrollTo({top:0,behavior:'smooth'});

/* ---------- Reveal + contadores ---------- */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
$$('.reveal').forEach(e=>io.observe(e));
const co=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,to=+el.dataset.to;let i=0;const st=setInterval(()=>{i++;el.textContent=Math.round(to*i/30);if(i>=30)clearInterval(st)},30);co.unobserve(el)}));
$$('.counter').forEach(e=>co.observe(e));

/* ---------- Seletor de objetivo (personalização) ---------- */
const GOALS={
 leilao:{t:'Comece pela calculadora de <b>custo total do arremate</b> e depois defina seu <b>lance máximo</b>.',c:'c1',a:'Leilão'},
 trib:{t:'Veja a <b>estimativa de créditos</b> e confira <b>quanto do prazo de 5 anos</b> ainda está aberto.',c:'c2',a:'Tributário'},
 emp:{t:'Calcule seu <b>ponto de equilíbrio</b> e compare <b>holding × inventário</b>.',c:'c3',a:'Empresarial'}};
$$('.opt').forEach(b=>b.onclick=()=>{
  $$('.opt').forEach(x=>x.classList.remove('on'));b.classList.add('on');
  const g=GOALS[b.dataset.goal];DB.set('goal',b.dataset.goal);track('goal',{g:b.dataset.goal});
  $('#f_area').value=g.a;
  $('#personal').innerHTML=`${L(g.t)}<div class="cta-row" style="margin-top:12px"><button class="btn sm" data-goto="${g.c}">${L('Abrir calculadora')}</button><a class="btn sm ghost" href="#contato">${L('Falar com especialista')}</a></div>`;
  $('#personal').classList.add('on');bindGoto();
});
if(DB.get('goal'))$(`.opt[data-goal=${DB.get('goal')}]`)?.click();

/* ---------- Abas ---------- */
function openTab(id){$$('.tabs button').forEach(b=>{b.classList.toggle('on',b.dataset.t===id);b.setAttribute('aria-selected',b.dataset.t===id);b.tabIndex=b.dataset.t===id?0:-1});$$('.pane').forEach(p=>p.classList.toggle('on',p.id===id));track('tab',{id})}
$$('.tabs button').forEach(b=>{b.onclick=()=>openTab(b.dataset.t);b.onkeydown=e=>{if(!['ArrowRight','ArrowLeft'].includes(e.key))return;const t=$$('.tabs button'),i=t.indexOf(b),n=t[(i+(e.key==='ArrowRight'?1:t.length-1))%t.length];n.focus();n.click()}});
function openCalc(id){openTab('p-calc');$$('.subtabs button[data-c]').forEach(b=>{b.classList.toggle('on',b.dataset.c===id);b.setAttribute('aria-pressed',b.dataset.c===id)});$$('#p-calc .calc').forEach(c=>c.classList.toggle('on',c.id===id));calcAll()}
$$('.subtabs button[data-c]').forEach(b=>b.onclick=()=>{openCalc(b.dataset.c);DB.set('lastCalc',b.dataset.c);track('calc_open',{id:b.dataset.c})});
function bindGoto(){$$('[data-goto]').forEach(b=>b.onclick=e=>{e.preventDefault();openCalc(b.dataset.goto);$('#hub').scrollIntoView({behavior:'smooth'})})}
bindGoto();
$$('[data-tab]').forEach(a=>a.addEventListener('click',()=>openTab(a.dataset.tab)));
$$('[data-area]').forEach(a=>a.addEventListener('click',()=>{$('#f_area').value=a.dataset.area;track('cta_service',{a:a.dataset.area})}));

/* ---------- Máscara monetária ---------- */
function fmtMoney(e){const d=e.value.replace(/\D/g,'');e.value=d?(+d).toLocaleString('pt-BR'):''}
$$('.money').forEach(e=>e.addEventListener('input',()=>fmtMoney(e)));

/* ---------- Calculadoras ---------- */
let LAST={};
function actions(tipo,resumo){LAST[tipo]=resumo;return `<div class="actions"><button class="btn sm" onclick="saveSim('${tipo}')">${L('💾 Salvar')}</button><button class="btn sm dark" onclick="copySim('${tipo}')">${L('📋 Copiar')}</button><a class="btn sm wa" target="_blank" rel="noopener" href="${waLink('Olá! Fiz uma simulação no site:\n'+resumo+'\nPodemos conversar?')}">${L('Enviar ao especialista')}</a></div>`}
function bar(parts){return `<div class="bar">${parts.map(p=>`<i style="width:${p[1]}%;background:${p[2]}"></i>`).join('')}</div><div class="legend">${parts.map(p=>`<span><b style="background:${p[2]}"></b>${p[0]}</span>`).join('')}</div>`}
const C=['#c9a24b','#5b8def','#3ecf8e','#ef6b6b','#b07ce8','#f0b54a','#7a8aa8'];

function calcLeilao(){
  const lance=num('l_lance'),aval=num('l_aval'),com=lance*num('l_com')/100,itbi=lance*num('l_itbi')/100,reg=num('l_reg'),deb=num('l_deb'),deso=num('l_deso'),ref=num('l_ref');
  const tot=lance+com+itbi+reg+deb+deso+ref,desc=aval?(1-tot/aval)*100:0;
  const parts=[['Lance',lance],['Comissão',com],['ITBI',itbi],['Registro',reg],['Débitos',deb],['Desocupação',deso],['Reforma',ref]].map((p,i)=>[L(p[0]),p[1]/tot*100,C[i]]);
  let parc='';if($('#l_parc').checked){if($('#l_tipo').value==='jud'){const ent=lance*.25,par=(lance-ent)/30;parc=row(L('Entrada (25%)'),brl(ent))+row(L('30 parcelas de'),brl(par)+'*')}else parc=row(L('Parcelamento'),L('Conforme edital do banco'))}
  const v=desc>=25?['g',L('Boa margem de segurança frente ao mercado.')]:desc>=10?['y',L('Margem moderada: confira débitos e prazo de desocupação.')]:['r',L('Margem apertada: o negócio pode não compensar os riscos.')];
  $('#r1').innerHTML=row(L('Lance'),brl(lance))+row(L('Comissão do leiloeiro'),brl(com))+row(L('ITBI'),brl(itbi))+row(L('Registro/certidões'),brl(reg))+row(L('Débitos'),brl(deb))+row(L('Desocupação'),brl(deso))+row(L('Reforma'),brl(ref))+parc+
   `<div class="big">${brl(tot)}</div><div class="micro">${L('Custo total')} · ${pct((tot/lance-1)*100)} ${L('acima do lance')}</div>${bar(parts)}`+
   row(L('Desconto real sobre o mercado'),pct(desc),desc>0?'pos':'neg')+`<div class="verdict ${v[0]}">${v[1]}</div>`+($('#l_parc').checked&&$('#l_tipo').value==='jud'?'<p class="note">'+L('*Parcelas corrigidas conforme edital/índice definido pelo juízo.')+'</p>':'')+
   actions('leilao',`Arremate: lance ${brl(lance)}, custo total ${brl(tot)}, desconto real ${pct(desc)} sobre ${brl(aval)}.`);
}
function calcMax(){
  const mer=num('m_mer'),mar=num('m_mar'),p=num('m_pct')/100,fix=num('m_fix');$('#m_marv').textContent=`${L('Margem')}: ${mar}%`;
  const alvo=mer*(1-mar/100),max=Math.max(0,(alvo-fix)/(1+p));
  $('#r6').innerHTML=row(L('Valor de mercado'),brl(mer))+row(L('Custo total máximo aceitável'),brl(alvo))+row(L('Custos fixos'),brl(fix),'neg')+
   `<div class="big">${brl(max)}</div><div class="micro">${L('Lance máximo')} — ${pct(max/mer*100)} ${L('do valor de mercado')}</div>`+
   `<div class="verdict ${max/mer>.5?'g':'y'}">${max/mer>.5?L('Lance compatível com 2º leilões (geralmente a partir de 50% da avaliação).'):L('Teto baixo: talvez só viável em leilões com grande desconto.')}</div>`+
   actions('lance',`Lance máximo: ${brl(max)} para imóvel de ${brl(mer)} com ${mar}% de margem.`);
}
function calcRoi(){
  const cus=num('o_cus'),venda=num('o_mer'),cor=venda*num('o_cor')/100,ganho=venda-cor-cus,ir=Math.max(0,ganho)*num('o_ir')/100,liq=ganho-ir,roi=cus?liq/cus*100:0,pz=Math.max(num('o_pz'),1);
  const cdi=(Math.pow(1+num('o_cdi')/100,pz/12)-1)*100*0.85,alu=num('o_alu'),yieldA=cus?alu*12/cus*100:0;
  $('#r4').innerHTML=row(L('Venda'),brl(venda))+row(L('Corretagem'),brl(cor),'neg')+row(L('IR estimado'),brl(ir),'neg')+row(L('Lucro líquido'),brl(liq),liq>0?'pos':'neg')+
   `<div class="big">${pct(roi)}</div><div class="micro">${L('ROI em')} ${pz} ${L('meses')} · ${pct(roi/pz)} ${L('ao mês')}</div>`+
   row(`CDI líquido no mesmo prazo`,pct(cdi))+`<div class="verdict ${roi>cdi*1.3?'g':roi>cdi?'y':'r'}">${roi>cdi*1.3?L('Supera o CDI com folga.'):roi>cdi?L('Supera o CDI, mas com pouca folga para o risco.'):L('Rende menos que o CDI: reavalie o lance.')}</div>`+
   (alu?row(L('Se alugar: rentabilidade bruta anual'),pct(yieldA)):'')+actions('roi',`ROI leilão: ${pct(roi)} em ${pz} meses (CDI líq. ${pct(cdi)}).`);
}
function calcTrib(){
  const reg=$('#t_reg').value,fat=num('t_fat'),m=Math.min(Math.max(num('t_mes'),1),60);
  $('#t_sim').style.display=reg==='simples'?'':'none';$('#t_out').style.display=reg==='simples'?'none':'';
  let linhas='',mensal=0;
  if(reg==='simples'){
    const mono=num('t_mono')/100;$('#t_monov').textContent=`${num('t_mono')}% do faturamento`;
    const das=num('t_das')/100,pisCofinsShare=0.1365; // fatia média de PIS/COFINS dentro do DAS (anexo I, faixas intermediárias)
    mensal=fat*mono*das*pisCofinsShare;linhas=row(L('PIS/COFINS monofásico pago no DAS'),brl(mensal)+L('/mês'));
  }else{
    const icms=num('t_icms')/100,folha=num('t_folha'),al=reg==='real'?0.0925:0.0365;
    const t1=fat*icms*al,t2=folha*0.02;mensal=t1+t2;
    linhas=row(L('Exclusão do ICMS da base PIS/COFINS'),brl(t1)+L('/mês'))+row(L('Verbas indevidas na folha (est. 2%)'),brl(t2)+L('/mês'));
  }
  const tot=mensal*m,selic=tot*0.22;
  $('#r2').innerHTML=linhas+row(L('Período'),m+' '+L('meses'))+`<div class="big">${brl(tot)}</div><div class="micro">${L('Potencial bruto estimado')}</div>`+
   row(L('+ correção Selic (estimativa)'),brl(selic),'pos')+row(L('Total com correção'),brl(tot+selic),'pos')+
   `<div class="verdict ${tot>50000?'g':tot>10000?'y':'r'}">${tot>50000?L('Potencial relevante: vale um diagnóstico detalhado.'):tot>10000?L('Potencial moderado: confirme com a revisão dos documentos.'):L('Potencial baixo nas premissas informadas.')}</div>`+
   `<p class="note">${L('Premissas simplificadas. Modulação do STF (Tema 69, a partir de 15/03/2017) e particularidades de NCM podem alterar o valor.')}</p>`+
   actions('trib',`Créditos tributários (${reg}): potencial ${brl(tot)} em ${m} meses, faturamento ${brl(fat)}/mês.`);
}
function calcPrazo(){
  const ini=$('#p_ini').value,val=num('p_val');if(!ini){$('#r5').innerHTML='<p>'+L('Informe a data de início.')+'</p>';return}
  const [y,mo]=ini.split('-').map(Number),now=new Date(),meses=(now.getFullYear()-y)*12+(now.getMonth()+1-mo);
  const dentro=Math.min(meses,60),perdidos=Math.max(0,meses-60);
  $('#r5').innerHTML=row(L('Meses de recolhimento'),meses)+row(L('Dentro do prazo (até 60)'),dentro,'pos')+row(L('Já prescritos'),perdidos,'neg')+
   `<div class="big">${brl(dentro*val)}</div><div class="micro">${L('Ainda recuperável (estimativa)')}</div>`+row(L('Já perdido pelo prazo'),brl(perdidos*val),'neg')+
   `<div class="verdict r">${L('A cada mês sem pedido, cerca de')} ${brl(val)} ${L('deixa de ser recuperável.')}</div>`+actions('prazo',`Prazo: ${dentro} meses recuperáveis ≈ ${brl(dentro*val)}; perde ${brl(val)}/mês.`);
}
function calcBE(){
  const fix=num('b_fix'),pre=num('b_pre'),vr=num('b_var'),luc=num('b_luc'),atu=num('b_atu'),mc=pre-vr;
  if(mc<=0){$('#r3').innerHTML='<div class="verdict r">'+L('O preço precisa ser maior que o custo variável.')+'</div>';return}
  const pe=Math.ceil(fix/mc),meta=Math.ceil((fix+luc)/mc),resAt=atu*mc-fix,ms=atu?(atu-pe)/atu*100:0;
  $('#r3').innerHTML=row(L('Margem de contribuição/un.'),brl(mc))+row(L('Índice de margem'),pct(mc/pre*100))+row(L('Faturamento de equilíbrio'),brl(pe*pre))+row(L('Unidades p/ lucro desejado'),meta.toLocaleString('pt-BR'))+
   `<div class="big">${pe.toLocaleString('pt-BR')} ${L('un./mês')}</div><div class="micro">${L('Ponto de equilíbrio')}</div>`+row(L('Resultado atual estimado'),brl(resAt),resAt>=0?'pos':'neg')+row(L('Margem de segurança'),pct(ms),ms>=0?'pos':'neg')+
   `<div class="verdict ${ms>20?'g':ms>0?'y':'r'}">${ms>20?L('Operação saudável.'):ms>0?L('Acima do equilíbrio, mas vulnerável.'):L('Abaixo do equilíbrio: revise preço e custos.')}</div>`+actions('be',`Ponto de equilíbrio: ${pe} un./mês; resultado atual ${brl(resAt)}.`);
}
function calcHold(){
  const pat=num('h_pat'),itcmd=num('h_itcmd')/100,inv=num('h_inv')/100,cus=num('h_cus'),base=num('h_base')/100;
  const cInv=pat*itcmd+pat*inv,cHold=pat*base*itcmd+cus,eco=cInv-cHold;
  $('#r7').innerHTML=row(L('Inventário: ITCMD'),brl(pat*itcmd))+row(L('Inventário: custos'),brl(pat*inv))+row(L('Total inventário'),brl(cInv),'neg')+row(L('Holding: ITCMD sobre quotas'),brl(pat*base*itcmd))+row(L('Holding: estrutura'),brl(cus))+row(L('Total holding'),brl(cHold))+
   `<div class="big">${brl(eco)}</div><div class="micro">${L('Diferença estimada')}</div>${bar([[L('Inventário'),cInv/(cInv+cHold)*100,C[3]],[L('Holding'),cHold/(cInv+cHold)*100,C[2]]])}`+
   `<p class="note">${L('A reforma tributária (EC 132/2023) tornou o ITCMD obrigatoriamente progressivo e vários estados já cobram pelo valor de mercado. Avaliar caso a caso.')}</p>`+actions('hold',`Holding × inventário: diferença estimada ${brl(eco)} sobre patrimônio de ${brl(pat)}.`);
}
function calcAll(){try{calcLeilao();calcMax();calcRoi();calcTrib();calcPrazo();calcBE();calcHold()}catch(e){console.error(e)}}
const d0=new Date();d0.setFullYear(d0.getFullYear()-7);$('#p_ini').value=d0.toISOString().slice(0,7);
const savedIn=DB.get('calcIn',{});$$('#p-calc input,#p-calc select').forEach(e=>{if(e.id&&savedIn[e.id]!==undefined){e.type==='checkbox'?e.checked=savedIn[e.id]:e.value=savedIn[e.id]}e.addEventListener('input',()=>{savedIn[e.id]=e.type==='checkbox'?e.checked:e.value;DB.set('calcIn',savedIn);calcAll()})});
function resetCalc(){DB.del('calcIn');location.reload()}
calcAll();
if(DB.get('lastCalc')&&!location.hash.startsWith('#calc-'))openCalc(DB.get('lastCalc'));
function saveSim(t){const u=me();if(!u){toast(L('Crie sua conta grátis para salvar simulações'));openTab('p-conta');return}
  const h=DB.get('sims_'+u.email,[]);h.unshift({t,r:LAST[t],d:Date.now()});DB.set('sims_'+u.email,h.slice(0,30));addPoints(2);toast(L('Simulação salva na sua conta (+2 pts)'));track('sim_save',{t})}
function copySim(t){navigator.clipboard?.writeText(LAST[t]).then(()=>toast('Copiado!'),()=>toast('Não foi possível copiar'));track('sim_copy',{t})}

/* ---------- Quiz de diagnóstico ---------- */
const QUIZ=[
 {q:'O que mais te interessa agora?',o:[['Comprar imóvel/veículo em leilão','leilao'],['Reduzir ou recuperar impostos','trib'],['Organizar empresa ou patrimônio','emp']]},
 {q:'Qual é o seu perfil?',o:[['Pessoa física / investidor',1],['Empresa até R$ 4,8 mi/ano',2],['Empresa acima de R$ 4,8 mi/ano',3]]},
 {q:'Já fez algo parecido antes?',o:[['Nunca',1],['Uma vez, sem ajuda',2],['Sim, com frequência',3]]},
 {q:'Quando pretende agir?',o:[['Agora — tenho um caso concreto',3],['Nos próximos 3 meses',2],['Só pesquisando',1]]}];
let qi=0,qa=[];
function renderQuiz(){
  const b=$('#quizBox');
  if(qi<QUIZ.length){const q=QUIZ[qi];b.innerHTML=`<div class="qprog"><i style="width:${qi/QUIZ.length*100}%"></i></div><p class="micro">${L('Pergunta')} ${qi+1} ${L('de')} ${QUIZ.length}</p><h3 style="font-size:1.4rem;margin-top:6px">${L(q.q)}</h3><div class="qopts">${q.o.map((o,i)=>`<button class="opt" data-i="${i}">${L(o[0])}</button>`).join('')}</div>${qi?`<button class="btn sm dark" style="margin-top:14px" id="qback">${L('← Voltar')}</button>`:''}`;
    $$('#quizBox .opt').forEach(x=>x.onclick=()=>{qa[qi]=q.o[x.dataset.i];qi++;renderQuiz()});$('#qback')&&($('#qback').onclick=()=>{qi--;renderQuiz()});return}
  const area=qa[0][1],score=qa.slice(1).reduce((s,a)=>s+a[1],0),nome={leilao:'Leilão',trib:'Tributário',emp:'Empresarial',inv:'Investimentos'}[area];
  const pri=L(score>=7?'Alta':'Média'),rec={leilao:L('Antes do próximo lance, faça a análise do edital e calcule o custo total. O checklist gratuito ajuda a evitar os erros mais comuns.'),trib:L('Empresas com faturamento relevante raramente revisaram os últimos 60 meses. Uma revisão inicial mostra se há crédito a recuperar.'),inv:'Monte uma carteira alinhada ao seu perfil e acompanhe com quem entende. O primeiro passo é conhecer seu perfil de investidor (suitability).',emp:L('Comece pelos números (ponto de equilíbrio e regime tributário) e depois pela estrutura societária e sucessória.')}[area];
  track('quiz_done',{area,score});DB.set('quiz',{area,score});$('#f_area').value=nome;
  b.innerHTML=`<div class="qprog"><i style="width:100%"></i></div><span class="eyebrow">${L('Seu resultado')}</span><h3 style="font-size:1.5rem;margin:8px 0">${L('Foco recomendado')}: ${L(nome)}</h3><p style="color:var(--mut)">${L(rec)}</p><p style="margin-top:10px">${L('Prioridade sugerida')}: <b style="color:var(--gold2)">${pri}</b></p>
   <div class="cta-row"><button class="btn" data-goto="${GOALS[area].c}">${L('Abrir a calculadora indicada')}</button><a class="btn wa" target="_blank" rel="noopener" href="${waLink(`Olá! Fiz o diagnóstico no site: foco ${nome}, prioridade ${pri}. Quero conversar.`)}">${L('Falar no WhatsApp')}</a><button class="btn sm dark" id="qre">${L('Refazer')}</button></div>`;
  bindGoto();$('#qre').onclick=()=>{qi=0;qa=[];renderQuiz()};
}
renderQuiz();

/* ---------- Glossário ---------- */
const GLOS=[['Arrematação','Ato de adquirir o bem em leilão pelo maior lance.'],['Edital','Documento com regras, débitos, condições e datas do leilão. Deve ser lido por inteiro.'],['Matrícula','Registro do imóvel no cartório, com histórico de donos, penhoras e ônus.'],['Imissão na posse','Ordem que permite ao arrematante assumir o imóvel, inclusive se ocupado.'],['1º e 2º leilão','No 1º, o lance mínimo costuma ser a avaliação; no 2º, pode haver lances a partir de 50% (judicial) ou do valor da dívida (extrajudicial).'],['Alienação fiduciária','Imóvel dado em garantia ao banco; se o devedor não paga, vai a leilão extrajudicial (Lei 9.514/97).'],['Venda direta','Imóveis não arrematados vendidos pelo banco sem disputa.'],['Lance condicional','Proposta abaixo do mínimo, sujeita à aprovação do comitente ou juiz.'],['Débitos propter rem','Dívidas que acompanham o imóvel, como condomínio e IPTU.'],['Carta de arrematação','Documento judicial que permite registrar o imóvel em nome do arrematante.'],['Comissão do leiloeiro','Percentual (geralmente 5%) pago pelo arrematante ao leiloeiro.'],['ITBI','Imposto municipal sobre transmissão de imóveis, cobrado no registro.'],['Monofásico','Regime em que PIS/COFINS é cobrado só uma vez, no fabricante/importador. Revendedores não deveriam pagar de novo.'],['PER/DCOMP','Sistema da Receita para pedir restituição ou compensar créditos com outros tributos.'],['Prescrição tributária','Prazo de 5 anos para pedir de volta tributo pago indevidamente (art. 168 CTN).'],['Tema 69 (STF)','Decisão que excluiu o ICMS da base de cálculo do PIS/COFINS.'],['Compensação','Uso de créditos para pagar tributos futuros.'],['Selic','Taxa usada para corrigir créditos tributários a restituir.'],['IBS e CBS','Novos tributos da reforma que substituem ICMS/ISS e PIS/COFINS gradualmente (2026–2033).'],['Split payment','Recolhimento automático do tributo no pagamento, previsto na reforma.'],['Holding patrimonial','Empresa criada para deter bens da família, facilitando gestão e sucessão.'],['ITCMD','Imposto estadual sobre heranças e doações.'],['Acordo de sócios','Contrato que regula direitos, saídas e decisões entre os sócios.'],['Margem de contribuição','Preço menos custos variáveis: quanto cada venda contribui para pagar os custos fixos.'],['Ponto de equilíbrio','Volume de vendas em que a receita cobre todos os custos.'],['Due diligence','Investigação documental prévia de riscos antes de um negócio.'],['CPF','Cadastro de pessoa física. Estrangeiros obtêm com passaporte, em consulado ou por procurador.']];
function renderGlos(){const q=$('#glq').value.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu,'');
  const r=GLOS.filter(g=>(g[0]+g[1]+L(g[0])+L(g[1])).toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu,'').includes(q));
  $('#glossary').innerHTML=r.length?r.map(g=>`<div><b>${L(g[0])}</b>${L(g[1])}</div>`).join(''):'<p class="micro">'+L('Nenhum termo encontrado. Pergunte no fórum!')+'</p>';$('#glq').placeholder=L('Buscar termo (ex.: imissão, monofásico, PER/DCOMP)…')}
$('#glq').oninput=renderGlos;renderGlos();

/* ---------- FAQ ---------- */
const FAQ=[['Leilão','Comprar imóvel em leilão é seguro?','Pode ser, desde que precedido de análise do edital, da matrícula e do processo. A maior parte dos problemas vem de débitos ou ônus não identificados antes do lance.'],
['Leilão','E se o imóvel estiver ocupado?','É possível pedir a imissão na posse. O prazo e o custo variam; por isso entram no cálculo do custo total antes do lance.'],
['Leilão','Posso financiar ou parcelar?','Em leilões judiciais, o art. 895 do CPC permite propostas com 25% de entrada e saldo em até 30 parcelas. Bancos costumam aceitar financiamento ou FGTS em alguns casos.'],
['Leilão','Quem paga as dívidas de condomínio e IPTU?','Depende do edital. Alguns preveem quitação com o valor da arrematação; outros transferem ao arrematante. Essa leitura é parte central da análise.'],
['Leilão','Estrangeiro pode arrematar?','Sim, para imóveis urbanos. É preciso CPF e, se não estiver no Brasil, procuração apostilada. Os recursos entram por câmbio oficial com registro no Banco Central.'],
['Tributário','Até quando posso recuperar tributos?','Em regra, 5 anos contados do pagamento (art. 168 do CTN).'],
['Tributário','Empresa do Simples pode recuperar impostos?','Sim, em situações como a venda de produtos monofásicos tributados novamente dentro do DAS.'],
['Tributário','A recuperação gera problema com a Receita?','Quando feita com base legal e documentação, é um direito do contribuinte. Por isso o trabalho começa com uma revisão técnica criteriosa.'],
['Tributário','A reforma tributária muda algo?','Sim. PIS/COFINS serão substituídos pela CBS a partir de 2027, e a transição exige planejamento. Créditos antigos seguem regras próprias.'],
['Empresarial','Holding familiar vale para qualquer patrimônio?','Não. Depende do volume, dos bens, do estado e dos objetivos da família. A simulação ajuda a ter uma primeira ideia.'],
['Empresarial','Vocês substituem meu contador?','Não. Trabalhamos junto com o contador, que continua essencial para a rotina fiscal.'],
['Geral','Como são definidos os honorários?','Após o diagnóstico, de forma transparente, conforme a complexidade: valor fixo e/ou parcela vinculada ao resultado, sempre em contrato.'],
['Geral','Atendem fora da minha cidade?','Sim, o atendimento é digital, com reuniões online e assinatura eletrônica.'],
['Geral','A comunidade é gratuita?','Sim. Calculadoras, glossário e fórum estão abertos para membros cadastrados na fase beta.']];
let faqCat='Todas';
function renderFaq(){$('#faqCats').innerHTML=['Todas','Leilão','Tributário','Empresarial','Investimentos','Geral'].map(c=>`<button class="${c===faqCat?'on':''}" data-fc="${c}">${L(c)}</button>`).join('');
  $$('[data-fc]').forEach(b=>b.onclick=()=>{faqCat=b.dataset.fc;renderFaq()});
  $('#faqList').innerHTML=FAQ.filter(f=>faqCat==='Todas'||f[0]===faqCat).map(f=>`<details><summary>${L(f[1])}</summary><p>${L(f[2])}</p></details>`).join('')}
renderFaq();

/* ---------- Roadmap com votação ---------- */
const ROAD=[['done','FASE 1 — ATIVA','Calculadoras e diagnóstico','7 simuladores, quiz e captação.'],['done','FASE 2 — BETA','Contas, fórum e pontos','Login, tópicos, curtidas e níveis.'],['f3','FASE 3','Radar de Leilões','Curadoria de editais com alertas por cidade e faixa de preço.'],['f4','FASE 4','Área do Cliente','Acompanhamento de casos, documentos e prazos.'],['f5','FASE 5','Clube de Membros','Lives mensais, networking e eventos.'],['f6','FASE 6','Marketplace de serviços','Parceiros: corretores, despachantes, contadores, engenheiros.']];
function renderRoad(){const v=DB.get('votes',{f3:12,f4:7,f5:9,f6:5}),mine=DB.get('myvote');
  $('#roadmap').innerHTML=ROAD.map(r=>`<div class="${r[0]==='done'?'done':''}"><div class="meta">${r[0]==='done'?'●':'○'} ${r[1]}</div><b>${r[2]}</b><p class="note">${r[3]}</p>${r[0]==='done'?'':`<button class="btn sm ${mine===r[0]?'':'dark'} vote" data-v="${r[0]}">▲ ${v[r[0]]} votos</button>`}</div>`).join('');
  $$('[data-v]').forEach(b=>b.onclick=()=>{if(!me()){toast('Entre para votar');openTab('p-conta');return}const v=DB.get('votes',{f3:12,f4:7,f5:9,f6:5}),old=DB.get('myvote');if(old)v[old]--;v[b.dataset.v]++;DB.set('votes',v);DB.set('myvote',b.dataset.v);renderRoad();toast('Voto registrado!')})}
renderRoad();

/* ---------- Contas ---------- */
const me=()=>DB.get('session');
async function hash(s){try{const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}catch(e){let h=0;for(const c of s)h=(h*31+c.charCodeAt(0))|0;return 'x'+h}}
const LEVELS=[[0,'Iniciante'],[10,'Membro'],[30,'Colaborador'],[80,'Especialista'],[200,'Referência']];
const level=p=>LEVELS.filter(l=>p>=l[0]).pop()[1];
function addPoints(n){const u=me();if(!u)return;const us=DB.get('users',{});if(us[u.email]){us[u.email].pts=(us[u.email].pts||0)+n;DB.set('users',us);DB.set('session',us[u.email])}}
const colorOf=s=>C[[...s].reduce((a,c)=>a+c.charCodeAt(0),0)%C.length];
const avatar=n=>`<span class="av" style="background:${colorOf(n)}">${esc(n.split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase())}</span>`;
function renderNav(){const u=me();$('#navUser').innerHTML=u?`${avatar(u.nome)} ${esc(u.nome.split(' ')[0])} · <a href="#" id="navOut">Sair</a>`:`<a href="#comunidade" id="navIn">Entrar</a>`;
  $('#navOut')&&($('#navOut').onclick=e=>{e.preventDefault();sair()});$('#navIn')&&($('#navIn').onclick=()=>openTab('p-conta'))}
function renderConta(){
  const u=me(),box=$('#contaBox');
  if(u){const sims=DB.get('sims_'+u.email,[]),posts=DB.get('posts',[]).filter(p=>p.email===u.email);
    box.innerHTML=`<div style="display:flex;gap:14px;align-items:center">${avatar(u.nome).replace('26px','48px')}<div><h3 style="font-size:1.4rem">Olá, ${esc(u.nome)}</h3><div class="meta">${esc(u.email)} · ${esc(u.perfil)} · desde ${new Date(u.desde).toLocaleDateString('pt-BR')}</div></div></div>
     <div class="kpi" style="margin-top:18px"><div><b>${u.pts||0}</b><span>pontos</span></div><div><b>${level(u.pts||0)}</b><span>nível</span></div><div><b>${posts.length}</b><span>tópicos</span></div><div><b>${sims.length}</b><span>simulações salvas</span></div></div>
     <h4 style="margin:10px 0">Minhas simulações</h4><div class="hist">${sims.length?sims.map(s=>`<div><span>${esc(s.r)}</span><span class="micro">${new Date(s.d).toLocaleDateString('pt-BR')}</span></div>`).join(''):'<p class="micro">Nenhuma ainda. Use o botão 💾 nas calculadoras.</p>'}</div>
     <div class="cta-row"><button class="btn sm dark" id="expData">Copiar meus dados (LGPD)</button><button class="btn sm dark" id="delAcc">Excluir minha conta</button><button class="btn sm ghost" id="outBtn">Sair</button></div>`;
    $('#outBtn').onclick=sair;
    $('#expData').onclick=()=>{navigator.clipboard?.writeText(JSON.stringify({perfil:{...u,h:undefined},simulacoes:sims,topicos:posts},null,2));toast('Dados copiados')};
    $('#delAcc').onclick=()=>{if($('#delAcc').dataset.c){const us=DB.get('users',{});delete us[u.email];DB.set('users',us);DB.del('sims_'+u.email);sair();toast('Conta excluída')}else{$('#delAcc').dataset.c=1;$('#delAcc').textContent='Clique de novo para confirmar'}};
    return}
  box.innerHTML=`<div class="duo"><form id="loginF"><h3 style="font-size:1.3rem">Entrar</h3>
   <label for="li_m">E-mail</label><input type="email" id="li_m" autocomplete="email" required><label for="li_s">Senha</label><input type="password" id="li_s" autocomplete="current-password" required>
   <br><br><button class="btn">Entrar</button><p class="micro">Esqueceu a senha? Na versão beta, crie uma nova conta.</p></form>
   <form id="signF"><h3 style="font-size:1.3rem">Criar conta gratuita</h3><p class="micro">Salve simulações, participe do fórum e vote nas próximas funções.</p>
   <label for="cd_n">Nome</label><input id="cd_n" autocomplete="name" required><label for="cd_m">E-mail</label><input type="email" id="cd_m" autocomplete="email" required>
   <label for="cd_p">Perfil</label><select id="cd_p"><option>Investidor em leilões</option><option>Empresário</option><option>Contador / Advogado</option><option>Outro</option></select>
   <label for="cd_s">Senha (mín. 6 caracteres)</label><input type="password" id="cd_s" minlength="6" autocomplete="new-password" required>
   <label style="font-weight:400;display:flex;gap:8px"><input type="checkbox" required> Aceito os <a href="#" data-modal="termos">termos</a> e a <a href="#" data-modal="privacidade">política de privacidade</a>.</label>
   <br><button class="btn">Cadastrar</button></form></div>`;
  $('#loginF').onsubmit=async e=>{e.preventDefault();const us=DB.get('users',{}),m=$('#li_m').value.trim().toLowerCase();
    if(!us[m]||us[m].h!==await hash($('#li_s').value+m)){toast('E-mail ou senha inválidos');return}DB.set('session',us[m]);toast('Bem-vindo(a) de volta!');track('login');refresh()};
  $('#signF').onsubmit=async e=>{e.preventDefault();const us=DB.get('users',{}),m=$('#cd_m').value.trim().toLowerCase();
    if(us[m]){toast('E-mail já cadastrado — faça login');return}
    us[m]={nome:$('#cd_n').value.trim(),email:m,perfil:$('#cd_p').value,h:await hash($('#cd_s').value+m),desde:Date.now(),pts:5};DB.set('users',us);DB.set('session',us[m]);
    toast('Conta criada! +5 pontos de boas-vindas');track('signup',{perfil:us[m].perfil});refresh()};
  bindModals();
}
function sair(){DB.del('session');refresh()}

/* ---------- Fórum ---------- */
const SEED=[{id:1,t:'📌 Regras e boas-vindas da comunidade',a:'Equipe',email:'equipe',c:'Geral',b:'Respeito, sem promessas de ganho, sem divulgação de dados de terceiros. Compartilhe experiências e dúvidas!',d:Date.now()-864e5*10,r:[],l:[],pin:1},
 {id:2,t:'Vale a pena arrematar imóvel ocupado?',a:'Equipe',email:'equipe',c:'Leilões',b:'Depende do custo e prazo de desocupação. Quem já passou por isso?',d:Date.now()-864e5*3,r:[{a:'Carlos M.',b:'Já fiz dois, levou ~6 meses cada. Coloque no custo.',d:Date.now()-864e5*2}],l:[]},
 {id:3,t:'Monofásico no Simples: quem já recuperou?',a:'Equipe',email:'equipe',c:'Tributário',b:'Dúvidas sobre PER/DCOMP e retificação de PGDAS-D.',d:Date.now()-864e5,r:[],l:[]},
 {id:4,t:'Holding familiar: quando faz sentido?',a:'Equipe',email:'equipe',c:'Empresarial',b:'Custos, ITCMD e governança. Vamos discutir.',d:Date.now()-36e5*5,r:[],l:[]}];
if(!DB.get('posts'))DB.set('posts',SEED);
let fCat='Todos',fQ='',fSort='recentes';
function renderForum(){
  const u=me();let ps=DB.get('posts',[]).filter(p=>(fCat==='Todos'||p.c===fCat)&&(p.t+p.b).toLowerCase().includes(fQ.toLowerCase()));
  ps.sort((a,b)=>(b.pin||0)-(a.pin||0)||(fSort==='populares'?(b.l.length+b.r.length)-(a.l.length+a.r.length):b.d-a.d));
  const ago=d=>{const s=(Date.now()-d)/1000;return s<3600?Math.max(1,Math.round(s/60))+' min':s<86400?Math.round(s/3600)+' h':Math.round(s/86400)+' d'};
  let h=`<div class="forum-top"><input id="fq" placeholder="Buscar no fórum…" value="${esc(fQ)}" aria-label="Buscar"><select id="fs"><option value="recentes">Recentes</option><option value="populares" ${fSort==='populares'?'selected':''}>Populares</option></select></div>
   <div class="subtabs">${['Todos','Leilões','Tributário','Empresarial','Geral'].map(c=>`<button class="${c===fCat?'on':''}" data-fcat="${c}">${L(c)}</button>`).join('')}</div>`;
  h+=u?`<form class="post" id="npF"><b>Novo tópico</b><input id="np_t" placeholder="Título (seja específico)" maxlength="120" required style="margin-top:10px">
     <select id="np_c" style="margin-top:8px"><option>Leilões</option><option>Tributário</option><option>Empresarial</option><option>Geral</option></select>
     <textarea id="np_b" rows="3" maxlength="2000" placeholder="Sua dúvida ou experiência" required style="margin-top:8px"></textarea><br><br><button class="btn sm">Publicar (+3 pts)</button></form>`
     :`<div class="lock post"><p>🔒 Entre ou crie sua conta gratuita para publicar, responder e curtir.</p><br><button class="btn sm" id="goLogin">Entrar / Cadastrar</button></div>`;
  h+=ps.length?ps.map(p=>{const liked=u&&p.l.includes(u.email),us=DB.get('users',{})[p.email];return `<article class="post ${p.pin?'pin':''}"><span class="tag">${esc(p.c)}</span><h4>${esc(p.t)}</h4>
    <div class="meta">${avatar(p.a)} ${esc(p.a)} ${us?`<span class="lvl">${level(us.pts||0)}</span>`:p.email==='equipe'?'<span class="lvl">Equipe</span>':''} · há ${ago(p.d)}</div><p>${esc(p.b).replace(/\n/g,'<br>')}</p>
    ${p.r.map(r=>`<div class="reply"><b>${esc(r.a)}:</b> ${esc(r.b)}</div>`).join('')}
    <div class="post-actions"><button data-like="${p.id}" class="${liked?'on':''}">♥ ${p.l.length}</button><span>💬 ${p.r.length}</span>${u&&u.email===p.email?`<button data-del="${p.id}">Excluir</button>`:''}<button data-rep="${p.id}">Denunciar</button></div>
    ${u?`<form class="rpF" data-id="${p.id}" style="display:flex;gap:8px;margin-top:10px"><input placeholder="Responder…" maxlength="1000" required aria-label="Resposta"><button class="btn sm">Enviar</button></form>`:''}</article>`}).join(''):'<p class="micro">Nenhum tópico encontrado.</p>';
  h+=`<p class="note">Conteúdos do fórum são opiniões de membros e não substituem análise individual.</p>`;
  $('#forumBox').innerHTML=h;
  $('#fq').oninput=e=>{fQ=e.target.value;renderForum();const i=$('#fq');i.focus();i.setSelectionRange(fQ.length,fQ.length)};
  $('#fs').onchange=e=>{fSort=e.target.value;renderForum()};
  $$('[data-fcat]').forEach(b=>b.onclick=()=>{fCat=b.dataset.fcat;renderForum()});
  $('#goLogin')&&($('#goLogin').onclick=()=>openTab('p-conta'));
  $('#npF')&&($('#npF').onsubmit=e=>{e.preventDefault();const ps=DB.get('posts',[]);ps.push({id:Date.now(),t:$('#np_t').value.trim(),c:$('#np_c').value,b:$('#np_b').value.trim(),a:me().nome,email:me().email,d:Date.now(),r:[],l:[]});DB.set('posts',ps);addPoints(3);track('post');toast('Tópico publicado! +3 pts');refresh()});
  $$('.rpF').forEach(f=>f.onsubmit=e=>{e.preventDefault();const ps=DB.get('posts',[]),p=ps.find(x=>x.id==f.dataset.id);p.r.push({a:me().nome,b:f.querySelector('input').value.trim(),d:Date.now()});DB.set('posts',ps);addPoints(1);track('reply');renderForum()});
  $$('[data-like]').forEach(b=>b.onclick=()=>{if(!me()){toast('Entre para curtir');return}const ps=DB.get('posts',[]),p=ps.find(x=>x.id==b.dataset.like),i=p.l.indexOf(me().email);i<0?p.l.push(me().email):p.l.splice(i,1);DB.set('posts',ps);renderForum()});
  $$('[data-del]').forEach(b=>b.onclick=()=>{DB.set('posts',DB.get('posts',[]).filter(x=>x.id!=b.dataset.del));renderForum();toast('Tópico excluído')});
  $$('[data-rep]').forEach(b=>b.onclick=()=>{toast('Obrigado! A moderação vai analisar.');track('report',{id:b.dataset.rep})});
}
function refresh(){renderNav();renderConta();renderForum();renderRoad()}
refresh();

/* ---------- Formulário de lead ---------- */
const telMask=v=>{const d=v.replace(/\D/g,'').slice(0,11);return d.length>10?d.replace(/(\d{2})(\d{5})(\d{4})/,'($1) $2-$3'):d.replace(/(\d{2})(\d{4})(\d{0,4})/,'($1) $2-$3').replace(/-$/,'')};
$('#f_tel').addEventListener('input',e=>e.target.value=telMask(e.target.value));
const draft=DB.get('draft',{});['f_nome','f_tel','f_mail','f_msg'].forEach(id=>{if(draft[id])$('#'+id).value=draft[id];$('#'+id).addEventListener('input',()=>{draft[id]=$('#'+id).value;DB.set('draft',draft)})});
let formStarted=false;$('#leadForm').addEventListener('input',()=>{if(!formStarted){formStarted=true;track('form_start')}});
function validate(){let ok=true;const set=(id,msg)=>{const e=$('#'+id).closest('div').querySelector('.err');if(e)e.textContent=msg;if(msg)ok=false};
  set('f_nome',$('#f_nome').value.trim().length<2?L('Informe seu nome'):'');
  set('f_tel',$('#f_tel').value.replace(/\D/g,'').length<10?L('WhatsApp inválido'):'');
  set('f_mail',/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test($('#f_mail').value)?'':L('E-mail inválido'));
  const le=$('#f_lgpd').closest('div').querySelector('.err');le.textContent=$('#f_lgpd').checked?'':L('Necessário para retornarmos o contato');if(!$('#f_lgpd').checked)ok=false;return ok}
const leadMsg=()=>`Olá! Sou ${$('#f_nome').value} (${$('#f_perfil').value}). Interesse: ${$('#f_area').value}. ${$('#f_msg').value}`;
$('#leadForm').onsubmit=e=>{e.preventDefault();if($('#f_hp').value)return;if(!validate()){toast(L('Confira os campos destacados'));return}
  const l=DB.get('leads',[]);l.push({form:1,nome:$('#f_nome').value,tel:$('#f_tel').value,email:$('#f_mail').value,area:$('#f_area').value,perfil:$('#f_perfil').value,msg:$('#f_msg').value,quiz:DB.get('quiz'),d:Date.now(),origem:location.href});DB.set('leads',l);DB.del('draft');
  track('lead',{area:$('#f_area').value});
  openModal(`<h3>Recebemos sua solicitação ✅</h3><p style="color:var(--mut)">Retornaremos em até 1 dia útil. Para agilizar, envie também pelo WhatsApp:</p><div class="cta-row"><a class="btn wa" target="_blank" rel="noopener" href="${waLink(leadMsg())}">Enviar no WhatsApp</a></div><p class="note">Enquanto isso, baixe o checklist gratuito: <a href="#" data-modal="checklist">ver checklist</a>.</p>`);
  e.target.reset()};
$('#leadWa').onclick=()=>{track('lead_wa');open(waLink(leadMsg()),'_blank','noopener')};
$('#newsForm').onsubmit=e=>{e.preventDefault();const n=DB.get('news',[]);n.push({e:e.target[0].value,d:Date.now()});DB.set('news',n);e.target.reset();toast(L('Inscrição confirmada!'));track('newsletter')};

/* ---------- Modais ---------- */
const MODALS={
 checklist:`<h3>Checklist do arrematante: 21 pontos antes do lance</h3><ol><li>Ler o edital inteiro, incluindo anexos</li><li>Conferir data, horário e plataforma do leilão</li><li>Verificar se é judicial ou extrajudicial</li><li>Baixar a matrícula atualizada (até 30 dias)</li><li>Checar penhoras, hipotecas e indisponibilidades</li><li>Consultar o processo (recursos, nulidades, embargos)</li><li>Confirmar quem paga IPTU e condomínio</li><li>Levantar débitos de IPTU na prefeitura</li><li>Pedir declaração de débitos ao condomínio</li><li>Verificar se o imóvel está ocupado e por quem</li><li>Estimar prazo e custo de desocupação</li><li>Visitar a região (e o imóvel, se possível)</li><li>Pesquisar preço de mercado de imóveis similares</li><li>Calcular ITBI do município</li><li>Somar comissão do leiloeiro</li><li>Orçar registro, certidões e reformas</li><li>Calcular o custo total e o lance máximo</li><li>Conferir condições de pagamento e parcelamento</li><li>Verificar direito de preferência de terceiros</li><li>Ter o dinheiro disponível no prazo do edital</li><li>Planejar a saída: revenda ou locação</li></ol><a class="btn" href="#contato" onclick="closeModal()">Quero ajuda com um edital</a>`,
 privacidade:`<h3>Política de Privacidade</h3><p style="color:var(--mut);font-size:.92rem">Coletamos apenas os dados que você informa (nome, contato e mensagem) para retornar seu contato e prestar os serviços solicitados, com base no consentimento e na execução de contrato (LGPD, art. 7º). Não vendemos dados. Nesta versão, conta, fórum e simulações ficam armazenados no seu navegador. Você pode copiar ou excluir seus dados em "Minha conta". Controlador: ${CONFIG.marca}, CNPJ ${CONFIG.cnpj}. Contato do encarregado: ${CONFIG.email}.</p>`,
 termos:`<h3>Termos de Uso</h3><ul><li>As calculadoras são estimativas educativas, sem garantia de resultado.</li><li>Conteúdos do fórum são de responsabilidade de seus autores.</li><li>É proibido publicar dados pessoais de terceiros, ofensas ou ofertas enganosas.</li><li>A moderação pode remover conteúdos que violem estes termos.</li><li>A contratação de serviços depende de proposta e contrato específicos.</li></ul>`};
let lastFocus=null;function openModal(html){lastFocus=document.activeElement;$('#modalBody').innerHTML=html;$('#modal').classList.add('on');bindModals();$('#modal .x').focus()}
function closeModal(){$('#modal').classList.remove('on');lastFocus&&lastFocus.focus&&lastFocus.focus()}
$('#modal .x').onclick=closeModal;$('#modal').onclick=e=>{if(e.target.id==='modal')closeModal()};
addEventListener('keydown',e=>{if(e.key==='Escape'){closeModal();$('#menu').classList.remove('open')}});
function bindModals(){$$('[data-modal]').forEach(a=>a.onclick=e=>{e.preventDefault();openModal((MODALS_T[LANG]||{})[a.dataset.modal]||MODALS[a.dataset.modal]);track('modal',{m:a.dataset.modal})})}
bindModals();

/* ---------- Saída (exit intent) com isca ---------- */
document.addEventListener('mouseout',e=>{if(e.clientY<5&&!e.relatedTarget&&!DB.get('exitShown')&&!$('#modal').classList.contains('on')){DB.set('exitShown',1);
  openModal(`<h3>Antes de sair: leve o checklist grátis</h3><p style="color:var(--mut)">21 pontos para conferir antes de dar qualquer lance em leilão.</p><form id="exitF" style="display:flex;gap:8px;margin-top:16px"><input type="email" placeholder="seu@email.com" required aria-label="E-mail"><button class="btn">Ver checklist</button></form>`);
  $('#exitF').onsubmit=e=>{e.preventDefault();const n=DB.get('news',[]);n.push({e:e.target[0].value,d:Date.now(),origem:'exit'});DB.set('news',n);track('lead_magnet');openModal((MODALS_T[LANG]||{}).checklist||MODALS.checklist)}}});

/* ---------- Cookies ---------- */
if(!DB.get('cookie'))$('#cookie').classList.add('on');
$('#ckOk').onclick=()=>{DB.set('cookie','all');$('#cookie').classList.remove('on')};
$('#ckNo').onclick=()=>{DB.set('cookie','essential');$('#cookie').classList.remove('on')};
$('#cookiePref').onclick=e=>{e.preventDefault();$('#cookie').classList.add('on')};

/* ---------- Painel admin (#admin) ---------- */
function adminPanel(){const l=DB.get('leads',[]),ev=DB.get('events',[]),n=DB.get('news',[]);const cnt=k=>ev.filter(e=>e.ev===k).length;
  const csv='data;nome;telefone;email;area;perfil;mensagem\n'+l.map(x=>[new Date(x.d).toLocaleString('pt-BR'),x.nome,x.tel,x.email,x.area,x.perfil,(x.msg||'').replace(/\n|;/g,' ')].join(';')).join('\n');
  openModal(`<h3>Painel (local)</h3><div class="kpi"><div><b>${l.length}</b><span>leads</span></div><div><b>${n.length}</b><span>newsletter</span></div><div><b>${cnt('quiz_done')}</b><span>quizzes</span></div><div><b>${cnt('sim_save')}</b><span>simulações salvas</span></div><div><b>${cnt('signup')}</b><span>cadastros</span></div></div>
   <div class="hist">${l.slice().reverse().map(x=>`<div><span><b>${esc(x.nome)}</b> · ${esc(x.area)} · ${esc(x.tel)}</span><span class="micro">${new Date(x.d).toLocaleDateString('pt-BR')}</span></div>`).join('')||'<p class="micro">Sem leads neste navegador.</p>'}</div>
   <div class="cta-row"><button class="btn sm" id="cpCsv">Copiar CSV dos leads</button></div><p class="note">Dados apenas deste navegador. Para receber leads de verdade, conecte um backend/CRM.</p>`);
  $('#cpCsv').onclick=()=>navigator.clipboard?.writeText(csv).then(()=>toast('CSV copiado'))}
function route(){if(location.hash==='#admin')adminPanel();const m=location.hash.match(/^#calc-(c[1-7])$/);if(m){openCalc(m[1]);setTimeout(()=>$('#hub').scrollIntoView(),50)}if(location.hash==='#forum'){openTab('p-forum');$('#hub').scrollIntoView()}}
addEventListener('hashchange',route);route();
track('pageview',{mode:document.documentElement.dataset.mode});

function rerenderDynamic(){calcAll();renderQuiz();renderGlos();renderFaq();renderForum();const g=DB.get('goal');if(g)$(`.opt[data-goal=${g}]`)?.click()}
