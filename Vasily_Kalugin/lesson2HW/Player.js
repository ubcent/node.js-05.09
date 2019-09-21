class Player {
  static create(name, status) {
    const player = new Player();

    player.name = name;
    player.status = status;
    player.points = 0;
    player.deck = [];
    player.isFinished = false;

    return player;
  }

  // подсчитать очки
  calcPoints() {
    this.points = 0;
    this.deck.forEach(card => {
      this.points += card.points;
    });
  }

  // добавить карту
  addCard(newCard) {
    this.deck.push(newCard);
    this.deck.sort((a, b) => a.point - b.point);
    this.calcPoints();
  }

  // пропустить ход
  skip() {
    this.isFinished = true;
  }

  // получить статистику
  getStats() {
    let stats = `(${this.name}) Cards:`;

    this.deck.forEach(card => {
      stats += ` | ${card.name}_${card.suit} (${card.points}) `;
    });
    stats += `|  TotalPoints: ${this.points}`;

    return stats;
  }
}

module.exports = Player;
