// Import utilities
import {
  injectHeader,
  injectFooter,
  setupMobileMenu,
} from "./modules/utils.mjs";

document.addEventListener("DOMContentLoaded", () => {
  injectHeader();
  injectFooter();
  setupMobileMenu();
});

// Import the animateCircles function from utils module
import { animateCircles } from "./modules/utils.mjs";

document.addEventListener("DOMContentLoaded", () => {
  animateCircles();
});

import { interactiveHero } from "./modules/utils.mjs";

document.addEventListener("DOMContentLoaded", () => {
  interactiveHero();
});
