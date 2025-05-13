// splash.js

// Hide splash after 4s, then show popup
setTimeout(() => {
  const splash = document.getElementById("splash-screen");
  if (splash) splash.style.display = "none";

  const popup = document.getElementById("welcome-popup");
  if (popup) popup.style.display = "block";
}, 4000);

// Auto-hide popup after 18s total
setTimeout(() => {
  const popup = document.getElementById("welcome-popup");
  if (popup) popup.style.display = "none";
}, 22000); // 4s splash + 18s popup

function dismissPopup() {
  const popup = document.getElementById("welcome-popup");
  if (popup) popup.style.display = "none";
}
