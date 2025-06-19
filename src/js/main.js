// Import utilities
import { injectHeader, injectFooter, setupMobileMenu } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  injectHeader();
  injectFooter();
  setupMobileMenu();
});

// Import the animateCircles function from utils module
import { animateCircles } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  animateCircles();
});

import { interactiveHero } from "./utils.js";

document.addEventListener("DOMContentLoaded", () => {
  interactiveHero();
});
