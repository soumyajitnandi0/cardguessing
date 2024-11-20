const openCard = document.querySelector(".open-card");
const closedCard = document.querySelector(".closed-card");
const higherButton = document.getElementById("higher");
const lowerButton = document.getElementById("lower");
const nextButton = document.getElementById("next");
const restartButton = document.getElementById("restartBtn");
const changeDifficultyButton = document.getElementById("difficulty");
const message = document.getElementById("message");
const scoreDisplay = document.getElementById("score");
const highscoreDisplay = document.getElementById("highscore");
const livesDisplay = document.getElementById("lives");

let openCardValue = Math.floor(Math.random() * 100) + 1;
let closedCardValue = Math.floor(Math.random() * 100) + 1;

let score = 0;
let highscore = 0;
let lives = 5;
let range = 100; // Default range for "Easy" difficulty

function setRandomValues() {
    openCardValue = Math.floor(Math.random() * range) + 1;
    closedCardValue = Math.floor(Math.random() * range) + 1;
    openCard.querySelector(".front").textContent = openCardValue;
}

setRandomValues();

higherButton.addEventListener("click", handleHigher);
lowerButton.addEventListener("click", handleLower);
nextButton.addEventListener("click", nextRound);
restartButton.addEventListener("click", restartGame);
changeDifficultyButton.addEventListener("click", changeDifficulty);

function handleHigher() {
    const isCorrect = closedCardValue > openCardValue;

    flipCard(closedCard, closedCardValue);

    if (isCorrect) {
        message.textContent = "You guessed it correctly! 🎉";
        message.style.color = "#00ff15";
        score++;
        updateScore();
    } else {
        message.textContent = "Oops! You guessed wrong! 😢";
        message.style.color = "#ff0000";
        lives--;
        updateLives();
        if (lives === 0) {
            endGame();
        }
    }

    disableButtons();
}

function handleLower() {
    const isCorrect = closedCardValue < openCardValue;

    flipCard(closedCard, closedCardValue);

    if (isCorrect) {
        message.textContent = "You guessed it correctly! 🎉";
        message.style.color = "#00ff15";
        score++;
        updateScore();
    } else {
        message.textContent = "Oops! You guessed wrong! 😢";
        message.style.color = "#ff0000";
        lives--;
        updateLives();
        if (lives === 0) {
            endGame();
        }
    }

    disableButtons();
}

function nextRound() {
    if (lives > 0) {
        openCardValue = closedCardValue;
        closedCardValue = Math.floor(Math.random() * range) + 1;

        openCard.querySelector(".front").textContent = openCardValue;
        closedCard.querySelector(".back").textContent = "";
        closedCard.classList.remove("flipped");

        message.textContent = "Guess hidden number higher or lower than the shown number?";
        message.style.color = "white";

        enableButtons();
    }
}

function updateScore() {
    scoreDisplay.textContent = score;
    if (score > highscore) {
        highscore = score;
        highscoreDisplay.textContent = highscore;
    }
}

function updateLives() {
    livesDisplay.textContent = lives;
}

function flipCard(card, value) {
    card.classList.add("flipped");
    setTimeout(() => {
        card.querySelector(".back").textContent = value;
        card.querySelector(".back").style.color = "#fff";
    }, 300);
}

function disableButtons() {
    higherButton.disabled = true;
    lowerButton.disabled = true;
}

function enableButtons() {
    higherButton.disabled = false;
    lowerButton.disabled = false;
}

function endGame() {
    message.textContent = "Game Over! Restart to play again.";
    message.style.color = "#ff0000";

    higherButton.disabled = true;
    lowerButton.disabled = true;
    nextButton.disabled = true;
}

function restartGame() {
    openCardValue = Math.floor(Math.random() * range) + 1;
    closedCardValue = Math.floor(Math.random() * range) + 1;

    openCard.querySelector(".front").textContent = openCardValue;
    closedCard.querySelector(".back").textContent = "";
    closedCard.classList.remove("flipped");

    score = 0;
    lives = 5;

    updateScore();
    updateLives();

    message.textContent = "Guess hidden number higher or lower than the shown number?";
    message.style.color = "white";

    higherButton.disabled = false;
    lowerButton.disabled = false;
    nextButton.disabled = false;
}

function changeDifficulty() {
    let difficulty = prompt("Enter difficulty (easy, medium, hard):", "easy");
    difficulty = difficulty.toLowerCase();

    if (difficulty === "easy") {
        range = 100;
    } else if (difficulty === "medium") {
        range = 500;
    } else if (difficulty === "hard") {
        range = 1000;
    } else {
        alert("Invalid difficulty! Defaulting to Easy.");
        range = 100;
    }

    restartGame();
}
