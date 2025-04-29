<script>
  let current = 0;
  const images = document.querySelectorAll('.fade-img');

  setInterval(() => {
    images[current].classList.remove('active');
    current = (current + 1) % images.length;
    images[current].classList.add('active');
  }, 4000); // 4 seconds per image
</script>
