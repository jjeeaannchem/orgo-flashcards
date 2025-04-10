const flashcard = document.getElementById("flashcard");
const front = document.getElementById("card-front");
const back = document.getElementById("card-back");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

const cards = [
  {
    question: "What is the functional group in ethanol?",
    answer: "Hydroxyl (-OH)"
  },
  {
    question: "Name the product of ethene + HBr",
    answer: "Bromoethane"
  },
  {
    question: "What is the hybridization of carbon in methane?",
    answer: "sp3"
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

// Default to light mode
document.body.classList.add("light-mode");

themeToggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("light-mode");
  document.body.classList.toggle("dark-mode");

  // Optional: change emoji on the button
  if (document.body.classList.contains("dark-mode")) {
    themeToggleBtn.textContent = "🌙 Toggle Theme";
  } else {
    themeToggleBtn.textContent = "🌞 Toggle Theme";
  }
});

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
