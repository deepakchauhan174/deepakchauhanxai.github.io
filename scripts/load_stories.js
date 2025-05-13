fetch("https://script.google.com/macros/s/AKfycbzf3TZAO2nDu_J98PahqIMNd5n_Uk57IPez1bvuuxCU51g1A-ISLQK6VglOuQG2gGwr/exec")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("stories-container");
    container.innerHTML = "";

    data.forEach(story => {
      const card = document.createElement("div");
      card.className = "story-card";
      card.innerHTML = `
        <img class="story-image" src="${story.imgUrl}" alt="Story Image">
        <h3 class="story-title">${story.storyTitle}</h3>
        <p class="story-content">${story.fullStory}</p>
        <p class="story-signature">~ ${story.signature}</p>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => {
    document.getElementById("stories-container").innerHTML = "<p style='color:red;'>Failed to load data. Please try again later.</p>";
  });
