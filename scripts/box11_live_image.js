<script>
  fetch("https://script.google.com/macros/s/AKfycbymUjv2qf6EQt00nQivEhWJLrxUld8aQKiGZbyBoqPxCkGQMyL10D-zI6IJiX9AGc-Bdw/exec")
    .then(response => response.json())
    .then(data => {
      const imageData = data.find(row => row.title === "title1");
      if (imageData && imageData.ImageURL) {
        document.getElementById("box11-image").style.backgroundImage = `url('${imageData.ImageURL}')`;
        document.getElementById("box11-image").style.backgroundSize = "cover";
        document.getElementById("box11-image").style.backgroundPosition = "center";
      }
    })
    .catch(error => {
      console.error("Box11 Image Load Error:", error);
    });
</script>