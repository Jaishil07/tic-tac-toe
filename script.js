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
    player1.setChance();
    const manage = manageUI();

    manage.openModal();
    manage.getName();
    manage.setTurnX();

    function setName(name1 = "Bilbo", name2 = "Frodo") {
        player1.playerName = name1;
        player2.playerName = name2;
    }

    player1.selectMarker("X");
    player2.selectMarker("O");

    let marker = player1.getMarker();

    let gameState = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    function update(i, j) {
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
            manage.fillCell(3 * i + j, marker);
            manage.blockCell(3 * i + j);
            console.log(gameState);
        }

        player1.setChance();
        player2.setChance();

        if (player1.getChance()) {
            manage.setTurnX();
        } else {
            manage.setTurnO();
        }

        const result = check(marker, name);
        if(!result){
            checkDraw();
        }
    }

    function check(marker, name) {
        if (gameState[0][0] === marker && gameState[1][1] === marker && gameState[2][2] === marker) {
            manage.cellWon(0 + 0);
            manage.cellWon(3 + 1);
            manage.cellWon(6 + 2);

            manage.setWinner(name);
            manage.blockAllCell();
            manage.setTurnGameOver();

            return true;
        }

        if (gameState[0][2] === marker && gameState[1][1] === marker && gameState[2][0] === marker) {
            manage.cellWon(0 + 2);
            manage.cellWon(3 + 1);
            manage.cellWon(6 + 0);

            manage.setWinner(name);
            manage.blockAllCell();
            manage.setTurnGameOver();
            return true;
        }

        for (let i = 0; i < 3; i++) {
            //Check For row
            if (gameState[i][0] === marker && gameState[i][1] === marker && gameState[i][2] === marker) {
                manage.cellWon(3 * i + 0);
                manage.cellWon(3 * i + 1);
                manage.cellWon(3 * i + 2);

                manage.setWinner(name);
                manage.blockAllCell();
                manage.setTurnGameOver();
                return true;
            }

            //Check for Column
            if (gameState[0][i] === marker && gameState[1][i] === marker && gameState[2][i] === marker) {
                manage.cellWon(0 + i);
                manage.cellWon(3 + i);
                manage.cellWon(6 + i);

                manage.setWinner(name);
                manage.blockAllCell();
                manage.setTurnGameOver();
                return true;
            }
        }
        return false;
    };

    function checkDraw(){
        let draw = false;

        for(let i = 0; i<3; i++){
            for(let j = 0; j < 3; j++){
                if(gameState[i][j]==0){
                    return draw;
                }
            }
        }
        manage.setDraw();
        return true;
    }

    function reset() {
        manage.resetCells();
        gameState = [
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0]
        ];

        manage.clearWinner();

        player1.resetChance();
        player2.resetChance();

        player1.setChance();
        manage.setTurnX();
    };

    return { player1, player2, marker, update, check, setName, reset };
})();


function manageUI() {
    const cells = document.querySelectorAll(".cell");
    const turn = document.querySelector(".turn");
    const winner = document.querySelector("#game-result");
    const button = document.querySelector("#btn");
    button.addEventListener("click", () => game.reset());

    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener("click", () => {
            const col = i % 3;
            const row = Math.floor(i / 3);

            game.update(row, col);
        });
    }


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

    function resetCells() {
        cells.forEach((cell) => {
            cell.textContent = "";
            cell.classList.remove('cell-fill');
            cell.classList.remove('cell-won');
        });
    }
    function openModal() {
        const modalButton = document.querySelector("#mbtn");
        modalButton.addEventListener("click", getName);
    }

    function setTurnX() {
        turn.textContent = 'X';
    }

    function setTurnO() {
        turn.textContent = 'O';
    }

    function setTurnGameOver() {
        turn.textContent = 'Game Over';
    }

    function setWinner(win) {
        winner.textContent = win + ' wins!';
    }

    function setDraw(){
        winner.textContent = 'It is a draw...'
    }

    function clearWinner(){
        winner.textContent = "";
    }

    function blockAllCell() {
        cells.forEach((cell) => {
            cell.classList.add("cell-fill");
        })
    }

    function cellWon(i) {
        cells[i].classList.add("cell-won");
    }

    function fillCell(i, marker) {
        cells[i].textContent = marker;
    }

    function blockCell(i) {
        cells[i].classList.add("cell-fill");
    }


    return {
        getName, resetCells, openModal, setTurnX, setTurnO,
        setTurnGameOver, setWinner, blockAllCell, cellWon,
        fillCell, blockCell, clearWinner, setDraw,
    };
};