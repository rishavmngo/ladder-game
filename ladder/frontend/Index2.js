const n = 10;
const matrixArray = [];

const ladderMap = {
    3: [
        "After arriving at the office, I created and submitted the DPT.\n DPT stands for Daily Plan Task, where we outline the tasks we need to accomplish after arriving at the office.",
        22,
    ],
    7: [
        "Upon receiving the task, I created and submitted the WBS.\n WBS stands for Work Breakdown Structure, which involves breaking down assigned tasks into smaller components to create a structured plan. We then use this plan to create the DPT.",
        31,
    ],
    51: [
        "I completed 6 tasks and created a unique project for the company.",
        95,
    ],
    24: [
        "Whenever there were any problems related to tasks, I asked questions on Allemp.\n Allemp is a Gmail group where we raise and resolve questions.",
        44,
    ],
    43: [
        "I created a BDD for the project.\n BDD stands for Behaviour Driven Development. When creating a project, we first develop a BDD to explain the entire project through behavior scenarios.",
        80,
    ],
    35: [
        "I sent the P&L statement.\n P&L stands for Profit and Loss. Through this, we analyze tasks and ourselves to improve.",
        30,
    ],
    60: [
        "I presented during Rising career session and participated in group discussions.\n Rising career session. ye ek session hai jisme hum apne soft skill ko enhance karte hai jiase communication presentation group disscution etc.",
        87,
    ],
    67: ["I asked questions during the session.", 81],
};

const snakeMap = {
    16: [
        "After coming to the office, I forgot to send the DPT \n DPT stands for Daily Plan Task, where we outline the tasks we need to accomplish after arriving at the office.",
        4,
    ],
    39: [
        "I forgot send the WBS. after receiving the task . \n WBS stands for Work Breakdown Structure, which involves breaking down assigned tasks into smaller components to create a structured plan. We then use this plan to create the DPT.",
        19,
    ],
    63: ["Although I completed the task but I forgot to submit them.", 23],
    85: [
        "I did not raise any questions on Allemp regarding any problems related to tasks. \n Allemp is a Gmail group where we raise and resolve questions.",
        47,
    ],
    88: [
        "I did not create a BDD for the project.\n BDD stands for Behaviour Driven Development. When creating a project, we first develop a BDD to explain the entire project through behavior scenarios.",
        28,
    ],
    48: [
        "I did not send the Profit and Loss P&L statement.\n P&L stands for Profit and Loss. Through this, we analyze tasks and ourselves to improve.",
        57,
    ],
    69: [
        "I didn't present anything or speak during Rising career session.",
        33,
    ],
    97: ["I didn't ask any questions during the session.", 77],
};

const LADDER_CLASS = "ladder";
const SNAKE_CLASS = "snake";

function createMatrix() {
    let block = n * n + 1;
    for (let column = 1; column <= n; column++) {
        let rows = [];
        if (column % 2 === 0) {
            block = block - n;
            let value = block;
            for (let row = 1; row <= n; row++) {
                rows.push(value);
                value++;
            }
        } else {
            for (let row = 1; row <= n; row++) {
                block = block - 1;
                rows.push(block);
            }
        }
        matrixArray.push(rows);
    }
    createBoard(matrixArray);
}

function createBoard(matrixArray) {
    const board = document.querySelector(".main-board");
    let str = "";
    matrixArray.map((row) => {
        str += `<div class="row">`;
        row.map((block) => {
            str += `
                    <div class="block ${ladderMap[block] ? LADDER_CLASS : ""} ${
                        snakeMap[block] ? SNAKE_CLASS : ""
                    } ${block === 1 ? "active" : ""} " data-value=${block}>
                    ${block}
                    </div>
                `;
        });
        str += `</div>`;
    });
    board.innerHTML = str;
}

const startTime1 = new Date();


function roll() {
    const dice = document.querySelector("img");
    dice.classList.add("rolling"); // Add rolling animation class

    setTimeout(() => {
        dice.classList.remove("rolling"); // Remove rolling animation class after delay
        const diceValue = Math.ceil(Math.random() * 6);
        document
            .querySelector("#dice-id")
            .setAttribute("src", `assets/dice${diceValue}.png`);
        changeCurrentPosition(diceValue);
    }, 1000);
    // -AnimationEffect("rollDice")// Adjust as needed, should match the duration of rolling animation
}

