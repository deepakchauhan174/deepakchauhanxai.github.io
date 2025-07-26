let adClickCount = 0;
const maxAdClicks = 1;

(function loadGoogleAdScript() {
  if (!document.querySelector('script[src*="googlesyndication.com/pagead/js/adsbygoogle.js"]')) {
    const script = document.createElement("script");
    script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6575643228502924";
    script.async = true;
    script.crossOrigin = "anonymous";
    document.head.appendChild(script);
  }
})();

function createAutoAd() {
  const adContainer = document.createElement("div");
  adContainer.className = "ads-box";

  adContainer.innerHTML = `
    <ins class="adsbygoogle"
      style="display:block; text-align:center;"
      data-ad-client="ca-pub-6575643228502924"
      data-ad-format="auto"
      data-full-width-responsive="true"></ins>
  `;

  document.body.appendChild(adContainer);

  try {
    (adsbygoogle = window.adsbygoogle || []).push({});
  } catch (e) {
    console.error("Ad load failed:", e);
  }

  adContainer.addEventListener("click", () => {
    adClickCount++;
    if (adClickCount > maxAdClicks) {
      adContainer.style.pointerEvents = "none";

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

document.addEventListener("DOMContentLoaded", () => {
  createAutoAd();
  setTimeout(createAutoAd, 4000);
  setTimeout(createAutoAd, 8000);
  setTimeout(createAutoAd, 12000);
});
</script>
