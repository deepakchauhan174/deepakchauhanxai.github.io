// Google Apps Script URL (Replace with yours)
const API_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

// DOM Elements
const elements = {
    videoPopup: document.getElementById('videoPopup'),
    overlay: document.getElementById('overlay'),
    closeBtn: document.getElementById('closeBtn'),
    videoPlayer: document.getElementById('videoPlayer'),
    playBtnOverlay: document.getElementById('playBtnOverlay'),
    manualPlayBtn: document.getElementById('manualPlayBtn')
};

// Show popup with 1-hour interval
function showPopup() {
    const lastShown = localStorage.getItem('popupLastShown');
    const oneHour = 1,44,00,000; // 4 hour in milliseconds
    
    if (!lastShown || (Date.now() - lastShown) > oneHour) {
        elements.videoPopup.style.display = 'block';
        elements.overlay.style.display = 'block';
        elements.playBtnOverlay.style.display = 'flex';
        localStorage.setItem('popupLastShown', Date.now());
    }
}

// Load video from Google Sheet
async function loadVideo() {
    try {
        const response = await fetch(API_URL);
        const videos = await response.json();
        if (videos.length > 0) {
            elements.videoPlayer.src = videos[0].VideoURL;
        }
    } catch (error) {
        console.error("Error loading video:", error);
    }
}

// Event Listeners
elements.manualPlayBtn.addEventListener('click', () => {
    elements.videoPlayer.play()
        .then(() => elements.playBtnOverlay.style.display = 'none')
        .catch(err => console.log("Playback failed:", err));
});

elements.closeBtn.addEventListener('click', closePopup);
elements.overlay.addEventListener('click', closePopup);

function closePopup() {
    elements.videoPlayer.pause();
    elements.videoPopup.style.display = 'none';
    elements.overlay.style.display = 'none';
}

// Initialize
loadVideo();
showPopup();
// Check every hour if popup should show
setInterval(showPopup, 1,44,00,000);
