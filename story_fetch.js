const sheetURL = 'https://script.google.com/macros/s/AKfycbzCr87QAgcvf9wgwk91BUYlHcvmaxhAExQPQlpIRofo-IXTIa5zvMEJeCO1eWotzfI/exec';

fetch(sheetURL)
  .then(response => response.json())
  .then(data => {
    if (data && data.length > 0) {
      document.getElementById('today-dialogue').innerText = data[0].TodayDialogue || 'Dialogue not found.';
      document.getElementById('story-content').innerText = data[0].Story || 'Story not found.';
    } else {
      document.getElementById('today-dialogue').innerText = 'No data found.';
      document.getElementById('story-content').innerText = 'No story available.';
    }
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    document.getElementById('today-dialogue').innerText = 'Failed to load dialogue.';
    document.getElementById('story-content').innerText = 'Failed to load story.';
  });