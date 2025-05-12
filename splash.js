<script>
  // Splash screen hide script
  window.onload = function () {
    const splash = document.getElementById("splash-screen");
    if (!sessionStorage.getItem("splashDone")) {
      splash.style.display = "flex";
      document.body.style.overflow = "hidden";
      setTimeout(() => {
        splash.style.display = "none";
        document.body.style.overflow = "auto";
        sessionStorage.setItem("splashDone", "true");
      }, 1800); // 1.8 sec timing
    } else {
      splash.style.display = "none";
      document.body.style.overflow = "auto";
    }
  };
</script>