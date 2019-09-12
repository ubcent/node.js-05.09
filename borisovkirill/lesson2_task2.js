// Анализ результатов игры "Орёл или решка", сохранённых в файл
// Вызов: node lesson2_task2.js имя_файла
const ansi      = require("ansi");
const fs        = require('fs');
const cursor    = ansi(process.stdout);

// Параметры запуска
let logFileName = process.argv.slice(2).shift();

if (logFileName === undefined) {
    cursor.red().write('Укажите имя файла после node lesson2_task2.js').reset().write('\n');
    process.exit();
}

// Отображение результатов
function showResults(data)
{
    const steps             = JSON.parse(data);
    let   totalSteps        = 0;
    let   winSteps          = 0;
    let   loseSteps         = 0;
    let   winStepsPercent   = 0;
    let   loseStepsPercent  = 0;
    let   maxWinStreak      = 0;
    let   maxLoseStreak     = 0;
    let   curWinStreak      = 0;
    let   curLoseStreak     = 0;

    // console.log(steps)   
    steps.forEach(step => {
        console.log(step);
        if (!step.hasOwnProperty('comp'))
            throw "Структура данных в файле не соответствует ожидаемой";
        if (!step.hasOwnProperty('human'))
            throw "Структура данных в файле не соответствует ожидаемой";

        totalSteps++;
        if (step.comp === step.human) {
            winSteps++;
            curLoseStreak     = 0;
            curWinStreak++;
            if (curWinStreak > maxWinStreak)
                maxWinStreak = curWinStreak;
        } else {
            loseSteps++;
            curWinStreak     = 0;
            curLoseStreak++;
            if (curLoseStreak > maxLoseStreak)
                maxLoseStreak = curLoseStreak;
        }
    });

    cursor.yellow().write('Результаты:').reset().write('\n');
    console.log('Общее количество партий: '+totalSteps);
    if (totalSteps > 0)
    {
        console.log('Выиграно партий: '+winSteps);
        console.log('Проиграно партий: '+loseSteps);
        console.log('Процент выигранных партий: '+ (100 * winSteps/totalSteps));
        console.log('Максимальное количество побед подряд: '+maxWinStreak);
        console.log('Максимальное количество поражений подряд: '+maxLoseStreak);
    }
}

// Чтение из файла
fs.readFile(logFileName, 'utf8', (err, data) => {
    if (err) {
      throw err;
    }
  
    showResults(data);
});
