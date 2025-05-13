// popup-story.js

const endpoints = {
  stories: 'https://script.google.com/macros/s/AKfycbwcbGLD0vTD-dX2jPnGtK8oMvCQsYC9OFcdbA-4cxnYjGbVxcsH3XIoKnJ6bfwgLOxtQQ/exec',
  comments: 'https://script.google.com/macros/s/AKfycbxU8clwOhpexF9Qb5bPl_1bxgJw71_HExii35pCJCh3GpUFvOx6spKKCCfN2BiyfXz7fg/exec'
};

function typeWriter(element, text, speed = 20) {
  let i = 0;
  element.innerHTML = '';

  function typing() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    }
  }

  typing();
}

function createStoryCard(story) {
  return `
    <div class="story-card">
      ${story.imgUrl ? `<img src="${story.imgUrl}" class="story-img" alt="${story.storyTitle}">` : ''}
      <h3 class="story-title">${story.storyTitle || 'Untitled Story'}</h3>
      <div class="story-content"></div>
      ${story.signature ? `<div class="story-signature">${story.signature}</div>` : ''}
    </div>
  `;
}

function createCommentCard(comment) {
  return `
    <div class="comment-card">
      <h4 class="comment-title">${comment.title || 'Comment'}</h4>
      <p class="comment-text">${comment.commentText || 'No comment text available'}</p>
      <p class="comment-user">~ ${comment.username || 'Anonymous'}</p>
      <hr class="comment-divider">
    </div>
  `;
}

async function fetchData(url, containerId, filterFn = null) {
  const container = document.getElementById(containerId);

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const data = await response.json();
    const processedData = filterFn ? data.filter(filterFn) : data;
    container.innerHTML = '';

    if (!processedData || processedData.length === 0) {
      container.innerHTML = '<div class="error">No data available</div>';
      return;
    }

    processedData.forEach(item => {
      if (containerId === 'stories-container') {
        container.innerHTML += createStoryCard(item);
      } else {
        container.innerHTML += createCommentCard(item);
      }
    });

    if (containerId === 'stories-container') {
      const storyContents = container.querySelectorAll('.story-content');
      processedData.forEach((story, index) => {
        if (storyContents[index] && story.fullStory) {
          typeWriter(storyContents[index], story.fullStory);
        }
      });
    }
  } catch (error) {
    console.error(`Error fetching ${containerId}:`, error);
    container.innerHTML = `<div class="error">Failed to load data. Please try again later.</div>`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchData(endpoints.stories, 'stories-container', item => item.copyright === "yes");
  fetchData(endpoints.comments, 'comments-container');
});
