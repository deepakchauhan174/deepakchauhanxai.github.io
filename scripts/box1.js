fetch("https://script.google.com/macros/s/AKfycbwLTQmHZ1W264SfhqJG3CTajCAF8E4RzLIKaQYZEDi8VFBSaT8zyRaGCDfx7A2HaSyL8A/exec")
  .then(response => response.json())
  .then(data => {
    document.getElementById("ai-dynamic-image").src = data.image;
    document.getElementById("ai-dynamic-text").textContent = data.dialogue;
  })
  .catch(error => console.error("Error loading dynamic content:", error));