export function loadHeader() {
  return `
  <a href="#main-content" class="skip-link">Skip to content</a>  
  <header role="navigation">
        <div class="logo">
            <a href="index.html">
                <img src="assets/icons/logo/complete_logo1.png" alt="LifeSync Logo">
            </a>
        </div>
        <nav>
            <ul>
                <li><a href="mental_health.html">Mental Health</a></li>
                <li><a href="finance.html">Finance</a></li>
                <li><a href="career.html">Career</a></li>
                <li><a href="entertainment.html">Entertainment</a></li>
                <li><a href="community.html">Community</a></li>
            </ul>
        </nav>
        <div class="nav-arrow">
            <a href="authentication.html">
                <span>Get Started</span>
                <img src="assets/icons/arrow.png" alt="Navigate to authentication">
            </a>
        </div>
    </header>
    `;
}
