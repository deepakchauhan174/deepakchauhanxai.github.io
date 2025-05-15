const allScrollSections = document.querySelectorAll('.auto-scroll');
  const alreadyScrolled = new Set();

  window.addEventListener("scroll", function () {
    allScrollSections.forEach((section, index) => {
      const pos = section.getBoundingClientRect();
      if (pos.top < window.innerHeight / 1.2 && !alreadyScrolled.has(index)) {
        section.scrollBy({
          left: window.innerWidth * 0.6,
          behavior: "smooth"
        });
        alreadyScrolled.add(index); // हर section पर सिर्फ एक बार
      }
    });
  });
