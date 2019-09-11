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
  uncorrectInput: input => console.log(`I can\`t do it... "${input}".`)
};

module.exports = news;
