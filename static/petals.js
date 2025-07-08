const canvas = document.getElementById("petals-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let petals = [];

function Petal() {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * -canvas.height;
  this.size = 20 + Math.random() * 10; // размер уменьшил
  this.speedY = 0.3 + Math.random() * 0.7; // плавнее вниз
  this.speedX = Math.random() * 0.3 - 0.15; // меньше вбок
  this.angle = Math.random() * 360;
  this.spin = Math.random() * 0.15 - 0.075; // меньше вращение
  this.opacity = 0.5 + Math.random() * 0.3;

  this.draw = function () {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.angle * Math.PI) / 180);
    ctx.globalAlpha = this.opacity;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(
      -this.size / 2, -this.size / 3,
      -this.size / 2, this.size / 2,
      0, this.size
    );
    ctx.bezierCurveTo(
      this.size / 2, this.size / 2,
      this.size / 2, -this.size / 3,
      0, 0
    );
    ctx.closePath();

    ctx.fillStyle = "rgba(255, 182, 193, 0.8)";
    ctx.fill();
    ctx.restore();
  };

  this.update = function () {
    this.y += this.speedY;
    this.x += this.speedX;
    this.angle += this.spin;

    if (this.y > canvas.height + 50) {
      this.y = -50;
      this.x = Math.random() * canvas.width;
    }

    this.draw();
  };
}

function init() {
  petals = [];
  for (let i = 0; i < 50; i++) { // количество лепестков
    petals.push(new Petal());
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  petals.forEach((petal) => petal.update());
  requestAnimationFrame(animate);
}

init();
animate();
