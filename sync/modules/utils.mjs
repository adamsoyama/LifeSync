import { loadHeader } from "./header.mjs";
import { loadFooter } from "./footer.mjs";

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

export function setupMobileMenu() {
  const toggleButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  if (toggleButton && nav) {
    toggleButton.addEventListener("click", () => {
      const expanded = toggleButton.getAttribute("aria-expanded") === "true";
      toggleButton.setAttribute("aria-expanded", !expanded);
      toggleButton.classList.toggle("open");
      nav.classList.toggle("active");
    });
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

// Function to handle parallax effect on hero section
export function interactiveHero() {
  const heroText = document.querySelector(".hero-text");
  const heroImage = document.querySelector(".hero-image img");

  document.addEventListener("mousemove", (event) => {
    const xPos = (event.clientX / window.innerWidth - 0.5) * 30;
    const yPos = (event.clientY / window.innerHeight - 0.5) * 30;

    // Apply movement effect
    heroText.style.transform = `translate(${xPos * 0.3}px, ${yPos * 0.3}px)`;
    heroImage.style.transform = `translate(${xPos * -0.4}px, ${
      yPos * -0.4
    }px) scale(1.03)`;
  });
}

// 📌 Generate time-based greeting
export function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

// 📌 Fetch stored username from sessionStorage (correct source)
export function getUserName() {
  const userSession = sessionStorage.getItem("loggedInUser");
  if (!userSession) return "Guest";

  const user = JSON.parse(userSession);
  return user.name ? user.name : "Guest"; // Correctly accesses stored name
}

// 📌 Generate full greeting dynamically
export function generateGreeting() {
  return `${getGreeting()}, ${getUserName()}!`;
}

// utils.mjs

export function setupLogoutButton() {
  const logoutBtn = document.getElementById("logoutBtn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      sessionStorage.removeItem("loggedInUser");
      window.location.href = "index.html"; // Redirect to landing/entry page
    });
  }
}
