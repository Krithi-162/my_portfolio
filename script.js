// ===== Glowing Star Cursor with Smooth Trail =====
const cursor = document.createElement('div');
cursor.classList.add('cursor');
document.body.appendChild(cursor);

let mouseX = 0, mouseY = 0;
let currentX = 0, currentY = 0;
const speed = 0.15; // smoothness control

// Track mouse
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Create small glowing stars following the cursor
  createStarTrail(mouseX, mouseY);
});

// Smooth cursor movement
function animateCursor() {
  currentX += (mouseX - currentX) * speed;
  currentY += (mouseY - currentY) * speed;

  cursor.style.left = currentX + 'px';
  cursor.style.top = currentY + 'px';

  requestAnimationFrame(animateCursor);
}
animateCursor();

// ===== Trail Glow =====
function createStarTrail(x, y) {
  const star = document.createElement('div');
  star.classList.add('cursor-trail');
  document.body.appendChild(star);

  star.style.left = x + 'px';
  star.style.top = y + 'px';

  // Animate fade + shrink
  star.animate(
    [
      { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
      { transform: 'translate(-50%, -50%) scale(0.3)', opacity: 0 }
    ],
    { duration: 700, easing: 'ease-out' }
  );

  // Remove old stars
  setTimeout(() => star.remove(), 700);
}
