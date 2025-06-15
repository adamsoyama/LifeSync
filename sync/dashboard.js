// Import utilities
import {
  injectHeader,
  injectFooter,
  setupMobileMenu,
  animateCircles,
  generateGreeting,
  setupLogoutButton,
} from "./modules/utils.mjs";

document.addEventListener("DOMContentLoaded", () => {
  injectHeader();
  injectFooter();
  setupMobileMenu();
});

document.addEventListener("DOMContentLoaded", () => {
  animateCircles();
});
// Check for active session on page load
document.addEventListener("DOMContentLoaded", () => {
  const user = sessionStorage.getItem("loggedInUser");
  if (!user) {
    // No active session, redirect to login
    window.location.href = "authentication.html";
  }
});

// Inject greeting into dashboard UI on load
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("dynamic-greeting").textContent = generateGreeting();
});

// Setup logout button functionality
document.addEventListener("DOMContentLoaded", () => {
  setupLogoutButton();
});
