import { fetchData } from "../../api.mjs";

// 🌐 API Endpoints
const MOOD_API_URL =
  "https://run.mocky.io/v3/e1aae645-3b1a-4f1f-a466-fae8028269a1";
const THERAPY_API_URL =
  "https://run.mocky.io/v3/c3d1e92d-41e5-422f-8c7f-d378b7ca0774";

///////////////////////
// MOOD TRACKING
///////////////////////

export async function loadMoodQuestions() {
  const result = await fetchData(MOOD_API_URL);
  const questions = result?.questions || [];

  if (questions.length > 0) {
    sessionStorage.setItem("moodQuestions", JSON.stringify(questions));
    const container = document.getElementById("mood-question-container");

    container.innerHTML = questions
      .map(
        (q, i) => `
        <div class="question-block">
          <p>${i + 1}. ${q.text}</p>
          <div class="scale-options">
            ${[1, 2, 3, 4, 5]
              .map(
                (val) => `
              <label>
                <input type="radio" name="question${i}" value="${val}"> ${val}
              </label>`
              )
              .join("")}
          </div>
        </div>
      `
      )
      .join("");
  }
}

export function processMoodResponses() {
  const questions = JSON.parse(sessionStorage.getItem("moodQuestions")) || [];
  let totalScore = 0;
  let answered = 0;

  questions.forEach((q, i) => {
    const selection = document.querySelector(
      `input[name="question${i}"]:checked`
    );
    if (selection) {
      totalScore += Number(selection.value);
      answered++;
    }
  });

  const moodScore = questions.length ? totalScore / questions.length : 0;
  const moodCategory = getMoodCategory(moodScore);

  const result = {
    averageMood: Number(moodScore.toFixed(2)),
    moodCategory,
    submittedAt: new Date().toISOString(),
  };

  sessionStorage.setItem("moodSummary", JSON.stringify(result));
  addToMoodHistory(result);

  return result;
}

function getMoodCategory(score) {
  if (score <= 2) return "Stress";
  if (score <= 3) return "Anxiety";
  if (score <= 4) return "Low Motivation";
  return "Well-being";
}

function addToMoodHistory(entry) {
  const history = JSON.parse(localStorage.getItem("moodTrendHistory")) || [];
  history.push(entry);
  localStorage.setItem("moodTrendHistory", JSON.stringify(history));
}

export function getCurrentMoodSummary() {
  return JSON.parse(sessionStorage.getItem("moodSummary"));
}

export function getMoodTrendHistory() {
  return JSON.parse(localStorage.getItem("moodTrendHistory")) || [];
}

///////////////////////
// GUIDED JOURNALING
///////////////////////

export function saveJournalEntry() {
  const entry = document.getElementById("journal-entry")?.value.trim();
  if (!entry) return alert("Please write something in your journal.");

  const journals = JSON.parse(localStorage.getItem("journalEntries")) || [];
  journals.push({
    content: entry,
    timestamp: new Date().toISOString(),
  });

  localStorage.setItem("journalEntries", JSON.stringify(journals));
  alert("Journal entry saved!");
}

export function getJournalHistory() {
  return JSON.parse(localStorage.getItem("journalEntries")) || [];
}

///////////////////////
// MINDFULNESS EXERCISE
///////////////////////

export function startBreathingExercise() {
  const container = document.getElementById("breathing-instructions");
  container.innerHTML = "🫁 Breathe in...";

  let phase = 0;
  const steps = ["Hold it...", "Breathe out...", "Relax...", "Breathe in..."];
  const interval = setInterval(() => {
    phase++;
    container.innerHTML = steps[phase % steps.length];
    if (phase > 10) {
      clearInterval(interval);
      container.innerHTML = "🧘‍♀️ Session complete. Come back when you're ready.";
    }
  }, 3000);
}

///////////////////////
// THERAPY INSIGHTS
///////////////////////

export async function loadTherapySuggestions() {
  const result = await fetchData(THERAPY_API_URL);
  const allTherapists = result?.therapists || [];
  const container = document.getElementById("therapist-suggestions");

  const moodSummary = JSON.parse(sessionStorage.getItem("moodSummary"));
  const moodKeyword = moodSummary?.moodCategory || "Well-being";

  const filtered = allTherapists.filter((t) => t.focus?.includes(moodKeyword));

  sessionStorage.setItem("therapists", JSON.stringify(filtered));

  container.innerHTML = filtered.length
    ? filtered
        .map(
          (t) => `
      <div class="therapist-card">
        <h3>${t.name}</h3>
        <p><strong>Focus:</strong> ${t.focus.join(", ")}</p>
        <p><strong>Skills:</strong> ${t.skills.join(", ")}</p>
        <p><strong>Education:</strong> ${t.education}</p>
        <p><strong>Languages:</strong> ${t.languages.join(", ")}</p>
        <p><strong>Certifications:</strong> ${t.certifications.join(", ")}</p>
        <p><strong>Contact:</strong> ${t.contact_info}</p>
      </div>
    `
        )
        .join("")
    : `<p>No matching therapists for "${moodKeyword}". Support is still available 💚</p>`;
}
