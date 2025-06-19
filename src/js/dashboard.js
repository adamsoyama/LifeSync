// Import utilities
import {
  injectHeader,
  injectFooter,
  setupMobileMenu,
  animateCircles,
  generateGreeting,
  setupLogoutButton,
} from "./utils.js";

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
    window.location.href = "../pages/authentication.html";
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

document.addEventListener("DOMContentLoaded", () => {
  const moodSummary = JSON.parse(sessionStorage.getItem("moodSummary"));
  const moodText = document.getElementById("mood-summary-text");

  if (moodSummary) {
    moodText.textContent = `Your last recorded mood was "${
      moodSummary.moodCategory
    }" with a score of ${moodSummary.averageMood}. Logged at ${new Date(
      moodSummary.submittedAt
    ).toLocaleString()}`;
  } else {
    moodText.textContent =
      "No mood data found. Please complete the mental health check.";
  }

  const journalEntries =
    JSON.parse(localStorage.getItem("journalEntries")) || [];
  const journalDropdown = document.getElementById("journal-history-dropdown");

  journalEntries.forEach((entry) => {
    const option = document.createElement("option");
    option.textContent = `${entry.content} - ${new Date(
      entry.timestamp
    ).toLocaleDateString()}`;
    option.value = entry.content;
    journalDropdown.appendChild(option);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const summary = JSON.parse(localStorage.getItem("financeSummary"));

  if (summary) {
    document.getElementById("dash-income").innerText = summary.income || "₦0";
    document.getElementById("dash-expenses").innerText =
      summary.expenses || "₦0";
    document.getElementById("dash-balance").innerText = summary.balance || "₦0";
    document.getElementById("dash-exchange").innerText =
      summary.exchangeRate || "N/A";
    document.getElementById("dash-stock").innerText =
      summary.stockPrice || "N/A";
    document.getElementById("dash-updated").innerText =
      new Date(summary.timestamp).toLocaleString() || "N/A";
  } else {
    document.getElementById("finance-summary").innerHTML +=
      "<p>No financial data available yet. Visit the Finance page to get started.</p>";
  }
});
