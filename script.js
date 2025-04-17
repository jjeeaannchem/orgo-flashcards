console.log("Script loaded!");

// Centralized error handler
const errorHandler = {
  log(error, context = {}) {
    console.error(`Error: ${error.message}`, { error, context });
  },
  
  handle(error, context = {}) {
    this.log(error, context);
    // Could add user-facing error notification here
  }
};

// DOM element references with error handling
function getElement(id) {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Element with ID "${id}" not found in the DOM`);
  }
  return element;
}

try {
const flashcard = document.getElementById("flashcard");
const front = document.getElementById("card-front");
const back = document.getElementById("card-back");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const categorySelect = getElement("category-select");
const themeToggleBtn = getElement("theme-toggle");
  
  // Use querySelector with error handling
  const cardInner = document.querySelector(".card-inner");
  if (!cardInner) {
    throw new Error("Card inner element not found");
  }

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

// Function to show card with error handling
  function showCard(index) {
    try {
      if (filteredCards.length === 0) {
        front.textContent = "No cards in this category.";
        back.textContent = "Try choosing a different category.";
        return;
      }
      
      // Ensure index is within bounds
      const safeIndex = ((index % filteredCards.length) + filteredCards.length) % filteredCards.length;
      
      if (cardInner.classList.contains("flipped")) {
        cardInner.classList.remove("flipped");
      }
      
      // Check if card properties exist
      const card = filteredCards[safeIndex];
      if (!card) {
        throw new Error(`Card at index ${safeIndex} not found`);
      }
      
      front.textContent = card.question || "Question not available";
      back.textContent = card.answer || "Answer not available";
    } catch (error) {
      errorHandler.handle(error, { index });
      // Fallback display
      front.textContent = "Error loading card";
      back.textContent = "Please try again";
    }
  }
  
  // Category selector event listener
  categorySelect.addEventListener("change", (e) => {
    try {
      const selected = e.target.value;
      filteredCards = selected === "All" ? 
        [...cards] : 
        cards.filter(c => c.category === selected);
      
      currentCard = 0;
      showCard(currentCard);
    } catch (error) {
      errorHandler.handle(error, { action: "filter-category" });
    }
  });
  
  // Card flip event listener
  flashcard.addEventListener("click", () => {
  try {
    // Toggle the flipped class on card-inner instead of flashcard
    cardInner.classList.toggle("flipped");
  } catch (error) {
    console.error("Error flipping card:", error);
  }
});
  
  // Next button event listener
  nextBtn.addEventListener("click", () => {
    try {
      if (filteredCards.length === 0) return;
      currentCard = (currentCard + 1) % filteredCards.length;
      showCard(currentCard);
    } catch (error) {
      errorHandler.handle(error, { action: "next-card" });
    }
  });
  
  // Previous button event listener
  prevBtn.addEventListener("click", () => {
    try {
      if (filteredCards.length === 0) return;
      currentCard = (currentCard - 1 + filteredCards.length) % filteredCards.length;
      showCard(currentCard);
    } catch (error) {
      errorHandler.handle(error, { action: "prev-card" });
    }
  });
  
  // Theme handling
  const body = document.body;
  const themes = ["light-mode", "dark-mode", "rainy-mode"];
  let currentThemeIndex = 0;
  
  function spawnRaindrops(enable) {
    try {
      const container = document.getElementById("raindrops");
      if (!container) {
        throw new Error("Raindrops container not found");
      }
      
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
    } catch (error) {
      errorHandler.handle(error, { action: "spawn-raindrops", enable });
    }
  }
  
  function updateTheme() {
    try {
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
    } catch (error) {
      errorHandler.handle(error, { action: "update-theme" });
    }
  }
  
  themeToggleBtn.addEventListener("click", () => {
    try {
      currentThemeIndex = (currentThemeIndex + 1) % themes.length;
      updateTheme();
    } catch (error) {
      errorHandler.handle(error, { action: "toggle-theme" });
    }
  });
  
  // Initialize app
  showCard(currentCard);
  updateTheme();
  
  console.log("App initialized successfully!");
  
} catch (error) {
  console.error("Failed to initialize app:", error);
  // Display user-friendly error message
  document.body.innerHTML = `
    <div style="text-align: center; margin-top: 50px;">
      <h2>Oops! Something went wrong.</h2>
      <p>The flashcard app couldn't be loaded. Please refresh the page and try again.</p>
    </div>
  `;
}
