// Google Apps Script URL (Replace with yours)
const API_URL = "https://script.google.com/macros/s/AKfycbzc0Bt04pqlYgZRSkJTj8PsEHiSXPTjlNBSAVN7f4VX2vRUdYn6iQ0foG36FKVi4b0P/exec";

// DOM Elements
const elements = {
    videoPopup: document.getElementById('videoPopup'),
    overlay: document.getElementById('overlay'),
    closeBtn: document.getElementById('closeBtn'),
    videoPlayer: document.getElementById('videoPlayer'),
    playBtnOverlay: document.getElementById('playBtnOverlay'),
    manualPlayBtn: document.getElementById('manualPlayBtn')
};

const POPUP_DELAY = 180000; // 3 minutes
const COOLDOWN_INTERVAL = 14400000; // 4 hours in ms

// Show popup with cooldown check
function showPopup() {
    const lastShown = localStorage.getItem('popupLastShown');
    if (!lastShown || (Date.now() - lastShown) > COOLDOWN_INTERVAL) {
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

// Initialize after 3-minute delay
loadVideo();
setTimeout(showPopup, POPUP_DELAY);
