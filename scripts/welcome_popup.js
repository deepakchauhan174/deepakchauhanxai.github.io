const POPUP_KEY = "lastPopupShownTime";
const TWO_HOURS = 2 * 60 * 60 * 1000; // 2 घंटे in milliseconds

function shouldShowPopup() {
  const lastShown = localStorage.getItem(POPUP_KEY);
  if (!lastShown) return true;

  const now = Date.now();
  return now - parseInt(lastShown) > TWO_HOURS;
}

// Auto-show popup after splash
setTimeout(() => {
  if (shouldShowPopup()) {
    const popup = document.getElementById("popup");
    if (popup) popup.style.display = "flex";
    localStorage.setItem(POPUP_KEY, Date.now().toString());
  }
}, 12000); // After splash hides

// Close popup on button click
document.getElementById("closePopup").addEventListener("click", () => {
  document.getElementById("popup").style.display = "none";
});
