const messages = [
  "Welcome to Deepak Chauhan × AI Bhai dialogue",
  "Not copyright dialogue",
  "Loading magic just for you..."
];

let currentIndex = 0;
let charIndex = 0;
const typingBox = document.getElementById("typing-message");

function typeNextCharacter() {
  if (currentIndex < messages.length) {
    const currentText = messages[currentIndex];
    if (charIndex < currentText.length) {
      typingBox.innerHTML += currentText.charAt(charIndex);
      charIndex++;
      setTimeout(typeNextCharacter, 40);
    } else {
      currentIndex++;
      charIndex = 0;
      typingBox.innerHTML += "<br><br>";
      setTimeout(typeNextCharacter, 500);
    }
  }
}

typeNextCharacter();

// Hide after 10s
setTimeout(() => {
  const welcomeBox = document.getElementById("custom-welcome-box");
  if (welcomeBox) welcomeBox.style.display = "none";
}, 10000);
