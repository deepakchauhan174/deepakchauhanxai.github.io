<!-- AI Bhai Popup 7 -->
(function () {
  const jsonURL = "https://deepakchauhanxai.xyz/logic_Ai_bhai.json";
  const avatarURL = "https://deepakchauhanxai.xyz/images/AI-bhai.png";

  const style = document.createElement("style");
  style.innerHTML = `
    .ai-chat-popup7 {
      position: fixed;
      top: 30px;
      right: 30px;
      background: linear-gradient(135deg, #f83600, #f9d423);
      color: #2b1b00;
      border-radius: 20px;
      padding: 18px;
      max-width: 340px;
      width: 90%;
      box-shadow: 0 0 25px rgba(249, 212, 35, 0.7);
      z-index: 9999;
      display: flex;
      align-items: flex-start;
      font-family: 'Segoe UI', sans-serif;
      animation: fadeInSlide 0.7s ease-out;
    }

    @keyframes fadeInSlide {
      from { transform: translateY(-60px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .ai-chat-avatar7 {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      margin-right: 14px;
      border: 2px solid #fff;
    }

    .ai-chat-content7 {
      flex: 1;
    }

    .ai-chat-title7 {
      font-weight: bold;
      color: #fff;
      margin-bottom: 6px;
      font-size: 17px;
      text-shadow: 1px 1px 2px #000;
    }

    .ai-chat-message7 {
      font-size: 15px;
      line-height: 1.6;
    }

    .ai-chat-close7 {
      margin-top: 10px;
      display: block;
      font-size: 13px;
      color: #fff;
      cursor: pointer;
      text-align: center;
      font-weight: bold;
    }

    .ai-chat-close7:hover {
      color: #000;
    }
  `;
  document.head.appendChild(style);

  const popup = document.createElement("div");
  popup.className = "ai-chat-popup7";
  popup.style.display = "none";

  popup.innerHTML = `
    <img src="${avatarURL}" class="ai-chat-avatar7" alt="AI Bhai" />
    <div class="ai-chat-content7">
      <div class="ai-chat-title7" id="chatTitle7">AI Bhai</div>
      <div class="ai-chat-message7" id="chatMessage7">Loading...</div>
      <div class="ai-chat-close7" id="chatClose7">ठीक है</div>
    </div>
  `;

  document.body.appendChild(popup);

  function typeLines(lines, el, i = 0) {
    if (i >= lines.length) return;
    let span = document.createElement("div");
    let text = "🔥 " + lines[i];
    let char = 0;
    let interval = setInterval(() => {
      span.innerHTML += text[char];
      char++;
      if (char >= text.length) {
        clearInterval(interval);
        el.appendChild(span);
        typeLines(lines, el, i + 1);
      }
    }, 35);
    if (i === 0) el.innerHTML = "";
    el.appendChild(span);
  }

  fetch(jsonURL)
    .then(res => res.json())
    .then(data => {
      const message = data[Math.floor(Math.random() * data.length)];
      document.getElementById("chatTitle7").textContent = message.title;
      const msgEl = document.getElementById("chatMessage7");
      typeLines(message.motivational || message.shayari, msgEl);

      popup.style.display = "flex";

      setTimeout(() => popup.style.display = "none", 10000);

      document.getElementById("chatClose7").onclick = () => {
        popup.style.display = "none";
      };
    })
    .catch(err => console.error("AI Bhai JSON Error", err));
})();
