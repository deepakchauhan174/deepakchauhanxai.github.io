const openBtn = document.getElementById('openPopupBtn');
const popupOverlay = document.getElementById('popupOverlay');
const closeBtn = document.getElementById('closeBtn');
const messagesContainer = document.getElementById('messagesContainer');

closeBtn.addEventListener('click', () => {
  popupOverlay.style.display = 'none';
});

openBtn.addEventListener('click', async () => {
  try {
    const res = await fetch('https://deepakchauhanxai.xyz/user_ai_bhai_reply.json');
    if (!res.ok) throw new Error('डेटा लोड करने में समस्या');
    const data = await res.json();

    messagesContainer.innerHTML = '';
    data.forEach(entry => {
      const block = document.createElement('div');
      block.className = 'messageBlock';

      const userDiv = document.createElement('div');
      userDiv.className = 'userMsg';
      userDiv.textContent = entry.user;

      const aiDiv = document.createElement('div');
      aiDiv.className = 'aiReply';
      aiDiv.textContent = entry.ai_bhai;

      block.appendChild(userDiv);
      block.appendChild(aiDiv);
      messagesContainer.appendChild(block);
    });

    popupOverlay.style.display = 'flex';
    messagesContainer.focus();
  } catch (e) {
    alert(e.message);
  }
});

// Optional: close popup when clicking outside popup box
popupOverlay.addEventListener('click', (e) => {
  if (e.target === popupOverlay) {
    popupOverlay.style.display = 'none';
  }
});
