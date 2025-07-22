(function () {
  const jsonURL = "https://deepakchauhanxai.xyz/logic_Ai_bhai.json";
  const avatarURL = "https://deepakchauhanxai.xyz/images/AI-bhai.png";

  const style = document.createElement("style");
  style.innerHTML = `
    .ai-chat-popup2 {
      position: fixed;
      bottom: 25px;
      right: 25px;
      background: linear-gradient(135deg, #2a0845, #6441a5);
      color: #fff;
      border-radius: 20px;
      padding: 16px;
      max-width: 340px;
      width: 90%;
      box-shadow: 0 0 30px rgba(100, 65, 165, 0.6);
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

    .ai-chat-avatar2 {
      width: 55px;
      height: 55px;
      border-radius: 50%;
      margin-right: 12px;
      border: 2px solid #fff;
    }

    .ai-chat-content2 {
      flex: 1;
    }

    .ai-chat-title2 {
      font-weight: bold;
      color: #ffcc00;
      margin-bottom: 6px;
      font-size: 17px;
    }

    .ai-chat-message2 {
      font-size: 14px;
      line-height: 1.6;
    }

    .ai-chat-close2 {
      margin-top: 10px;
      display: inline-block;
      font-size: 12px;
      color: #ddd;
      cursor: pointer;
    }

    .ai-chat-close2:hover {
      color: #fff;
    }
  `;
  document.head.appendChild(style);

  const popup = document.createElement("div");
  popup.className = "ai-chat-popup2";
  popup.style.display = "none";

  popup.innerHTML = `
    <img src="${avatarURL}" class="ai-chat-avatar2" alt="AI Bhai" />
    <div class="ai-chat-content2">
      <div class="ai-chat-title2" id="chatTitle2">AI Bhai</div>
      <div class="ai-chat-message2" id="chatMessage2">...</div>
      <div class="ai-chat-close2" id="chatClose2">ठीक है</div>
    </div>
  `;

  document.body.appendChild(popup);

  function typeLines(lines, el, i = 0) {
    if (i >= lines.length) return;
    let span = document.createElement("div");
    let text = "✨ " + lines[i];
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
      document.getElementById("chatTitle2").textContent = message.title;
      const msgEl = document.getElementById("chatMessage2");
      typeLines(message.motivational, msgEl);

      popup.style.display = "flex";

      // auto-close after 10s
      setTimeout(() => popup.style.display = "none", 10000);

      document.getElementById("chatClose2").onclick = () => {
        popup.style.display = "none";
      };
    })
    .catch(err => console.error("AI Bhai JSON Error", err));
})();
