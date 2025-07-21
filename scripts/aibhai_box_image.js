fetch("https://script.google.com/macros/s/AKfycbz-Oa2lG9-rp6xQ-FoIx-rHnUZO2bxxaKytHjN8x2dzB1G51Ktfk8sk9O1hlBGqvvrj-g/exec")
  .then((res) => res.json())
  .then((data) => {
    // 👇 Column A = title, Column B = image
    document.querySelector(".magic-title").textContent = data.title || "🔥 AI Magic Zone";
    document.querySelector(".magic-img").src = data.image || "images/ai_deepak_box.jpg";
  })
  .catch((error) => {
    console.error("Error fetching Magic Box data:", error);
  });
