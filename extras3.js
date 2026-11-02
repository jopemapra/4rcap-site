/* Rodada 6 — compartilhamento, indicação, conteúdo navegável, privacidade e refinamentos */
(function(){
Object.assign(D,{'Compartilhar':['Share','分享'],'Copiar link':['Copy link','复制链接'],'Link copiado':['Link copied','链接已复制'],'Indique um amigo':['Refer a friend','推荐朋友'],'Esta resposta ajudou?':['Was this helpful?','这个回答有帮助吗？'],'Sim':['Yes','是'],'Não':['No','否'],'Obrigado pelo retorno!':['Thanks for the feedback!','感谢反馈！'],
 'Buscar nas dúvidas…':['Search the FAQ…','搜索常见问题…'],'Próximo guia':['Next guide','下一篇'],'Enviar por WhatsApp':['Send via WhatsApp','通过WhatsApp发送'],'Adicionar ao Google Agenda':['Add to Google Calendar','添加到谷歌日历'],'Horário de Brasília. No seu fuso:':['Brasília time. In your time zone:','巴西利亚时间。您所在时区：'],
 'Protocolo':['Reference','编号'],'Na comunidade agora':['Latest in the community','社区最新'],'Abrir calculadora relacionada':['Open related calculator','打开相关计算器'],'Limpar todos os meus dados deste navegador':['Delete all my data from this browser','清除此浏览器中的所有数据'],'Dados apagados':['Data deleted','数据已清除'],'Link da seção copiado':['Section link copied','章节链接已复制'],'Simulação compartilhada inválida':['Invalid shared simulation','分享的模拟无效']});

/* Consentimento: só registra métricas se o visitante aceitou */
const _track=window.track;window.track=function(ev,data){if(DB.get('cookie')==='essential'&&!['lead','signup','post','radar_signup','partner_lead'].includes(ev))return;_track(ev,data)};
/* Retenção: eventos com mais de 90 dias são descartados */
DB.set('events',DB.get('events',[]).filter(e=>Date.now()-e.t<90*864e5));

/* Indicação: ?ref=CODIGO ou #ref-CODIGO */
try{const r=new URLSearchParams(location.search).get('ref')||(location.hash.match(/^#ref-(\w+)$/)||[])[1];if(r)DB.set('ref',r)}catch(e){}
function myRef(){const u=me();return u?btoa(u.email).replace(/[^a-z0-9]/gi,'').slice(0,8):''}

/* Barra de compartilhar */
function renderShare(){const url=location.href.split('#')[0],t=encodeURIComponent(document.title),r=myRef();
  $('#shareBar').innerHTML=`<span>${L('Compartilhar')}:</span><a class="btn sm dark" target="_blank" rel="noopener" href="https://wa.me/?text=${t}%20${encodeURIComponent(url)}">WhatsApp</a><a class="btn sm dark" target="_blank" rel="noopener" href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}">LinkedIn</a><a class="btn sm dark" target="_blank" rel="noopener" href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}">Facebook</a><button class="btn sm dark" id="cpUrl">${L('Copiar link')}</button>${r?`<a class="btn sm" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent('Conheça este hub de leilões, tributos e gestão: '+url+'#ref-'+r)}">🎁 ${L('Indique um amigo')}</a>`:''}`;
  $('#cpUrl').onclick=()=>navigator.clipboard?.writeText(url).then(()=>toast('Link copiado'))}

/* Lead: protocolo, indicação e mensagem com protocolo */
$('#leadForm').addEventListener('submit',()=>setTimeout(()=>{const l=DB.get('leads',[]),x=l[l.length-1];if(!x||!x.form||Date.now()-x.d>3000||x.prot)return;x.prot=new Date().toISOString().slice(2,10).replace(/-/g,'')+'-'+Math.random().toString(36).slice(2,6).toUpperCase();x.ref=DB.get('ref')||'';DB.set('leads',l);
  const h=$('#modalBody h3');if(h)h.insertAdjacentHTML('afterend',`<p>${L('Protocolo')}: <b id="protN">${x.prot}</b> <button class="lnk" onclick="navigator.clipboard?.writeText('${x.prot}');toast('Copiado!')">📋</button></p>`);
  const wa=$('#modalBody .btn.wa');if(wa)wa.href+=encodeURIComponent(` (${L('Protocolo')} ${x.prot})`)},10));
/* Rascunho também guarda área e perfil */
const dr=DB.get('draft2',{});['f_area','f_perfil','f_valor','f_hora','f_orig'].forEach(id=>{const e=$('#'+id);if(dr[id])e.value=dr[id];e.addEventListener('change',()=>{dr[id]=e.value;DB.set('draft2',dr)})});
/* Contador de caracteres na mensagem */
const fm=$('#f_msg'),cc=document.createElement('div');cc.className='chars';fm.after(cc);const up=()=>cc.textContent=`${fm.value.length}/1500`;fm.addEventListener('input',up);up();
/* Erros ligados aos campos (leitores de tela) */
$$('#leadForm .err').forEach((e,i)=>{e.id='err'+i;e.setAttribute('role','alert');const inp=e.parentElement.querySelector('input,select,textarea');if(inp)inp.setAttribute('aria-describedby',e.id)});
/* Teclado numérico adequado no celular */
$$('input[type=number]').forEach(i=>i.setAttribute('inputmode',i.step&&i.step!=='1'?'decimal':'numeric'));

/* FAQ: busca e "ajudou?" */
const fl=$('#faqList');const fq=document.createElement('input');fq.id='faqQ';fq.style.margin='0 0 10px';fl.before(fq);
function faqPlus(){fq.placeholder=L('Buscar nas dúvidas…');const q=fq.value.toLowerCase();$$('#faqList details').forEach((d,i)=>{d.style.display=!q||d.textContent.toLowerCase().includes(q)?'':'none';if(!d.querySelector('.fb')){const f=document.createElement('div');f.className='fb';f.innerHTML=`${L('Esta resposta ajudou?')}<button class="lnk" data-v="1">${L('Sim')}</button><button class="lnk" data-v="0">${L('Não')}</button>`;d.append(f);f.querySelectorAll('button').forEach(b=>b.onclick=()=>{track('faq_feedback',{q:d.querySelector('summary').textContent,v:b.dataset.v});f.textContent=L('Obrigado pelo retorno!')})}})}
fq.addEventListener('input',faqPlus);const _rfq=window.renderFaq;window.renderFaq=function(){_rfq();faqPlus()};

/* Glossário: atalho para a calculadora relacionada */
const REL={'ITBI':'c1','Comissão do leiloeiro':'c1','1º e 2º leilão':'c6','Monofásico':'c2','Prescrição tributária':'c5','Holding patrimonial':'c7','ITCMD':'c7','Ponto de equilíbrio':'c3','Margem de contribuição':'c3','Fator R':'c8','Lucro Presumido':'c8','Lance condicional':'c6','Tema 69 (STF)':'c2'};
function glosPlus(){$$('#glossary div').forEach(d=>{const t=GLOS.find(g=>L(g[0])===d.querySelector('b')?.textContent);if(t&&REL[t[0]]&&!d.querySelector('.lnk')){const b=document.createElement('button');b.className='lnk';b.style.marginTop='8px';b.textContent='🧮 '+L('Abrir calculadora relacionada');b.onclick=()=>openCalc(REL[t[0]]);d.append(b)}})}
const _rg=window.renderGlos;window.renderGlos=function(){_rg();glosPlus()};

/* Guias: próximo guia e compartilhar */
document.addEventListener('click',e=>{const g=e.target.closest('[data-guide]');if(!g)return;setTimeout(()=>{const i=+g.dataset.guide,n=(i+1)%6,art=$('#modalBody .art .cta-row');if(!art||art.querySelector('.nx'))return;
  art.insertAdjacentHTML('beforeend',`<a class="btn wa" target="_blank" rel="noopener" href="https://wa.me/?text=${encodeURIComponent($('#modalBody h3').textContent+' '+location.href.split('#')[0]+'#guias')}">${L('Enviar por WhatsApp')}</a><button class="btn dark nx">${L('Próximo guia')} →</button>`);
  art.querySelector('.nx').onclick=()=>{closeModal();$(`[data-guide="${n}"]`).click()}},20)});

/* Agenda: fuso local e Google Agenda */
const ag=$('#agendaOk');new MutationObserver(()=>{const w=ag.querySelector('#agWa');if(!w||ag.querySelector('.gc'))return;const day=$('#days .on')?.dataset.day,slot=$('#slots .on')?.dataset.slot;if(!day||!slot)return;
  const st=new Date(`${day}T${slot}:00-03:00`),en=new Date(st.getTime()+30*6e4),f=d=>d.toISOString().replace(/[-:]/g,'').slice(0,15)+'Z';
  const loc=st.toLocaleString(LANG==='en'?'en-US':LANG==='zh'?'zh-CN':'pt-BR',{dateStyle:'short',timeStyle:'short'});
  w.insertAdjacentHTML('afterend',` <a class="btn dark gc" style="margin-top:10px" target="_blank" rel="noopener" href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Diagnóstico — '+CONFIG.marca)}&dates=${f(st)}/${f(en)}&details=${encodeURIComponent('Reunião online. Confirmação pelo WhatsApp.')}">📅 ${L('Adicionar ao Google Agenda')}</a><p class="micro">${L('Horário de Brasília. No seu fuso:')} ${loc}</p>`)}).observe(ag,{childList:true});

/* Feed "na comunidade agora" */
function feed(){let f=$('#feed');if(!f){f=document.createElement('div');f.id='feed';$('#hub .center').append(f)}const ps=DB.get('posts',[]).filter(p=>!p.pin).sort((a,b)=>b.d-a.d).slice(0,3);
  f.innerHTML=`<p class="micro" style="margin-top:18px">${L('Na comunidade agora')}:</p><div class="feed">${ps.map(p=>`<a href="#comunidade" data-tab="p-forum"><span>${esc(p.t)}</span><span class="tag">${L(p.c)}</span></a>`).join('')}</div>`;
  $$('#feed [data-tab]').forEach(a=>a.onclick=()=>openTab('p-forum'))}
const _rf=window.renderForum;window.renderForum=function(){_rf();feed()};

/* Link da seção ao lado dos títulos */
$$('section[id] h2').forEach(h=>{const id=h.closest('section').id;const b=document.createElement('button');b.className='anchor';b.textContent='#';b.setAttribute('aria-label','Copiar link da seção');b.onclick=()=>navigator.clipboard?.writeText(location.href.split('#')[0]+'#'+id).then(()=>toast('Link da seção copiado'));h.append(b)});
/* (re-anexa após troca de idioma) */
function anchors(){$$('section[id] h2').forEach(h=>{if(!h.querySelector('.anchor')){const id=h.closest('section').id;const b=document.createElement('button');b.className='anchor';b.textContent='#';b.setAttribute('aria-label','Copiar link da seção');b.onclick=()=>navigator.clipboard?.writeText(location.href.split('#')[0]+'#'+id).then(()=>toast('Link da seção copiado'));h.append(b)}})}

/* Widget de ajuda: fecha com Esc e clique fora */
addEventListener('keydown',e=>{if(e.key==='Escape'){$('#helpP')&&($('#helpP').hidden=true)}});
document.addEventListener('click',e=>{if(!e.target.closest('#helpW')&&$('#helpP'))$('#helpP').hidden=true});

/* CTA fixo do celular acompanha o objetivo escolhido */
function stickyGoal(){const g=DB.get('goal'),a=$('#stickyCta .btn');if(!a)return;const m={leilao:'Analisar meu leilão',trib:'Revisar meus tributos',emp:'Estruturar minha empresa'};Object.assign(D,{'Analisar meu leilão':['Analyze my auction','分析我的拍卖'],'Revisar meus tributos':['Review my taxes','审查我的税务'],'Estruturar minha empresa':['Structure my company','规划我的企业']});if(g&&m[g])a.textContent=L(m[g])}
$$('.opt[data-goal]').forEach(b=>b.addEventListener('click',()=>setTimeout(stickyGoal,10)));

/* Oferta do checklist no celular (sem "intenção de saída"): uma vez, após 60s */
if(matchMedia('(pointer:coarse)').matches)setTimeout(()=>{if(DB.get('exitShown')||$('#modal').classList.contains('on'))return;DB.set('exitShown',1);$('[data-modal=checklist]')?.click()},60000);

/* Privacidade: apagar tudo */
document.addEventListener('click',e=>{if(!e.target.closest('[data-modal=privacidade]'))return;setTimeout(()=>{const b=document.createElement('button');b.className='btn sm dark';b.style.marginTop='14px';b.textContent=L('Limpar todos os meus dados deste navegador');b.onclick=()=>{try{Object.keys(localStorage).filter(k=>k.startsWith('hub_')).forEach(k=>localStorage.removeItem(k))}catch(e){}toast('Dados apagados');setTimeout(()=>location.reload(),800)};$('#modalBody').append(b)},20)});

/* Quiz: salva o resultado na conta */
const qb=$('#quizBox');new MutationObserver(()=>{const u=me(),q=DB.get('quiz');if(u&&q&&qb.querySelector('#qre')){const k='quiz_'+u.email;if(JSON.stringify(DB.get(k))!==JSON.stringify(q))DB.set(k,q)}}).observe(qb,{childList:true});

/* Simulação compartilhada inválida */
if(/^#sim-/.test(location.hash))try{JSON.parse(decodeURIComponent(escape(atob(location.hash.slice(5)))))}catch(e){toast('Simulação compartilhada inválida')}

const _al=window.applyLang;window.applyLang=function(l){_al(l);renderShare();faqPlus();glosPlus();feed();anchors();stickyGoal()};
renderShare();faqPlus();glosPlus();feed();stickyGoal();
})();
/* Acabamento: foco acessível ao navegar por âncoras e aviso de respostas no título da aba */
(function(){
addEventListener('hashchange',()=>{const t=document.getElementById(location.hash.slice(1));if(t&&t.tagName==='SECTION'){const h=t.querySelector('h2');if(h){h.tabIndex=-1;h.focus({preventScroll:true})}}});
const base=()=>document.title.replace(/^\(\d+\) /,'');
setInterval(()=>{const n=+($('[data-t=p-forum] .notif')?.textContent||0);const b=base();document.title=n?`(${n}) ${b}`:b},3000);
})();
