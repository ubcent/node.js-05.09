const readline = require('readline');
const fs = require('fs');
const ansi      = require("ansi");

const cursor    = ansi(process.stdout);
const rl        = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

const user = {
    name: '',
    win: 0,
    loss: 0,
    games: 0
}
let logGames = 'logGames.txt';

rl.question('Начинаем игру орел/шешка. Твое имя ?: ', (response) => {

    return new Promise((resolve, reject) => {

        if (response) {
            console.log('начинаем игру ', response, ' в случае если тебе надоест, набери exit');
            user.name = response;
            startGame(response);
         } else if (!response) {
            console.log('Пошел отсюда тунеядец!!!');
            rl.close();
            reject();
        }
        resolve(response);
    });
});

const startGame = (name) => {
    return new Promise((resolve, reject) => {
        rl.question('Орел/решка?: \ ', (answerplayer) => {
            if(answerplayer === 'exit') {
                console.log(user);
                fs.writeFile(logGames, JSON.stringify(user), 'utf8', function (err) {
                    if (err) {
                        cursor.red().write('Файл с данными игры не был сохранен. Пакеда! ').reset().write('\n');
                    }
                    else {
                        cursor.green().write('результаты игры созранены в файле ' + logGames + '! Всегого хорошего!').reset().write('\n');
                    }
                }); 
                rl.close();
            } else {
                game(answerplayer)
            }
        });
    });
};

const coin = () => {
    return Math.floor(Math.random() * Math.floor(2));
}

const game = (answer) => {
    return new Promise((resolve, reject) => {
        if(answer === 'exit') {
            rl.close();
            reject();
        } else if  (answer == 'орел') {
            if(coin() == 0) {
                cursor.green().write('ты выйграл!').reset().write('\n');
                ++user.win;
            } else {
                cursor.red().write('ты проиграл!').reset().write('\n');
                ++user.loss;
            }
            ++user.games;
            startGame();
        } else if  (answer == 'решка') {
            if(coin() == 1) {
                cursor.green().write('ты выйграл!').reset().write('\n');
                ++user.win
            } else {
                cursor.red().write('ты проиграл!').reset().write('\n');
                ++user.loss;
            }
            ++user.games;
            startGame();
        } else if (answer !== 'решка' && answer !== 'орел') {
            console.log('Не понял');
            startGame();
        }
    });

}

