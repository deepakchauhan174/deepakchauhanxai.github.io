(() => {
  const btn = document.querySelector('.bonus-explore-btn');
  const SECRET = 'aaaaaa';
  const KEY = 'bonus_unlocked';

  // अगर पहले से अनलॉक है तो कुछ न करें (link जैसा ही रहे)
  if (sessionStorage.getItem(KEY) === '1') {
    return;
  }

  // otherwise block default and ask password
  btn.addEventListener('click', function(e){
    e.preventDefault();
    const p = prompt('पासवर्ड डालो ताकि पेज एक्सप्लोर कर सको:');
    if (p === null) return; // cancelled
    if (p === SECRET) {
      sessionStorage.setItem(KEY, '1');      // unlock for this tab/session
      // redirect to target
      window.location.href = btn.href;
    } else {
      alert('गलत पासवर्ड! 🔐');
    }
  });
})();
