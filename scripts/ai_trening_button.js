let currentButton = null;
  const correctPassword = "aibhai2644@"; // Change this password

  function openPasswordModal(btn) {
    currentButton = btn;
    document.getElementById("passwordModal").style.display = "flex";
    document.getElementById("passwordInput").value = "";
    document.getElementById("passwordInput").focus();
  }

function checkPassword() {
  const input = document.getElementById("passwordInput").value;
  if (input === correctPassword) {
    document.getElementById("passwordModal").style.display = "none";
    currentButton.classList.remove("locked");
    currentButton.classList.add("unlocked");
    alert("✅ Access Granted!");

    // ✅ Redirect to the training page
    window.location.href = "ai_bhai_trening_json.html";

  } else {
    alert("❌ Incorrect Password");
  }
}

  // Close modal on outside click
  window.onclick = function(e) {
    const modal = document.getElementById("passwordModal");
    if (e.target === modal) {
      modal.style.display = "none";
    }
  };
