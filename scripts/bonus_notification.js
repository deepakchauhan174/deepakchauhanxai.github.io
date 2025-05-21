
  // LIVE fetch from Google Script
  fetch("https://script.google.com/macros/s/AKfycbz3BCbR6nulRgsJEP8AG3WPmaVn-bVGsiLRhedTM4Z_WlIB7aeMKISAmdqX3j_HsuJQ/exec")
    .then(res => res.json())
    .then(data => {
      document.getElementById("popupContent").innerHTML = `
        <p><strong>Title:</strong> ${data.title}</p>
        <p><strong>Message:</strong> ${data.notificationMsg}</p>
        <p><strong>Alert:</strong> ${data.alertMsg}</p>
        <p><strong>Bonus:</strong> ${data.bonusMsg}</p>
        <p><strong>Signature:</strong> ${data.signature}</p>
        <p><strong>Today Code:</strong> <span style="color:yellow; font-weight:bold;">${data.todayCode}</span></p>
        <a href="welcome_notification.html" target="_blank" class="code-button">🌸 welcome 🌸</a>
        <p><strong>Winner:</strong> ${data.winnerName}</p>
        <p><strong>Prize:</strong> ${data.prize}</p>
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
