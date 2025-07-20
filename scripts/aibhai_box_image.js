fetch("https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLhot5ONbatxJJ9v2w2pfc5V5xKdScdkqIF3kLkephdR5gc7McIK5-DESfrX770MNesANIAXfiE2ju9EhGjLQ9Sl4BbTZdGSqfwdjMoW_2xu5OcYefPoo3N8ZEqmeY7fE8MbOPsEncwHNlXT7EHKP2w4qjpCTGZzcneqDx4MltJyH20MGXaX_ZHj7rZT-4RLE0udYqO3RY8kAH8Z_rAaAUD2et35P7zw6pt74g5BGZNH5CoFvABO4y-4kYY4vcat1QplAiUP1RjzSKFF3YUk4mds5nLxg3Y-wUe81BeF&lib=MDyLLKrfEDnbMzE4P6YLgd1MXFqqUoLhN")
  .then((res) => res.json())
  .then((data) => {
    // 👇 Column A = title, Column B = image
    document.querySelector(".magic-title").textContent = data.title || "🔥 AI Magic Zone";
    document.querySelector(".magic-img").src = data.image || "images/ai_deepak_box.jpg";
  })
  .catch((error) => {
    console.error("Error fetching Magic Box data:", error);
  });
