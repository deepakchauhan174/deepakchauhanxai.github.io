let popupShown = false;
let scrollTimer;

// 1. Daily 6 AM Check + 10sec Delay Logic
function checkPopupEligibility() {
  const now = new Date();
  const lastShownDate = localStorage.getItem('popupLastShown');
  
  // Reset at 6 AM daily
  if (now.getHours() >= 6 && lastShownDate !== now.toDateString()) {
    localStorage.removeItem('popupLastShown');
    popupShown = false;
  }
  
  return !popupShown && lastShownDate !== now.toDateString();
}

// 2. Scroll Event with 10sec Wait
window.addEventListener("scroll", () => {
  clearTimeout(scrollTimer);
  
  if (checkPopupEligibility()) {
    scrollTimer = setTimeout(() => {
      document.getElementById("future-popup").style.display = "block";
      popupShown = true;
      localStorage.setItem('popupLastShown', new Date().toDateString());
    }, 10000); // 10 SECOND DELAY ✅
  }
});

// 3. Close/Redirect Functions (Same as Before)
function closePopup() {
  document.getElementById("future-popup").style.display = "none";
}

function goToFuture() {
  window.location.href = "whatsapp_work.html";
}
