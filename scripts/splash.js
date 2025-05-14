// splash.js

document.addEventListener("DOMContentLoaded", function () {
  const splash = document.getElementById("splash-screen");
  const popup = document.getElementById("welcome-popup");

  // Check if splash already shown
  if (!localStorage.getItem("splashShown")) {
    // Show splash
    if (splash) splash.style.display = "flex";

    // Set splash shown flag
    localStorage.setItem("splashShown", "true");

    // After 4 seconds, hide splash and show popup
    setTimeout(() => {
      if (splash) splash.style.display = "none";
      if (popup) popup.style.display = "block";
    }, 4000);

    // Auto-hide popup after 18s total
    setTimeout(() => {
      if (popup) popup.style.display = "none";
    }, 22000); // 4s splash + 18s popup
  } else {
    // If splash already shown, directly hide both
    if (splash) splash.style.display = "none";
    if (popup) popup.style.display = "none";
  }
});

// For manual dismiss
function dismissPopup() {
  const popup = document.getElementById("welcome-popup");
  if (popup) popup.style.display = "none";
}
