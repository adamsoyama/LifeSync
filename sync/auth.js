document.addEventListener("DOMContentLoaded", () => {
  checkUserSession();
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

// Validate email & password functions
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

// Function to store user session
function storeUserSession(email) {
  localStorage.setItem("loggedInUser", email);
}

// Function to check user session
function checkUserSession() {
  const user = localStorage.getItem("loggedInUser");
  if (user) {
    window.location.href = "dashboard.html"; // Redirect if user is already logged in
  }
}

// Function to clear session (logout)
function logoutUser() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "authentication.html"; // Redirect to login page
}

// Registration Form Handling
document.getElementById("registerForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = document.getElementById("registerName").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const password = document.getElementById("registerPassword").value.trim();

  if (!name) return showAlert("Name is required.");
  if (!validateEmail(email)) return showAlert("Invalid email format.");
  if (!validatePassword(password))
    return showAlert(
      "Password must be at least 8 characters, include a number, uppercase letter, and special character."
    );

  storeUserSession(email); // Store user in browser
  showAlert("Registration Successful! Redirecting...", "dashboard.html");
});

// Login Form Handling
document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!validateEmail(email)) return showAlert("Invalid email format.");
  if (!validatePassword(password))
    return showAlert(
      "Password must be at least 8 characters, include a number, uppercase letter, and special character."
    );

  storeUserSession(email); // Store user in browser
  showAlert("Login Successful! Redirecting...", "dashboard.html");
});

// Import the animateCircles function from utils module
import { animateCircles } from "./modules/utils.mjs";

document.addEventListener("DOMContentLoaded", () => {
  animateCircles();
});
