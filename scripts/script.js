const animalImages = [
    'assets/animal1.jpg', 'assets/animal1.jpg',
    'assets/animal2.jpg', 'assets/animal2.jpg',
    'assets/animal3.jpg', 'assets/animal3.jpg',
    'assets/animal4.jpg', 'assets/animal4.jpg',
    'assets/animal5.jpg', 'assets/animal5.jpg',
    'assets/animal6.jpg', 'assets/animal6.jpg',
    'assets/animal7.jpg', 'assets/animal7.jpg',
    'assets/animal8.jpg', 'assets/animal8.jpg',
    'assets/animal9.jpg', 'assets/animal9.jpg',
    'assets/animal10.jpg', 'assets/animal10.jpg',
    'assets/animal11.jpg', 'assets/animal11.jpg',
    'assets/animal12.jpg', 'assets/animal12.jpg',
    'assets/animal13.jpg', 'assets/animal13.jpg',
    'assets/animal14.jpg', 'assets/animal14.jpg',
    'assets/animal15.jpg', 'assets/animal15.jpg',
    'assets/animal16.jpg', 'assets/animal16.jpg',
    'assets/animal17.jpg', 'assets/animal17.jpg',
    'assets/animal18.jpg', 'assets/animal18.jpg',
    'assets/animal19.jpg', 'assets/animal19.jpg',
    'assets/animal20.jpg', 'assets/animal20.jpg',
    'assets/animal21.jpg', 'assets/animal21.jpg',
    'assets/animal22.jpg', 'assets/animal22.jpg',
    'assets/animal23.jpg', 'assets/animal23.jpg',
    'assets/animal24.jpg', 'assets/animal24.jpg',
    'assets/animal25.jpg', 'assets/animal25.jpg'
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;
let steps = 0;
let matches = 0;
let totalPairs = 8;
const stepsCounter = document.getElementById('steps-counter');
const bestScoreElement = document.getElementById('best-score');
const gridSizeSelect = document.getElementById('grid-size');
let bestScore = localStorage.getItem('bestScore') || Infinity;
bestScoreElement.textContent = bestScore === Infinity ? 'N/A' : bestScore;

gridSizeSelect.addEventListener('change', createBoard);

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    const gridSize = parseInt(gridSizeSelect.value);
    const gameBoard = document.getElementById('game-board');
    gameBoard.style.gridTemplateColumns = `repeat(${gridSize}, 100px)`;
    gameBoard.innerHTML = '';
    
    const numberOfPairs = (gridSize * gridSize) / 2;
    totalPairs = numberOfPairs;
    const selectedImages = animalImages.slice(0, numberOfPairs * 2);
    shuffle(selectedImages);

    selectedImages.forEach(imageSrc => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        const imageElement = document.createElement('img');
        imageElement.src = imageSrc;
        cardElement.appendChild(imageElement);
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });

    steps = 0;
    matches = 0;
    updateSteps();
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    steps++;
    updateSteps();
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.querySelector('img').src === secondCard.querySelector('img').src;
    isMatch ? disableCards() : unflipCards();
    if (isMatch) {
        matches++;
        if (matches === totalPairs) {
            updateBestScore();
        }
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

function updateSteps() {
    stepsCounter.textContent = steps;
}

function updateBestScore() {
    if (steps < bestScore) {
        bestScore = steps;
        bestScoreElement.textContent = bestScore;
        localStorage.setItem('bestScore', bestScore);
    }
}

document.getElementById('reset-button').addEventListener('click', createBoard);

createBoard();
