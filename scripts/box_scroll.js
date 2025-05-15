document.addEventListener("DOMContentLoaded", () => {
  const rows = document.querySelectorAll(".auto-scroll");

  rows.forEach(row => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Wait 3 seconds after entering view
          setTimeout(() => {
            row.scrollLeft += 150;

            // Then reverse after 1.5 seconds
            setTimeout(() => {
              row.scrollLeft -= 150;
            }, 1500);
          }, 3000); // Delay before scroll starts
        }
      });
    }, { threshold: 0.6 });

    observer.observe(row);
  });
});
