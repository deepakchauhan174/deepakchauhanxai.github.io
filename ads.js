document.addEventListener("DOMContentLoaded", function () {
  const publisherId = "ca-pub-6575643228502924";
  const clickedAds = new Set();

  setInterval(() => {
    const ads = document.querySelectorAll('ins.adsbygoogle');

    ads.forEach((ad, index) => {
      const id = `${publisherId}-${index}`;
      if (!ad.getAttribute('data-ai-bhai')) {
        ad.setAttribute('data-ai-bhai', id);

        const blocker = document.createElement("div");
        blocker.style.position = "absolute";
        blocker.style.top = 0;
        blocker.style.left = 0;
        blocker.style.width = "100%";
        blocker.style.height = "100%";
        blocker.style.zIndex = "9999";
        blocker.style.cursor = "pointer";
        blocker.style.backgroundColor = "transparent";

        blocker.addEventListener("click", () => {
          if (clickedAds.has(id)) {
            alert("⚠️ Sirf ek baar hi click allowed hai!");
            blocker.style.pointerEvents = "none";
            blocker.style.backgroundColor = "rgba(0,0,0,0.1)";
            return;
          }

          clickedAds.add(id);
          blocker.style.pointerEvents = "none";

          // Log to PHP
          fetch("https://deepakchauhanxai.xyz/adsafe-click-logger.php", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              adId: id,
              pageURL: window.location.href
            })
          }).then(res => res.json()).then(data => {
            console.log("Log status:", data.status);
          }).catch(err => {
            console.error("Log failed", err);
          });
        });

        ad.style.position = "relative";
        ad.appendChild(blocker);
      }
    });
  }, 1000);
});
