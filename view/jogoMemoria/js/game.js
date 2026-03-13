const grid = document.querySelector(".grid");
const playerSpan = document.querySelector(".player");
const timerSpan = document.querySelector(".timer");

const characters = [
    "pena",
    "maca",
    "flor",
    "cogumelo",
    "arara",
    "laranja",
    "nuvem",
    "banana",
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;

    return element;
};

const checkEndGame = () => {
    const matchedCards = document.querySelectorAll(".matched");

    if (matchedCards.length === 16) {
        clearInterval(timerLoop); // PARA O TEMPO

        setTimeout(() => {
            showToast();
        }, 500);
    }
};

const checkCards = () => {
    const firstCharacter = firstCard.dataset.character;
    const secondCharacter = secondCard.dataset.character;

    if (firstCharacter === secondCharacter) {
        setTimeout(() => {
            // pega a frente da carta
            const firstFront = firstCard.querySelector(".front");
            const secondFront = secondCard.querySelector(".front");

            // remove o desfoque
            firstFront.classList.remove("frontDesfoque");
            secondFront.classList.remove("frontDesfoque");

            // trava as cartas
            firstCard.classList.add("matched");
            secondCard.classList.add("matched");

            resetBoard();
            checkEndGame();
        }, 800);
    } else {
        setTimeout(() => {
            firstCard.classList.remove("reveal-card");
            secondCard.classList.remove("reveal-card");

            resetBoard();
        }, 800);
    }
};

const resetBoard = () => {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
};

const revealCard = ({ target }) => {
    const card = target.parentNode;

    if (lockBoard) return;
    if (card.classList.contains("reveal-card")) return;
    if (card.classList.contains("matched")) return;

    card.classList.add("reveal-card");

    if (!firstCard) {
        firstCard = card;
        return;
    }

    secondCard = card;

    lockBoard = true;

    checkCards();
};

const createCard = (character, type) => {
    const card = createElement("div", "card");
    const front = createElement("div", "face front frontDesfoque");
    const back = createElement("div", "face back");

    front.style.backgroundImage = `url('./imagens/${type}/${character}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener("click", revealCard);
    card.setAttribute("data-character", character);

    return card;
};

const loadGame = () => {
    const cards = [];

    characters.forEach((character) => {
        cards.push({
            name: character,
            type: "sinais",
        });

        cards.push({
            name: character,
            type: "itens",
        });
    });

    const shuffled = cards.sort(() => Math.random() - 0.5);

    shuffled.forEach((item) => {
        const card = createCard(item.name, item.type);
        grid.appendChild(card);
    });
};

const startTimer = () => {
    timerLoop = setInterval(() => {
        const currentTime = +timerSpan.innerHTML;
        timerSpan.innerHTML = currentTime + 1;
    }, 1000);
};

window.onload = () => {
    playerSpan.innerHTML = localStorage.getItem("player");

    startTimer();
    loadGame();
};

const showToast = () => {
    const toast = document.getElementById("toast");
    const player = localStorage.getItem("player");
    const time = timerSpan.innerText;

    document.getElementById("toast-player").innerText = `Jogador: ${player}`;

    document.getElementById("toast-time").innerText = `Tempo: ${time} segundos`;

    toast.classList.add("show");
};
