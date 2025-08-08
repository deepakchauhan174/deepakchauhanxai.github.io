document.addEventListener("DOMContentLoaded", async function () {
  const publisherId = "ca-pub-6575643228502924";
  const clickedAds = new Set();

  // 🔹 FingerprintJS dynamic load
  const fpLib = await import("https://cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs@3/dist/fp.min.js");
  const fp = await fpLib.load();
  const result = await fp.get();
  const fingerprint = result.visitorId;

  console.log("✅ Fingerprint loaded:", fingerprint);

  // 🔹 Ad scan loop
  setInterval(() => {
    const ads = document.querySelectorAll('ins.adsbygoogle');

    ads.forEach((ad, index) => {
      const adId = `${publisherId}-${index}`;

      if (!ad.getAttribute('data-ai-safe')) {
        ad.setAttribute('data-ai-safe', adId);

        // 🎨 Design
        ad.style.position = "relative";
        ad.style.border = "2px dashed #FF9800";
        ad.style.borderRadius = "10px";
        ad.style.padding = "5px";
        ad.style.transition = "all 0.4s ease";
        ad.style.backgroundColor = `hsl(${Math.floor(Math.random() * 360)}, 80%, 90%)`;

        // Auto color change every 5 sec
        setInterval(() => {
          ad.style.backgroundColor = `hsl(${Math.floor(Math.random() * 360)}, 80%, 90%)`;
        }, 5000);

        // 🖱 Click handler
        ad.addEventListener("click", () => {
          if (clickedAds.has(adId)) {
            alert("⚠️ Sirf ek baar hi click allowed hai!");
            return;
          }

          clickedAds.add(adId);

          fetch("https://deepakchauhanxai.xyz/adsafe-click-logger.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              adId: adId,
              pageURL: window.location.href,
              timestamp: new Date().toISOString(),
              userAgent: navigator.userAgent,
              fingerprint: fingerprint
            })
          })
          .then(res => res.json())
          .then(data => {
            console.log("✅ Click logged:", data.status);
          })
          .catch(err => {
            console.warn("⚠️ Log failed:", err);
          });
        });
      }
    });
  }, 1500); // every 1.5 sec
});
