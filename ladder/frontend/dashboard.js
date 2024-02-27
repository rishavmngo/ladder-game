const dashboardData = JSON.parse(localStorage.getItem("dashboard"))
//const proftDisplay = documnet.query()


const leaderboardDisplay = document.getElementById("leaderboard")
const currentAttempt = dashboardData.dashboard.current_attempt;
const leaderboard = dashboardData.dashboard.leaderboard;
function populateLeaderboard() {
    console.log("entering")
    var attempts =""
    leaderboard.forEach((attempt)=>{

    const a = `
    <li>
    <span class="player-name">${attempt.user.name}</span>
    <span class="player-score">${attempt.score.toFixed(3) * 10}</span>
    <span class="player-score">${(attempt.time / 60).toFixed(2)} minutes</span>
    
    </li>
    `
    attempts+=a;
    })

    console.log(attempts)

    leaderboardDisplay.innerHTML = attempts;



}
populateLeaderboard();


// currentAttempt.profit.forEach((cell)=>{
//    const msg = ladderMap[cell][0];

// })
// currentAttempt.loss.forEach()


// yaha se code 
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


function generateMessage(profit, loss) {
    let finalMessage = "";
    profit.forEach((value) => {
        if (ladderMap[value]) {
            finalMessage += ladderMap[value][0] + "\n";
        }
    });

    loss.forEach((value) => {
        if (snakeMap[value]) {
            finalMessage += snakeMap[value][0] + "\n";
        }
    });

    return finalMessage;
}

const profit = [3, 7, 51, 24, 43, 35, 60, 67];
const loss = [16, 39, 63, 85, 88, 48, 69, 97];

const message = generateMessage(profit, loss);
// console.log(message);
