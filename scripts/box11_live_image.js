fetch("https://script.google.com/macros/s/AKfycbymUjv2qf6EQt00nQivEhWJLrxUld8aQKiGZbyBoqPxCkGQMyL10D-zI6IJiX9AGc-Bdw/exec")
    .then(response => response.json())
    .then(data => {
      const imageData = data.find(row => row.title === "title1");
      if (imageData && imageData.ImageURL) {
        const box = document.getElementById("box11-image");
        if (box) {
          box.style.backgroundImage = `url('${imageData.ImageURL}')`;
          box.style.backgroundSize = "cover";
          box.style.backgroundPosition = "center";
        }
      }
    })
    .catch(error => {
      console.error("Box11 Image Load Error:", error);
    });
