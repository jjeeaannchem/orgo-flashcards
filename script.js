console.log("Script loaded!");
const flashcard = document.getElementById("flashcard");
const front = document.getElementById("card-front");
const back = document.getElementById("card-back");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const cardInner = document.querySelector(".card-inner");


const cards = [
  // Functional Groups
  {
    category: "Functional Groups",
    question: "💧 What is the functional group in ethanol?",
    answer: "🧪 Hydroxyl (-OH)"
  },
  {
    category: "Functional Groups",
    question: "🌿 What functional group is present in acetic acid?",
    answer: "🧪 Carboxylic acid (-COOH)"
  },
  {
    category: "Functional Groups",
    question: "🔗 What group defines an aldehyde?",
    answer: "🧪 Carbonyl group (C=O) at the end of a chain"
  },
  {
    category: "Functional Groups",
    question: "⚗️ What is the functional group of ketones?",
    answer: "🧪 Carbonyl group (C=O) within a chain"
  },
  {
    category: "Functional Groups",
    question: "💥 What group makes amines basic?",
    answer: "🧪 Amino group (-NH2)"
  },

  // Nomenclature
  {
    category: "Nomenclature",
    question: "📛 What is the IUPAC name for acetone?",
    answer: "🧪 Propanone"
  },
  {
    category: "Nomenclature",
    question: "🔤 What is the name of CH3-CH2-OH?",
    answer: "🧪 Ethanol"
  },
  {
    category: "Nomenclature",
    question: "🧬 What is the name for a six-carbon chain with a double bond on carbon 2?",
    answer: "🧪 Hex-2-ene"
  },

  // Hybridization
  {
    category: "Hybridization",
    question: "🧠 What is the hybridization of carbon in methane?",
    answer: "🔬 sp3"
  },
  {
    category: "Hybridization",
    question: "🧠 What is the hybridization in ethene?",
    answer: "🔬 sp2"
  },
  {
    category: "Hybridization",
    question: "🧠 What is the hybridization in ethyne (acetylene)?",
    answer: "🔬 sp"
  },

  // Reactions
  {
    category: "Reactions",
    question: "⚗️ What is the product of ethene + HBr?",
    answer: "🧪 Bromoethane (via Markovnikov addition)"
  },
  {
    category: "Reactions",
    question: "🔥 What happens when alcohols are oxidized?",
    answer: "🧪 They form aldehydes, then carboxylic acids"
  }
];

let currentCard = 0;

let filteredCards = [...cards];

document.getElementById("category-select").addEventListener("change", (e) => {
  const selected = e.target.value;
  filteredCards = selected === "All" ? cards : cards.filter(c => c.category === selected);
  currentCard = 0;
  showCard(currentCard);
});

function showCard(index) {
  if (filteredCards.length === 0) {
    front.textContent = "No cards in this category.";
    back.textContent = "Try choosing a different category.";
    return;
  }

  front.textContent = filteredCards[index].question;
  back.textContent = filteredCards[index].answer;
  flashcard.classList.toggle("flipped");
}

nextBtn.addEventListener("click", () => {
  if (filteredCards.length === 0) return;
  currentCard = (currentCard + 1) % filteredCards.length;
  showCard(currentCard);
});

prevBtn.addEventListener("click", () => {
  if (filteredCards.length === 0) return;
  currentCard = (currentCard - 1 + filteredCards.length) % filteredCards.length;
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
