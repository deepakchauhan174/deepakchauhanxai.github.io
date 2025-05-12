window.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash-screen");
  const typedText = document.getElementById("typed-text");

  const message = "AI Bhai × Deepak Chauhan – Fusion Activated...";
  let index = 0;

  const typingEffect = setInterval(() => {
    typedText.textContent += message[index];
    index++;
    if (index === message.length) {
      clearInterval(typingEffect);
      setTimeout(() => {
        splash.style.display = "none";
        document.getElementById("welcome-popup").style.display = "block";
      }, 1500); // popup delay
    }
  }, 80);
});

function dismissPopup() {
  document.getElementById("welcome-popup").style.display = "none";
}
