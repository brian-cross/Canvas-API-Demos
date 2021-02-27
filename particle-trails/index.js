const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
const trailDensity = 1;
const decay = 0.02;
let hue = 1;
hueShift = 1;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const mouse = {
  x: undefined,
  y: undefined,
};

canvas.addEventListener("click", e => {
  mouse.x = e.x;
  mouse.y = e.y;
  particlesArray.push(new Particle());
});

canvas.addEventListener("mousemove", e => {
  mouse.x = e.x;
  mouse.y = e.y;
  for (let i = 0; i < trailDensity; i++) particlesArray.push(new Particle());
});

class Particle {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.radius = Math.random() * 5 + 1;
    this.speedX = Math.random() * 3 - 1.5;
    this.speedY = Math.random() * 3 - 1.5;
    this.hue = hue;
    this.color = `hsl(${this.hue}, 100%, 50%)`;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.radius >= 0.1) this.radius -= decay;
  }

  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    // ctx.shadowBlur = this.radius * 2;
    // ctx.shadowColor = "#daa";
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
}

function handleParticles() {
  particlesArray.forEach((particle, index) => {
    for (let i = index; i < particlesArray.length - 1; i++) {
      const dx = particle.x - particlesArray[i + 1].x;
      const dy = particle.y - particlesArray[i + 1].y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < 100) {
        ctx.strokeStyle = particle.color;
        ctx.strokeWidth = 0.2;
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(particlesArray[i + 1].x, particlesArray[i + 1].y);
        ctx.stroke();
        ctx.closePath();
      }
    }

    if (particle.radius <= 0.1) particlesArray.splice(index, 1);

    particle.update();
    particle.draw();
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // ctx.fillStyle = "rgba(0,0,0,0.1)";
  // ctx.shadowBlur = 0;
  // ctx.shadowColor = "rgba(1,1,1,1)";
  // ctx.fillRect(0, 0, canvas.width, canvas.height);
  handleParticles();
  hue += hueShift;
  requestAnimationFrame(animate);
}

animate();
