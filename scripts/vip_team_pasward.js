function handleVIPAccess() {
  const code = prompt("🔒 Code डालिए:");

  if (code === "aibhai8726") {
    // सही code पर redirect करें folders वाले पेज पर
    window.location.href = "vip-folders.html";
  } else {
    alert("❌ गलत कोड! Access Denied.");
  }
}
