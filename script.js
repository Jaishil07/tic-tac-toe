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
    player1.setChance();

    player1.selectMarker("X");
    player2.selectMarker("Y");

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
        }

        player1.setChance();
        player2.setChance();
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
                return marker;
            }
        }
        console.log("No one is winning mate");
        return false;
    };



    return { player1, player2, update, check };
})();

game.update(0, 0);
game.update(2, 2);
game.update(1, 0);
game.update(1, 2);
game.update(2, 0);
console.log(game.check('X'));