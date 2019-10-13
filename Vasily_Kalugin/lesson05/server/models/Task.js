/**
 * @typedef {String} TaskStatus
 * @example
 * 'done'
 * 'failed'
 * 'expected'
 */

/**
 * @typedef {Object} Task
 * @property {Date} date дата задания
 * @property {String} taskText текст задания
 * @property {TaskStatus} status состояние задания
 */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

function setTaskStatus(date) {
    return new Date() > date ? 'failed' : 'expected';
}

const taskSchema = new Schema({
    date: { type: Date },
    taskText: { type: String },
    status: { type: String },
});

/**
 * Получить тестовые данные для заполнения пустой бд
 * @return {Task[]}
 */
function getTestData() {
    const time10 = new Date(new Date().setHours(10, 0, 0, 0));
    const time11 = new Date(new Date().setHours(11, 0, 0, 0));
    const time12 = new Date(new Date().setHours(12, 0, 0, 0));
    const time13 = new Date(new Date().setHours(13, 0, 0, 0));
    const time14 = new Date(new Date().setHours(14, 0, 0, 0));

    return (testData = [
        {
            date: time10,
            taskText: 'Позавтракать',
            status: setTaskStatus(time10),
        },
        {
            date: time11,
            taskText: 'Погулять с собакой',
            status: setTaskStatus(time11),
        },
        {
            date: time12,
            taskText: 'Помыть полы',
            status: setTaskStatus(time12),
        },
        {
            date: time13,
            taskText: 'Купить продукты',
            status: setTaskStatus(time13),
        },
        {
            date: time14,
            taskText: 'Помыть посуду',
            status: setTaskStatus(time14),
        },
    ]);
}

taskSchema.statics.getTestData = getTestData;

module.exports = mongoose.model('Task', taskSchema, 'Tasks');
