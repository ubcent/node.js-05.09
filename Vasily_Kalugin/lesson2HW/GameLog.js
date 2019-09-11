class GameLog {
  constructor(gameLog) {
    this.data = gameLog;
  }

  calcLogId() {
    if (this.data.id) {
      this.data.id += 1;
    } else {
      this.data.id = 1;
    }
  }

  calcUserNumberOfVictories() {
    if (this.data.userNumberOfVictories) {
      if (this.data.winner.status === "user") {
        this.data.userNumberOfVictories += 1;
      }
    } else {
      this.data.userNumberOfVictories = 0;
    }
  }

  calcCroupierNumberOfVictories() {
    if (this.data.croupierNumberOfVictories) {
      if (this.data.winner.status === "user") {
        this.data.croupierNumberOfVictories += 1;
      }
    } else {
      this.data.croupierNumberOfVictories = 0;
    }
  }

  calcUserSeriesOfVictories() {
    if (this.data.userSeriesOfVictories) {
      if (this.data.winner.status === "user") {
        this.data.userSeriesOfVictories += 1;
      }
    }
    this.data.userSeriesOfVictories = 0;
  }

  calcCroupierSeriesOfVictories() {
    if (this.data.croupierSeriesOfVictories) {
      if (this.data.winner.status === "croupier") {
        this.data.croupierSeriesOfVictories += 1;
      }
    }
    this.data.croupierSeriesOfVictories = 0;
  }

  calcUserMaxSeriesOfVictories() {
    if (this.data.userMaxSeriesOfVictories) {
      if (
        this.data.userMaxSeriesOfVictories < this.data.userSeriesOfVictories
      ) {
        this.data.userMaxSeriesOfVictories = this.data.userSeriesOfVictories;
      }
    } else {
      this.data.userMaxSeriesOfVictories = 0;
    }
  }

  calcCroupierMaxSeriesOfVictories() {
    if (this.data.croupierMaxSeriesOfVictories) {
      if (
        this.data.croupierMaxSeriesOfVictories <
        this.data.croupierSeriesOfVictories
      ) {
        this.data.croupierMaxSeriesOfVictories = this.data.croupierSeriesOfVictories;
      }
    } else {
      this.data.croupierMaxSeriesOfVictories = 0;
    }
  }

  update(gameResult) {
    this.data.isDrow = gameResult.isDrow;
    this.data.winner = gameResult.winner;
    this.data.losers = gameResult.losers;
    this.calcLogId();
    this.calcUserNumberOfVictories();
    this.calcCroupierNumberOfVictories();
    this.calcUserSeriesOfVictories();
    this.calcCroupierSeriesOfVictories();
    this.calcUserMaxSeriesOfVictories();
    this.calcCroupierMaxSeriesOfVictories();
  }

  showUserInfo() {
    console.log("userNumberOfVictories: ", this.data.userNumberOfVictories);
    console.log("userSeriesOfVictories: ", this.data.userSeriesOfVictories);
    console.log(
      "userMaxSeriesOfVictories: ",
      this.data.userMaxSeriesOfVictories
    );
  }

  showCroupierInfo() {
    console.log(
      "croupierNumberOfVictories: ",
      this.data.croupierNumberOfVictories
    );
    console.log(
      "croupierSeriesOfVictories: ",
      this.data.croupierSeriesOfVictories
    );
    console.log(
      "croupierMaxSeriesOfVictories: ",
      this.data.croupierMaxSeriesOfVictories
    );
  }

  showLastGameWinnerInfo() {
    let result = {
      isDrow: true,
      winner: null
    };

    if (this.data.isDrow) {
      console.log("No winner, it was drow.");
    } else {
      console.log(
        `Winer: ${
          this.data.winner.status
        } ${this.data.winner.getStats()} with ${this.data.winner.points} points`
      );
    }

    return result;
  }

  showLastGameLosersInfo() {
    this.data.losers.forEach(loser => {
      console.log(
        `Loser: ${this.data.loser.status} ${this.data.loser.getStats()} with ${
          this.data.loser.points
        } points`
      );
    });

    return result;
  }
}

module.exports = GameLog;
