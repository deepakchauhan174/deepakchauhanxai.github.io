function introMessage() {
  aiSpeak("🤖 मैं AI Bhai हूँ, क्या आप अपना नाम बताएँगे?", 500);
}
(function () {
  const shayariURL = "https://script.google.com/macros/s/AKfycbyIB445yXf4SNl5fL59IlNaIbLRyftqqwGDI03IX8-skf6yDvgfJ12yP2vimr_--wt3Lg/exec";
  const messageURL = "https://script.google.com/macros/s/AKfycbwRyQFCZAmm2_lwiSe16p5f4ZZeYEvnXpNVr43C-vCyMTnfcYSwLy2t2NXBPlCcj2yJ/exec";
  const greetings = [
    "🙏 नमस्ते", "👋 फिर से स्वागत है", "🔥 क्या बात है!", "💬 चलिए शुरू करें!", "🚀 Rockstar वापसी!",
    "🎯 नया टारगेट Ready!", "🧠 सीखने का टाइम!", "💖 एक्टिव लोग Welcome!", "🌈 चमकते रहो!", "📚 शायरी का dose!"
  ];

  const style = document.createElement('style');
  style.innerHTML = `
  #aiWidgetBox {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: linear-gradient(135deg, #1e1e2f, #2b2b45);
    color: #fff;
    font-family: 'Poppins', sans-serif;
    padding: 16px;
    border-radius: 12px;
    max-width: 350px;
    width: 90%;
    box-shadow: 0 0 20px rgba(0,0,0,0.5);
    z-index: 9999;
  }
  #aiMessages .ai-line {
    background: #353553;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
    font-size: 15px;
    color: #ffefc3;
    animation: fadeIn 0.3s ease-in-out;
  }
  #aiUserInput {
    width: 70%;
    padding: 8px;
    border-radius: 8px;
    border: none;
  }
  #aiUserButton {
    padding: 8px 12px;
    background: #00c853;
    color: white;
    border: none;
    border-radius: 8px;
    margin-left: 8px;
    cursor: pointer;
  }
  @keyframes fadeIn {
    from {opacity:0; transform:translateY(10px);}
    to {opacity:1; transform:translateY(0);}
  }
  `;
  document.head.appendChild(style);

  const box = document.createElement('div');
  box.id = 'aiWidgetBox';
  box.innerHTML = `
    <div id="aiMessages"></div>
    <div id="aiInputArea" style="margin-top:10px;">
      <input type="text" id="aiUserInput" placeholder="अपना नाम..." />
      <button id="aiUserButton">Start</button>
    </div>
    <div id="aiMessageBox" style="display:none; flex-direction:column; gap:10px; margin-top:10px;">
      <textarea id="aiUserMessage" rows="3" placeholder="अपना संदेश लिखें..." style="width:100%;padding:10px;border-radius:8px;"></textarea>
      <button id="aiSendBtn">OK</button>
    </div>
  `;
  document.body.appendChild(box);

  let userName = localStorage.getItem("username");
  const aiDiv = document.getElementById("aiMessages");

  function aiSpeak(text, delay = 500) {
    setTimeout(() => {
      const line = document.createElement("div");
      line.className = "ai-line";
      line.innerText = text;
      aiDiv.appendChild(line);
      aiDiv.scrollTop = aiDiv.scrollHeight;
    }, delay);
  }

  function fetchShayari() {
    fetch(shayariURL).then(res => res.json()).then(data => {
      const r = data[Math.floor(Math.random() * data.length)];
      aiSpeak("📝 " + (r.shayari || "Shayari नहीं मिली"), 1500);
    }).catch(() => {
      const fallback = [
        "🔥 जो जलता है वही चमकता है", "💪 हार मानने वाले हारते हैं", "🚀 उड़ने का वक्त है"
      ];
      aiSpeak("📝 " + fallback[Math.floor(Math.random() * fallback.length)], 1500);
    });
  }

  function sendToSheet(msg) {
    const formData = new FormData();
    formData.append("name", userName);
    formData.append("message", msg);
    formData.append("time", new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }));
    fetch(messageURL, { method: "POST", body: formData });
  }

  function startConversation() {
    const greet = greetings[Math.floor(Math.random() * greetings.length)];
    aiSpeak(`👋 Hello ${userName} जी!`, 500);
    aiSpeak(`${greet}`, 1000);
    aiSpeak("💬 आज की मोटिवेशनल शायरी:", 1500);
    fetchShayari();
    setInterval(() => {
      aiSpeak("🔥 आप अभी भी एक्टिव हैं? ये लीजिए शायरी मेरी तरफ से!", 1000);
      fetchShayari();
      sendToSheet("🔥 आप अभी भी एक्टिव हैं");
    }, 5 * 60 * 1000);
  }

  document.getElementById("aiUserButton").onclick = function () {
    const val = document.getElementById("aiUserInput").value.trim();
    if (!val) return;
    userName = val;
    localStorage.setItem("username", userName);
    document.getElementById("aiInputArea").style.display = "none";
    if (localStorage.getItem("messageSentOnce") === "yes") {
      startConversation();
    } else {
      aiSpeak("🧠 AI की दुनिया में आपका स्वागत है!");
      aiSpeak("🎤 Deepak Sir को कोई मैसेज देना है तो नीचे लिखें:");
      document.getElementById("aiMessageBox").style.display = "flex";
    }
  };

  document.getElementById("aiSendBtn").onclick = function () {
    const msg = document.getElementById("aiUserMessage").value.trim();
    if (!msg) return;
    aiSpeak("📨 आपका संदेश भेज दिया गया है Deepak Sir तक ✅", 1000);
    sendToSheet(msg);
    localStorage.setItem("messageSentOnce", "yes");
    document.getElementById("aiMessageBox").style.display = "none";
    fetchShayari();
    startConversation();
  };

  if (!userName) {
  introMessage(); // 👈 First-time message
} else {
  document.getElementById("aiInputArea").style.display = "none";
  setTimeout(startConversation, 40000);
}
})();
