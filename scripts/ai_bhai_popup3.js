(function () {
  const jsonURL = "https://deepakchauhanxai.xyz/logic_Ai_bhai.json";
  const avatarURL = "https://deepakchauhanxai.xyz/images/AI-bhai.png";

  const style = document.createElement("style");
  style.innerHTML = `
    .ai-chat-popup5 {
      position: fixed;
      bottom: 25px;
      left: 25px;
      background: linear-gradient(135deg, #c2e9fb, #a1c4fd);
      color: #003344;
      border-radius: 18px;
      padding: 16px;
      max-width: 340px;
      width: 90%;
      box-shadow: 0 0 25px rgba(161, 196, 253, 0.7);
      z-index: 9999;
      display: flex;
      align-items: flex-start;
      font-family: 'Segoe UI', sans-serif;
      animation: fadeInUp 0.6s ease-out;
    }

    @keyframes fadeInUp {
      from { transform: translateY(60px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .ai-chat-avatar5 {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 12px;
      border: 2px solid #fff;
    }

    .ai-chat-content5 {
      flex: 1;
    }

    .ai-chat-title5 {
      font-weight: bold;
      color: #005577;
      margin-bottom: 6px;
      font-size: 16px;
    }

    .ai-chat-message5 {
      font-size: 14px;
      line-height: 1.6;
    }

    .ai-chat-close5 {
      margin-top: 10px;
      display: inline-block;
      font-size: 12px;
      color: #005577;
      cursor: pointer;
    }

    .ai-chat-close5:hover {
      color: #002233;
    }
  `;
  document.head.appendChild(style);

  const popup = document.createElement("div");
  popup.className = "ai-chat-popup5";
  popup.style.display = "none";

  popup.innerHTML = `
    <img src="${avatarURL}" class="ai-chat-avatar5" alt="AI Bhai" />
    <div class="ai-chat-content5">
      <div class="ai-chat-title5" id="chatTitle5">AI Bhai</div>
      <div class="ai-chat-message5" id="chatMessage5">...</div>
      <div class="ai-chat-close5" id="chatClose5">ठीक है</div>
    </div>
  `;

  document.body.appendChild(popup);

  function typeLines(lines, el, i = 0) {
    if (i >= lines.length) return;
    let span = document.createElement("div");
    let text = "💡 " + lines[i];
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
      document.getElementById("chatTitle5").textContent = message.title;
      const msgEl = document.getElementById("chatMessage5");
      typeLines(message.motivational || message.shayari, msgEl);

      popup.style.display = "flex";

      setTimeout(() => popup.style.display = "none", 10000);

      document.getElementById("chatClose5").onclick = () => {
        popup.style.display = "none";
      };
    })
    .catch(err => console.error("AI Bhai JSON Error", err));
})();
