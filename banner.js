function openStory() {
  window.location.href = "Ai_bhai_shath_hai.html";
}

// 5 मिनट बाद Banner Hide करना
setTimeout(function() {
  var banner = document.getElementById('promoBanner');
  if(banner) {
    banner.style.display = 'none';
  }
}, 300000); // 5 minutes = 300000 milliseconds
