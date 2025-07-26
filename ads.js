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

// ✅ Create 4 auto ad boxes (No empty space if ad not shown)
function createAutoAds() {
  for (let i = 0; i < 4; i++) {
    const adContainer = document.createElement("div");
    adContainer.className = "auto-ad-wrapper";
    adContainer.style.display = "none"; // 🔒 Hide until ad is rendered

    const adIns = document.createElement("ins");
    adIns.className = "adsbygoogle";
    adIns.style.display = "block";
    adIns.style.textAlign = "center";
    adIns.setAttribute("data-ad-client", "ca-pub-6575643228502924");
    adIns.setAttribute("data-ad-format", "auto");
    adIns.setAttribute("data-full-width-responsive", "true");

    adContainer.appendChild(adIns);
    document.body.appendChild(adContainer);

    // Render ad
    try {
      (adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.warn("Ad push failed:", e);
    }

    // When user clicks ad (limit clicks)
    adContainer.addEventListener("click", () => {
      adClickCount++;
      if (adClickCount > maxAdClicks) {
        adContainer.style.pointerEvents = "none";
        alert("⚠️ बार-बार Ad पर क्लिक करना ग़लत हो सकता है।");
      }
    });

    // ✅ Reveal only if ad actually loads (no blank box)
    setTimeout(() => {
      if (adIns.offsetHeight > 0) {
        adContainer.style.display = "block";
      }
    }, 3000); // Wait a bit to see if ad appears
  }
}

document.addEventListener("DOMContentLoaded", createAutoAds);
