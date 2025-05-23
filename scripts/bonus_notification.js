// Set up both triggers
let timeoutId;
let scrollHandler;

function initPopup() {
  // Timeout trigger (10 seconds)
  timeoutId = setTimeout(showPopup, 10000);

  // Scroll trigger (25%)
  scrollHandler = () => {
    const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    if (scrollPercent >= 25) {
      showPopup();
    }
  };
  window.addEventListener('scroll', scrollHandler);
}

function showPopup() {
  // Clear both triggers
  clearTimeout(timeoutId);
  window.removeEventListener('scroll', scrollHandler);

  // Fetch and show popup
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
}

// Initialize the popup triggers when page loads
initPopup();

function dismissPopup() {
  document.getElementById("notificationPopup").style.display = "none";
}
