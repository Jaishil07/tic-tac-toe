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

    function resetChance() {
        chance = false;
    }

    return { playerName, selectMarker, getMarker, addScore, getScore, setChance, getChance, resetChance };
};

const game = (() => {

    const player1 = createPlayer("Bilbo");
    const player2 = createPlayer("Frodo");
    const modalButton = document.querySelector("#mbtn");
    modalButton.addEventListener("click", getName);

    getName();


    const turn = document.querySelector(".turn");
    turn.textContent = 'X';

    function setName(name1 = "Bilbo", name2 = "Frodo") {
        player1.playerName = name1;
        player2.playerName = name2;
    }


    let win;
    player1.setChance();

    const winner = document.querySelector("#game-result");
    const button = document.querySelector("#btn");
    button.addEventListener("click", reset);


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
        let name;

        if (player1.getChance()) {
            marker = player1.getMarker();
            name = player1.playerName;
        } else {
            marker = player2.getMarker();
            name = player2.playerName;
        }

        if (gameState[i][j]) {
            console.log("Spot is Filled");
        } else {
            gameState[i][j] = marker;
            cells[3 * i + j].textContent = marker;
            cells[3 * i + j].classList.add("cell-fill");
        }

        player1.setChance();
        player2.setChance();

        if (player1.getChance()) {
            turn.textContent = player1.getMarker();
        } else {
            turn.textContent = player2.getMarker();
        }

        check(marker, name);
    }

    function check(marker, name) {
        if (gameState[0][0] === marker && gameState[1][1] === marker && gameState[2][2] === marker) {
            cells[0 + 0].classList.add("cell-won");
            cells[3 + 1].classList.add("cell-won");
            cells[6 + 2].classList.add("cell-won");

            win = marker;
            winner.textContent = `${name} wins !`;

            cells.forEach((cell) => {
                cell.classList.add("cell-fill");
            });
        }

        if (gameState[0][2] === marker && gameState[1][1] === marker && gameState[2][0] === marker) {
            cells[0 + 2].classList.add("cell-won");
            cells[3 + 1].classList.add("cell-won");
            cells[6 + 0].classList.add("cell-won");

            win = marker;
            winner.textContent = `${name} wins !`;

            cells.forEach((cell) => {
                cell.classList.add("cell-fill");
            });
        }

        for (let i = 0; i < 3; i++) {
            //Check For row
            if (gameState[i][0] === marker && gameState[i][1] === marker && gameState[i][2] === marker) {
                cells[3 * i + 0].classList.add("cell-won");
                cells[3 * i + 1].classList.add("cell-won");
                cells[3 * i + 2].classList.add("cell-won");

                win = marker;
                winner.textContent = `${name} wins !`;

                cells.forEach((cell) => {
                    cell.classList.add("cell-fill");
                });
            }

            //Check for Column
            if (gameState[0][i] === marker && gameState[1][i] === marker && gameState[2][i] === marker) {
                cells[0 + i].classList.add("cell-won");
                cells[3 + i].classList.add("cell-won");
                cells[6 + i].classList.add("cell-won");

                win = marker;
                winner.textContent = `${name} wins !`;

                cells.forEach((cell) => {
                    cell.classList.add("cell-fill");
                });
            }
        }
    };

    function reset() {
        win = undefined;
        cells.forEach((cell) => {
            cell.textContent = "";
            cell.classList.remove('cell-fill');
            cell.classList.remove('cell-won');
        });
        gameState = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];

        winner.textContent = "";

        player1.resetChance();
        player2.resetChance();

        player1.setChance();
    };



    return { player1, player2, update, check, setName };
})();


function getName() {
    const modal = document.querySelector("dialog");
    modal.showModal();


    const submit = document.querySelector("#btn-modal");
    submit.addEventListener("click", (e) => {
        e.preventDefault();

        const player1 = document.querySelector("#p1").value || "Bilbo";
        const player2 = document.querySelector("#p2").value || "Frodo";

        game.setName(player1, player2);
        modal.close();
    });

    const closeButton = document.querySelector("#close-modal");
    closeButton.addEventListener("click", () => modal.close());
}
