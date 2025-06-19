function protectDashboardPage() {
  const user = sessionStorage.getItem("loggedInUser");
  const onDashboard = window.location.pathname.includes(
    "./pages/dashboard.html"
  );

  if (onDashboard && !user) {
    const warning = document.createElement("div");
    warning.textContent =
      "You must be logged in to access this page. Redirecting...";
    warning.style.position = "fixed";
    warning.style.top = "20px";
    warning.style.left = "50%";
    warning.style.transform = "translateX(-50%)";
    warning.style.backgroundColor = "#ff4d4d";
    warning.style.color = "#fff";
    warning.style.padding = "12px 24px";
    warning.style.borderRadius = "8px";
    warning.style.boxShadow = "0 4px 6px rgba(0,0,0,0.2)";
    warning.style.zIndex = "9999";
    document.body.appendChild(warning);

    setTimeout(() => {
      window.location.href = "./pages/authentication.html";
    }, 2500);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  checkUserSession();
  protectDashboardPage();
  setupInactivityTimer();
  animateCircles();
});

const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

// ✅ Validate email & password functions
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePassword(password) {
  return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/.test(password);
}

function showAlert(message, redirectTo = null) {
  const alertBox = document.createElement("div");
  alertBox.className = "alert-message";
  alertBox.textContent = message;
  document.body.appendChild(alertBox);

  setTimeout(() => {
    alertBox.classList.add("fade-out");
    setTimeout(() => {
      alertBox.remove();
      if (redirectTo) {
        window.location.href = redirectTo;
      }
    }, 500);
  }, 2000);
}

// ✅ Store user session (full object for name access later)
function storeUserSession(user) {
  sessionStorage.setItem("loggedInUser", JSON.stringify(user));
}

// ✅ Check if session exists and redirect
function checkUserSession() {
  const user = sessionStorage.getItem("loggedInUser");
  if (user) {
    window.location.href = "./pages/dashboard.html";
  }
}

// ✅ Logout function
function logoutUser() {
  sessionStorage.removeItem("loggedInUser");
  window.location.href = "./pages/authentication.html";
}

// ✅ Registration form handler
document.getElementById("registerForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("registerName").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value.trim();

  if (!name) return showAlert("Name is required.");
  if (!validateEmail(email)) return showAlert("Invalid email format.");
  if (!validatePassword(password)) {
    return showAlert(
      "Password must be at least 8 characters, include a number, uppercase letter, and special character."
    );
  }

  const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
  const existing = users.find((u) => u.email === email);

  if (existing) {
    return showAlert("This email is already registered. Please log in.");
  }

  const newUser = { name, email, password };
  users.push(newUser);
  localStorage.setItem("registeredUsers", JSON.stringify(users));

  storeUserSession(newUser);
  showAlert("Registration Successful! Redirecting...", "dashboard.html");
});

// ✅ Login form handler
document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!validateEmail(email)) return showAlert("Invalid email format.");
  if (!validatePassword(password)) {
    return showAlert(
      "Password must be at least 8 characters, include a number, uppercase letter, and special character."
    );
  }

  const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
  const user = users.find((u) => u.email === email);

  if (!user) return showAlert("No account found with this email.");
  if (user.password !== password) return showAlert("Incorrect password.");

  storeUserSession(user);
  showAlert("Login Successful! Redirecting...", "dashboard.html");
});

// ✅ Inactivity logout mechanism
let inactivityTimeout;
function setupInactivityTimer() {
  const maxInactivityTime = 10 * 60 * 1000; // 10 minutes

  const resetTimer = () => {
    clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(() => {
      sessionStorage.removeItem("loggedInUser");
      alert("You have been logged out due to inactivity.");
      window.location.href = "./pages/authentication.html";
    }, maxInactivityTime);
  };

  ["mousemove", "keydown", "scroll", "click"].forEach((event) =>
    document.addEventListener(event, resetTimer)
  );

  resetTimer(); // Initialize on load
}

// ✅ Import animateCircles
import { animateCircles } from "./utils.mjs";
