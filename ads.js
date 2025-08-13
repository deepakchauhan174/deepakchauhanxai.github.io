document.addEventListener("DOMContentLoaded", () => {
  const themes = [
    "rgba(14,165,233,0.1)", // cyan
    "rgba(245,158,11,0.1)", // amber
    "rgba(167,139,250,0.1)", // violet
    "rgba(16,185,129,0.1)"  // emerald
  ];

  function wrapAd(adEl) {
    if (adEl.dataset.wrapped) return; // already wrapped
    adEl.dataset.wrapped = "true";

    const wrap = document.createElement("div");
    wrap.style.position = "relative";
    wrap.style.padding = "10px";
    wrap.style.borderRadius = "14px";
    wrap.style.boxShadow = "0 8px 24px rgba(0,0,0,0.16)";
    wrap.style.background = themes[0];
    wrap.style.margin = "16px auto";
    wrap.style.maxWidth = "100%";
    wrap.style.transition = "background 1s ease, box-shadow 0.3s ease";

    const glow = document.createElement("div");
    glow.style.position = "absolute";
    glow.style.top = "-12px";
    glow.style.left = "-12px";
    glow.style.right = "-12px";
    glow.style.bottom = "-12px";
    glow.style.borderRadius = "24px";
    glow.style.filter = "blur(20px)";
    glow.style.opacity = "0.6";
    glow.style.pointerEvents = "none";
    glow.style.background =
      "radial-gradient(circle at 30% 30%, rgba(96,165,250,0.2), transparent 60%), " +
      "radial-gradient(circle at 70% 70%, rgba(34,211,238,0.2), transparent 60%)";
    glow.style.transition = "opacity 0.3s ease";

    wrap.addEventListener("mouseenter", () => {
      glow.style.opacity = "1";
      wrap.style.boxShadow = "0 12px 28px rgba(0,0,0,0.25)";
    });
    wrap.addEventListener("mouseleave", () => {
      glow.style.opacity = "0.6";
      wrap.style.boxShadow = "0 8px 24px rgba(0,0,0,0.16)";
    });

    adEl.parentNode.insertBefore(wrap, adEl);
    wrap.appendChild(adEl);
    wrap.appendChild(glow);

    let i = 0;
    setInterval(() => {
      i = (i + 1) % themes.length;
      wrap.style.background = themes[i];
    }, 6000);
  }

  const observer = new MutationObserver(() => {
    document.querySelectorAll("ins.adsbygoogle").forEach(wrapAd);
  });

  observer.observe(document.body, { childList: true, subtree: true });

  // Also wrap any ads already present at load
  document.querySelectorAll("ins.adsbygoogle").forEach(wrapAd);
});
