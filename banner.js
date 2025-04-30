<script>
  let current = 0;
  const images = document.querySelectorAll('.fade-img');

  setTimeout(() => {
    setInterval(() => {
      images[current].classList.remove('active');
      current = (current + 1) % images.length;
      images[current].classList.add('active');
    }, 4000); // हर 4 सेकंड में image बदले
  }, 100); // पहली image थोड़ी देर तक रुके
</script>
