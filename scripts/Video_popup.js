// Google Apps Script URL (Replace with yours)
const API_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

// DOM Elements
const videoPopup = document.getElementById('videoPopup');
const overlay = document.getElementById('overlay');
const closeBtn = document.getElementById('closeBtn');
const videoPlayer = document.getElementById('videoPlayer');
const playBtnOverlay = document.getElementById('playBtnOverlay');
const manualPlayBtn = document.getElementById('manualPlayBtn');

// Show popup immediately
videoPopup.style.display = 'block';
overlay.style.display = 'block';
playBtnOverlay.style.display = 'flex'; // Always show play button

// Fetch video from Google Sheet
async function loadVideo() {
    try {
        const response = await fetch(API_URL);
        const videos = await response.json();
        
        if (videos.length > 0) {
            videoPlayer.src = videos[0].VideoURL;
        }
    } catch (error) {
        console.error("Error loading video:", error);
    }
}

// Play video function
function playVideo() {
    videoPlayer.play()
        .then(() => {
            playBtnOverlay.style.display = 'none';
        })
        .catch(error => {
            console.log("Playback failed:", error);
        });
}

// Manual play with VIP button
manualPlayBtn.addEventListener('click', playVideo);

// Close popup function
function closePopup() {
    videoPlayer.pause();
    videoPopup.style.display = 'none';
    overlay.style.display = 'none';
}

// Event listeners
closeBtn.addEventListener('click', closePopup);
overlay.addEventListener('click', closePopup);
videoPlayer.addEventListener('ended', closePopup);
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePopup();
});

// Initialize
loadVideo();
