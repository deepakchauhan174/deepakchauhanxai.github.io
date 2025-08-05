let aksharMap, relatedMap, replyMap, emojiMap, romanMap;
let usedWords = [];

async function loadJSONData() {
  try {
    [aksharMap, relatedMap, replyMap, emojiMap, romanMap] = await Promise.all([
      fetch('https://deepakchauhanxai.xyz/akshar_word.json').then(res => res.json()),
      fetch('https://deepakchauhanxai.xyz/related_tags.json').then(res => res.json()),
      fetch('https://deepakchauhanxai.xyz/word_reply.json').then(res => res.json()),
      fetch('https://deepakchauhanxai.xyz/emoji_set.json').then(res => res.json()),
      fetch('https://deepakchauhanxai.xyz/roman_to_hindi.json').then(res => res.json())
    ]);
  } catch (error) {
    console.error("Data loading failed:", error);
  }
}

window.addEventListener('DOMContentLoaded', loadJSONData);

// ✅ Normalize a single word
function normalizeWord(word) {
  const w = word.toLowerCase().trim();
  return romanMap[w] || word;
}

// ✅ Normalize full message
function normalizeMessage(txt) {
  let modified = txt.toLowerCase();

  // First pass: full phrase replace (longest keys first)
  const phraseKeys = Object.keys(romanMap).sort((a, b) => b.length - a.length);

  phraseKeys.forEach(key => {
    const hindi = romanMap[key];
    const regex = new RegExp(`\\b${key}\\b`, 'gi'); // word boundary
    modified = modified.replace(regex, hindi);
  });

  return modified;
}

// ✅ Find matching akshar words
function findMatchingWords(message) {
  const words = message.split(/\s+/);
  const matches = [];

  words.forEach(word => {
    const normalized = normalizeWord(word);

    const keys = Object.keys(aksharMap).sort((a, b) => b.length - a.length);
    for (const key of keys) {
      if (normalized.startsWith(key)) {
        matches.push(...aksharMap[key].filter(w => !usedWords.includes(w)));
      }
    }
  });

  return matches;
}

function getRelatedTags(word) {
  return relatedMap[word] || [];
}

function getReplyForWord(word) {
  const replies = replyMap[word];
  return replies ? replies[Math.floor(Math.random() * replies.length)] : null;
}

function getEmojisForWord(word) {
  const emojis = emojiMap[word];
  return emojis ? emojis[Math.floor(Math.random() * emojis.length)] : "";
}

function findSmartReply(message) {
  if (!aksharMap || !relatedMap || !replyMap || !emojiMap || !romanMap) {
    return "🤖 System loading...";
  }

  const words = message.split(/\s+/);

  // ✅ First Priority: Exact word match from normalized message
  for (let word of words) {
    if (replyMap[word]) {
      usedWords.push(word);
      const reply = getReplyForWord(word);
      const emoji = getEmojisForWord(word);
      return reply ? `${reply} ${emoji}` : null;
    }
  }

  // 🔁 Fallback: Use akshar logic if no exact match
  const matches = findMatchingWords(message);
  if (matches.length === 0) return null;

  const word = matches.reduce((best, current) => {
    const bestTags = getRelatedTags(best).length;
    const currentTags = getRelatedTags(current).length;
    return currentTags > bestTags ? current : best;
  }, matches[0]);

  usedWords.push(word);
  const reply = getReplyForWord(word);
  const emoji = getEmojisForWord(word);

  return reply ? `${reply} ${emoji}` : null;
}

// ✅ Final SEND Message Handler
function sendMsg() {
  const txt = input.value.trim(); 
  if (!txt) return;

  input.value = "";
  showMsg("user", txt);
  saveChat("user", txt);

  usedWords = [];

  // 🔍 Step 1: Media JSON check
  const media = findMediaReply(txt);
  if (media) {
    showMediaBox(media.title, media.url);
    typing(media.text);
    return;
  }

  // 🔍 Step 2: Old reply
  const oldReply = findReply(txt) || "🤖 AI Bhai सोच में हैं…";
  typing(oldReply, () => {
    setTimeout(() => {
      const normalized = normalizeMessage(txt);
      const smartReply = findSmartReply(normalized);
      if (smartReply) {
        typing(smartReply);
      }
    }, 1000);
  });

  // 🔍 Step 3: Smart reply (always try)
  setTimeout(() => {
    const normalized = normalizeMessage(txt);
    const smartReply = findSmartReply(normalized);
    if (smartReply) typing(smartReply);
  }, 1200);
}

function typing(t, callback) {
  const bub = showMsg("ai", "", true); 
  let i = 0;

  (function loop() {
    if (i <= t.length) {
      bub.textContent = t.slice(0, i++);
      chatBox.scrollTop = chatBox.scrollHeight;
      setTimeout(loop, 30);
    } else {
      bub.classList.remove("typing");
      saveChat("ai", t);
      if (typeof callback === "function") callback();
    }
  })();
}

sendBtn.onclick = sendMsg;
input.addEventListener("keyup", e => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault(); 
    sendMsg();
  }
});
