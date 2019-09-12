// Игра "Орёл или решка" с записью результатов в лог файл
// Вызов: node lesson2_task1.js [имя файла]
// Если имя файла не указано, скрипт создаст файл log.txt в папке, из которой запущен скрипт.
// Если такой файл уже существовал ранее, он будет перезаписан.
const ansi      = require("ansi");
const readLine  = require('readline')
const fs        = require('fs');
const cursor    = ansi(process.stdout);
    
// Параметры запуска
let logFileName = process.argv.slice(2).shift();

if (logFileName === undefined)
    logFileName = 'log.txt';
    
// Функция для получения случайного целого числа в диапазоне от min до max
function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

// Функция определения результата в строковом виде
function getRes(input)
{
    let result = '';

    switch (input) {
        case 1:
            result = 'Орёл';
            break;
        case 2:
            result = 'Решка';
            break;
        case '1':
            result = 'Орёл';
            break;
        case '2':
            result = 'Решка';
            break;
        default:
            result = 'РЕБРО';
    }    

    return result;
}

// Хранение результатов ходов
class Step {
    constructor (_comp, _human) {
        this.comp     = _comp;
        this.human    = _human;
    }
}
const steps = [];

// Строка подсказки
function writePrompt(){
    cursor.brightMagenta().write('"Орёл" (1 затем Enter) или "Решка" (2 затем Enter) или завершить игру (Enter)? >').reset().write(' ');
}

// Вступительное слово
cursor.green().write('Добрый день!').reset().write('\n');
console.log('Вам предстоит сыграть с компьютером в игру "Орёл или решка"');
console.log('В начале хода компьютер "подбрасывает" виртуальную монету и определяет результат сего действа.');
console.log('Результатом может быть либо "орёл", либо "решка".');
console.log('Вам предстоит угадать результат и указать его в консоли, нажав 1 затем Enter - "орёл", 2 затем Enter - "решка" или просто Enter, если вы хотите закончить игру.');
console.log('Файл с результатами будет создан в папке, из которой запущена данная игра, его название: '+logFileName);
writePrompt();

// Цикл опроса ввода с консоли
const rl = readLine.createInterface({
    input:    process.stdin,
    output:   process.stdout,
});

// Обработка ввода с консоли
rl.on('line', (input) => {
    
    const comp  = randomInteger(1,2);


    if ((input === '1') || (input === '2')) {

            /*console.log("Компьютер: "+comp);
            console.log("Компьютер: "+getRes(comp));
            console.log("Вы: "+input);
            console.log("Вы: "+getRes(input));*/

            const step = new Step(getRes(comp),getRes(input));
            steps.push(step);

            if (step.comp === step.human)
                cursor.green().write('Вы угадали )').reset().write('\n');
            else
                cursor.red().write('Вы не угадали (').reset().write('\n');

            writePrompt();
    }
    else
        rl.close();
});

// Обработка завершения игры
rl.on('close', () => {

    // console.log(JSON.stringify(steps));
    fs.writeFile(logFileName, JSON.stringify(steps), 'utf8', function (err) {
        if (err) {
            cursor.red().write(err).reset().write('\n');
            cursor.red().write('Увы, файл с результатами игры не был сохранён. Удачи вам и хорошего настроения ...').reset().write('\n');
        }
        else {
            cursor.green().write('Файл '+logFileName+' успешно сохранён.').reset().write('\n');
            cursor.green().write('До свидания!').reset().write('\n');
        }
    }); 

    console.log('Сохранение результатов игры в файл ...');
})