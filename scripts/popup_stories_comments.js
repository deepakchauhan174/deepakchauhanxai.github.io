// File name: popup_stories_comments.js

const storyURL = 'https://script.google.com/macros/s/AKfycbzf3TZAO2nDu_J98PahqIMNd5n_Uk57IPez1bvuuxCU51g1A-ISLQK6VglOuQG2gGwr/exec';
const commentURL = 'https://script.google.com/macros/s/AKfycbxIPMirk3tp92_t0RyxDviTh7xblod7hjeiUiMO4GgBAEwcoQJbJauc6RGnRXTJFqgqDQ/exec';

function loadPopupStories() {
  fetch(storyURL)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("popup-stories");
      container.innerHTML = ""; // clear old content
      data.filter(s => s.storyTitle && s.fullStory).slice(0, 2).forEach(story => {
        const html = `
          <div class="popup-story-block">
            <img src="${story.imgUrl}" alt="Story Image" style="width: 100%; max-width: 400px; border-radius: 10px; box-shadow: 0 0 12px #00ffc3; margin-bottom: 10px;">
            <h3>${story.storyTitle}</h3>
            <p>${story.fullStory}</p>
            <div class="signature">~ ${story.signature || 'Anonymous'}</div>
          </div>`;
        container.innerHTML += html;
      });
    })
    .catch(err => console.error("Error loading stories:", err));
}

function loadPopupComments() {
  fetch(commentURL)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("popup-comments");
      container.innerHTML = ""; // clear old content
      data.slice(0, 3).forEach(comment => {
        const html = `
          <div class="popup-comment-block">
            <strong>${comment.title}</strong>
            <p>${comment.commentText}</p>
            <div class="comment-user">~ ${comment.username}</div>
          </div>`;
        container.innerHTML += html;
      });
    })
    .catch(err => console.error("Error loading comments:", err));
}

document.addEventListener('DOMContentLoaded', () => {
  loadPopupStories();
  loadPopupComments();
});
