document.addEventListener("DOMContentLoaded", () => {
  const row = document.querySelector(".scroll-row-1");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Instead of scrolling to Box 2, just shift row a bit then restore
        row.scrollLeft += 100;

        setTimeout(() => {
          row.scrollLeft -= 100;
        }, 800); // वापस original position पर 0.8 सेकंड में
      }
    });
  }, { threshold: 0.5 });

  if (row) {
    observer.observe(row);
  }
});
