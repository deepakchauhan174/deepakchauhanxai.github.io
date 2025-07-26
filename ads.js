// ads.js

// Configuration
const maxClicksAllowed = 3;       // Maximum ad clicks allowed
const adContainerId = "myAdBox";  // ID of ad container div
let clickCount = 0;

// Inject AdSense Script
(function loadAdScript() {
  const script = document.createElement("script");
  script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6575643228502924";
  script.async = true;
  script.crossOrigin = "anonymous";
  document.head.appendChild(script);
})();

// Create Ad Box Automatically
function createAdBox() {
  const adBox = document.createElement("div");
  adBox.id = adContainerId;
  adBox.className = "ads-box";
  adBox.innerHTML = `
    <ins class="adsbygoogle"
         style="display:block; text-align:center;"
         data-ad-client="ca-pub-6575643228502924"
         data-ad-slot="1234567890"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
  `;
  document.body.insertBefore(adBox, document.body.firstChild);

  // Load ad
  window.adsbygoogle = window.adsbygoogle || [];
  window.adsbygoogle.push({});
}

// Click Protection
function setupClickProtection() {
  const adBox = document.getElementById(adContainerId);
  if (!adBox) return;

  adBox.addEventListener("click", () => {
    clickCount++;
    if (clickCount > maxClicksAllowed) {
      adBox.style.display = "none";
      alert("⚠️ ज़्यादा क्लिक करने की कोशिश मत करो। Ads बंद हो सकते हैं।");
    }
  });
}

// On DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  createAdBox();
  setTimeout(setupClickProtection, 1000); // Give time to render ads
});
