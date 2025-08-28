/* ai_bhai_congratulations_popup.js
   AI Bhai — Congrats/Announcement Popup (sticky + accent gradient support)
   v1.5  |  Author: Deepak × AI Bhai
*/
(function(global){
  function normalizeAccent(accent){
    // accent: string color OR array of colors (→ gradient)
    if (Array.isArray(accent) && accent.length >= 2){
      return { type:'gradient', css:`linear-gradient(90deg, ${accent.join(',')})` };
    }
    if (typeof accent === 'string' && accent.trim()){
      return { type:'color', css:accent.trim() };
    }
    // default rainbow
    const rainbow = ['#ff0000','#ff7f00','#ffff00','#00ff00','#0000ff','#4b0082','#8f00ff'];
    return { type:'gradient', css:`linear-gradient(90deg, ${rainbow.join(',')})` };
  }

  function injectCSS(){
    if (document.getElementById('aibhai-popup-styles')) return;
    const css = `
    .ab-btn{
      position:fixed; z-index:99999; width:56px; height:56px;
      border-radius:50%; cursor:pointer; display:grid; place-items:center;
      box-shadow:0 6px 18px rgba(0,0,0,.28);
    }
    .ab-btn-ring{
      position:absolute; inset:0; border-radius:50%;
      padding:2px; /* gradient border via background + inner circle */
      background: var(--ab-accent, #2dd4bf);
      -webkit-mask:
        radial-gradient(#000 68%, transparent 69%) content-box,
        radial-gradient(#000 70%, transparent 71%);
      -webkit-mask-composite: destination-out;
              mask-composite: exclude;
    }
    .ab-btn-inner{
      width:100%; height:100%; border-radius:50%;
      background:#0b1220; display:grid; place-items:center; overflow:hidden;
    }
    .ab-btn-inner img{ width:70%; height:70%; object-fit:contain; filter:none; }

    .ab-card-wrap{ position:fixed; z-index:99998; inset:0; display:none; }
    .ab-backdrop{ position:absolute; inset:0; background:rgba(3,7,18,.55); backdrop-filter: blur(2px); }
    .ab-card{
      position:absolute; max-width:360px; width:calc(100% - 24px);
      background:#0f172a; color:#e6edf7; border-radius:14px; 
      border:1px solid rgba(148,163,184,.2); box-shadow:0 12px 40px rgba(0,0,0,.35);
      overflow:hidden;
    }
    .ab-head{
      display:flex; align-items:center; gap:10px; padding:12px;
      border-bottom:1px solid rgba(148,163,184,.1);
      position:relative;
    }
    .ab-head::after{
      content:''; position:absolute; left:0; right:0; bottom:0; height:3px;
      background: var(--ab-accent, #2dd4bf);
    }
    .ab-ava{ width:34px; height:34px; border-radius:50%; overflow:hidden; background:#0b1220; border:1px solid rgba(148,163,184,.25); }
    .ab-ava img{ width:100%; height:100%; object-fit:cover; }
    .ab-title{ font-weight:800; font-size:16px; line-height:1.2; }
    .ab-typing .ab-title::after{
      content:'▌'; margin-left:4px; animation:abblink 1s steps(1) infinite; opacity:.8;
    }
    @keyframes abblink{ 50%{opacity:0} }

    .ab-close{ margin-left:auto; background:transparent; border:0; color:#93a4b8; font-size:18px; cursor:pointer }
    .ab-body{ padding:12px; font-size:14px; color:#cbd5e1 }
    .ab-body p{ margin:0 0 8px 0 }
    .ab-media{ display:flex; gap:8px; flex-wrap:wrap; margin-top:6px }
    .ab-media img{ max-width:100%; border-radius:10px; border:1px solid rgba(148,163,184,.2) }

    .ab-ctas{ display:flex; gap:8px; flex-wrap:wrap; padding:12px; border-top:1px dashed rgba(148,163,184,.18) }
    .ab-cta{
      border-radius:999px; padding:8px 12px; border:1px solid rgba(148,163,184,.35);
      background:#0b1220; color:#e6edf7; font-weight:700; font-size:13px; text-decoration:none;
    }
    .ab-footer{ padding:10px 12px; font-size:12px; color:#93a4b8; border-top:1px solid rgba(148,163,184,.1) }

    @media (prefers-reduced-motion:no-preference) {
      .ab-card{ transform: translateY(8px); opacity:0; transition:.28s ease }
      .ab-card.show{ transform: translateY(0); opacity:1 }
      .ab-btn{ transition: transform .16s ease }
      .ab-btn:active{ transform: scale(.96) }
    }
    `;
    const st = document.createElement('style');
    st.id = 'aibhai-popup-styles';
    st.textContent = css;
    document.head.appendChild(st);
  }

  function placeButton(btn, position, offset){
    const off = offset || '16px';
    btn.style[ position.includes('t') ? 'top':'bottom' ] = off;
    btn.style[ position.includes('l') ? 'left':'right' ] = off;
  }

  async function fetchJSON(url){
    try{
      const r = await fetch(url, {cache:'no-store'});
      const j = await r.json();
      return j && j.ok ? j.data || j : null;
    }catch(e){ return null; }
  }

  function renderCard(data, opts, accentCSS){
    const wrap = document.createElement('div');
    wrap.className = 'ab-card-wrap';

    const backdrop = document.createElement('div');
    backdrop.className = 'ab-backdrop';

    const card = document.createElement('div');
    card.className = 'ab-card';
    // position near button corner
    const pos = (opts.position||'tr');
    const off = opts.offset || '16px';
    if (pos === 'tr'){ card.style.top = off; card.style.right = off; }
    if (pos === 'br'){ card.style.bottom = off; card.style.right = off; }
    if (pos === 'tl'){ card.style.top = off; card.style.left  = off; }
    if (pos === 'bl'){ card.style.bottom = off; card.style.left  = off; }

    card.style.setProperty('--ab-accent', accentCSS);

    // HEAD
    const head = document.createElement('div');
    head.className = 'ab-head' + (data.typingTitle ? ' ab-typing' : '');
    const ava = document.createElement('div'); ava.className = 'ab-ava';
    ava.innerHTML = `<img src="${opts.avatarUrl||''}" alt="AI Bhai">`;
    const title = document.createElement('div'); title.className='ab-title';
    title.textContent = data.title || 'AI Bhai';
    const close = document.createElement('button'); close.className='ab-close'; close.innerHTML='✕';

    head.appendChild(ava); head.appendChild(title); head.appendChild(close);

    // BODY
    const body = document.createElement('div'); body.className='ab-body';
    const safeHtml = (data.textHtml || '').toString();
    body.innerHTML = safeHtml;

    // MEDIA
    const mediaWrap = document.createElement('div'); mediaWrap.className='ab-media';
    (data.media||[]).forEach(m=>{
      if(!m.url) return;
      const im = document.createElement('img');
      im.src = m.url; im.alt = m.type||'media';
      mediaWrap.appendChild(im);
    });
    if ((data.media||[]).length) body.appendChild(mediaWrap);

    // CTAs (multiple or single)
    const ctas = document.createElement('div'); ctas.className='ab-ctas';
    const list = Array.isArray(data.ctas) ? data.ctas : (data.cta ? [data.cta] : []);
    list.forEach(c=>{
      if(!c || !c.href) return;
      const a = document.createElement('a');
      a.className='ab-cta'; a.href=c.href; a.target='_blank'; a.rel='noopener';
      a.textContent = c.label || 'Open';
      ctas.appendChild(a);
    });

    // FOOTER
    const foot = document.createElement('div'); foot.className='ab-footer';
    foot.textContent = data.footer || (data.nameTag || '');

    card.appendChild(head);
    card.appendChild(body);
    if (ctas.childElementCount) card.appendChild(ctas);
    if ((foot.textContent||'').trim()) card.appendChild(foot);

    wrap.appendChild(backdrop); wrap.appendChild(card);

    // events
    function closeAll(){
      wrap.style.display='none';
      card.classList.remove('show');
    }
    backdrop.addEventListener('click', closeAll);
    close.addEventListener('click', closeAll);

    document.body.appendChild(wrap);
    // show with animation
    wrap.style.display='block';
    requestAnimationFrame(()=> card.classList.add('show'));
    return wrap;
  }

  function createButton(opts, accentCSS){
    const btn = document.createElement('div');
    btn.className = 'ab-btn';
    btn.style.setProperty('--ab-accent', accentCSS);

    const ring = document.createElement('div'); ring.className='ab-btn-ring';
    // gradient or color background for ring
    ring.style.background = accentCSS;

    const inner = document.createElement('div'); inner.className='ab-btn-inner';
    inner.innerHTML = `<img src="${opts.avatarUrl||''}" alt="AI Bhai">`;

    btn.appendChild(ring); btn.appendChild(inner);
    placeButton(btn, (opts.position||'tr'), (opts.offset||'16px'));
    document.body.appendChild(btn);
    return btn;
  }

  function allowedAudience(data, isLoggedIn){
    const a = (data.audience || 'all');
    if (a === 'all') return true;
    if (a === 'new') return !isLoggedIn;
    if (a === 'loggedin') return !!isLoggedIn;
    return true;
  }

  // ================= PUBLIC API =================
  async function AIBhaiPopup(userOpts){
    injectCSS();

    const opts = Object.assign({
      avatarUrl:'',
      dataUrl:'',
      position:'tr',  // tr/br/tl/bl
      offset:'16px',
      accent: ['#ff0000','#ff7f00','#ffff00','#00ff00','#0000ff','#4b0082','#8f00ff'], // default rainbow
      pollSec: 60
    }, userOpts||{});

    const acc = normalizeAccent(opts.accent);
    const accentCSS = acc.css;

    // floating sticky button
    const btn = createButton(opts, accentCSS);

    // state
    let current = null;
    let cardWrap = null;

    async function openNow(){
      if (!opts.dataUrl) return;

      const data = await fetchJSON(opts.dataUrl);
      if (!data || data.enabled === false) return;

      const isLoggedIn = !!(localStorage.getItem('my_email') || localStorage.getItem('email'));
      if (!allowedAudience(data, isLoggedIn)) return;

      // avoid re-render if unchanged
      const keyNow = JSON.stringify(data);
      if (current && current === keyNow){
        // just toggle open
        if (cardWrap && cardWrap.style.display !== 'block'){
          cardWrap.style.display='block';
          const card = cardWrap.querySelector('.ab-card');
          requestAnimationFrame(()=> card.classList.add('show'));
        }
        return;
      }
      current = keyNow;

      // dispose previous
      if (cardWrap && cardWrap.parentNode) cardWrap.parentNode.removeChild(cardWrap);
      cardWrap = renderCard(data, opts, accentCSS);
    }

    btn.addEventListener('click', openNow);

    // initial silent fetch (doesn't open automatically)
    fetchJSON(opts.dataUrl).then(d=>{
      if (!d) return;
      current = JSON.stringify(d);
    });

    // polling (optional)
    const poll = Math.max(0, Number(opts.pollSec||0));
    if (poll > 0){
      setInterval(async ()=>{
        const d = await fetchJSON(opts.dataUrl);
        if (!d || d.enabled === false) return;
        const nextKey = JSON.stringify(d);
        if (current !== nextKey){
          current = nextKey;
          // if open, recreate; if closed, wait for click
          if (cardWrap && cardWrap.style.display==='block'){
            if (cardWrap.parentNode) cardWrap.parentNode.removeChild(cardWrap);
            cardWrap = renderCard(d, opts, accentCSS);
          }
        }
      }, poll*1000);
    }

    return {
      open: openNow
    };
  }

  // expose
  global.AIBhaiPopup = AIBhaiPopup;

})(window);
