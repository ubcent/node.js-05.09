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
  logs: [],
  currentlog: new GameLog({})
};

function initGame() {
  news.hello();
  rl.question(news.nameQuestion, userName => {
    if (userName) {
      GLOBAL.userName = userName;
    }
    letNewGame(GLOBAL.userName);
  });
}

function letNewGame(userName) {
  GLOBAL.game = new Game(userName);
  GLOBAL.game.dealtСards(2);
  news.command();
  console.log(GLOBAL.game.getUserStats());
}

function createLog(gameLog, gameStats) {
  gameLog.update(gameStats);
  news.gameResult(
    gameLog.showLastGameWinnerInfo.bind(gameLog),
    gameLog.showLastGameLosersInfo.bind(gameLog)
  );
  news.gameIsOver();
  GLOBAL.logs.push(gameLog);
  fs.writeFile(GLOBAL.logPath, JSON.stringify(GLOBAL.logs), "utf-8", err => {
    if (err) {
      news.logNotRecorded();
    } else {
      news.logRecorded();
    }
  });
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
        if (GLOBAL.logs.length) {
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
        if (!GLOBAL.game.isOver) {
          GLOBAL.game.finishRound();

          if (GLOBAL.game.isEndGame()) {
            createLog(GLOBAL.currentlog, GLOBAL.game.getGameStats());
          } else {
            console.log("");
            console.log(GLOBAL.game.getUserStats());
          }
        } else {
          news.gameIsOver();
        }

        break;
      case "skip":
        if (!GLOBAL.game.isOver) {
          GLOBAL.game.user.skip();
          GLOBAL.game.finishRound();
          createLog(GLOBAL.currentlog, GLOBAL.game.getGameStats());
        } else {
          news.gameIsOver();
        }
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
  gameEngine(GLOBAL.currentlog);
  initGame();
  GLOBAL.currentlog = await getLogs();
}

startProgram();
