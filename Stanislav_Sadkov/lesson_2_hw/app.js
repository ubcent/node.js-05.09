const fs = require('fs');
const filename = require('minimist')(process.argv.slice(2)).file;
const readline = require('readline');
const reader = readline.createInterface(process.stdin, process.stdout);

const app = {
    //Создаем массив с картами
    getCardsArr : ()=>{
        return new Map([
            [1, 1], [2, 2], [3, 3], [4, 4],
            [5, 5], [6, 6], [7, 7], [8, 8], [9, 9],
            [10,10], ['Королева', 10], ['Король', 10], ['Валет', 10],
            ['Туз', 11]
            ]);
        },
    //Создаем массив с мастями
    suits : new Map([
            ['diamonds', '♦'],
            ['hearts', '♥'],
            ['spades', '♠'],
            ['clubs', '♣']
        ]),
    //Генерация полной колоды
    generateDeck : function (){
            let fullDeck =  new Map();
            for(let suit of this.suits.keys()) {
                fullDeck.set(suit, this.getCardsArr());
            }
            return fullDeck;
    },
    getRandomCard : function(){
        //Отдаем рандомную карту и удаляем из колоды
        let deck = this.deck;
        let suits = Array.from(deck);
        let suit = suits[Math.floor(Math.random() * suits.length)];
        let cards = Array.from(suit[1]);
        let suitKey = suit[0];
        let cardRandom = cards[Math.floor(Math.random() * cards.length)];
        let cardRandomKey = cardRandom[0];
        deck.get(suitKey).delete(cardRandomKey);
        return cardRandom;
    },
    player : {
        points: 0,
        wins: 0
    },
    ai : {
        points: 0,
        wins: 0
    },
    plays: 0,
    deck: null,
    play: function(){
        const that = this;
        reader.question('\nХотите начать игру? (да/нет) ', function(text) {
            if (text === "нет") {
                console.log('Игра не начата');
                reader.close();
            }else if(text === "да"){
                that.deck = that.generateDeck();
                const dealerFirstCard = that.generateStartScore();
                console.log('Игра начата, первая карта дилера: ', dealerFirstCard);
                that.listener();            
            }else{
                console.log('Введен не верный ответ');
                that.reset();
                that.play();
            }
        });
    },
    generateStartScore: function(){        
        const p = this.player;
        const ai = this.ai;
        p.points = this.getRandomCard()[1] + this.getRandomCard()[1];
        const aiFirstCard = this.getRandomCard();
        ai.points = aiFirstCard[1] + this.getRandomCard()[1];
        if(p.points>21 || ai.points>21){
            this.generateStartScore();
        }
        return aiFirstCard;
    },
    move: function(){
        let card = this.getRandomCard();
        let p = this.player;
        p.points += card[1];
        console.log('Вы взяли карту ', card);
        this.listener();
    },
    aiMove: function(){
        const card = this.getRandomCard();
        const ai = this.ai;
        
        let random = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        let decide = () => {
            return (Math.floor(Math.random() * 2) === 0);
        }

        if(ai.points <= 2 || ai.points <= 15){
            ai.points += card[1];
            this.aiMove();
        }else if(ai.points <=16 + random(1,4)){ //Рандомизируем проверку в рискованных случаях
            if(decide()){                       //Рандомизируем решение в рискованных случаях
                ai.points += card[1];
                this.aiMove();
            }else{
                this.checkPoints();
            }
        }else if(ai.points == 21){
            this.checkPoints();
        }else if(ai.points > 21){
            this.checkPoints();
        }
    },
    endGame: function(result){
        if(result === 'ai'){
            console.log('\nВы проиграли! Ваш счет: ', this.player.points);
            console.log('Счет дилера: ', this.ai.points);
            this.ai.wins += 1;
        }else if(result === 'player'){
            console.log('\nВы выиграли! Ваш счет: ', this.player.points);
            console.log('Счет дилера: ', this.ai.points);
            this.player.wins += 1;
        }else if(result === 'middle'){
            console.log('\nНичья! Ваш счет: ', this.player.points);
            console.log('Счет дилера: ', this.ai.points);
        }
        console.log('****Счёт:****\n Игрок: ', this.player.wins, 'побед');
        console.log('*************\n Компьтер: ', this.ai.wins, 'побед');
        this.writeLog(result);
        this.reset();
        this.play();
    },
    checkPoints: function(){
        const playerScore = this.player.points;
        const aiScore = this.ai.points;

        if(playerScore > 21){
            this.endGame('ai');
        }else if(playerScore == 21 && aiScore == 21){
            this.endGame('middle');
        }else if(playerScore > 21 && aiScore > 21){
            this.endGame('middle');
        }else if(playerScore == aiScore){
            this.endGame('middle');
        }else if(playerScore == 21){
            this.endGame('player');
        }else if(playerScore < 21 && aiScore > 21){
            this.endGame('player');
        }else if(playerScore < 21 && playerScore > aiScore){
            this.endGame('player');
        }else if((playerScore < 21 && playerScore < aiScore) && aiScore < 21){
            this.endGame('ai');
        }else if(playerScore < 21 &&  aiScore == 21){
            this.endGame('ai');
        }
        this.plays++;
    },
    listener: function(){
        const that = this;
        
        reader.question('Ваш счёт ' + that.player.points + '.\nХотите взять карту? (да/нет) ', (line) => {
            if (line == "нет") {
                that.aiMove();
            }else if(line == "да"){  
                that.move();
            }else{
                console.log('Введите да или нет');
                that.listener();
            }
        });
    },
    reset: function(){
        this.player.points = 0;
        this.ai.points = 0;
    },
    writeLog: function(winner){
        const filenameFull = filename + '.json';
        if(typeof filename === 'undefined'){
            return;
        }else{
            let gameLog = {
                gameNum: this.plays,
                winner: winner,
                player: {
                    wins: this.player.wins,
                    points: this.player.points
                },
                ai: {
                    wins: this.ai.wins,
                    points: this.ai.points
                }
            };
            let gamelogStr = JSON.stringify(gameLog);
            if(!fs.exists(filenameFull)){
                fs.writeFile(filenameFull, gamelogStr);
                console.log(fs.exists(filenameFull));
            }else{
                fs.appendFile(filenameFull, gamelogStr);
            }
        }
    }
}
app.play();