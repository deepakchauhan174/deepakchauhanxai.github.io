const storyURL = 'https://script.google.com/macros/s/AKfycbzf3TZAO2nDu_J98PahqIMNd5n_Uk57IPez1bvuuxCU51g1A-ISLQK6VglOuQG2gGwr/exec';
const commentURL = 'https://script.google.com/macros/s/AKfycbxIPMirk3tp92_t0RyxDviTh7xblod7hjeiUiMO4GgBAEwcoQJbJauc6RGnRXTJFqgqDQ/exec';

function loadPopupStories() {
  fetch(storyURL)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("popup-stories");
      data.filter(s => s.storyTitle && s.fullStory).slice(0, 2).forEach(story => {
        const img = story.imgUrl ? `<img src="${story.imgUrl}" style="width: 100%; border-radius: 12px; margin-bottom: 10px; box-shadow: 0 0 12px #00ffc3;" alt="story image" />` : '';
        const html = `
          <div style="margin-bottom: 25px; border-left: 4px solid #00ffc3; padding-left: 15px; background: #111; padding: 15px; border-radius: 10px;">
            ${img}
            <h3 style="color: #00ffc3;">${story.storyTitle}</h3>
            <p style="margin: 10px 0; color: white;">${story.fullStory}</p>
            <div style="text-align: right; font-style: italic; color: #888;">~ ${story.signature || 'Anonymous'}</div>
          </div>`;
        container.innerHTML += html;
      });
    });
}

function loadPopupComments() {
  fetch(commentURL)
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("popup-comments");
      data.slice(0, 3).forEach(comment => {
        const html = `
          <div style="margin-bottom: 15px; background: #111; padding: 15px; border-left: 3px solid #ff00aa; border-radius: 10px;">
            <strong style="color: #ffcc00;">${comment.title}</strong>
            <p style="color: white;">${comment.commentText}</p>
            <div style="text-align: right; font-style: italic; color: #aaa;">~ ${comment.username}</div>
          </div>`;
        container.innerHTML += html;
      });
    });
}

document.addEventListener('DOMContentLoaded', () => {
  loadPopupStories();
  loadPopupComments();
});
