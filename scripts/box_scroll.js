<script>
  let scrolledOnce = false;

  window.addEventListener("scroll", function () {
    const section = document.getElementById("autoScrollSection");
    const sectionPosition = section.getBoundingClientRect();

    if (!scrolledOnce && sectionPosition.top < window.innerHeight / 1.2) {
      // First scroll to right
      section.scrollBy({
        left: window.innerWidth * 0.6,
        behavior: "smooth"
      });

      scrolledOnce = true;

      // Then reverse scroll after 2 seconds
      setTimeout(() => {
        section.scrollBy({
          left: -window.innerWidth * 0.6,
          behavior: "smooth"
        });
      }, 2000); // 2 sec delay before reverse scroll
    }
  });
</script>
