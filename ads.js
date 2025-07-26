let adClickCount = 0;
const maxAdClicks = 1; // सिर्फ एक बार allow

// ✅ Google Ad Script Loader
(function loadGoogleAdScript() {
  if (!document.querySelector('script[src*="googlesyndication.com/pagead/js/adsbygoogle.js"]')) {
    const script = document.createElement("script");
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6575643228502924";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  }
})();

// ✅ Create Ad Container (no visible box until Google loads ad)
function createAutoAd() {
  const adContainer = document.createElement("div");
  adContainer.className = "ads-box auto-ad";
  adContainer.style = "margin: 10px 0;";

  adContainer.innerHTML = `
    <ins class="adsbygoogle"
      style="display:block; text-align:center;"
      data-ad-client="ca-pub-6575643228502924"
      data-ad-format="auto"
      data-full-width-responsive="true"></ins>
  `;

  document.body.appendChild(adContainer);

  // Show ad when Google loads it
  try {
    (adsbygoogle = window.adsbygoogle || []).push({});
  } catch (e) {
    console.error("Ad load failed:", e);
  }

  // ✅ Click Control
  adContainer.addEventListener("click", () => {
    adClickCount++;
    if (adClickCount > maxAdClicks) {
      adContainer.style.pointerEvents = "none";

      // Block layer on top of ad
      const layer = document.createElement("div");
      layer.style.cssText = `
        position:absolute;
        top:0; left:0; right:0; bottom:0;
        background:rgba(0,0,0,0.4);
        z-index:999;
        pointer-events:auto;
      `;
      adContainer.style.position = "relative";
      adContainer.appendChild(layer);

      alert("⚠️ Bar-bar ad click karna policy violation ho sakta hai!");
    }
  });
}

// ✅ Load ad when page is ready
document.addEventListener("DOMContentLoaded", () => {
  // You can call this multiple times if you want 2 or 3 ads spaced apart
  createAutoAd();
  setTimeout(createAutoAd, 3000); // दूसरा ad कुछ देर बाद
  setTimeout(createAutoAd, 6000); // तीसरा ad और देर से
});
