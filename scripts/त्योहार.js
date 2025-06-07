
window.addEventListener("DOMContentLoaded", function () {
  fetch("https://script.google.com/macros/s/AKfycbzVszNeD21dFuamuZNCC-d_lqmrV11y9c5nIOVHeTe3JnpWT3IBkC45Fq8iN99XEAL5/exec")
    .then(res => res.json())
    .then(data => {
      document.getElementById("popupPhoto").src = data.photo;
      document.getElementById("popupTitle").textContent = data.title;
      document.getElementById("popupShayari").textContent = data.shayari;
      document.getElementById("popupSignature").textContent = "- " + data.signature;
      document.getElementById("eidPopupBox").style.display = "block";
    })
    .catch(err => console.error("Failed to load popup", err));
});
