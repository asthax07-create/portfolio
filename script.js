/* ---------- Year, theme, mobile menu ---------- */
(function () {
  const yearEl = document.getElementById("year");
  const themeToggle = document.getElementById("theme-toggle");
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("primary-nav");
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

  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem(storageKey);
  } catch (e) {
    /* storage unavailable: fall back to system preference */
  }
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(savedTheme || (prefersDark ? "dark" : "light"));

  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      const nextTheme = document.body.classList.contains("dark") ? "light" : "dark";
      try {
        localStorage.setItem(storageKey, nextTheme);
      } catch (e) {}
      applyTheme(nextTheme);
    });
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      const isOpen = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close the menu after tapping a link on mobile
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }
})();

/* ---------- Weather ---------- */
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
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

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
    weatherResult.textContent = "Unable to fetch weather. Please try again.";
    console.error(error);
  }
}

if (weatherButton && cityInput) {
  weatherButton.addEventListener("click", getWeather);
  cityInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") getWeather();
  });
}

/* ---------- Project search ---------- */
const projectSearch = document.getElementById("projectSearch");
const projectCards = document.querySelectorAll(".project-card");
const projectEmpty = document.getElementById("projectEmpty");

if (projectSearch) {
  projectSearch.addEventListener("input", function () {
    const searchTerm = projectSearch.value.trim().toLowerCase();
    let visible = 0;

    projectCards.forEach(function (card) {
      const projectText = card.textContent.toLowerCase();
      const technologies = (card.dataset.tech || "").toLowerCase();
      const match = projectText.includes(searchTerm) || technologies.includes(searchTerm);

      card.style.display = match ? "" : "none";
      if (match) visible++;
    });

    if (projectEmpty) projectEmpty.hidden = visible > 0;
  });
}