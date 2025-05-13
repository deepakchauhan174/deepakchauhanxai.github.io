fetch("https://script.google.com/macros/s/AKfycbxIPMirk3tp92_t0RyxDviTh7xblod7hjeiUiMO4GgBAEwcoQJbJauc6RGnRXTJFqgqDQ/exec")
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById("comments-container");
    container.innerHTML = "";

    data.forEach(comment => {
      const card = document.createElement("div");
      card.className = "comment-card";
      card.innerHTML = `
        <h4 class="comment-title">${comment.title}</h4>
        <p class="comment-text">${comment.commentText}</p>
        <p class="comment-username">~ ${comment.username}</p>
      `;
      container.appendChild(card);
    });
  })
  .catch(err => {
    document.getElementById("comments-container").innerHTML = "<p style='color:red;'>Failed to load data. Please try again later.</p>";
  });
