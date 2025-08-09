document.addEventListener("DOMContentLoaded", async function () {  
  const publisherId = "ca-pub-6575643228502924";  
  const clickedAds = new Set();  
  
  // FingerprintJS लोड (try-catch for compatibility)  
  let fingerprint = "unknown-fp";  
  try {  
    const fpLib = await import("https://cdn.jsdelivr.net/npm/@fingerprintjs/fingerprintjs@3/dist/fp.min.js");  
    const fp = await fpLib.load();  
    const result = await fp.get();  
    fingerprint = result.visitorId;  
    console.log("✅ Fingerprint loaded:", fingerprint);  
  } catch (e) {  
    console.warn("⚠️ FingerprintJS load failed, using fallback fingerprint");  
  }  
  
  // हर 5 सेकंड में ads check करो  
  setInterval(() => {  
    const ads = document.querySelectorAll('ins.adsbygoogle');  
  
    ads.forEach((ad, index) => {  
      const adId = `${publisherId}-${index}`;  
  
      if (!ad.hasAttribute('data-ai-safe')) {  
        ad.setAttribute('data-ai-safe', adId);  
  
        // Styling hata diya, bilkul default rahega  
  
        // Click handler लगाओ  
        ad.addEventListener("click", () => {  
          if (clickedAds.has(adId)) {  
            alert("⚠️ Sirf ek baar hi click allowed hai!");  
            return;  
          }  
  
          clickedAds.add(adId);  
          console.log("Ad clicked:", adId);  
  
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
          .then(res => {  
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);  
            return res.json();  
          })  
          .then(data => {  
            console.log("✅ Click logged:", data);  
          })  
          .catch(err => {  
            console.error("⚠️ Log failed:", err);  
          });  
        });  
      }  
    });  
  }, 5000);  
});
