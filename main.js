const canvas = document.getElementById("fireworksCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Firework {
  constructor(x, y, targetX, targetY) {
    this.x = x;
    this.y = y;
    this.targetX = targetX;
    this.targetY = targetY;
    this.radius = 3;
    this.life = 0;
    this.maxLife = 80;
    this.angle = Math.atan2(targetY - y, targetX - x);
    this.speed = 5;
    this.vx = Math.cos(this.angle) * this.speed;
    this.vy = Math.sin(this.angle) * this.speed;
    this.exploded = false;
  }

  update() {
    if (!this.exploded) {
      this.x += this.vx;
      this.y += this.vy;
      this.life++;
      if (
        this.life >= this.maxLife ||
        (Math.abs(this.x - this.targetX) < 5 &&
          Math.abs(this.y - this.targetY) < 5)
      ) {
        this.explode();
      }
    }
  }

  explode() {
    this.exploded = true;
    this.createParticles();
  }

  createParticles() {
    for (let i = 0; i < 100; i++) {
      const particle = new Particle(this.x, this.y);
      particles.push(particle);
    }
  }

  draw() {
    if (!this.exploded) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = "white";
      ctx.fill();
      ctx.closePath();
    }
  }
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = 2;
    this.life = 0;
    this.maxLife = 100;
    this.angle = Math.random() * Math.PI * 2;
    this.speed = Math.random() * 2 + 1;
    this.vx = Math.cos(this.angle) * this.speed;
    this.vy = Math.sin(this.angle) * this.speed;
    this.alpha = 1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life++;
    this.alpha -= 0.01;
    if (this.alpha < 0) this.alpha = 0;
  }

  draw() {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `hsl(${Math.random() * 360}, 100%, 50%)`;
    ctx.fill();
    ctx.closePath();
    ctx.restore();
  }
}

let fireworks = [];
let particles = [];

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach((firework, index) => {
    firework.update();
    firework.draw();
    if (firework.exploded && firework.life >= firework.maxLife) {
      fireworks.splice(index, 1);
    }
  });

  particles.forEach((particle, index) => {
    particle.update();
    particle.draw();
    if (particle.life >= particle.maxLife) {
      particles.splice(index, 1);
    }
  });
}

function createFirework() {
  const x = Math.random() * canvas.width;
  const y = canvas.height;
  const targetX = Math.random() * canvas.width;
  const targetY = (Math.random() * canvas.height) / 2;
  const firework = new Firework(x, y, targetX, targetY);
  fireworks.push(firework);
}

setInterval(createFirework, 500);

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

document.addEventListener("DOMContentLoaded", function () {
  var audio = document.getElementById("birthdaySong");
  audio.play();
});
