console.log("Script loaded!");
const flashcard = document.getElementById("flashcard");
const front = document.getElementById("card-front");
const back = document.getElementById("card-back");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

const cards = [
  {
    question: "💧 What is the functional group in ethanol?",
    answer: "🧪 Hydroxyl (-OH)"
  },
  {
    question: "⚗️ Name the product of ethene + HBr",
    answer: "👉 Bromoethane"
  },
  {
    question: "🧠 What is the hybridization of carbon in methane?",
    answer: "🔬 sp3"
  }
];

let currentCard = 0;

function showCard(index) {
  front.textContent = cards[index].question;
  back.textContent = cards[index].answer;
  flashcard.classList.remove("flipped");
}

flashcard.addEventListener("click", () => {
  flashcard.classList.toggle("flipped");
});

nextBtn.addEventListener("click", () => {
  currentCard = (currentCard + 1) % cards.length;
  showCard(currentCard);
});

prevBtn.addEventListener("click", () => {
  currentCard = (currentCard - 1 + cards.length) % cards.length;
  showCard(currentCard);
});

showCard(currentCard);

const themeToggleBtn = document.getElementById("theme-toggle");
const body = document.body;

const themes = ["light-mode", "dark-mode", "rainy-mode"];
let currentThemeIndex = 0;

function spawnRaindrops(enable) {
  const container = document.getElementById("raindrops");
  container.innerHTML = ""; // Clear previous

  if (!enable) return;

  for (let i = 0; i < 60; i++) {
    const drop = document.createElement("div");
    drop.className = "raindrop";
    drop.style.left = Math.random() * 100 + "vw";
    drop.style.animationDuration = 0.5 + Math.random() + "s";
    drop.style.animationDelay = Math.random() * 2 + "s";
    container.appendChild(drop);
  }
}

function updateTheme() {
  // Remove all other themes
  themes.forEach(t => body.classList.remove(t));

  // Add current theme
  const theme = themes[currentThemeIndex];
  body.classList.add(theme);

  // Update button emoji
  if (theme === "light-mode") {
    themeToggleBtn.textContent = "☀️ Toggle Theme";
  } else if (theme === "dark-mode") {
    themeToggleBtn.textContent = "🌙 Toggle Theme";
  } else if (theme === "rainy-mode") {
    themeToggleBtn.textContent = "🌧️ Toggle Theme";
  }  

  // Trigger raindrops only in rainy mode
  spawnRaindrops(theme === "rainy-mode");
}

themeToggleBtn.addEventListener("click", () => {
  currentThemeIndex = (currentThemeIndex + 1) % themes.length;
  updateTheme();
});

// Set default theme on page load
updateTheme();
