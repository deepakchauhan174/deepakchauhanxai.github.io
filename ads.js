let adClickCount = 0;
const maxAdClicks = 3;

// ✅ Load Google Ads script only once
(function loadGoogleAdScript() {
  if (!document.querySelector('script[src*="pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"]')) {
    const script = document.createElement("script");
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6575643228502924";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  }
})();

// ✅ Function to create 4 ad boxes (Google will decide where to show)
function createAdBoxes() {
  for (let i = 1; i <= 4; i++) {
    const adDiv = document.createElement("div");
    adDiv.className = "ads-box auto-ad-box";
    adDiv.innerHTML = `
      <ins class="adsbygoogle"
           style="display:block; text-align:center;"
           data-ad-client="ca-pub-6575643228502924"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    `;
    document.body.appendChild(adDiv);

    // Initialize ad
    window.adsbygoogle = window.adsbygoogle || [];
    window.adsbygoogle.push({});

    // 👇 Click alert system
    adDiv.addEventListener("click", () => {
      adClickCount++;
      if (adClickCount > maxAdClicks) {
        adDiv.style.pointerEvents = "none";
        alert("⚠️ Ad par bar-bar click karna policy violation ho sakta hai!");
      }
    });
  }
}

// ✅ Wait until DOM is ready
document.addEventListener("DOMContentLoaded", createAdBoxes);
