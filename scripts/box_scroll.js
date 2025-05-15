document.addEventListener("DOMContentLoaded", () => {
    const scrollSections = document.querySelectorAll(".auto-scroll");
    const scrolled = new Set();

    window.addEventListener("scroll", () => {
      scrollSections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (!scrolled.has(index) && rect.top < window.innerHeight * 0.8) {
          section.scrollBy({
            left: window.innerWidth * 0.6,
            behavior: "smooth"
          });

          setTimeout(() => {
            section.scrollBy({
              left: -window.innerWidth * 0.6,
              behavior: "smooth"
            });
          }, 2000);

          scrolled.add(index);
        }
      });
    });
  });
