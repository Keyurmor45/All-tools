// Custom Cursor Logic
document.addEventListener("DOMContentLoaded", () => {
  // Only initialize on devices with a mouse (pointer: fine)
  if (window.matchMedia("(pointer: fine)").matches) {
    const cursorDot = document.createElement('div');
    cursorDot.className = 'custom-cursor-dot';
    const cursorRing = document.createElement('div');
    cursorRing.className = 'custom-cursor-ring';
    
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorRing);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot moves instantly
      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    // Smooth animation loop for the trailing ring
    function animateRing() {
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px)`;
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Attach hover effects to all interactable elements dynamically
    document.body.addEventListener('mouseover', (e) => {
      const target = e.target.closest('a, button, input, label, .tool-card, .recent-pill, .category-pill, [role="button"]');
      if (target) {
        cursorRing.classList.add('hovered');
        cursorDot.classList.add('hovered');
      }
    });

    document.body.addEventListener('mouseout', (e) => {
      const target = e.target.closest('a, button, input, label, .tool-card, .recent-pill, .category-pill, [role="button"]');
      if (target) {
        cursorRing.classList.remove('hovered');
        cursorDot.classList.remove('hovered');
      }
    });
  }
});
