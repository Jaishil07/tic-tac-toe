function createPlayer(name) {
    const playerName = name;
    let marker;
    let score;
    let chance = false;

    function selectMarker(m) {
        marker = m;
    }

    function getMarker() {
        return marker;
    }

    function addScore() {
        score++;
    }

    function getScore() {
        return score;
    }

    function setChance() {
        if (chance == true) {
            chance = false;
        } else {
            chance = true;
        }
    }

    function getChance() {
        return chance;
    }

    return { playerName, selectMarker, getMarker, addScore, getScore, setChance, getChance };
};

const game = (() => {
    const player1 = createPlayer("One");
    const player2 = createPlayer("Two");
    let win;
    player1.setChance();

    const cells = document.querySelectorAll(".cell");

    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", () => {
            const col = i % 3;
            const row = Math.floor(i / 3);

            update(row, col);
        });
    }

    player1.selectMarker("X");
    player2.selectMarker("O");

    let gameState = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    function update(i, j) {
        let marker;

        if (player1.getChance()) {
            marker = player1.getMarker();
        } else {
            marker = player2.getMarker();
        }

        if (gameState[i][j]) {
            console.log("Spot is Filled");
        } else {
            gameState[i][j] = marker;
            cells[3 * i + j].textContent = marker;
        }

        player1.setChance();
        player2.setChance();

        check(marker);
    }

    function check(marker) {

        for (let i = 0; i < 3; i++) {
            if (gameState[i][0] === marker && gameState[i][1] === marker && gameState[i][2] === marker
                ||
                gameState[0][i] === marker && gameState[1][i] === marker && gameState[2][i] === marker
                ||
                gameState[0][0] === marker && gameState[1][1] === marker && gameState[2][2] === marker
            ) {
                console.log("Something is fishy");
                win = marker;
                endGame();
                reset();
            }
        }
        console.log("No one is winning mate");
        return false;
    };

    function endGame() {
        cells.forEach((cell) => {
            cell.classList.toggle('cell-fill');
        });
    }

    function reset() {
        win = undefined;
        cells.forEach((cell) => {
            cell.textContent = "";
            cell.classList.toggle('cell-fill');
        });
        gameState = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];

    };

    return { player1, player2, update, check };
})();


// function round(){

// }


// game.update(0, 0);
// game.update(2, 2);
// game.update(1, 0);
// game.update(1, 2);
// game.update(2, 0);
// console.log(game.check('X'));
// console.log(game.check('Y'));