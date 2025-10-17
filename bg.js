const canvas = document.getElementById("bg-animation");
const ctx = canvas.getContext("2d");

let particles = [];
const colors = ["#06B6D4", "#8B5CF6", "#FFFFFF"];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 2 + 1;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.speedX = (Math.random() - 0.5) * 0.5;
    this.speedY = (Math.random() - 0.5) * 0.5;
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce particles off edges
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = this.color;
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.move();
    p.draw();
  });
  requestAnimationFrame(animate);
}
 
// === Parallax Mouse Move Effect ===
document.addEventListener("mousemove", (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30;  // range -15 to 15
  const y = (e.clientY / window.innerHeight - 0.5) * 30; // range -15 to 15
  document.getElementById("bg-animation").style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
});

initParticles();
animate();
