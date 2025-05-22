
  // LIVE fetch from Google Script
  fetch("https://script.google.com/macros/s/AKfycbz3BCbR6nulRgsJEP8AG3WPmaVn-bVGsiLRhedTM4Z_WlIB7aeMKISAmdqX3j_HsuJQ/exec")
    .then(res => res.json())
    .then(data => {
      document.getElementById("popupContent").innerHTML = `
  <p><strong>📌 Title</strong><br>${data.title}</p>
  <p><strong>📩 Message</strong><br>${data.notificationMsg}</p>
  <p><strong>🚨 Alert</strong><br>${data.alertMsg}</p>
  <p><strong>🎁 Bonus</strong><br>${data.bonusMsg}</p>
  <p><strong>🖋️ Signature</strong><br>${data.signature}</p>
  <p><strong>🔑 Code</strong><br><span class="highlight-code">${data.todayCode}</span></p>
  <div class="btn-container">
    <a href="welcome_notification.html" target="_blank" class="code-button">🌸 Get Bonus 🌸</a>
  </div>
  <p><strong>🏆 Winner</strong><br>${data.winnerName}</p>
  <p><strong>💰 Prize</strong><br>${data.prize}</p>
`;

      document.getElementById("notificationPopup").style.display = "block";

      // Auto-hide after 40 seconds
      setTimeout(() => {
        document.getElementById("notificationPopup").style.display = "none";
      }, 40000);
    })
    .catch(err => console.error("Error loading notification:", err));

  function dismissPopup() {
    document.getElementById("notificationPopup").style.display = "none";
  }
