const readline = require('readline');
const boxen = require('boxen');
const minimist = require('minimist');
const argv = minimist(process.argv.slice(2), {
    alias: {
        score: 's',
    }
});
const fs = require('fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

let player1Score = 0;
let player2Score = 0;
let winner;

async function init() {
    if (argv.s) {
        await displayStats();
    } else {
        while (player1Score === player2Score) {
            player1Score = await player1Turn();
            player2Score = await player2Turn();
        }
        console.log("We have a winner!");
        if (player1Score > player2Score) {
            console.log(boxen('Player 1 won!', {padding: 1, margin: 1, borderColor: 'magenta'}));
            winner = 'Player 1';
        } else {
            console.log(boxen('Player 2 won!', {padding: 1, margin: 1, borderColor: 'magenta'}));
            winner = 'Player 2';
        }

        await logStats(winner);
    }
    process.exit();
}

function player1Turn() {
    return new Promise((resolve) => {
        rl.question('Player 1 turn. What is your prediction (either 1 or 2)? ', (response) => {
            let playerAnswer;
            let result;
            playerAnswer = response;
            result = getResult();
            if (+playerAnswer === result) {
                console.log("It's " + result + ".Great! You're lucky!");
                if (player1Score) {
                    player1Score += 1;
                } else {
                    player1Score = 1;
                }
            } else {
                console.log("Nope, it's " + result + ". Next it will be better :(");
            }
            resolve(player1Score);
        });
    });
};

function player2Turn() {
    return new Promise((resolve) => {
        rl.question('Player 2 turn. What is your prediction (either 1 or 2)? ', (response) => {
            let playerAnswer;
            let result;
            playerAnswer = response;
            result = getResult();
            if (+playerAnswer === result) {
                console.log("It's " + result + ".Great! You're lucky!");
                if (player2Score) {
                    player2Score += 1;
                } else {
                    player2Score = 1;
                }
            } else {
                console.log("Nope, it's " + result + ". Next it will be better :(");
            }
            resolve(player2Score);
        });
    });
}

function logStats(winner) {
    return new Promise((resolve) => {
        let logPath = "./batvale1/statistics.json";
        fs.readFile(logPath, "utf8", (err, data) => {
            let dataToLog = JSON.parse(data);
            if (err) {
                console.log(err);
            }

            if (winner === 'Player 1') {
                dataToLog.player1Wins++;
            } else {
                dataToLog.player2Wins++;
            }

            dataToLog.gamesPlayed++;

            if (dataToLog.lastWon === 'Player 1' && winner === 'Player 1') {
                dataToLog.player1WinsInARow++;
            } else if (winner === 'Player 1') {
                dataToLog.player1WinsInARow = 1;
                console.log(winner);
            } else {
                dataToLog.player1WinsInARow = 0;
            }

            if (dataToLog.lastWon === 'Player 2' && winner === 'Player 2') {
                dataToLog.player2WinsInARow++;
            } else if (winner === 'Player 2') {
                dataToLog.player2WinsInARow = 1;
            } else {
                dataToLog.player2WinsInARow = 0;
            }

            dataToLog.lastWon = winner;

            fs.writeFileSync(logPath, JSON.stringify(dataToLog, null, 4), err => {
                console.log('heeeep');
                if (err) {
                    throw err;
                }
            });
            resolve(true);
        });
    });
}

function displayStats() {
    return new Promise((resolve) => {
        let logPath = "./batvale1/statistics.json";
        fs.readFile(logPath, "utf8", (err, data) => {
            let dataToLog = JSON.parse(data);
            console.log('The total games have been played: ' + dataToLog.gamesPlayed + '.');
            console.log('Player 1 won ' + dataToLog.player1Wins + ' games (' + Math.round(dataToLog.player1Wins / dataToLog.gamesPlayed * 100) + '%).');
            console.log('Player 2 won ' + dataToLog.player2Wins + ' games (' + Math.round(dataToLog.player2Wins / dataToLog.gamesPlayed * 100) + '%).');
            console.log('Player 1 won ' + dataToLog.player1WinsInARow + ' games in a row.');
            console.log('Player 2 won ' + dataToLog.player2WinsInARow + ' games in a row.');
            resolve(true);
        });
    });
}

function getResult() {
    return Math.round(Math.random() + 1);
}

init();

