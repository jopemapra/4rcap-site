/* Rodada 5 — honorários, radar, qualificação de leads, ferramentas e refinamentos */
(function(){
const Y={h_eb:['Investment','费用'],h_h:['How our fees work','收费方式'],h_l:['Transparent models, set in a contract after the free assessment.','透明的收费模式，在免费评估后以合同约定。'],h1:['Fixed fee','固定费用'],h1p:['For one-off analyses: auction notice, due diligence, feasibility report, corporate structuring.','适用于单项分析：拍卖公告、尽职调查、可行性报告、公司架构。'],h2:['Success fee','按结果收费'],h2p:['Common in tax recovery: you pay a percentage of what is actually recovered or offset.','常见于税款追回：按实际追回或抵扣金额的比例收费。'],h3:['Retainer','月度服务'],h3p:['Monthly support for companies: KPIs, tax planning and ongoing advice.','企业月度支持：指标、税务规划与持续咨询。'],
 r_eb:['Auction Radar · preview','拍卖雷达 · 预览'],r_h:['Get opportunities that match your profile','获取符合您需求的机会'],r_l:['Tell us where and how much you want to invest. We will notify you when the radar launches — you will be first in line.','告诉我们您想投资的地点与金额。雷达上线时您将优先获得通知。'],r_cta:['Join the radar list','加入雷达名单']};
const ys=$$('[data-y]');ys.forEach(e=>e.dataset.ypt=e.innerHTML);
function applyY(){ys.forEach(e=>{const t=Y[e.dataset.y];e.innerHTML=LANG!=='pt'&&t?(LANG==='en'?t[0]:t[1]):e.dataset.ypt});metaLang();radarCount()}
Object.assign(D,{'pessoas na lista do radar':['people on the radar list','人已加入雷达名单'],'Você entrou na lista do radar!':['You joined the radar list!','您已加入雷达名单！'],'Aguarde um minuto antes de enviar novamente.':['Please wait a minute before sending again.','请稍等一分钟再提交。'],
 'Fraca':['Weak','弱'],'Média_':['Medium','中'],'Forte':['Strong','强'],'Mostrar senha':['Show password','显示密码'],'Força da senha':['Password strength','密码强度'],'Editar':['Edit','编辑'],'Salvar':['Save','保存'],'Cancelar':['Cancel','取消'],'Útil':['Helpful','有用'],'Sem resposta':['Unanswered','未回复'],'Tópico atualizado':['Topic updated','话题已更新'],
 'Precisa de ajuda?':['Need help?','需要帮助？'],'Como podemos ajudar?':['How can we help?','我们能帮您什么？'],'Avaliação enviada. Obrigado!':['Review sent. Thank you!','评价已提交，谢谢！']});

/* Título e descrição por idioma */
const META={pt:[document.title,$('meta[name=description]').content],en:[`${CONFIG.marca} | Auctions, Tax Credits & Business Consulting in Brazil`,'Auction acquisition advisory, tax credit recovery and business consulting in Brazil. Free calculators and community.'],zh:[`${CONFIG.marca} | 巴西拍卖、税务抵免与企业咨询`,'巴西拍卖竞买顾问、税务抵免追回与企业咨询。免费计算器与社区。']};
function metaLang(){const m=META[LANG]||META.pt;document.title=m[0];$('meta[name=description]').content=m[1];$('meta[property="og:locale"]').content=LANG==='en'?'en_US':LANG==='zh'?'zh_CN':'pt_BR'}

/* Radar */
function radarCount(){const n=DB.get('radar',[]).length;$('#radarCount').textContent=n?`${n} ${L('pessoas na lista do radar')}`:''}
$('#radarF').onsubmit=e=>{e.preventDefault();const r=DB.get('radar',[]);r.push({c:$('#rd_c').value,t:$('#rd_t').value,min:$('#rd_min').value,max:$('#rd_max').value,d:$('#rd_d').value,e:$('#rd_e').value,dt:Date.now()});DB.set('radar',r);track('radar_signup');toast('Você entrou na lista do radar!');radarCount();e.target.reset()};
$$('#radarF .money').forEach(e=>e.addEventListener('input',()=>fmtMoney(e)));

/* Formulário: limite de envio, campos de qualificação, temas da newsletter */
const lf=$('#leadForm');
lf.addEventListener('submit',e=>{const last=DB.get('lastLead',0);if(Date.now()-last<60000&&!$('#f_hp').value){e.preventDefault();e.stopImmediatePropagation();toast('Aguarde um minuto antes de enviar novamente.');return}
  const extra={valor:$('#f_valor').value,hora:$('#f_hora').value,orig:$('#f_orig').value};
  setTimeout(()=>{const l=DB.get('leads',[]);const x=l[l.length-1];if(x&&x.form&&!x.q2&&Date.now()-x.d<3000){x.q2=1;Object.assign(x,extra);x.score=(extra.valor.includes('2 milhões')?3:extra.valor.includes('500')?2:extra.valor?1:0)+((DB.get('quiz')||{}).score||0);DB.set('leads',l);DB.set('lastLead',Date.now())}},0)},true);
$('#newsForm').addEventListener('submit',()=>{const t=$$('#newsTopics input:checked').map(i=>i.value);setTimeout(()=>{const n=DB.get('news',[]);if(n.length){n[n.length-1].temas=t;DB.set('news',n)}},0)},true);

/* Senha: força + mostrar */
function pwEnhance(){['cd_s','li_s'].forEach(id=>{const i=$('#'+id);if(!i||i.dataset.pw)return;i.dataset.pw=1;
  const t=document.createElement('label');t.style.cssText='font-weight:400;display:flex;gap:6px;margin-top:6px';t.innerHTML=`<input type="checkbox"> ${L('Mostrar senha')}`;i.after(t);t.querySelector('input').onchange=e=>i.type=e.target.checked?'text':'password';
  if(id==='cd_s'){const m=document.createElement('div');m.className='bar';m.setAttribute('aria-label',L('Força da senha'));m.innerHTML='<i style="width:0"></i>';i.after(m);
   i.addEventListener('input',()=>{const v=i.value;let s=0;if(v.length>=8)s++;if(/[A-Z]/.test(v)&&/[a-z]/.test(v))s++;if(/\d/.test(v))s++;if(/[^\w]/.test(v))s++;const c=['#ef6b6b','#ef6b6b','#f0b54a','#3ecf8e','#3ecf8e'][s];m.firstChild.style.cssText=`width:${s*25}%;background:${c}`})}})}

/* Fórum: editar, útil, filtro sem resposta */
let onlyOpen=false;
function forumPlus(){const u=me(),posts=DB.get('posts',[]);
  const top=$('#forumBox .forum-top');if(top&&!top.querySelector('#openOnly')){const b=document.createElement('button');b.id='openOnly';b.className='btn sm '+(onlyOpen?'':'dark');b.textContent=L('Sem resposta');b.onclick=()=>{onlyOpen=!onlyOpen;renderForum()};top.append(b)}
  $$('#forumBox article.post').forEach(a=>{const id=a.querySelector('[data-like]')?.dataset.like,p=posts.find(x=>x.id==id);if(!p)return;
   if(onlyOpen&&p.r.length)a.style.display='none';
   a.querySelectorAll('.reply').forEach((r,i)=>{const rp=p.r[i];if(!rp)return;rp.u=rp.u||[];const b=document.createElement('button');b.className='lnk';b.style.marginLeft='8px';b.textContent=`👍 ${L('Útil')} ${rp.u.length||''}`;if(u&&rp.u.includes(u.email))b.style.color='var(--gold2)';
     b.onclick=()=>{if(!u){toast('Entre para curtir');return}const ps=DB.get('posts',[]),q=ps.find(x=>x.id==id).r[i];q.u=q.u||[];const k=q.u.indexOf(u.email);k<0?q.u.push(u.email):q.u.splice(k,1);DB.set('posts',ps);renderForum()};r.append(b)});
   if(u&&u.email===p.email){const act=a.querySelector('.post-actions');const e=document.createElement('button');e.textContent=L('Editar');act.prepend(e);
     e.onclick=()=>{a.querySelector('p').outerHTML=`<div class="edit"><textarea rows="3" maxlength="2000">${esc(p.b)}</textarea><div class="cta-row" style="margin-top:8px"><button class="btn sm sv">${L('Salvar')}</button><button class="btn sm dark cc">${L('Cancelar')}</button></div></div>`;
      a.querySelector('.sv').onclick=()=>{const ps=DB.get('posts',[]);ps.find(x=>x.id==id).b=a.querySelector('.edit textarea').value.trim();DB.set('posts',ps);toast('Tópico atualizado');renderForum()};a.querySelector('.cc').onclick=renderForum}}
   const prof=DB.get('prof_'+p.email);if(prof&&(prof.cidade||prof.bio))a.querySelector('.meta').title=[prof.cidade,prof.bio].filter(Boolean).join(' · ')})}
const _rf=window.renderForum;window.renderForum=function(){_rf();forumPlus()};
const _rc=window.renderConta;window.renderConta=function(){_rc();pwEnhance()};

/* Modal: foco preso dentro */
$('#modal').addEventListener('keydown',e=>{if(e.key!=='Tab')return;const f=[...$('#modal').querySelectorAll('button,a,input,select,textarea')].filter(x=>!x.disabled&&x.offsetParent);if(!f.length)return;const a=f[0],z=f[f.length-1];if(e.shiftKey&&document.activeElement===a){e.preventDefault();z.focus()}else if(!e.shiftKey&&document.activeElement===z){e.preventDefault();a.focus()}});

/* Tema acompanha o sistema se o usuário não escolheu */
matchMedia('(prefers-color-scheme: light)').addEventListener?.('change',e=>{if(!DB.get('theme')){document.documentElement.dataset.theme=e.matches?'light':'dark'}});

/* Campos numéricos: sem negativos */
$$('#p-calc input[type=number]').forEach(i=>i.addEventListener('blur',()=>{if(+i.value<0){i.value=0;calcAll()}}));

/* Widget de ajuda */
const help=document.createElement('div');help.id='helpW';help.innerHTML=`<button class="hb" aria-expanded="false" aria-controls="helpP">💬 <span>${L('Precisa de ajuda?')}</span></button><div id="helpP" class="hp" hidden></div>`;document.body.append(help);
const HELP=[['🏛️','Quero analisar um edital','Olá! Tenho um edital de leilão e quero uma análise.'],['📊','Quero revisar meus impostos','Olá! Quero saber se minha empresa tem créditos tributários.'],['🧭','Quero organizar minha empresa','Olá! Preciso de consultoria empresarial.'],['🌎','I am a foreign investor','Hello! I am a foreign investor interested in Brazilian auctions.'],['📅','Agendar uma conversa','#agenda']];
function renderHelp(){$('#helpW .hb span').textContent=L('Precisa de ajuda?');$('#helpP').innerHTML=`<b>${L('Como podemos ajudar?')}</b>`+HELP.map(h=>h[2].startsWith('#')?`<a href="${h[2]}" class="hq">${h[0]} ${L(h[1])}</a>`:`<a class="hq" target="_blank" rel="noopener" href="${waLink(h[2])}">${h[0]} ${L(h[1])}</a>`).join('');$$('#helpP .hq').forEach(a=>a.onclick=()=>{track('help_click',{t:a.textContent});toggleHelp(false)})}
function toggleHelp(o){const p=$('#helpP'),b=$('#helpW .hb');p.hidden=!o;b.setAttribute('aria-expanded',o)}
$('#helpW .hb').onclick=()=>toggleHelp($('#helpP').hidden);
Object.assign(D,{'Quero analisar um edital':['I want an auction notice reviewed','我想分析一份拍卖公告'],'Quero revisar meus impostos':['I want my taxes reviewed','我想审查我的税务'],'Quero organizar minha empresa':['I want to organize my company','我想整顿我的企业'],'I am a foreign investor':['I am a foreign investor','我是外国投资者'],'Agendar uma conversa':['Schedule a call','预约沟通']});

/* Checklist de documentos (tributário) e diagnóstico de maturidade (empresarial) */
MODALS.docs=`<h3>Documentos para a revisão tributária</h3><ul><li>PGDAS-D ou SPED (ECF, EFD-Contribuições) dos últimos 60 meses</li><li>XML das notas fiscais de entrada e saída</li><li>Relatório de faturamento por produto (com NCM)</li><li>Guias pagas (DAS, DARF, GPS/DCTFWeb)</li><li>Folha de pagamento e eSocial</li><li>Contrato social e alterações</li><li>Certidões negativas e parcelamentos ativos</li></ul><p class="note">Seu contador normalmente já tem quase tudo. Nós pedimos diretamente a ele, com sua autorização.</p>`;
const MQ=['Separo as contas da empresa das minhas contas pessoais','Sei qual é minha margem de contribuição','Acompanho o fluxo de caixa toda semana','Revisei o regime tributário no último ano','Os sócios têm um acordo de sócios assinado','Existe um plano de sucessão','Tenho indicadores mensais definidos','Meus contratos principais foram revisados'];
MODALS.maturidade=`<h3>Diagnóstico de maturidade empresarial</h3><p class="note">Marque o que já é realidade na sua empresa.</p><form id="matF">${MQ.map((q,i)=>`<label style="font-weight:400;display:flex;gap:8px;margin:8px 0"><input type="checkbox" value="${i}"> ${q}</label>`).join('')}<button class="btn" style="margin-top:10px">Ver resultado</button></form><div id="matR"></div>`;
const tribCard=$('#s-trib .btn'),empCard=$('#s-emp .btn');
const b1=document.createElement('a');b1.href='#';b1.className='btn sm dark';b1.style.marginLeft='6px';b1.dataset.modal='docs';b1.textContent='Documentos necessários';tribCard.after(b1);
const b2=document.createElement('a');b2.href='#';b2.className='btn sm dark';b2.style.marginLeft='6px';b2.dataset.modal='maturidade';b2.textContent='Teste de maturidade';empCard.after(b2);
document.addEventListener('submit',e=>{if(e.target.id!=='matF')return;e.preventDefault();const n=$$('#matF input:checked').length,p=Math.round(n/MQ.length*100);const v=p>=75?['g','Empresa bem estruturada. Foque em crescimento e planejamento tributário.']:p>=40?['y','Base razoável, com lacunas importantes. Priorize os itens não marcados.']:['r','Estrutura frágil: risco alto de perda de margem e conflitos. Vale um diagnóstico.'];
  $('#matR').innerHTML=`<div class="big" style="font-size:2rem;color:var(--gold2);font-family:var(--serif)">${p}%</div><div class="verdict ${v[0]}">${v[1]}</div><a class="btn wa" style="margin-top:12px" target="_blank" rel="noopener" href="${waLink(`Olá! Fiz o teste de maturidade e tive ${p}%. Quero conversar.`)}">Conversar sobre o resultado</a>`;track('maturity',{p})},true);

/* Avaliação de clientes (moderada, não publicada automaticamente) */
MODALS.avaliar=`<h3>Avalie nosso atendimento</h3><form id="avF"><label>Nota</label><select>${[5,4,3,2,1].map(n=>`<option>${'★'.repeat(n)}</option>`).join('')}</select><label>Comentário</label><textarea rows="3" maxlength="600" required></textarea><label style="font-weight:400;display:flex;gap:8px"><input type="checkbox"> Autorizo publicar meu primeiro nome com este comentário</label><button class="btn" style="margin-top:10px">Enviar avaliação</button></form>`;
document.addEventListener('submit',e=>{if(e.target.id!=='avF')return;e.preventDefault();const f=e.target.elements;const a=DB.get('reviews',[]);a.push({n:f[0].value,c:f[1].value,pub:f[2].checked,d:Date.now(),u:me()?.nome});DB.set('reviews',a);closeModal();toast('Avaliação enviada. Obrigado!')},true);
const fl=$('footer .fgrid>div:nth-child(4) ul');fl.insertAdjacentHTML('beforeend','<li><a href="#" data-modal="avaliar">Avaliar atendimento</a></li>');
bindModals();

/* Novas calculadoras: parcelamento judicial e precificação */
const sub=$('#p-calc .subtabs'),note=$('#p-calc > p.note');
sub.insertAdjacentHTML('beforeend','<button data-c="c11">Parcelamento judicial</button><button data-c="c12">Preço de venda</button>');
note.insertAdjacentHTML('beforebegin',`<div class="calc" id="c11"><h3>Parcelamento judicial (art. 895 CPC)</h3><p class="desc">Entrada de no mínimo 25% e saldo em até 30 parcelas mensais corrigidas.</p><div><label>Valor do lance (R$)</label><input class="money" id="pj_l" value="300.000"><label>Entrada (%)</label><input type="number" id="pj_e" value="25" min="25"><label>Parcelas</label><input type="number" id="pj_n" value="30" max="30" min="1"><label>Correção mensal estimada (%)</label><input type="number" step="0.1" id="pj_c" value="0.4"></div><div class="result" id="r11" aria-live="polite"></div></div>
<div class="calc" id="c12"><h3>Preço de venda (markup)</h3><p class="desc">Preço mínimo para cobrir custos, impostos e a margem desejada.</p><div><label>Custo do produto/serviço (R$)</label><input class="money" id="mk_c" value="100"><label>Impostos sobre a venda (%)</label><input type="number" step="0.1" id="mk_t" value="10"><label>Despesas variáveis: comissão, cartão, frete (%)</label><input type="number" step="0.1" id="mk_v" value="8"><label>Despesas fixas rateadas (%)</label><input type="number" step="0.1" id="mk_f" value="15"><label>Margem de lucro desejada (%)</label><input type="number" step="0.1" id="mk_m" value="12"></div><div class="result" id="r12" aria-live="polite"></div></div>`);
function c11(){const l=num('pj_l'),e=Math.max(25,num('pj_e'))/100,n=Math.min(30,Math.max(1,num('pj_n'))),c=num('pj_c')/100,ent=l*e,base=(l-ent)/n;let tot=ent,rows='';for(let k=1;k<=n;k++){const v=base*Math.pow(1+c,k);tot+=v;if(k<=3||k===n)rows+=row(`${L('Parcela')} ${k}`,brl(v));else if(k===4)rows+=row('…','')}
  $('#r11').innerHTML=row(L('Entrada'),brl(ent))+rows+`<div class="big">${brl(tot)}</div><div class="micro">${L('Total pago com correção')}</div>`+actions('pj',`Parcelamento: entrada ${brl(ent)} + ${n}x a partir de ${brl(base)}.`)}
function c12(){const c=num('mk_c'),soma=(num('mk_t')+num('mk_v')+num('mk_f')+num('mk_m'))/100;if(soma>=1){$('#r12').innerHTML=`<div class="verdict r">${L('A soma dos percentuais precisa ser menor que 100%.')}</div>`;return}
  const p=c/(1-soma),mk=p/c;$('#r12').innerHTML=row(L('Custo'),brl(c))+row(L('Markup multiplicador'),mk.toFixed(2)+'x')+row(L('Lucro por unidade'),brl(p*num('mk_m')/100),'pos')+`<div class="big">${(p).toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}</div><div class="micro">${L('Preço de venda sugerido')}</div>`+actions('mk',`Preço sugerido: ${brl(p)} (markup ${mk.toFixed(2)}x).`)}
Object.assign(D,{'Parcela':['Installment','分期'],'Total pago com correção':['Total paid with adjustment','含调整总支付'],'A soma dos percentuais precisa ser menor que 100%.':['The percentages must add up to less than 100%.','百分比总和必须小于100%。'],'Custo':['Cost','成本'],'Markup multiplicador':['Markup multiplier','加价倍数'],'Lucro por unidade':['Profit per unit','单位利润'],'Preço de venda sugerido':['Suggested selling price','建议售价'],'Parcelamento judicial':['Court installments','司法分期'],'Preço de venda':['Selling price','售价'],'Simples × Presumido':['Simples vs Presumido','简易税制 vs 推定利润'],'Leilão × Financiamento':['Auction vs Mortgage','拍卖 vs 贷款'],'Comparar imóveis':['Compare properties','比较房产']});
$$('#c11 input,#c12 input').forEach(i=>{i.addEventListener('input',()=>{if(i.classList.contains('money'))fmtMoney(i);c11();c12()})});
$$('[data-c=c11],[data-c=c12]').forEach(b=>b.onclick=()=>{openCalc(b.dataset.c);DB.set('lastCalc',b.dataset.c)});
const _ca=window.calcAll;window.calcAll=function(){_ca();try{c11();c12()}catch(e){console.error(e)}};
function subLabels(){['c8','c9','c10','c11','c12'].forEach(c=>{const b=$(`[data-c=${c}]`);if(!b.dataset.pt)b.dataset.pt=b.textContent;b.textContent=L(b.dataset.pt)})}

/* Glossário e FAQ ampliados */
GLOS.push(['Fator R','Relação entre folha e faturamento que pode levar serviços do Anexo V para o Anexo III do Simples, com alíquota menor.'],['PGDAS-D','Declaração mensal do Simples Nacional onde se informam as receitas e se gera o DAS.'],['Lucro Presumido','Regime em que IRPJ e CSLL incidem sobre uma margem de lucro presumida pela lei.'],['Leiloeiro oficial','Profissional matriculado na Junta Comercial que conduz o leilão.'],['Avaliação judicial','Valor do bem definido no processo, usado como referência para os lances.'],['Apostila de Haia','Certificação que dá validade internacional a documentos, como procurações feitas no exterior.']);
Object.assign(D,{'Fator R':['Factor R','R因子'],'Relação entre folha e faturamento que pode levar serviços do Anexo V para o Anexo III do Simples, com alíquota menor.':['Payroll-to-revenue ratio that can move services to a lower Simples table.','工资与营收之比，可使服务业适用较低的简易税率表。'],'PGDAS-D':['PGDAS-D','PGDAS-D'],'Declaração mensal do Simples Nacional onde se informam as receitas e se gera o DAS.':['Monthly Simples Nacional return that generates the DAS payment.','简易税制月度申报，生成DAS缴款单。'],'Lucro Presumido':['Presumed profit regime','推定利润制'],'Regime em que IRPJ e CSLL incidem sobre uma margem de lucro presumida pela lei.':['Regime where income taxes apply to a profit margin presumed by law.','按法定推定利润率计征所得税的制度。'],'Leiloeiro oficial':['Official auctioneer','官方拍卖师'],'Profissional matriculado na Junta Comercial que conduz o leilão.':['Licensed professional who runs the auction.','在商业登记处注册、主持拍卖的专业人士。'],'Avaliação judicial':['Court appraisal','司法评估'],'Valor do bem definido no processo, usado como referência para os lances.':['Asset value set in the lawsuit, used as bidding reference.','诉讼中确定的资产价值，作为出价参考。'],'Apostila de Haia':['Hague Apostille','海牙认证'],'Certificação que dá validade internacional a documentos, como procurações feitas no exterior.':['Certification giving international validity to documents such as powers of attorney.','使授权书等文件具有国际效力的认证。']});
FAQ.push(['Leilão','Preciso ir presencialmente ao leilão?','Não. A maioria dos leilões é online. Com procuração, podemos inclusive dar os lances por você.'],['Tributário','Quanto tempo leva para receber os créditos?','Compensações administrativas podem ser usadas já nos meses seguintes. Restituições em dinheiro e ações judiciais levam mais tempo, de meses a alguns anos.'],['Geral','Vocês são advogados?','Somos uma consultoria. Quando um caso exige atuação judicial, ele é conduzido por advogados parceiros inscritos na OAB, com contrato próprio.']);
Object.assign(D,{'Preciso ir presencialmente ao leilão?':['Do I need to attend the auction in person?','需要亲自到场参加拍卖吗？'],'Não. A maioria dos leilões é online. Com procuração, podemos inclusive dar os lances por você.':['No. Most auctions are online. With a power of attorney we can even bid for you.','不需要。大多数拍卖在线进行，凭授权书我们可代您出价。'],'Quanto tempo leva para receber os créditos?':['How long until I receive the credits?','多久能拿到抵免？'],'Compensações administrativas podem ser usadas já nos meses seguintes. Restituições em dinheiro e ações judiciais levam mais tempo, de meses a alguns anos.':['Administrative offsets can be used in the following months. Cash refunds and lawsuits take longer, from months to a few years.','行政抵扣可在随后几个月使用；现金退税和诉讼耗时更长，从数月到数年不等。'],'Vocês são advogados?':['Are you lawyers?','你们是律师吗？'],'Somos uma consultoria. Quando um caso exige atuação judicial, ele é conduzido por advogados parceiros inscritos na OAB, com contrato próprio.':['We are a consultancy. When a case requires litigation, it is handled by licensed partner lawyers under a separate contract.','我们是咨询公司。需要诉讼时，由持证合作律师另行签约处理。']});
renderGlos();renderFaq();

/* Painel admin ampliado */
const _ap=window.adminPanel;window.adminPanel=function(){_ap();const box=$('#modalBody');const ag=DB.get('agenda',[]),pa=DB.get('partners',[]),ra=DB.get('radar',[]),rv=DB.get('reviews',[]);
  box.querySelector('.kpi').insertAdjacentHTML('beforeend',`<div><b>${ag.length}</b><span>agendamentos</span></div><div><b>${ra.length}</b><span>radar</span></div><div><b>${pa.length}</b><span>parceiros</span></div><div><b>${rv.length}</b><span>avaliações</span></div>`);
  const l=DB.get('leads',[]);const csv='data;nome;telefone;email;area;perfil;valor;horario;origem;score;idioma;versao;utm_source;utm_campaign;mensagem\n'+l.map(x=>[new Date(x.d).toLocaleString('pt-BR'),x.nome,x.tel,x.email,x.area,x.perfil,x.valor||'',x.hora||'',x.orig||'',x.score??'',x.lang||'',x.mode||'',x.utm?.utm_source||'',x.utm?.utm_campaign||'',(x.msg||'').replace(/\n|;/g,' ')].join(';')).join('\n');
  $('#cpCsv').onclick=()=>navigator.clipboard?.writeText(csv).then(()=>toast('CSV copiado'));
  box.insertAdjacentHTML('beforeend',`<h4 style="margin-top:16px">Funil (eventos neste navegador)</h4>${['pageview','quiz_done','calc_open','form_start','lead'].map(k=>{const n=DB.get('events',[]).filter(e=>e.ev===k).length;return row(k,n)}).join('')}`)};

/* Integração com troca de idioma */
const _al=window.applyLang;window.applyLang=function(l){_al(l);applyY();renderHelp();subLabels();renderGlos();renderFaq()};
applyY();renderHelp();subLabels();renderConta();renderForum();calcAll();
if(DB.get('lastCalc'))openCalc(DB.get('lastCalc'));
})();
