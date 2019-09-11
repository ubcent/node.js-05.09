const DeckOfCards = require("./DeckOfCards");
const Player = require("./Player");

class Game {
  constructor(userName) {
    this.deck = DeckOfCards.create();
    this.user = Player.create(userName, "user");
    this.croupier = Player.create("Croupier", "croupier");
    this.result = {
      isDrow: false,
      winner: null,
      losers: []
    };
  }

  // раздать карты
  dealtСards(quantity) {
    let tic = 0;
    this.deck.shuffle();

    do {
      this.userAddCard();
      this.croupierAddCard();
      tic += 1;
    } while (tic < quantity);
  }

  // добавить карту игроку
  userAddCard() {
    const userCard = this.deck.getCard();
    this.user.addCard(userCard);
  }

  // добавить карту крупье
  croupierAddCard() {
    const croupierCard = this.deck.getCard();
    this.croupier.addCard(croupierCard);
  }

  croupierMakeMove() {
    const willCroupierSkip =
      21 - this.croupier.points > 0
        ? Math.sqrt((21 - this.croupier.points) / 6) < Math.random()
        : true;

    if (willCroupierSkip) {
      this.croupier.skip();
    } else {
      this.croupierAddCard();
    }
  }

  // получить статистику пользователя
  getUserStats() {
    return this.user.getStats();
  }

  // получить статистику игры
  getGameStats() {
    return this.result;
  }

  // проверить окончена ли игра
  isEndGame() {
    return (
      this.user.points > 21 ||
      this.croupier.points > 21 ||
      (this.user.isFinished && this.croupier.isFinished)
    );
  }

  // определить победителя
  detWinner() {
    if (
      (this.user.points < 22 && this.user.points > this.croupier.points) ||
      (this.user.points < 22 && this.croupier.points > 21)
    ) {
      this.result.winner = this.user;
      this.result.losers.push(this.croupier);
    } else if (
      (this.croupier.points < 22 && this.croupier.points > this.user.points) ||
      (this.croupier.points < 22 && this.user.points > 21)
    ) {
      this.result.winner = this.croupier;
      this.result.losers.push(this.user);
    } else {
      this.result.isDrow = true;
      this.result.losers.push(this.user);
      this.result.losers.push(this.croupier);
    }
  }

  // завершить раунд
  finishRound() {
    if (this.user.isFinished) {
      if (!this.isEndGame()) {
        do {
          this.croupierMakeMove();
        } while (!this.croupier.isFinished);
      }
      this.detWinner();
    } else {
      this.userAddCard();
      this.croupierMakeMove();
      if (this.isEndGame()) {
        this.detWinner();
      }
    }
  }
}

module.exports = Game;
