const Game = require("./Game");
const GameLog = require("./GameLog");
const news = require("./news");
const readline = require("readline");
const fs = require("fs");
const path = require("path");
const minimist = require("minimist");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const GLOBAL = {
  game: null,
  logPath: path.join(__dirname, "game.log.json"),
  argv: minimist(process.argv.slice(2)),
  userName: "Vasiy",
  logs: null
};

function initGame() {
  news.hello();
  rl.question(news.nameQuestion, userName => {
    GLOBAL.userName = userName;
    letNewGame(userName);
  });
}

function letNewGame(userName) {
  GLOBAL.game = new Game(userName);
  GLOBAL.game.dealtСards(2);
  news.command();
  console.log(GLOBAL.game.getUserStats());
}

function createLog(gameLog, gameStats) {
  console.log(gameLog);
  gameLog.update(gameStats);
  console.log(gameLog);
  gameLog.showLastGameWinnerInfo();
  gameLog.showLastGameLosersInfo();

  if (GLOBAL.logs !== null) {
    GLOBAL.logs.push(gameLog.data);
    fs.writeFile(GLOBAL.logPath, JSON.stringify());
  }
}

function getLogs() {
  const promise = new Promise((res, rej) => {
    fs.readFile(GLOBAL.logPath, "utf8", (err, data) => {
      res = new GameLog({});

      if (err) {
        rej = new GameLog({});
      }

      if (data) {
        GLOBAL.logs = JSON.parse(data);
        if (gameLog.length) {
          GLOBAL.logs.sort((a, b) => (b.id < a.id) - (a.id < b.id));
          res = new GameLog(GLOBAL.logs[GLOBAL.logs.length - 1]);
        }
      }
    });
  });

  return promise;
}

function gameEngine(gameLog) {
  rl.on("line", input => {
    switch (input) {
      case "start":
        letNewGame(GLOBAL.userName);
        break;
      case "get":
        GLOBAL.game.finishRound();

        if (GLOBAL.game.isEndGame()) {
          createLog(gameLog, GLOBAL.game.getGameStats());
        } else {
          console.log("");
          console.log(GLOBAL.game.getUserStats());
        }

        break;
      case "skip":
        GLOBAL.game.user.skip();
        GLOBAL.game.finishRound();
        createLog(gameLog, GLOBAL.game.getGameStats());
        break;
      case "exit":
        news.exit();
        rl.close();
        break;
      default:
        news.uncorrectInput(input);
        news.command();
        break;
    }
  });
}

async function startProgram() {
  let gameLog = new GameLog({});
  gameEngine(gameLog);
  initGame();
  gameLog = await getLogs();
}

startProgram();
