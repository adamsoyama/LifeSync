export function loadHeader() {
  return `
  <a href="#main-content" class="skip-link">Skip to content</a>  
  <header role="navigation">
    <div>
        <a href="index.html">
        <img src="assets/icons/logo/complete_logo1.png" alt="LifeSync Logo">
        </a>
        <!-- Menu Toggle Button -->
        <button
          class="menu-toggle"
          aria-label="Toggle Navigation"
          aria-expanded="false"
          aria-controls="main-nav">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </button>

        <nav class="main-nav" arial label="Main Navigation">
            <ul>
                <li><a href="authentication.html">Mental Health</a></li>
                <li><a href="authentication.html">Finance</a></li>
                <li><a href="authentication.html">Career</a></li>
                <li><a href="authentication.html">Entertainment</a></li>
                <li><a href="authentication.html">Community</a></li>
            </ul>
        </nav>
     </div>
    </header>
    `;
}
