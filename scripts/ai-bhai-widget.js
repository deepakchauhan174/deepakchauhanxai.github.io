(function () {
  // Ultimate Configuration
  const config = {
    shayariURL: "https://script.google.com/macros/s/AKfycbyIB445yXf4SNl5fL59IlNaIbLRyftqqwGDI03IX8-skf6yDvgfJ12yP2vimr_--wt3Lg/exec",
    autoCloseTime: 60, // 60 seconds auto close
    refreshInterval: 5 // 5 minutes for new message
  };

  // AI Bhai Avatar
  const avatarUrl = "https://deepakchauhanxai.xyz/images/AI-bhai.png"; // Your AI Bhai image URL

  // Stylish Design with Typing Effect
  const style = document.createElement('style');
  style.innerHTML = `
  #ultimateAiWidget {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: linear-gradient(145deg, #1a1a2e, #16213e);
    color: white;
    font-family: 'Arial', sans-serif;
    padding: 15px;
    border-radius: 15px;
    width: 320px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.5);
    z-index: 99999;
    border: 1px solid rgba(255,255,255,0.1);
    animation: fadeIn 0.5s ease-out;
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  #aiAvatar {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
    border: 2px solid #00ffcc;
  }
  
  #aiHeader {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }
  
  #aiName {
    font-weight: bold;
    font-size: 18px;
    background: linear-gradient(90deg, #00ffcc, #0099ff);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  
  #ultimateMessages {
    height: 200px;
    overflow-y: auto;
    margin-bottom: 10px;
    padding: 5px;
  }
  
  .ai-message {
    background: rgba(0,255,204,0.1);
    padding: 10px;
    border-radius: 8px;
    margin-bottom: 10px;
    font-size: 14px;
    border-left: 3px solid #00ffcc;
    animation: messageIn 0.3s ease-out;
  }
  
  @keyframes messageIn {
    from { opacity: 0; transform: translateX(10px); }
    to { opacity: 1; transform: translateX(0); }
  }
  
  .typing {
    display: inline-block;
  }
  
  .typing span {
    height: 8px;
    width: 8px;
    background: #00ffcc;
    border-radius: 50%;
    display: inline-block;
    margin: 0 2px;
    animation: bounce 1s infinite ease-in-out;
  }
  
  .typing span:nth-child(2) {
    animation-delay: 0.2s;
  }
  
  .typing span:nth-child(3) {
    animation-delay: 0.4s;
  }
  
  @keyframes bounce {
    0%, 60%, 100% { transform: translateY(0); }
    30% { transform: translateY(-5px); }
  }
  
  #ultimateCloseBtn {
    background: linear-gradient(135deg, #ff0066, #ff00cc);
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 8px;
    cursor: pointer;
    width: 100%;
    font-weight: bold;
    transition: all 0.3s;
  }
  
  #ultimateCloseBtn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255,0,102,0.4);
  }
  `;
  document.head.appendChild(style);

  // Create Ultimate Widget
  const widget = document.createElement('div');
  widget.id = 'ultimateAiWidget';
  widget.innerHTML = `
    <div id="aiHeader">
      <img id="aiAvatar" src="${avatarUrl}" alt="AI Bhai">
      <div id="aiName">AI भाई</div>
    </div>
    <div id="ultimateMessages"></div>
    <button id="ultimateCloseBtn">Thanks (Close)</button>
  `;
  document.body.appendChild(widget);

  // Auto-close timer
  let closeTimer = setTimeout(() => {
    widget.style.animation = 'fadeIn 0.5s reverse';
    setTimeout(() => widget.remove(), 500);
  }, config.autoCloseTime * 1000);

  // Close button functionality
  document.getElementById('ultimateCloseBtn').addEventListener('click', () => {
    clearTimeout(closeTimer);
    widget.style.animation = 'fadeIn 0.5s reverse';
    setTimeout(() => widget.remove(), 500);
  });

  // Show typing indicator
  function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'ai-message typing';
    typingDiv.innerHTML = '<span></span><span></span><span></span>';
    document.getElementById('ultimateMessages').appendChild(typingDiv);
    document.getElementById('ultimateMessages').scrollTop = 
      document.getElementById('ultimateMessages').scrollHeight;
    return typingDiv;
  }

  // Show message with typing effect
  function showMessage(text) {
    return new Promise((resolve) => {
      const typing = showTyping();
      
      setTimeout(() => {
        typing.remove();
        const msgDiv = document.createElement('div');
        msgDiv.className = 'ai-message';
        msgDiv.textContent = text;
        document.getElementById('ultimateMessages').appendChild(msgDiv);
        document.getElementById('ultimateMessages').scrollTop = 
          document.getElementById('ultimateMessages').scrollHeight;
        resolve();
      }, 1500); // Typing duration
    });
  }

  // Initial messages with typing effect
  async function initMessages() {
    await showMessage("👋 नमस्ते! मैं हूँ AI भाई...");
    await showMessage("💡 आपके लिए लाया हूँ मोटिवेशनल शायरी:");
    
    fetch(config.shayariURL)
      .then(res => res.json())
      .then(async (data) => {
        const shayari = data[Math.floor(Math.random() * data.length)];
        await showMessage("📜 " + (shayari.shayari || "जिंदगी में कभी हार मत मानो!"));
      })
      .catch(async () => {
        await showMessage("🔥 हार वही मानते हैं जो लड़ना नहीं जानते!");
      });
  }

  // Auto-refresh every 5 minutes
  setInterval(() => {
    if (document.getElementById('ultimateAiWidget')) {
      fetch(config.shayariURL)
        .then(res => res.json())
        .then(async (data) => {
          const shayari = data[Math.floor(Math.random() * data.length)];
          await showMessage("💎 नई शायरी आपके लिए:");
          await showMessage("📜 " + (shayari.shayari || "मेहनत करो, कामयाबी मिलेगी!"));
        })
        .catch(async () => {
          await showMessage("⚡ आगे बढ़ते रहो, रुको मत!");
        });
    }
  }, config.refreshInterval * 60 * 1000);

  // Start the conversation
  window.addEventListener('DOMContentLoaded', () => {
    widget.style.display = 'block';
    initMessages();
  });
})();
