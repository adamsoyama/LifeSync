import { loadHeader } from "./header.mjs";
import { loadFooter } from "./footer.mjs";

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("header-container").innerHTML = loadHeader();
  document.getElementById("footer-container").innerHTML = loadFooter();
});
