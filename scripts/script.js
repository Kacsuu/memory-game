const animalImages = [
    'assets/animal1.jpg', 'assets/animal1.jpg',
    'assets/animal2.jpg', 'assets/animal2.jpg',
    'assets/animal3.jpg', 'assets/animal3.jpg',
    'assets/animal4.jpg', 'assets/animal4.jpg',
    'assets/animal5.jpg', 'assets/animal5.jpg',
    'assets/animal6.jpg', 'assets/animal6.jpg',
    'assets/animal7.jpg', 'assets/animal7.jpg',
    'assets/animal8.jpg', 'assets/animal8.jpg'
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    shuffle(animalImages);
    animalImages.forEach(imageSrc => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        const imageElement = document.createElement('img');
        imageElement.src = imageSrc;
        cardElement.appendChild(imageElement);
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
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
    checkForMatch();
}

function checkForMatch() {
    const isMatch = firstCard.querySelector('img').src === secondCard.querySelector('img').src;
    isMatch ? disableCards() : unflipCards();
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

document.getElementById('reset-button').addEventListener('click', createBoard);

createBoard();
