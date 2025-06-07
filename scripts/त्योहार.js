function closePopup() {
  document.getElementById("bakrid-popup").style.display = "none";
}

// Load popup on page load
window.addEventListener("load", () => {
  fetch("https://script.google.com/macros/s/AKfycbzVszNeD21dFuamuZNCC-d_lqmrV11y9c5nIOVHeTe3JnpWT3IBkC45Fq8iN99XEAL5/exec")
    .then(res => res.json())
    .then(data => {
      // मान लो केवल पहला row use हो रहा है
      const item = data[0];

      document.getElementById("popup-title").innerHTML = item.title || "Bakrid Mubarak";
      document.getElementById("popup-shayari").innerHTML = item.shayari || "";
      document.getElementById("popup-signature").innerHTML = item.signature || "";
      document.getElementById("popup-img").src = item.image || "https://via.placeholder.com/500x300";

      document.getElementById("bakrid-popup").style.display = "flex";
    })
    .catch(err => {
      console.error("Popup load error:", err);
    });
});
