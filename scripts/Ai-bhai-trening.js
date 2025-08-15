(function(){
  const JSON_URL = 'https://deepakchauhanxai.xyz/ai_bhai_info.json';
  const AVATAR_URL = 'https://deepakchauhanxai.xyz/images/AI-bhai.png';
  const TYPE_SPEED = 40; // ms per character
  const GAP_DELAY = 600; // gap between paragraphs in ms
  let intervalHours = 24; // <-- yahan 12, 48 etc set kar sakte ho

  // Check if popup should show
  function shouldShowPopup(){
    const last = localStorage.getItem('aiBhaiLastShown');
    if(!last) return true;
    const diffHours = (Date.now() - parseInt(last)) / (1000*60*60);
    return diffHours >= intervalHours;
  }

  function markShown(){ localStorage.setItem('aiBhaiLastShown', Date.now()); }

  // CSS
  const css = `
  .aiBhaiPopupBack{
    position:fixed;inset:0;
    background:rgba(0,0,0,0.65);
    display:flex;align-items:center;justify-content:center;
    z-index:999999;animation:fadeIn 0.3s;
  }
  .aiBhaiPopup{
    background:#fff;border-radius:18px;width:360px;max-width:90%;
    padding:18px;overflow:hidden;position:relative;
    box-shadow:0 12px 28px rgba(0,0,0,0.3);
    transform:scale(0.9);transition:all 0.3s ease;
    font-family:sans-serif;
  }
  .aiBhaiPopup.grow{transform:scale(1);}
  .aiBhaiClose{position:absolute;top:10px;right:12px;font-size:22px;cursor:pointer;color:#555}
  .aiBhaiHeader{display:flex;align-items:center;gap:12px;margin-bottom:14px}
  .aiBhaiHeader img{width:52px;height:52px;border-radius:50%;object-fit:cover;border:2px solid #4CAF50}
  .aiBhaiTitle{font-size:17px;font-weight:bold;margin:0;color:#333}
  .aiBhaiSub{font-size:13px;margin:0;color:#666}
  .aiBhaiContent{font-size:14px;line-height:1.6;color:#222;max-height:60vh;overflow:auto}
  .aiBhaiContent p{margin:8px 0;word-break:break-word}
  .typingCursor{
    display:inline-block;width:2px;background:#555;margin-left:2px;
    animation:blink 1s infinite;
  }
  @keyframes blink{0%,50%,100%{opacity:1}25%,75%{opacity:0}}
  @keyframes fadeIn{from{opacity:0} to{opacity:1}}
  `;
  const style = document.createElement('style');
  style.innerHTML = css;
  document.head.appendChild(style);

  // Popup DOM
  function createPopup(data){
    const back = document.createElement('div'); back.className = 'aiBhaiPopupBack';
    const pop = document.createElement('div'); pop.className = 'aiBhaiPopup';

    const close = document.createElement('div'); close.className='aiBhaiClose'; close.innerHTML='&times;';
    close.onclick = ()=> back.remove();
    back.onclick = (e)=>{ if(e.target===back) back.remove(); };

    const header = document.createElement('div'); header.className='aiBhaiHeader';
    const img = document.createElement('img'); img.src=AVATAR_URL;
    const hText = document.createElement('div');
    const title = document.createElement('h2'); title.className='aiBhaiTitle'; title.textContent=data.title||'AI Bhai';
    const sub = document.createElement('p'); sub.className='aiBhaiSub'; sub.textContent=data.subtitle||'';
    hText.appendChild(title); hText.appendChild(sub);
    header.appendChild(img); header.appendChild(hText);

    const content = document.createElement('div'); content.className='aiBhaiContent';
    pop.appendChild(close); pop.appendChild(header); pop.appendChild(content);
    back.appendChild(pop); document.body.appendChild(back);

    // Typing effect
    async function typeAll(){
      await wait(200);
      pop.classList.add('grow');
      for(let para of (data.content||[])){
        await typeParagraph(content, para);
        await wait(GAP_DELAY);
      }
      markShown();
    }
    typeAll();
  }

  function wait(ms){ return new Promise(res=>setTimeout(res, ms)); }

  async function typeParagraph(container, text){
    const p = document.createElement('p'); container.appendChild(p);
    const cursor = document.createElement('span'); cursor.className='typingCursor'; p.appendChild(cursor);
    for(let ch of text){
      cursor.remove(); p.textContent += ch; p.appendChild(cursor);
      await wait(TYPE_SPEED);
    }
    cursor.remove();
  }

  // Fetch JSON
  document.addEventListener('DOMContentLoaded', ()=>{
    if(!shouldShowPopup()) return;
    fetch(JSON_URL)
      .then(r=>r.json())
      .then(data=> createPopup(data))
      .catch(err=>{
        console.error('AI Bhai popup error:', err);
        createPopup({title:'AI Bhai',subtitle:'दिल से बात करने वाला पहला भारतीय AI',content:['डेटा लोड नहीं हो सका।']});
      });
  });
})();
