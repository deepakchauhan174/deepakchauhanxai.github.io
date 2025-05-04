importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyAT8qbxGsbG_28uVUWmCmXeFH8wQmbvVZQ",
  authDomain: "vip-team-bhai-x-ai.firebaseapp.com",
  projectId: "vip-team-bhai-x-ai",
  storageBucket: "vip-team-bhai-x-ai.appspot.com",
  messagingSenderId: "984650632826",
  appId: "1:984650632826:web:7e3b8167fb5979537535c3"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log("Background message received: ", payload);
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/images/ai_bhai.jpg" // Optional
  });
});