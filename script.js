(function () {
  const yearEl = document.getElementById("year");
  const themeToggle = document.getElementById("theme-toggle");
  const storageKey = "profile-theme";

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  function applyTheme(theme) {
    const isDark = theme === "dark";
    document.body.classList.toggle("dark", isDark);
    if (themeToggle) {
      themeToggle.setAttribute("aria-pressed", String(isDark));
      themeToggle.textContent = isDark ? "Light mode" : "Dark mode";
    }
  }

  const savedTheme = localStorage.getItem(storageKey);
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const nextTheme = document.body.classList.contains("dark")
        ? "light"
        : "dark";
      localStorage.setItem(storageKey, nextTheme);
      applyTheme(nextTheme);
    });
  }
  console.log("JavaScript connected");


  const themeButton = document.getElementById("themeToggle"); themeButton.addEventListener("click", function () {   document.body.classList.toggle("dark-mode");   if (document.body.classList.contains("dark-mode")) {  themeButton.textContent = "Switch to Light Mode";   } else {  themeButton.textContent = "Switch to Dark Mode";   } });
})();
