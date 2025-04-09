const canvas = document.getElementById("stars-bg");
const ctx = canvas.getContext("2d");
ctx.shadowColor = "rgba(0, 255, 224, 0.6)";
ctx.shadowBlur = 5;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);
let stars = Array(200).fill().map(() => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  radius: Math.random() * 1.5,
  dx: (Math.random() - 0.5) * 0.3,
  dy: (Math.random() - 0.5) * 0.3,
  speedMultiplier: Math.random() * 1.5 + 0.5, // for depth
}));


function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.shadowColor = "rgba(0, 255, 224, 0.6)";
  ctx.shadowBlur = 5;

  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(0, 255, 224, ${Math.random() * 0.7 + 0.3})`; // twinkle
    ctx.fill();
    // s.x += s.dx;
    // s.y += s.dy;
    s.x += s.dx * s.speedMultiplier;
    s.y += s.dy * s.speedMultiplier;

    if (s.x < 0 || s.x > canvas.width) s.dx *= -1;
    if (s.y < 0 || s.y > canvas.height) s.dy *= -1;
  });

  requestAnimationFrame(animateStars);
}
animateStars();

let hoverCooldown = false;

function playHoverSound() {
  if (hoverCooldown)
    return;
  hoverCooldown = true;
  const sound = document.getElementById("hoverSound");
  sound.currentTime = 0;
  sound.play();
}
