// Select all boxes
const boxes = document.querySelectorAll(".box");

// Select message elements
const msgcont = document.querySelector(".msg_cont");
const msgbox = document.querySelector(".msgbox");

// Select buttons
const resetgame = document.querySelector(".reset");
const newgame = document.querySelector(".newgame");

// O ki turn se game start hoga
let turno = true;


// Winning Patterns
const winningPatterns = [
    // Rows
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    // Columns
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    // Diagonals
    [0, 4, 8],
    [2, 4, 6]
];


// Disable all boxes
const disabledbtn = () => {

    for (let box of boxes) {
        box.disabled = true;
    }

};


// Show winner message
const showinner = (winner) => {

    msgbox.innerText = `Congratulations! Winner is ${winner}`;

    msgcont.classList.remove("hide");

    disabledbtn();
};


// Check winner
const checkwinner = () => {

    for (let pattern of winningPatterns) {

        let val1 = boxes[pattern[0]].innerText;
        let val2 = boxes[pattern[1]].innerText;
        let val3 = boxes[pattern[2]].innerText;


        // Check that all three boxes are filled
        if (val1 !== "" && val2 !== "" && val3 !== "") {

            // Check same values
            if (val1 === val2 && val2 === val3) {

                console.log(val1, "you win");

                showinner(val1);

                // Stop checking further patterns
                return true;
            }
        }
    }

    return false;
};


// Check draw
const checkDraw = () => {

    for (let box of boxes) {

        // Agar koi box empty hai
        if (box.innerText === "") {
            return false;
        }
    }

    return true;
};


// Add click event to every box
boxes.forEach((box) => {

    box.addEventListener("click", () => {

        console.log("box clicked");


        // Agar box already filled hai
        if (box.innerText !== "") {
            return;
        }


        // O ki turn
        if (turno) {

            box.innerText = "O";

            turno = false;

        }

        // X ki turn
        else {

            box.innerText = "X";

            turno = true;
        }


        // Check winner
        let winnerFound = checkwinner();


        // Agar winner mil gaya to draw check mat karo
        if (winnerFound) {
            return;
        }


        // Check draw
        if (checkDraw()) {

            msgbox.innerText = "Game Draw!";

            msgcont.classList.remove("hide");

            disabledbtn();
        }

    });

});


// Reset / New Game function
const resetGame = () => {

    // Empty all boxes
    for (let box of boxes) {

        box.innerText = "";

        box.disabled = false;
    }


    // Game O se start hoga
    turno = true;


    // Winner / Draw message hide
    msgcont.classList.add("hide");
};


// Reset Game button
resetgame.addEventListener("click", resetGame);


// New Game button
newgame.addEventListener("click", resetGame);