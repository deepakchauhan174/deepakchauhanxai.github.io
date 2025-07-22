(function () {
  const jsonURL = "https://deepakchauhanxai.xyz/logic_Ai_bhai.json";
  const avatarURL = "https://deepakchauhanxai.xyz/images/AI-bhai.png";

  // Create style
  const style = document.createElement("style");
  style.innerHTML = `
    .ai-popup {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.95);
      background: rgba(0,0,0,0.85);
      color: #fff;
      padding: 25px 20px 30px;
      width: 90%;
      max-width: 400px;
      border-radius: 20px;
      box-shadow: 0 0 30px rgba(255,255,255,0.2);
      z-index: 9999;
      text-align: center;
      font-family: 'Segoe UI', sans-serif;
      backdrop-filter: blur(8px);
      animation: popin 0.5s ease-out forwards;
    }

    @keyframes popin {
      0% { opacity: 0; transform: translate(-50%, -60%) scale(0.8); }
      100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }

    .ai-popup img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      border: 3px solid #fff;
      margin-bottom: 15px;
      box-shadow: 0 0 10px #00f0ff;
    }

    .ai-popup h3 {
      margin: 5px 0;
      font-size: 20px;
      color: #00e5ff;
    }

    .ai-popup .motivational {
      font-size: 16px;
      margin: 10px 0;
      line-height: 1.6;
      min-height: 80px;
    }

    .ai-popup .feeling {
      font-size: 14px;
      font-style: italic;
      margin-top: 10px;
      color: #ffc107;
    }

    .ai-popup .close-btn {
      margin-top: 20px;
      background: #00e5ff;
      color: #000;
      border: none;
      padding: 10px 25px;
      border-radius: 25px;
      cursor: pointer;
      font-weight: bold;
      transition: background 0.3s;
    }

    .ai-popup .close-btn:hover {
      background: #fff;
    }
  `;
  document.head.appendChild(style);

  // Create popup container
  const popup = document.createElement("div");
  popup.className = "ai-popup";
  popup.style.display = "none";
  document.body.appendChild(popup);

  // Typing animation function
  function typeLines(lines, targetElement, index = 0) {
    if (index >= lines.length) return;
    const line = lines[index];
    const span = document.createElement("div");
    let charIndex = 0;
    const typing = setInterval(() => {
      span.innerHTML += line.charAt(charIndex);
      charIndex++;
      if (charIndex >= line.length) {
        clearInterval(typing);
        targetElement.appendChild(span);
        typeLines(lines, targetElement, index + 1);
      }
    }, 40);
    if (index === 0) targetElement.innerHTML = "";
    targetElement.appendChild(span);
  }

  // Load data and show popup
  fetch(jsonURL)
    .then(res => res.json())
    .then(data => {
      const message = data[Math.floor(Math.random() * data.length)];

      popup.innerHTML = `
        <img src="${avatarURL}" alt="AI Bhai Avatar" />
        <h3>${message.title}</h3>
        <div class="motivational" id="ai-motivational"></div>
        <div class="feeling">${message.feeling}</div>
        <button class="close-btn">ठीक है</button>
      `;

      const closeBtn = popup.querySelector(".close-btn");
      closeBtn.onclick = () => popup.style.display = "none";

      // Show popup with animation
      popup.style.display = "block";

      // Typing effect
      const lines = message.motivational.map(l => "🌟 " + l);
      typeLines(lines, document.getElementById("ai-motivational"));

      // Auto-close after 10 seconds
      setTimeout(() => {
        popup.style.display = "none";
      }, 10000);
    })
    .catch(err => {
      console.error("AI Bhai JSON fetch failed:", err);
    });
})();
