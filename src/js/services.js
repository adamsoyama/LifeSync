import { loadHeader } from "./pageHeader.js";
import { loadFooter } from "./pageFooter.js";

export function injectHeader() {
  const headerContainer = document.getElementById("header-container");
  if (headerContainer) {
    headerContainer.innerHTML = loadHeader();
  }
}

export function injectFooter() {
  const footerContainer = document.getElementById("footer-container");
  if (footerContainer) {
    footerContainer.innerHTML = loadFooter();
  }
}

export function animateCircles() {
  const circleContainer = document.querySelector(".animated-circles");
  const numCircles = 12; // Increased number
  const colors = ["#FFC0CB", "#64B5F6", "#FFEE58", "#81C784", "#9575CD"];

  const circleData = [];

  // Generate circles dynamically
  for (let i = 0; i < numCircles; i++) {
    const circle = document.createElement("span");
    circle.classList.add("circle");
    circle.style.backgroundColor = colors[i % colors.length];

    // Assign initial positions randomly across key areas
    let positions = [
      { x: window.innerWidth / 2, y: window.innerHeight / 2 }, // Center
      { x: 20, y: 20 }, // Top-left
      { x: 20, y: window.innerHeight - 100 }, // Bottom-left
      { x: window.innerWidth - 100, y: 20 }, // Top-right
      { x: window.innerWidth - 100, y: window.innerHeight - 100 }, // Bottom-right
    ];

    let initialPos = positions[i % positions.length]; // Rotate through predefined spots
    circle.style.transform = `translate(${initialPos.x}px, ${initialPos.y}px)`;
    circleContainer.appendChild(circle);

    let vx = (Math.random() - 0.5) * 4; // Random velocity X
    let vy = (Math.random() - 0.5) * 4; // Random velocity Y

    circleData.push({
      element: circle,
      x: initialPos.x,
      y: initialPos.y,
      vx,
      vy,
    });
  }

  function moveCircles() {
    circleData.forEach((circle) => {
      let { element, x, y, vx, vy } = circle;

      // Update positions
      x += vx;
      y += vy;

      // Keep inside viewport & reverse direction at boundaries
      if (x <= 0 || x >= window.innerWidth - 100) {
        vx *= -1;
        x = Math.max(0, Math.min(x, window.innerWidth - 100));
      }
      if (y <= 0 || y >= window.innerHeight - 100) {
        vy *= -1;
        y = Math.max(0, Math.min(y, window.innerHeight - 100));
      }

      // Apply new position
      element.style.transform = `translate(${x}px, ${y}px)`;

      // Store updated positions
      circle.x = x;
      circle.y = y;
      circle.vx = vx;
      circle.vy = vy;
    });

    requestAnimationFrame(moveCircles);
  }

  moveCircles();
}
