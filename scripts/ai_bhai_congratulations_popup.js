/*! AI Bhai Popup v1.0 — JS-only embeddable widget */
(function(window, document){
  function $(sel, root){ return (root||document).querySelector(sel); }
  function el(tag, attrs){ const e=document.createElement(tag); if(attrs) Object.assign(e, attrs); return e; }
  function css(str){ const s=el('style'); s.textContent=str; document.head.appendChild(s); return s; }
  function safeUrl(u){ try{ const x=new URL(u, location.href); return x.href; }catch(e){ return ''; } }
  function nfINR(n){ return (n||0).toLocaleString('en-IN'); }

  const BASE_CSS = `
  .aiB-fab{ position:fixed; z-index:999999; width:56px; height:56px; border-radius:50%;
    display:flex; align-items:center; justify-content:center; cursor:pointer;
    background:transparent; border:2px solid var(--ai-accent,#2dd4bf); box-shadow:0 0 0 2px rgba(45,212,191,.15) inset;
    transition:transform .15s ease, box-shadow .2s ease; overflow:hidden; backdrop-filter:saturate(120%) blur(4px)}
  .aiB-fab:hover{ transform:scale(1.05); box-shadow:0 0 0 4px rgba(45,212,191,.22) inset; }
  .aiB-fab img{ width:100%; height:100%; object-fit:cover; border-radius:50%; }
  .aiB-overlay{ position:fixed; inset:0; background:rgba(6,12,20,.6); z-index:999998; opacity:0; pointer-events:none; transition:opacity .2s }
  .aiB-overlay.aiB-show{ opacity:1; pointer-events:auto }
  .aiB-modal{ position:fixed; z-index:999999; max-width:520px; width:92vw; max-height:80vh; overflow:auto;
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
  .aiB-body{ padding:14px 16px; display:flex; flex-direction:column; gap:10px }
  .aiB-text{ line-height:1.55; color:#dbe7ff }
  .aiB-media img{ max-width:100%; border-radius:12px; border:1px solid #223154; display:block }
  .aiB-media .sticker{ width:120px; height:auto }
  .aiB-cta{ display:inline-flex; align-items:center; gap:8px; padding:10px 14px; background:var(--ai-accent,#2dd4bf); color:#08252a;
    border-radius:10px; border:0; text-decoration:none; font-weight:700; width:max-content }
  .aiB-foot{ padding:0 16px 14px 16px; color:#a6b0c3; font-size:12px }
  `;
  css(BASE_CSS);

  function typing(el, text){
    el.textContent=''; el.classList.add('aiB-typing');
    let i=0; const t=setInterval(()=>{ el.textContent = text.slice(0, ++i); if(i>=text.length){ clearInterval(t); el.classList.remove('aiB-typing'); } }, 30);
  }

  function placeFab(fab, pos){
    const map = { br:{b:'20px', r:'20px'}, bl:{b:'20px', l:'20px'}, tr:{t:'20px', r:'20px'}, tl:{t:'20px', l:'20px'} };
    const p = map[pos] || map.br;
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
    // overlay
    let ov = el('div', {className:'aiB-overlay'});
    let md = el('div', {className:'aiB-modal', style:`--ai-accent:${opts.accent}`});
    let head = el('div', {className:'aiB-head'});
    let ava = el('div', {className:'aiB-ava'});
    let avimg = el('img', {src: safeUrl(opts.avatarUrl)});
    let ttl = el('div', {className:'aiB-title'});
    let cls = el('button', {className:'aiB-close', innerHTML:'❌', title:'Close'});
    ava.appendChild(avimg); head.appendChild(ava); head.appendChild(ttl); head.appendChild(cls);

    let body = el('div', {className:'aiB-body'});
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

    if(data.cta && data.cta.href){
      const a = el('a', {className:'aiB-cta', href:safeUrl(data.cta.href), target:'_blank', rel:'noopener'});
      a.textContent = data.cta.label || 'Open';
      body.appendChild(a);
    }

    const foot = el('div', {className:'aiB-foot'});
    let tag = [];
    if(data.nameTag) tag.push(data.nameTag);
    if(data.footer) tag.push(data.footer);
    foot.textContent = tag.join(' • ');

    md.appendChild(head); md.appendChild(body); md.appendChild(foot);
    document.body.appendChild(ov); document.body.appendChild(md);

    // open anim
    setTimeout(()=>{ ov.classList.add('aiB-show'); md.classList.add('aiB-show'); }, 10);

    // title typing / normal
    const titleText = data.title || 'AI Bhai';
    if(data.typingTitle){ typing(ttl, titleText); } else { ttl.textContent = titleText; }

    function close(){ md.classList.remove('aiB-show'); ov.classList.remove('aiB-show'); setTimeout(()=>{ md.remove(); ov.remove(); }, 180); }
    cls.onclick = close; ov.onclick = close;

    return { close };
  }

  function AIBhaiPopup(opts){
    opts = Object.assign({
      avatarUrl: '',
      dataUrl: '',
      position: 'br',
      accent: '#2dd4bf',
      pollSec: 0 // 0 = no polling
    }, opts||{});

    // FAB
    const fab = el('button', {className:'aiB-fab', style:`--ai-accent:${opts.accent}`});
    const im = el('img', {src: safeUrl(opts.avatarUrl)});
    fab.appendChild(im);
    placeFab(fab, opts.position);
    document.body.appendChild(fab);

    let latestPayload = null, modalRef = null;

    async function getPayload(){
      // 1) primary dataUrl
      let data = await fetchJSON(opts.dataUrl);
      // 2) fallback: try same path but /api/broadcast.php
      if(!data){
        const guess = opts.dataUrl.replace(/broadcast\.json(\?.*)?$/,'api/broadcast.php');
        data = await fetchJSON(guess);
      }
      if(!data || data.enabled===false) return null;
      return data;
    }

    async function open(){
      const data = await getPayload();
      if(!data){ // default content
        latestPayload = { title:'AI Bhai', typingTitle:true, textHtml:'<p>Namaste! Kuch naya aane wala hai. 🚀</p>' };
      } else {
        latestPayload = data;
      }
      if(modalRef) return; // already open
      modalRef = renderModal(latestPayload, opts);
      const close = modalRef.close;
      // close handler cleanup
      const _close = ()=>{ modalRef=null; };
      const oldClose = close.bind(null);
      modalRef.close = function(){ oldClose(); _close(); };
    }

    fab.addEventListener('click', open);

    if(opts.pollSec>0){
      setInterval(async ()=>{
        const data = await getPayload();
        if(data && JSON.stringify(data)!==JSON.stringify(latestPayload)){
          latestPayload = data;
          // अगर modal खुला है तो उसे refresh कर दें: पहले बंद, फिर खोलें
          if(modalRef){ modalRef.close(); modalRef=null; open(); }
        }
      }, Math.max(10, opts.pollSec)*1000);
    }

    // expose
    return { open };
  }

  // export
  window.AIBhaiPopup = AIBhaiPopup;
})(window, document);
