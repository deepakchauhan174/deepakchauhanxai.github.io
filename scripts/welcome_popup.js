// Auto hide after 18 seconds
setTimeout(() => {
  const popup = document.getElementById("welcome-popup");
  if (popup) popup.style.display = "none";
}, 18000);

function dismissPopup() {
  const popup = document.getElementById("welcome-popup");
  if (popup) popup.style.display = "none";
}
