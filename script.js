const truthQuestions = [
    "Have you ever lied to your best friend?",
    "What's the most embarrassing thing you've done in public?",
    "Have you ever cheated in a game?",
    "What's your biggest fear?",
    "What's your most embarrassing nickname?"
];

const dareTasks = [
    "Do an impression of your favorite cartoon character.",
    "Sing a song in a funny voice.",
    "Dance to a random song for 30 seconds.",
    "Call a friend and speak in a foreign accent for 2 minutes.",
    "Take a selfie with a funny face and set it as your profile picture for an hour."
];

let players = [];
let scores = [];
let currentPlayerIndex = 0;
let totalRounds = 0;
let currentRound = 1;

function startGame() {
    const playerCountInput = document.getElementById('playerCount').value;
    const roundCountInput = document.getElementById('roundCount').value;
    const playerNamesInput = document.getElementById('playerNames').value;
    
    if (!playerCountInput || !roundCountInput || !playerNamesInput) {
        alert('Please fill in all fields!');
        return;
    }

    const playerCount = parseInt(playerCountInput);
    totalRounds = parseInt(roundCountInput);
    
    if (playerCount < 2 || playerCount > 10) {
        alert('Please enter a valid number of players (between 2 and 10).');
        return;
    }
    
    if (totalRounds < 1) {
        alert('Please enter a valid number of rounds (at least 1).');
        return;
    }

    players = playerNamesInput.split(',').map(name => name.trim()).slice(0, playerCount);
    if (players.length < 2) {
        alert('At least 2 players are required!');
        return;
    }

    scores = new Array(players.length).fill(0);
    document.querySelector('.player-input').style.display = 'none';
    document.querySelector('.game-section').style.display = 'block';
    updateCurrentPlayer();
    updateScoreboard();
    startRound();
}

function startRound() {
    if (currentRound > totalRounds) {
        endGame();
        return;
    }
    alert(`Starting round ${currentRound} of ${totalRounds}`);
    currentRound++;
}

function updateCurrentPlayer() {
    document.getElementById('currentPlayer').textContent = `Current Player: ${players[currentPlayerIndex]}`;
}

function updateScoreboard() {
    const scoreboardDiv = document.getElementById('scoreboard');
    scoreboardDiv.innerHTML = players.map((player, index) => `<div class="player">${player}: ${scores[index]} points</div>`).join('');
}

function displaySpinner(callback) {
    const spinner = document.getElementById('spinner');
    const symbols = ['|', '/', '-', '\\'];
    let index = 0;

    spinnerInterval = setInterval(() => {
        spinner.textContent = symbols[index];
        index = (index + 1) % symbols.length;
    }, 100);

    setTimeout(() => {
        clearInterval(spinnerInterval);
        spinner.textContent = '';
        callback();
        document.getElementById('increaseScoreButton').style.display = 'block'; // Show button after task
    }, 2000);
}

function selectTruth() {
    document.getElementById('increaseScoreButton').style.display = 'none'; // Hide button initially
    displaySpinner(() => {
        const question = truthQuestions[Math.floor(Math.random() * truthQuestions.length)];
        document.getElementById('task').textContent = `Truth: ${question}`;
    });
}

function selectDare() {
    document.getElementById('increaseScoreButton').style.display = 'none'; // Hide button initially
    displaySpinner(() => {
        const dare = dareTasks[Math.floor(Math.random() * dareTasks.length)];
        document.getElementById('task').textContent = `Dare: ${dare}`;
    });
}

function increaseScore() {
    scores[currentPlayerIndex]++;
    updateScoreboard();
}

function nextPlayer() {
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    updateCurrentPlayer();
    document.getElementById('task').textContent = '';
    document.getElementById('increaseScoreButton').style.display = 'none'; // Hide button for next turn

    // Display "Next Player" button only after completing a turn
    if (currentPlayerIndex === 0 && currentRound <= totalRounds) {
        startRound();
    }
}

function endGame() {
    alert('Game Over!');
    const winnerIndex = scores.indexOf(Math.max(...scores));
    alert(`The winner is ${players[winnerIndex]} with ${scores[winnerIndex]} points!`);
    resetGame();
}

function resetGame() {
    players = [];
    scores = [];
    currentPlayerIndex = 0;
    currentRound = 1;
    totalRounds = 0;
    document.querySelector('.game-section').style.display = 'none';
    document.querySelector('.player-input').style.display = 'block';
}
