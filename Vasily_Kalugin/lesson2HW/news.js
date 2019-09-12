const news = {
  exit: () => {
    console.log("See you...");
  },
  hello: () => {
    console.log("Hello. It`s a Blackjack game.");
  },
  command: () => {
    console.log("     ------------------------------------------------");
    console.log("Use: | 'start' - start game, | 'exit' - exit game   |");
    console.log("Use: | 'get' - get card,     | 'skip' - skip a move |");
    console.log("     ------------------------------------------------");
    console.log("");
  },
  nameQuestion: "Enter your name: ",
  uncorrectInput: input => console.log(`I can\`t do it... "${input}".`),
  gameIsOver: () => {
    console.log("The game is over. Use 'start' or 'exit' command.");
  },
  gameResult: (winnerLog, loserLog) => {
    console.log("--------------");
    console.log("Game results:");
    winnerLog();
    loserLog();
    console.log("--------------");
  },
  logNotRecorded: () => {
    console.log("The log was not recorded");
  },
  logRecorded: () => {
    console.log("The log was recorded");
  }
};

module.exports = news;
