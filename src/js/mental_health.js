import {
  loadMoodQuestions,
  processMoodResponses,
  startBreathingExercise,
  loadTherapySuggestions,
  getCurrentMoodSummary,
} from "./moodTracker.mjs";

import {
  injectHeader,
  injectFooter,
  animateCircles,
} from "./services.mjs";

document.addEventListener("DOMContentLoaded", async () => {
  injectHeader();
  injectFooter();
  animateCircles();

  await loadMoodQuestions();
  toggleSections(false);

  // Prevent early access
  preventEarlyActions();

  const moodSummary = getCurrentMoodSummary();
  if (moodSummary) unlockAfterMood(moodSummary);
});

document.getElementById("submit-mood").addEventListener("click", () => {
  const result = processMoodResponses();
  if (!result) return;

  alert("✅ Your mood has been saved.");
  unlockAfterMood(result);
});

document.getElementById("start-breathing").addEventListener("click", () => {
  const container = document.getElementById("breathing-instructions");
  container.innerHTML = "🫁 Breathe in...";

  let phase = 0;
  const steps = ["Hold it...", "Breathe out...", "Relax...", "Breathe in..."];
  const interval = setInterval(() => {
    phase++;
    container.innerHTML = steps[phase % steps.length];
    if (phase > 10) {
      clearInterval(interval);
      container.innerHTML =
        "✅ Breathing complete. Loading therapist suggestion...";

      setTimeout(() => {
        loadTherapySuggestions();
        document.getElementById("therapist-note").innerText =
          "Here’s a therapist we recommend based on your mood. Click below to return to your dashboard.";
        document
          .getElementById("return-to-dashboard")
          .classList.remove("hidden");
      }, 2000);
    }
  }, 3000);
});

document.getElementById("return-to-dashboard").addEventListener("click", () => {
  const result = getCurrentMoodSummary();
  if (result) {
    sessionStorage.setItem("dashboardMood", JSON.stringify(result));
  }
  window.location.href = "../../src/pages/dashboard.html";
});

function toggleSections(enabled) {
  const journalSection = document.querySelector(".journaling-section");
  const breathingSection = document.querySelector(".mindfulness-section");
  const insightsSection = document.querySelector(".wellness-insights");

  journalSection.style.display = enabled ? "block" : "none";
  breathingSection.style.display = enabled ? "block" : "none";
  insightsSection.style.display = enabled ? "block" : "none";
}

function unlockAfterMood(moodResult) {
  toggleSections(true);

  const moodSelect = document.getElementById("mood-select");
  const options = [
    "Grateful",
    "Irritated",
    "Peaceful",
    "Tired",
    "Hopeful",
    "Lonely",
    "Excited",
    "Overwhelmed",
    "Focused",
    "Anxious",
  ];

  moodSelect.innerHTML =
    '<option value="">Choose your dominant mood for today</option>' +
    options.map((m) => `<option value="${m}">${m}</option>`).join("");
}

function preventEarlyActions() {
  const buttons = ["start-breathing", "mood-select"];
  buttons.forEach((id) => {
    const el = document.getElementById(id);
    el?.addEventListener("click", () => {
      const mood = getCurrentMoodSummary();
      if (!mood) {
        alert("⚠️ Please complete the Mood Tracker first.");
      }
    });
  });
}

document.getElementById("submit-mood").addEventListener("click", () => {
  const result = processMoodResponses();

  // ✅ Show confirmation message
  const confirmation = document.createElement("div");
  confirmation.id = "mood-confirmation-message";
  confirmation.textContent = "✅ Mood saved. Please select your dominant mood.";
  document.querySelector(".mood-tracker").appendChild(confirmation);

  // ✅ Reveal the journaling dropdown
  document.getElementById("mood-dropdown-container").classList.remove("hidden");
});
