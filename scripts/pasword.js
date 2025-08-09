(function(){
    const PASSWORD = "aibhai8726@"; // yahan apna password set karo
    const TIME_LIMIT = 2 * 60 * 60 * 1000; // 2 ghante in milliseconds

    const overlay = document.getElementById('lockOverlay');
    const input = document.getElementById('lockPassword');
    const btn = document.getElementById('lockSubmitBtn');
    const errorMsg = document.getElementById('lockError');

    // Check localStorage for valid password time
    function checkLock() {
      const saved = localStorage.getItem('pageLock');
      if (!saved) return false;

      try {
        const data = JSON.parse(saved);
        if(data.password === PASSWORD) {
          const now = Date.now();
          if (now - data.time < TIME_LIMIT) {
            return true; // still valid
          }
        }
      } catch(e) {}
      return false;
    }

    function showLock() {
      overlay.style.display = "flex";
      input.value = "";
      input.focus();
    }

    function hideLock() {
      overlay.style.display = "none";
    }

    function saveLock() {
      const data = {
        password: PASSWORD,
        time: Date.now()
      };
      localStorage.setItem('pageLock', JSON.stringify(data));
    }

    // On page load check lock
    if (!checkLock()) {
      showLock();
    } else {
      hideLock();
    }

    btn.addEventListener('click', () => {
      if(input.value === PASSWORD) {
        errorMsg.style.display = "none";
        saveLock();
        hideLock();
      } else {
        errorMsg.style.display = "block";
        input.value = "";
        input.focus();
      }
    });

    // Optional: submit on Enter key
    input.addEventListener('keydown', e => {
      if(e.key === 'Enter') btn.click();
    });
  })();
