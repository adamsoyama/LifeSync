// Import utilities for header and footer injection
import * as utils from "./modules/utils.mjs";

document.addEventListener("DOMContentLoaded", () => {
  utils.loadHeader();
  utils.loadFooter();
});
