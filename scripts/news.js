function getNewsFromPHP() {
  typing("🗞️ AI Bhai ताज़ा खबरें ला रहा है...");

  fetch("https://deepakchauhanxai.xyz/news.php")
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data) && data.length > 0) {
        let reply = "📰 *आज की बड़ी खबरें:*\n\n";
        let count = 0;

        data.forEach(item => {
          if (count >= 3) return; // सिर्फ 3 खबरें दिखाएं
          reply += `📌 *${item.title}*\n${item.desc}\n🕒 ${item.time} • 🌐 ${item.source}\n\n`;
          count++;
        });

        typing(reply.trim());
      } else {
        typing("😕 कोई खबर नहीं मिली भाई, शायद API चुप है!");
      }
    })
    .catch(err => {
      console.error("News Error:", err);
      typing("⚠️ खबर लाने में दिक्कत हो गई भाई।");
    });
}
