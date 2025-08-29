/*! AI Bhai Popup v2 — Final */
(function(window, document){
  if(window.__AIBhaiPopup__){ window.AIBhaiPopup = window.__AIBhaiPopup__; return; }

  function $(sel, root){ return (root||document).querySelector(sel); }
  function el(tag, attrs){ const e=document.createElement(tag); if(attrs) Object.assign(e, attrs); return e; }
  function css(str){ const s=el('style'); s.textContent=str; document.head.appendChild(s); return s; }
  function safeUrl(u){ try{ return new URL(u, location.href).href; }catch(e){ return ''; } }

  const BASE_CSS = `
  .aiB-fab{ position:fixed; z-index:2147483000; width:58px; height:58px; border-radius:50%;
    display:flex; align-items:center; justify-content:center; cursor:pointer;
    background:transparent; border:2px solid var(--ai-accent,#2dd4bf);
    box-shadow:0 0 0 2px rgba(45,212,191,.18) inset; overflow:hidden;
    transition:transform .15s ease, box-shadow .2s ease; -webkit-backdrop-filter:saturate(120%) blur(4px); backdrop-filter:saturate(120%) blur(4px) }
  .aiB-fab:hover{ transform:scale(1.05); box-shadow:0 0 0 4px rgba(45,212,191,.25) inset; }
  .aiB-fab img{ width:100%; height:100%; object-fit:cover; border-radius:50%; }
  .aiB-overlay{ position:fixed; inset:0; background:rgba(6,12,20,.6); z-index:2147482998; opacity:0; pointer-events:none; transition:opacity .2s }
  .aiB-overlay.aiB-show{ opacity:1; pointer-events:auto }
  .aiB-modal{ position:fixed; z-index:2147482999; max-width:520px; width:92vw; max-height:80vh; overflow:auto;
    left:50%; top:50%; transform:translate(-50%,-44%) scale(.98); background:#101827; color:#e9edf5;
    border:1px solid #20304f; border-radius:16px; box-shadow:0 10px 40px rgba(0,0,0,.45);
    opacity:0; transition:opacity .2s, transform .2s; }
  .aiB-modal.aiB-show{ opacity:1; transform:translate(-50%,-50%) scale(1) }
  .aiB-head{ display:flex; align-items:center; gap:10px; padding:14px 16px; border-bottom:1px solid #1d2b46; position:sticky; top:0; background:#101827; z-index:2 }
  .aiB-ava{ width:36px; height:36px; border-radius:50%; overflow:hidden; border:2px solid var(--ai-accent,#2dd4bf) }
  .aiB-ava img{ width:100%; height:100%; object-fit:cover }
  .aiB-title{ font-weight:800; font-size:16px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis }
  .aiB-typing:after{ content:'|'; margin-left:2px; animation:aiB-caret 1s steps(1) infinite }
  @keyframes aiB-caret { 50%{ opacity:0 } }
  .aiB-close{ margin-left:auto; font-size:18px; background:transparent; border:0; color:#a6b0c3; cursor:pointer }
  .aiB-body{ padding:14px 16px; display:flex; flex-direction:column; gap:12px }
  .aiB-text{ line-height:1.55; color:#dbe7ff }
  .aiB-media img{ max-width:100%; border-radius:12px; border:1px solid #223154; display:block }
  .aiB-media .sticker{ width:120px; height:auto }
  .aiB-cta{ display:inline-flex; align-items:center; gap:8px; padding:10px 14px; background:var(--ai-accent,#2dd4bf);
    color:#08252a; border-radius:10px; border:0; text-decoration:none; font-weight:700; width:max-content }
  .aiB-ctas{ display:flex; gap:8px; flex-wrap:wrap }
  .aiB-foot{ padding:0 16px 14px 16px; color:#a6b0c3; font-size:12px }
  `;
  css(BASE_CSS);

  function typing(el, text){
    el.textContent=''; el.classList.add('aiB-typing');
    let i=0; const t=setInterval(()=>{ el.textContent = text.slice(0, ++i); if(i>=text.length){ clearInterval(t); el.classList.remove('aiB-typing'); } }, 30);
  }

  function placeFab(fab, pos, offset){
    const map = { br:{b:offset, r:offset}, bl:{b:offset, l:offset}, tr:{t:offset, r:offset}, tl:{t:offset, l:offset} };
    const p = map[pos] || map.tr;
    fab.style.bottom = p.b||''; fab.style.top=p.t||''; fab.style.left=p.l||''; fab.style.right=p.r||'';
  }

  async function fetchJSON(url){
    try{
      const res = await fetch(url, {cache:'no-store'});
      if(!res.ok) return null;
      return await res.json();
    }catch(e){ return null; }
  }

  function renderModal(data, opts){
    const ov = el('div', {className:'aiB-overlay'});
    const md = el('div', {className:'aiB-modal', style:`--ai-accent:${opts.accent}`});

    // head
    const head = el('div', {className:'aiB-head'});
    const ava  = el('div', {className:'aiB-ava'});
    const avim = el('img', {src:safeUrl(opts.avatarUrl)});
    const ttl  = el('div', {className:'aiB-title'});
    const cls  = el('button', {className:'aiB-close', innerHTML:'❌', title:'Close'});
    ava.appendChild(avim); head.appendChild(ava); head.appendChild(ttl); head.appendChild(cls);

    // body
    const body = el('div', {className:'aiB-body'});
    if(data.textHtml){ const t = el('div', {className:'aiB-text'}); t.innerHTML = data.textHtml; body.appendChild(t); }

    if(Array.isArray(data.media)){
      data.media.forEach(m=>{
        const u = safeUrl(m.url||''); if(!u) return;
        const wrap = el('div', {className:'aiB-media'});
        const img = el('img', {src:u, loading:'lazy'});
        if((m.type||'').toLowerCase()==='sticker'){ img.className='sticker'; }
        wrap.appendChild(img); body.appendChild(wrap);
      });
    }

    // CTAs (multi first, then legacy single)
    let hasAnyCTA = false;
    if (Array.isArray(data.ctas) && data.ctas.length){
      const wrap = el('div', {className:'aiB-ctas'});
      data.ctas.forEach(c=>{
        if(!c || !c.href) return;
        const a = el('a', {className:'aiB-cta', href:safeUrl(c.href), target:'_blank', rel:'noopener'});
        a.textContent = c.label || 'Open';
        wrap.appendChild(a);
        hasAnyCTA = true;
      });
      if(hasAnyCTA) body.appendChild(wrap);
    }
    if(!hasAnyCTA && data.cta && data.cta.href){
      const a = el('a', {className:'aiB-cta', href:safeUrl(data.cta.href), target:'_blank', rel:'noopener'});
      a.textContent = data.cta.label || 'Open';
      body.appendChild(a);
    }

    // foot
    const foot = el('div', {className:'aiB-foot'});
    const tags = [];
    if(data.nameTag) tags.push(data.nameTag);
    if(data.footer)  tags.push(data.footer);
    foot.textContent = tags.join(' • ');

    md.appendChild(head); md.appendChild(body); md.appendChild(foot);
    document.body.appendChild(ov); document.body.appendChild(md);

    // open anim
    setTimeout(()=>{ ov.classList.add('aiB-show'); md.classList.add('aiB-show'); }, 10);

    const titleText = data.title || 'AI Bhai';
    if(data.typingTitle){ typing(ttl, titleText); } else { ttl.textContent = titleText; }

    function close(){ md.classList.remove('aiB-show'); ov.classList.remove('aiB-show'); setTimeout(()=>{ md.remove(); ov.remove(); }, 180); }
    cls.onclick = close; ov.onclick = close;

    return { close };
  }

  function AIBhaiPopup(options){
    const opts = Object.assign({
      avatarUrl: '',
      dataUrl:   '',
      position:  'tr',   // tr default (top-right)
      offset:    '18px', // distance from edges
      accent:    '#2dd4bf',
      pollSec:   0       // 0 = no polling
    }, options||{});

    // FAB — fixed (scroll पर साथ रहेगा)
    const fab = el('button', {className:'aiB-fab', style:`--ai-accent:${opts.accent}`});
    const im  = el('img', {src:safeUrl(opts.avatarUrl)});
    fab.appendChild(im);
    placeFab(fab, opts.position, opts.offset);
    document.body.appendChild(fab);

    let latestPayload = null, modalRef = null;

    async function getPayload(){
      // prefer API (broadcast.php)
      let data = await fetchJSON(opts.dataUrl);
      if(data && data.ok && data.data){ data = data.data; } // handle {ok:true,data:{...}}
      if(!data) return null;
      if(data.enabled === false) return null;
      // normalize fields to avoid undefined
      data.ctas = Array.isArray(data.ctas) ? data.ctas : [];
      return data;
    }

    async function open(){
      const data = await getPayload();
      const payload = data || { title:'AI Bhai', typingTitle:true, textHtml:'<p>Namaste! Kuch naya aane wala hai. 🚀</p>', ctas:[] };
      if(modalRef) return;
      modalRef = renderModal(payload, opts);
      const oldClose = modalRef.close;
      modalRef.close = function(){ oldClose(); modalRef=null; };
    }

    fab.addEventListener('click', open);

    if(opts.pollSec>0){
      setInterval(async ()=>{
        const data = await getPayload();
        if(!data) return;
        if(JSON.stringify(data)!==JSON.stringify(latestPayload)){
          latestPayload = data;
          if(modalRef){ modalRef.close(); modalRef=null; }
        }
      }, Math.max(10, opts.pollSec)*1000);
    }

    return { open };
  }

  window.__AIBhaiPopup__ = AIBhaiPopup;
  window.AIBhaiPopup = AIBhaiPopup;
})(window, document);
