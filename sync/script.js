// Import utilities for header and footer injection
import * as utils from "./modules/utils.mjs";

document.addEventListener("DOMContentLoaded", () => {
  utils.loadHeader();
  utils.loadFooter();
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
