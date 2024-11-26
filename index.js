<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Truth or Dare</title>
    <link rel="stylesheet" href="./style.css"/>
    <script src="./script.js"></script>
</head>
<body>
    <h1>Truth or Dare</h1>
    <div class="container">
        <!-- Input for the number of players and rounds -->
        <div class="player-input">
            <label for="playerCount">How many players want to play?</label>
            <input type="number" id="playerCount" min="2" placeholder="Number of players" style="width: 100%; margin-bottom: 10px;">
            
            <label for="roundCount">How many rounds to play?</label>
            <input type="number" id="roundCount" min="1" placeholder="Number of rounds" style="width: 100%; margin-bottom: 10px;">
            
            <label for="playerNames">Enter player names (comma-separated):</label>
            <input type="text" id="playerNames" placeholder="e.g., Alice, Bob, Charlie" style="width: 100%; margin-bottom: 10px;">
            
            <button class="button" onclick="startGame()">Start Game</button>
        </div>

        <!-- Game Section -->
        <div class="game-section" style="display: none;">
            <p id="currentPlayer"></p>
            <button class="button" onclick="selectTruth()">Truth</button>
            <button class="button" onclick="selectDare()">Dare</button>
            <p id="task" style="margin-top: 20px;"></p>
            <div id="spinner"></div>

            <button class="button" id="increaseScoreButton" style="display: none;" onclick="increaseScore()">Increase Score</button>
            <button class="button" id="nextPlayerButton" onclick="nextPlayer()">Next Player</button>

            <div class="scoreboard">
                <h3>Scoreboard</h3>
                <div id="scoreboard"></div>
            </div>
        </div>
    </div>
</body>
</html>
