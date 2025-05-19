// analytics.js

(function() {
  var gtagScript = document.createElement('script');
  gtagScript.async = true;
  gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-QQJ7HM8V4S";
  document.head.appendChild(gtagScript);

  window.dataLayer = window.dataLayer || [];
  function gtag(){ dataLayer.push(arguments); }
  window.gtag = gtag;

  gtag('js', new Date());
  gtag('config', 'G-QQJ7HM8V4S', {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  });
})();
