document.addEventListener("DOMContentLoaded", function () {
    const publisherId = "ca-pub-6575643228502924";
    const clickedAds = new Set();

    setInterval(() => {
      const ads = document.querySelectorAll('ins.adsbygoogle');

      ads.forEach((ad, index) => {
        const id = `${publisherId}-${index}`;

        if (!ad.getAttribute('data-ai-bhai')) {
          ad.setAttribute('data-ai-bhai', id);

          // Create blocker div
          const blocker = document.createElement("div");
          blocker.style.position = "absolute";
          blocker.style.top = 0;
          blocker.style.left = 0;
          blocker.style.width = "100%";
          blocker.style.height = "100%";
          blocker.style.zIndex = "9999";
          blocker.style.cursor = "pointer";
          blocker.style.backgroundColor = "transparent";

          // Add click handler
          blocker.addEventListener("click", (e) => {
            if (clickedAds.has(id)) {
              alert("⚠️ Sirf ek baar hi click allowed hai!");
              // Optional: grey overlay after click
              blocker.style.backgroundColor = "rgba(0,0,0,0.1)";
              blocker.style.pointerEvents = "none";
              return;
            }
            clickedAds.add(id);
            blocker.style.pointerEvents = "none";
          });

          // Make ad position relative if not already
          ad.style.position = "relative";
          ad.appendChild(blocker);
        }
      });
    }, 1000);
  });
