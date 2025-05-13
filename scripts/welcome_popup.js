// Auto-show popup after splash
setTimeout(() => {
  const popup = document.getElementById("popup");
  if (popup) popup.style.display = "flex";
}, 12000); // After splash hides

// Close popup on button click
document.getElementById("closePopup").addEventListener("click", () => {
  document.getElementById("popup").style.display = "none";
});
