/* Envio de leads e cadastros para o Supabase (REST/PostgREST).
   Tudo continua salvo localmente; quando CONFIG.supabaseUrl e supabaseAnonKey estão preenchidos,
   cada novo registro também é enviado. Se a rede falhar, fica numa fila e é reenviado depois. */
(function(){
const ON=!!(CONFIG.supabaseUrl&&CONFIG.supabaseAnonKey);
const MAP={
 leads:{t:'leads',f:x=>({nome:x.nome,telefone:x.tel,email:x.email,area:x.area,perfil:x.perfil,mensagem:x.msg||null,valor:x.valor||null,melhor_horario:x.hora||null,origem:x.orig||null,score:x.score??null,protocolo:x.prot||null,idioma:x.lang||LANG,versao:x.mode||document.documentElement.dataset.mode,indicacao:x.ref||null,utm:x.utm||null,quiz:x.quiz||null,pagina:x.origem||location.href,faixa:x.quiz?.faixa||null,teste_ab:x.ab||null,ultimo_cta:x.cta||null,preferencia:x.pref||null,dispositivo:x.dispositivo||null,comportamento:x.comportamento||null,utm_primeiro:x.utm_primeiro||null,consentimento:x.consentimento||null,score_total:x.score_total??null})},
 news:{t:'newsletter',f:x=>({email:x.e,origem:x.origem||'rodape',temas:x.temas||null})},
 radar:{t:'radar',f:x=>({cidade:x.c,tipo:x.t,valor_min:x.min,valor_max:x.max,desconto:x.d,email:x.e})},
 partners:{t:'parceiros',f:x=>({nome:x.n,area:x.a,cidade:x.c,telefone:x.t})},
 agenda:{t:'agendamentos',f:x=>({dia:x.d,horario:x.h})},
 reviews:{t:'avaliacoes',f:x=>({nota:x.n,comentario:x.c,autoriza_publicar:!!x.pub,nome:x.u||null})}};
const QK='sbQueue';
async function send(table,row){const r=await fetch(`${CONFIG.supabaseUrl.replace(/\/$/,'')}/rest/v1/${table}`,{method:'POST',headers:{apikey:CONFIG.supabaseAnonKey,Authorization:`Bearer ${CONFIG.supabaseAnonKey}`,'Content-Type':'application/json',Prefer:'return=minimal'},body:JSON.stringify(row),keepalive:true});if(!r.ok){const e=new Error(r.status+' '+(await r.text()).slice(0,200));e.status=r.status;throw e}}
async function flush(){if(!ON||!navigator.onLine)return;const q=DB.get(QK,[]);if(!q.length)return;const rest=[];
  for(const it of q){try{await send(it.t,it.r)}catch(e){console.warn('Supabase:',e.message);const st=e.status||0;/* mantém na fila: falha de rede, erro do servidor, sem permissão ou limite; descarta dados inválidos (outros 4xx) */if(!st||st>=500||[401,403,408,429].includes(st))rest.push(it)}}
  _set(QK,rest)}
function enqueue(t,r){const q=DB.get(QK,[]);q.push({t,r,at:Date.now()});_set(QK,q.slice(-200));flush()}
/* Intercepta o salvamento local: quando a lista cresce, o item novo vai para a fila */
const _set=DB.set.bind(DB);
DB.set=function(k,v){const m=MAP[k];if(ON&&m&&Array.isArray(v)){const old=DB.get(k,[]).length;_set(k,v);
   // leads ganham campos extras logo após o envio (protocolo, UTM, score): espera 400 ms e envia a versão completa
   if(v.length>old)setTimeout(()=>{const cur=DB.get(k,[]);cur.slice(old).forEach(x=>enqueue(m.t,m.f(x)))},400);return}
  _set(k,v)};
addEventListener('online',flush);setInterval(flush,60000);flush();
window.SUPABASE_STATUS=()=>({ligado:ON,naFila:DB.get(QK,[]).length});
})();
