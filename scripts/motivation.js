(function() {
  const motivationURL = "https://deepakchauhanxai.xyz/motivation.json";
  const saveMsgURL = "https://deepakchauhanxai.xyz/save_user_msg.php";
  const avatarURL = "https://deepakchauhanxai.xyz/images/AI-bhai.png";

  let userName = "Guest";
  let messages = [];
  let deviceID = localStorage.getItem("device_id") || Date.now().toString();
  localStorage.setItem("device_id", deviceID);

  // Inject CSS
  const style = document.createElement("style");
  style.innerHTML = `
    .second-bot-widget {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 320px;
      background: white;
      border-radius: 15px;
      padding: 10px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.18);
      font-family: Arial, sans-serif;
      z-index: 999999;
      color: black;
    }
    .second-bot-header {
      font-weight: bold;
      font-size: 15px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .second-bot-header .title {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .second-bot-header img.avatar {
      height: 32px;
      width: 32px;
      border-radius: 50%;
      object-fit: cover;
    }
    .second-bot-close {
      cursor: pointer;
      font-size: 16px;
      color: #666;
      padding: 4px;
      user-select: none;
    }
    .second-bot-msg {
      font-size: 14px;
      margin-bottom: 8px;
      min-height: 36px;
    }
    .second-bot-input {
      display: flex;
      gap: 6px;
    }
    .second-bot-input input {
      flex: 1;
      padding: 8px;
      border-radius: 6px;
      border: 1px solid #ddd;
      font-size: 14px;
    }
    .second-bot-input button {
      padding: 8px 10px;
      border: none;
      border-radius: 6px;
      background: #4facfe;
      color: white;
      cursor: pointer;
      font-weight: 600;
      user-select: none;
      transition: background-color 0.3s ease;
    }
    .second-bot-input button:hover:not(:disabled) {
      background: #3a99e0;
    }
    .second-bot-input button:disabled {
      background: #9ecffc;
      cursor: not-allowed;
    }
    .second-bot-open {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 999999;
      box-shadow: 0 4px 18px rgba(0,0,0,0.2);
      background: white;
      cursor: pointer;
    }
    .second-bot-open img {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      object-fit: cover;
      user-select: none;
    }
    .bot-toast {
      background: #d4edda;
      color: #155724;
      padding: 6px 10px;
      border-radius: 5px;
      font-size: 13px;
      margin-top: 6px;
      display: none;
      user-select: none;
    }
h3.note {
  color: green;
  font-weight: small;
}
  `;
  document.head.appendChild(style);

  // Widget HTML
  const widget = document.createElement("div");
  widget.className = "second-bot-widget";
  widget.innerHTML = `
    <div class="second-bot-header">
      <div class="title">
        <img class="avatar" src="${avatarURL}" alt="AI Bhai" />
        <div class="title-text">AI Bhai</div>
      </div>
      <div class="second-bot-close" title="Close">❌</div>
    </div>
    <div class="second-bot-msg">Loading...</div>
    <h3 class="note">मैसेज के साथ नाम जरूर लिखो</h3>
    <div class="second-bot-input">
<input type="text" placeholder="कुछ पूछना हो तो लिखो नाम जरूर लिखे..." />
      <button>Send</button>
    </div>
    <div class="bot-toast">✅ मैसेज भेज दिया गया!</div>
  `;
  document.body.appendChild(widget);

  // Open button (shown when minimized)
  const openBtn = document.createElement('div');
  openBtn.className = 'second-bot-open';
  openBtn.innerHTML = `<img src="${avatarURL}" alt="Open AI Bhai" title="Open AI Bhai">`;
  document.body.appendChild(openBtn);

  // Elements
  const msgBox = widget.querySelector(".second-bot-msg");
  const inputBox = widget.querySelector("input");
  const sendBtn = widget.querySelector("button");
  const closeBtn = widget.querySelector(".second-bot-close");
  const titleText = widget.querySelector(".title-text");
  const toast = widget.querySelector(".bot-toast");

  // Fixed event listeners with proper error handling
  function setupEventListeners() {
    // Close button handler
    closeBtn.onclick = function(e) {
      e.preventDefault();
      widget.style.display = 'none';
      openBtn.style.display = 'flex';
    };

    // Open button handler
    openBtn.onclick = function(e) {
      e.preventDefault();
      widget.style.display = 'block';
      openBtn.style.display = 'none';
      inputBox.focus();
    };

    // Send button handler
    sendBtn.onclick = function(e) {
      e.preventDefault();
      sendMessage();
    };

    // Enter key handler
    inputBox.onkeydown = function(e) {
      if (e.key === "Enter") {
        e.preventDefault();
        sendMessage();
      }
    };
  }

  // Initialize event listeners
  setupEventListeners();

  // Fetch motivation messages
  fetch(motivationURL)
    .then(res => res.json())
    .then(data => {
      messages = Array.isArray(data) ? data : [];
      updateMessage();
      setInterval(updateMessage, 10000);
    })
    .catch(() => {
      messages = [];
      msgBox.innerText = `नमस्ते ${userName} — कुछ पूछो!`;
    });

  function updateMessage() {
    if (messages.length === 0) {
      msgBox.innerText = `नमस्ते ${userName} — कुछ पूछो!`;
      return;
    }
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    msgBox.innerText = randomMsg.replace("{{name}}", userName);
  }

  // Send message function
  function sendMessage() {
    const text = inputBox.value.trim();
    if (!text) return;
    
    sendBtn.disabled = true;
    sendBtn.textContent = "Sending...";
    
    fetch(saveMsgURL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `name=${encodeURIComponent(userName)}&message=${encodeURIComponent(text)}&device_id=${encodeURIComponent(deviceID)}`
    })
      .then(res => res.json())
      .then(resp => {
        sendBtn.disabled = false;
        sendBtn.textContent = "Send";
        if (resp.status === "success") {
          inputBox.value = "";
          showToast();
        } else {
          alert("❌ Error: " + (resp.msg || "Unknown"));
        }
      })
      .catch(() => {
        sendBtn.disabled = false;
        sendBtn.textContent = "Send";
        alert("❌ Network error");
      });
  }

  function showToast() {
    toast.style.display = "block";
    setTimeout(() => {
      toast.style.display = "none";
    }, 2000);
  }
})();
