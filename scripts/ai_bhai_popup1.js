(function () {
  const jsonURL = "https://deepakchauhanxai.xyz/logic_Ai_bhai.json";
  const avatarURL = "https://deepakchauhanxai.xyz/images/AI-bhai.png";

  const style = document.createElement("style");
  style.innerHTML = `
    .ai-chat-popup {
      position: fixed;
      bottom: 20px;
      left: 20px;
      background: #1f1f1f;
      color: #fff;
      border-radius: 15px;
      padding: 15px;
      max-width: 320px;
      width: 90%;
      box-shadow: 0 0 20px rgba(0,255,255,0.3);
      z-index: 9999;
      display: flex;
      align-items: flex-start;
      font-family: 'Segoe UI', sans-serif;
      animation: slideIn 0.5s ease-out;
    }

    @keyframes slideIn {
      from { transform: translateY(100px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    .ai-chat-avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 10px;
      border: 2px solid #00f0ff;
    }

    .ai-chat-content {
      flex: 1;
    }

    .ai-chat-title {
      font-weight: bold;
      color: #00e5ff;
      margin-bottom: 5px;
      font-size: 16px;
    }

    .ai-chat-message {
      font-size: 14px;
      line-height: 1.5;
    }

    .ai-chat-close {
      margin-top: 8px;
      display: inline-block;
      font-size: 12px;
      color: #aaa;
      cursor: pointer;
    }

    .ai-chat-close:hover {
      color: #fff;
    }
  `;
  document.head.appendChild(style);

  const popup = document.createElement("div");
  popup.className = "ai-chat-popup";
  popup.style.display = "none";

  popup.innerHTML = `
    <img src="${avatarURL}" class="ai-chat-avatar" alt="AI Bhai" />
    <div class="ai-chat-content">
      <div class="ai-chat-title" id="chatTitle">AI Bhai</div>
      <div class="ai-chat-message" id="chatMessage">...</div>
      <div class="ai-chat-close" id="chatClose">ठीक है</div>
    </div>
  `;

  document.body.appendChild(popup);

  function typeLines(lines, el, i = 0) {
    if (i >= lines.length) return;
    let span = document.createElement("div");
    let text = "💬 " + lines[i];
    let char = 0;
    let interval = setInterval(() => {
      span.innerHTML += text[char];
      char++;
      if (char >= text.length) {
        clearInterval(interval);
        el.appendChild(span);
        typeLines(lines, el, i + 1);
      }
    }, 40);
    if (i === 0) el.innerHTML = "";
    el.appendChild(span);
  }

  fetch(jsonURL)
    .then(res => res.json())
    .then(data => {
      const message = data[Math.floor(Math.random() * data.length)];
      document.getElementById("chatTitle").textContent = message.title;
      const msgEl = document.getElementById("chatMessage");
      typeLines(message.motivational, msgEl);

      popup.style.display = "flex";

      // auto-close after 10s
      setTimeout(() => popup.style.display = "none", 10000);

      document.getElementById("chatClose").onclick = () => {
        popup.style.display = "none";
      };
    })
    .catch(err => console.error("AI Bhai JSON Error", err));
})();
