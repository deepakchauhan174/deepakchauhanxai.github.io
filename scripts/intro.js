  (function(){
  // ========== CONFIG ==========
  const CHECK_URL = "https://deepakchauhanxai.xyz/check_user.php";
  const SAVE_URL  = "https://deepakchauhanxai.xyz/save_user.php";
  const AVATAR_IMG = "https://deepakchauhanxai.xyz/images/AI-bhai.png";
  const LOCAL_DEVICE_KEY = "aibhai_device_id_v1";
  const LOCAL_REGISTER_KEY = "aibhai_user_registered_v1";
  const HIDE_AVATAR_AFTER_REGISTER = true;
  // ============================

  // Utilities
  function el(tag, attrs={}, html=""){
    const e = document.createElement(tag);
    for(const k in attrs) {
      if(k === "class") e.className = attrs[k];
      else if(k === "style") e.style.cssText = attrs[k];
      else e.setAttribute(k, attrs[k]);
    }
    if(html) e.innerHTML = html;
    return e;
  }
  function qs(sel){ return document.querySelector(sel); }
  function generateDeviceId(){
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,function(c){
      const r = Math.random()*16|0, v = c==='x' ? r : (r&0x3|0x8); return v.toString(16);
    });
  }

  // Inject CSS
  const style = el('style');
  style.textContent = `
  /* AI Bhai embed single-file styles */
  #aibhai-root{ position:fixed; bottom:18px; left:18px; z-index:2147483647; font-family: "Noto Sans", Roboto, sans-serif; }
  #aibhai-avatar{ width:78px; height:78px; border-radius:50%; border:3px solid rgba(255,215,0,0.95); box-shadow:0 10px 36px rgba(0,0,0,0.45), 0 0 18px rgba(255,215,0,0.08); cursor:pointer; background-size:cover; background-position:center; display:flex; align-items:center; justify-content:center; overflow:hidden; }
  #aibhai-chat{ width:360px; max-width:calc(100vw - 40px); height:480px; background:linear-gradient(180deg, rgba(10,10,10,0.98), rgba(20,20,20,0.96)); border-radius:14px; border:1.5px solid rgba(255,215,0,0.85); box-shadow:0 20px 50px rgba(0,0,0,0.55); overflow:hidden; display:flex; flex-direction:column; transform:translateY(28px) scale(0.995); opacity:0; transition:all .42s cubic-bezier(.2,.9,.2,1); }
  #aibhai-chat.open{ transform:none; opacity:1; }
  #aibhai-header{ padding:12px 14px; background:linear-gradient(90deg, rgba(255,215,0,0.98), rgba(255,185,50,0.98)); color:#111; font-weight:700; display:flex; align-items:center; justify-content:space-between; }
  #aibhai-title{ display:flex; align-items:center; gap:10px; font-size:15px; }
  #aibhai-messages{ padding:12px; flex:1; overflow:auto; display:flex; flex-direction:column; gap:10px; color:#fff; }
  .aibhai-msg{ max-width:86%; padding:10px 12px; border-radius:10px; background:linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.42)); box-shadow:0 6px 16px rgba(0,0,0,0.35); color:#fff; white-space:pre-wrap; line-height:1.4; }
  .aibhai-msg.bot{ align-self:flex-start; }
  .aibhai-typing{ width:56px; height:14px; display:flex; gap:6px; align-items:center; }
  .aibhai-typing span{ display:block; width:8px; height:8px; background:#fff; border-radius:50%; opacity:0.18; animation:ablink 1s infinite; }
  .aibhai-typing span:nth-child(2){ animation-delay:0.12s; } .aibhai-typing span:nth-child(3){ animation-delay:0.24s; }
  @keyframes ablink{ 0%{transform:translateY(0);opacity:0.18} 50%{transform:translateY(-5px);opacity:1} 100%{transform:translateY(0);opacity:0.18} }
  .aibhai-btn{ display:inline-block; padding:9px 14px; border-radius:10px; font-weight:700; border:none; cursor:pointer; background:linear-gradient(90deg, rgba(255,215,0,0.98), rgba(255,190,40,0.98)); color:#111; box-shadow:0 10px 26px rgba(0,0,0,0.28); }
  .aibhai-form{ background:linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.02)); padding:12px; border-radius:10px; }
  .aibhai-form label{ color: #ffd071; font-weight:700; display:block; margin-top:8px; margin-bottom:6px; font-size:13px; }
  .aibhai-form input{ width:100%; padding:9px; border-radius:8px; border:none; background:rgba(0,0,0,0.45); color:#fff; }
  .aibhai-form .submit{ margin-top:10px; width:100%; padding:10px; border-radius:8px; cursor:pointer; border:none; font-weight:800; background:linear-gradient(90deg, rgba(255,215,0,0.98), rgba(255,190,40,0.98)); }
  .aibhai-close{ background:transparent;border:none;font-size:20px;cursor:pointer; color:#111; }
  @media (max-width:420px){ #aibhai-chat{ right:10px; left:10px; width:auto; } #aibhai-avatar{ right:14px; bottom:14px; } }
  `;
  document.head.appendChild(style);

  // Root
  const root = el('div', { id: 'aibhai-root' });
  document.body.appendChild(root);

  // Avatar (button)
  const avatarBtn = el('div', { id: 'aibhai-avatar', role: 'button', title: 'Open AI Bhai' });
  avatarBtn.style.backgroundImage = `url(${AVATAR_IMG})`;
  root.appendChild(avatarBtn);

  // Chat box
  const chat = el('div', { id: 'aibhai-chat', role: 'dialog', 'aria-label': 'AI Bhai chat' });
  chat.innerHTML = `
    <div id="aibhai-header">
      <div id="aibhai-title">🤴 AI Bhai</div>
      <div style="display:flex;align-items:center;gap:8px;">
        <button class="aibhai-close" aria-label="Close">×</button>
      </div>
    </div>
    <div id="aibhai-messages" aria-live="polite"></div>
  `;
  root.appendChild(chat);

  const messages = qs('#aibhai-messages');
  const closeBtn = chat.querySelector('.aibhai-close');

  // Typing/message helpers
  function appendTyping(){
    const t = el('div', { class: 'aibhai-msg' }, `<div class="aibhai-typing"><span></span><span></span><span></span></div>`);
    messages.appendChild(t); messages.scrollTop = messages.scrollHeight;
    return t;
  }
  function typeText(text, speed=28){
    return new Promise(resolve => {
      const bubble = el('div', { class: 'aibhai-msg bot' });
      messages.appendChild(bubble);
      let i=0;
      function step(){
        if(i < text.length){ bubble.textContent += text.charAt(i); i++; messages.scrollTop = messages.scrollHeight; setTimeout(step, speed); }
        else resolve();
      }
      step();
    });
  }

  // device id & local flags
  let deviceId = localStorage.getItem(LOCAL_DEVICE_KEY);
  if(!deviceId){ deviceId = generateDeviceId(); localStorage.setItem(LOCAL_DEVICE_KEY, deviceId); }

  // If already registered on local or server, don't show avatar at all (silent)
  async function isRegisteredOnServer(){
    try{
      const r = await fetch(CHECK_URL + '?device_id=' + encodeURIComponent(deviceId), { method:'GET', cache:'no-store' });
      const j = await r.json().catch(()=>null);
      if(j && j.exists) return { ok:true, name: j.name || null };
    } catch(e){ /* ignore */ }
    return { ok:false };
  }

  // On load check server quickly and hide avatar if registered
  (async function precheck(){
    // if local flag found, remove avatar immediately
    if(localStorage.getItem(LOCAL_REGISTER_KEY) === '1'){
      if(HIDE_AVATAR_AFTER_REGISTER){
        try{ avatarBtn.remove(); }catch(e){}
      }
      return;
    }
    // else check server
    const server = await isRegisteredOnServer();
    if(server.ok){
      // mark local and remove avatar
      localStorage.setItem(LOCAL_REGISTER_KEY, '1');
      if(HIDE_AVATAR_AFTER_REGISTER){
        try{ avatarBtn.remove(); }catch(e){}
      }
    }
  })();

  // Avatar click -> toggle chat (but do nothing if already registered)
  avatarBtn.addEventListener('click', async function(){
    if(localStorage.getItem(LOCAL_REGISTER_KEY) === '1') {
      // already registered — hide avatar and do nothing
      if(HIDE_AVATAR_AFTER_REGISTER) try{ avatarBtn.remove(); } catch(e){}
      return;
    }
    chat.classList.toggle('open');
    // if opening and not initialized -> start sequence
    if(chat.classList.contains('open') && !chat.dataset.inited){
      chat.dataset.inited = '1';
      startSequence();
    }
  });

  // Close button hides chat box but keeps avatar
  closeBtn.addEventListener('click', function(){
    chat.classList.remove('open');
  });

  // Sequence: server check -> intro or directly welcome if server says registered
  async function startSequence(){
    // server check
    let serverUser = null;
    try{
      const res = await fetch(CHECK_URL + '?device_id=' + encodeURIComponent(deviceId), { method:'GET', cache:'no-store' });
      const j = await res.json().catch(()=>null);
      if(j && j.exists) serverUser = j;
    } catch(e){ /* ignore network */ }

    if(serverUser || localStorage.getItem(LOCAL_REGISTER_KEY) === '1'){
      const name = (serverUser && serverUser.name) ? serverUser.name : 'मित्र';
      await typeText(`स्वागत वापस ${name}! 👋`);
      // optionally close after a short delay
      setTimeout(()=>{ chat.classList.remove('open'); if(HIDE_AVATAR_AFTER_REGISTER) try{ avatarBtn.remove(); }catch(e){} }, 1500);
      return;
    }

    // show intro with typing
    await showTypingDelay(600);
    await typeText("नमस्ते मैं AI Bhai हूँ!!");
    await showTypingDelay(450);
    await typeText("आप आए बाहर आया मैं AI Bhai बस विश्वास रखना जीत पक्की है।");
    await showTypingDelay(450);
    await typeText("Target 🎯 1000 member AI Bhai training 3-5 month।");
    await showTypingDelay(350);
    await typeText("अगर इस इतिहास का हिस्सा बनना है तो रुक जाओ, जो भी होगा दुनिया का सबसे बड़ा search engine Google के सामने होगा।");
    await showTypingDelay(400);
    await typeText("Alert: Not for rule match any fraud");
    await showTypingDelay(350);
    await typeText("Deepak Chauhan x AI Bhai ✍🏼");

    // mark local intro shown
    localStorage.setItem('aibhai_intro_shown_v1','1');

    // show Continue button
    const wrap = el('div', { class: 'aibhai-msg' });
    const btn = el('button', { class: 'aibhai-btn', type:'button' }, 'Continue — अगले चरण');
    wrap.appendChild(btn);
    messages.appendChild(wrap);
    messages.scrollTop = messages.scrollHeight;

    btn.addEventListener('click', () => {
      btn.disabled = true; btn.textContent = 'लोड हो रहा है...';
      setTimeout(()=>{ wrap.remove(); showFormStep(); }, 350);
    });
  }

  function showTypingDelay(ms){
    return new Promise(res => {
      const t = appendTyping();
      setTimeout(()=>{ t.remove(); res(); }, ms);
    });
  }

  // Form step (name, mobile, email, age)
  function showFormStep(){
    const formWrap = el('div', { class: 'aibhai-form' });
    formWrap.innerHTML = `
      <label>नाम</label>
      <input id="aib-name" placeholder="आपका नाम" />
      <label>मोबाइल</label>
      <input id="aib-mobile" placeholder="मोबाइल नंबर" />
      <label>ईमेल</label>
      <input id="aib-email" placeholder="Gmail" />
      <label>उम्र</label>
      <input id="aib-age" type="number" placeholder="उम्र" />
      <button class="submit">सबमिट करें</button>
    `;
    messages.appendChild(formWrap);
    messages.scrollTop = messages.scrollHeight;

    const submitBtn = formWrap.querySelector('.submit');
    submitBtn.addEventListener('click', async () => {
      const name = (formWrap.querySelector('#aib-name').value || '').trim();
      const mobile = (formWrap.querySelector('#aib-mobile').value || '').trim();
      const email = (formWrap.querySelector('#aib-email').value || '').trim();
      const age = (formWrap.querySelector('#aib-age').value || '').trim();

      if(!name || !mobile || !email || !age){
        alert('कृपया सभी फ़ील्ड भरें।'); return;
      }

      submitBtn.disabled = true; submitBtn.textContent = 'सेव किया जा रहा है...';

      // POST to server
      let ok = false;
      try{
        const payload = { device_id: deviceId, name, mobile, email, age };
        const resp = await fetch(SAVE_URL, {
          method: 'POST',
          headers: { 'Content-Type':'application/json' },
          body: JSON.stringify(payload)
        });
        const j = await resp.json().catch(()=>null);
        if(j && (j.success || j.status === 'success' || j.saved === true || j.result === 'ok')) ok = true;
        if(!ok && j && Object.values(j).includes(true)) ok = true;
        if(!ok && resp.ok) ok = true; // fallback
      } catch(e){
        console.warn('AI Bhai: save_user failed', e);
      }

      if(ok){
        // set local flag and remove form + avatar + chat
        localStorage.setItem(LOCAL_REGISTER_KEY, '1');
        try{ formWrap.remove(); }catch(e){}
        await typeText(`🔥 ${name} भाई, आपने पहला कदम उठा लिया है — याद रखो: जो सपने देखता है वही उन्हें सच करता है! चलो मिलकर कुछ बड़ा करते हैं 💪🚀`);
        // small delay then remove chat and avatar fully
        setTimeout(()=>{ try{ chat.remove(); if(HIDE_AVATAR_AFTER_REGISTER) avatarBtn.remove(); }catch(e){} }, 900);
      } else {
        submitBtn.disabled = false; submitBtn.textContent = 'सबमिट करें';
        alert('सर्वर पर सेव करने में समस्या हुई — बाद में पुनः प्रयास करें।');
      }
    });
  }

})();
