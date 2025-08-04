// 📌 Media Type Detection
// ✅ STEP 1: Load JSON Data Globally
let mediaMemory = [];

fetch("https://deepakchauhanxai.xyz/media_reply.json")
  .then(res => res.json())
  .then(data => mediaMemory = data)
  .catch(() => console.warn("❌ Media JSON load fail"));


// ✅ STEP 2: Detect media category from message (still useful)
function detectMediaType(text) {
  const msg = text.toLowerCase();
  if (msg.includes("youtube")) return "youtube";
  if (msg.includes("reel") || msg.includes("instagram")) return "reel";
  if (msg.includes("image") || msg.includes("photo")) return "image";
  return null;
}


// ✅ STEP 3: Smartly fetch media content from JSON
function findMediaReply(userMsg) {
  const normMsg = userMsg.toLowerCase().trim();

  for (const media of mediaMemory) {
    if (media.user && normMsg.includes(media.user.toLowerCase())) {
      return {
        text: media.ai_bhai?.[0] || "🎥 ये रहा आपका media!",
        title: media.title?.[0] || "🎬 Tap to Watch",
        url: media.url?.[0] || "#"
      };
    }
  }
  return null;
}


// ✅ STEP 4: Show media box in chat
function showMediaBox(title, url) {
  const wrap = document.createElement("div");
  wrap.className = `message ai`;

  const bub = document.createElement("div");
  bub.className = "bubble";
  bub.innerHTML = `
    <div class="media-box">
      <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 5px;">
        <div class="media-avatar" style="background-image: url('https://deepakchauhanxai.xyz/avatar/aibhai.png');"></div>
        <strong>${title}</strong>
      </div>
      <a href="${url}" target="_blank">👉 Tap to View</a>
    </div>
  `;

  wrap.appendChild(bub);

  const ts = document.createElement("div");
  ts.className = "timestamp";
  ts.textContent = new Date().toLocaleTimeString("en-IN", {
    hour: '2-digit',
    minute: '2-digit'
  });

  wrap.appendChild(ts);
  chatBox.appendChild(wrap);
  chatBox.scrollTop = chatBox.scrollHeight;
  inc();

  // ✅ Save in history
  saveChat("ai", `[Media: ${title}](${url})`);
}

// ✅ Main usage example inside your message handler:
async function handleMediaReply(userText) {
  const type = detectMediaType(userText);
  if (type) {
    const media = await getMediaContent(type);
    typing(media.reply); // show first smart reply
    setTimeout(() => showMediaBox(media.title, media.url), 1500); // show media box after short delay
    return true;
  }
  return false;
}
