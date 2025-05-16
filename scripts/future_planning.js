let timer;
let popupShown = false;

window.addEventListener("scroll", () => {
  clearTimeout(timer);
  if (!popupShown) {
    timer = setTimeout(() => {
      document.getElementById("future-popup").style.display = "block";
      popupShown = true;
    }, 4000); // 4 सेकंड तक user रुका रहे
  }
});

function closePopup() {
  document.getElementById("future-popup").style.display = "none";
}

function goToFuture() {
  window.location.href = "whatsapp_work.html"; // ✅ अब यह फाइल खुलेगी
}