function changeCurrentPosition(diceValue) {
    const activeBlock = document.querySelector(".active");
    const activeBlockValue = parseInt(activeBlock.outerText);
    let presentValue = diceValue + activeBlockValue;

    // Check if the presentValue is in the ladderMap
    if (ladderMap[presentValue]) {
        // Show ladder message using SweetAlert2
        Swal.fire({
            // title: 'A!',
            html: `${ladderMap[presentValue][0].replace(/\n/g, "<br> <br>")}`, //<br> ${ladderMap[presentValue][1]}`,
            confirmButtonText: "OK",
        });

        // Set presentValue to the ladder's destination
        presentValue = ladderMap[presentValue][1];
    }

    // Check if the presentValue is in the snakeMap
    if (snakeMap[presentValue]) {
        // Show snake message using SweetAlert2
        Swal.fire({
            // title: "A!",
            html: `${snakeMap[presentValue][0].replace(/\n/g, "<br> <br>")}`, //<br>${snakeMap[presentValue][1]}`,
            confirmButtonText: "OK",
        });
        // Set presentValue to the snake's destination
        presentValue = snakeMap[presentValue][1];
    }

    // Move the user to the next position
    if (presentValue <= n * n) {
        changeActiveClass(presentValue);
    } else {
        if (isGameComplete()) {
            Swal.fire({
                title: "Congratulations!",
                text: "You have successfully completed InternShip Part-I.",
                icon: "success ",
                confirmButtonText: "Restart",
                imageUrl: "assets/cong.webp",
                imageAlt: "Your Image",
            }).then((result) => {
                if (result.isConfirmed) {
                    restart();
                }
            });
        } else {
            Swal.fire({
                title: "You've reached the end!",
                text: "But the game is not complete. Keep playing!",
                icon: "info",
                confirmButtonText: "OK",
            });
        }
    }
}

function changeActiveClass(presentValue) {
    const activeBlock = document.querySelector(".active");
    activeBlock.classList.remove("active");
    const block = document.querySelector(`[data-value="${presentValue}"]`);
    block.classList.add("active");
}

function isGameComplete() {
    const activeBlock = document.querySelector(".active");
    const lastBlock = document.querySelector(`[data-value="${n * n}"]`);
    lastBlock.setAttribute("src", "assets/ladder.png");

    if (activeBlock === lastBlock) {
        const data = {
            email: localStorage.getItem("currentUser"),
            profit: [1, 2, 3, 4, 5],
            loss: [1, 2, 3],
            time: Math.floor(Math.random() * 1000 + 1),
        };

        fetch("http://localhost:3000/attempt", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                localStorage.setItem("dashboard", JSON.stringify(data));
                window.location.replace("/dashboard.html");
                console.log("Success:", data);
            })
            .catch((error) => {
                alert("error occured");
                console.error("Error:", error);
            });

        return true;
    }
    return false;
}

const endTime1 = new Date();
 
const totalTime = (endTime1 - startTime1) / 1000;





function restart() {
    matrixArray.length = 0;
    createMatrix();
    Swal.fire({
        title: "Game restarted",
        text: "Good luck!",
        icon: "success",
    });
}

// Initialize the game board
//createMatrix();

// JavaScript Code
// let startTime, endTime;

// function rollDice() {
//     // Roll the dice and generate a random number between 1 and 6
//     const diceResult = Math.floor(Math.random() * 6) + 1;

//     // Display the result of the dice roll
//     document.getElementById(
//         "diceResult"
//     ).innerText = `Dice Result: ${diceResult}`;

//     // If the game has not started yet, set the start time
//     if (!startTime) {
//         startTime = new Date();
//     }
// }

// function endGame() {
//     // If the end time is not set yet, set it and calculate the game duration
//     if (!endTime) {
//         endTime = new Date();
//         const timeDiff = endTime - startTime;
//         const seconds = Math.floor(timeDiff / 1000);

//         // Display the game duration
//         document.getElementById(
//             "gameTime"
//         ).innerText = `Game Time: ${seconds} seconds`;
//     }
// }

// // Simulate end of game after a certain time (e.g., 5 seconds)
// setTimeout(endGame, 5000); // Adjust as needed
// ======================================================
function quit() {
    // Redirect to the specified homepage
    window.location.href =
        "file:///home/himanshu/Documents/Foxians%20Game%20Project/login-form/index.html";
}
function restart() {
    // Perform actions to restart the game
    matrixArray.length = 0;
    createMatrix();
    document.querySelector("#user-score").innerText = "User Score: 0"; // Reset user score
    Swal.fire({
        title: "Game restarted",
        text: "Good luck!",
        icon: "success",
    });
}

// profile icon logic

function logout() {
    localStorage.removeItem("currentUser");
    window.location.replace("/login-form/");
}
