const canvas = document.getElementById("particle-canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const emojis = ["🌸", "🍃"];
let particles = [];

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 5 + 3;
    this.speedY = Math.random() * 0.6 + 0.3;
    this.alpha = Math.random() * 0.5 + 0.3;
    this.type = Math.random() > 0.5 ? "emoji" : "circle";
    this.emoji = emojis[Math.floor(Math.random() * emojis.length)];
    this.color = `hsla(${Math.random() * 360}, 100%, 60%, ${this.alpha})`;
  }

  update() {
    this.y += this.speedY;
    if (this.y > canvas.height) {
      this.reset();
      this.y = 0;
    }
  }

  draw() {
    if (this.type === "circle") {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.fill();
    } else {
      ctx.font = `${this.size * 5}px serif`;
      ctx.globalAlpha = this.alpha;
      ctx.fillText(this.emoji, this.x, this.y);
      ctx.globalAlpha = 1;
    }
  }
}

function initParticles(count) {
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

initParticles(100);
animateParticles();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles(100);
});
