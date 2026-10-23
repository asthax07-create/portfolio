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

const cityInput = document.getElementById("cityInput");
const weatherButton = document.getElementById("weatherButton");
const weatherResult = document.getElementById("weatherResult");
async function getWeather() {

  const city = cityInput.value.trim();

  if (!city) {
      weatherResult.textContent = "Please enter a city.";
      return;
  }

  weatherResult.textContent = "Loading weather...";

  const apiKey = "d62f4f15d9af80a3bc66113ce09a8e55";

  const url =
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {

      const response = await fetch(url);

      if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
      }

      const data = await response.json();

      weatherResult.innerHTML = `
          <h3>${data.name}</h3>
          <p>Temperature: ${data.main.temp}°C</p>
          <p>Condition: ${data.weather[0].description}</p>
      `;

  } catch (error) {

      weatherResult.textContent =
          "Unable to fetch weather. Please try again.";

      console.error(error);
  }
}
weatherButton.addEventListener("click", getWeather);

const projectSearch = document.getElementById("projectSearch");
const projectCards = document.querySelectorAll(".project-card");

projectSearch.addEventListener("input", function () {
    const searchTerm = projectSearch.value.toLowerCase();

    projectCards.forEach(function (card) {
        const projectText = card.textContent.toLowerCase();
        const technologies = card.dataset.tech.toLowerCase();

        if (
            projectText.includes(searchTerm) ||
            technologies.includes(searchTerm)
        ) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }
    });
});

