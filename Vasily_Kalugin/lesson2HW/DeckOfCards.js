const Card = require("./Card");

class DeckOfCards {
  // создать новую колоду
  static create() {
    const deckOfCards = new DeckOfCards();
    const cardSuitList = ["pic", "tref", "cherv", "bubn"];
    const cardCardTypeList = [
      { name: "tuz", points: 11 },
      { name: "10", points: 10 },
      { name: "9", points: 9 },
      { name: "8", points: 8 },
      { name: "7", points: 7 },
      { name: "6", points: 6 },
      { name: "king", points: 5 },
      { name: "queen", points: 4 },
      { name: "jack", points: 3 }
    ];

    deckOfCards.deck = [];
    cardSuitList.forEach(suit => {
      cardCardTypeList.forEach(CardType => {
        deckOfCards.deck.push(
          new Card({
            name: CardType.name,
            points: CardType.points,
            suit
          })
        );
      });
    });

    return deckOfCards;
  }

  // получить случайную карту
  getCard() {
    if (this.deck.length) {
      const random = Math.round(Math.random() * (this.deck.length - 1));
      const randomCart = this.deck[random];

      this.deck.splice(random, 1);
      return randomCart;
    }
  }

  //перетусовать колоду
  shuffle() {
    let tic = 0;

    do {
      const randomCart = this.getCard();

      tic % 2 === 0
        ? this.deck.push(randomCart)
        : this.deck.unshift(randomCart);
      tic += 1;
    } while (tic < 72);
  }
}

module.exports = DeckOfCards;
