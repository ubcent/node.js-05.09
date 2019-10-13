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

/**
 * @typedef {Object} FullTask
 * @property {String} id идентификатор задания
 * @property {Date} date дата задания
 * @property {String} taskText текст задания
 * @property {String} status состояние задания
 */

const {
    CREATE_TODO_TASK,
    CHANGE_TODO_TASK,
    DONE_TODO_TASK,
    DELETE_TODO_TASK,
    GET_TODO_TASKS_FOR_DATE,
} = require('../actionTypes/toDoList');

const app = require('express').Router();
const Task = require('../models/Task');

/**
 * Сохранить в базу новое задание
 * @param {Task} taskData данные нового задания
 * @return {Promise<FullTask|undefined>}
 */
async function saveTask(taskData) {
    return await new Task(taskData).save();
}

/**
 * Создать в базе набор тестовых заданий за текущую дату
 * @return {Promise}
 */
function createTestData() {
    return new Promise(async (res, rej) => {
        const promises = [];

        Task.getTestData().forEach(taskData => {
            promises.push(saveTask(taskData));
        });

        const response = await Promise.all(promises);

        response ? res(response) : rej(new Error('Test tasks was not created'));
    });
}

app.post('/', async (req, res) => {
    const { type, payload } = req.body;

    switch (type) {
        // сохранить в базу новое задание
        case CREATE_TODO_TASK: {
            const { id, date, taskText, status } = payload;
            const newData = { date, taskText, status };
            const result = await saveTask(newData);

            if (result) {
                res.json({ id: result.id });
            } else {
                res.send({ err: `Task ${id} not created` });
            }

            break;
        }

        // изменить задание
        case CHANGE_TODO_TASK: {
            const { id, date, taskText, status } = payload;
            const updateData = { date, taskText, status };
            const result = await Task.updateOne({ _id: id }, updateData);

            if (result.nModified) {
                res.json({ id });
            } else {
                res.send({ err: `Task ${id} not found` });
            }

            break;
        }

        // перевести задание в состояние "done"
        case DONE_TODO_TASK: {
            const result = await Task.updateOne({ _id: payload }, { status: 'done' });

            if (result.nModified) {
                res.json({ id: payload });
            } else {
                res.send({ err: `Task ${payload} not found` });
            }

            break;
        }

        // удалить задание
        case DELETE_TODO_TASK: {
            const result = await Task.deleteOne({ _id: payload });

            if (result.ok) {
                res.json({ id: payload });
            } else {
                res.send({ err: `Task ${payload} not found` });
            }

            break;
        }

        // получить список заданий за дату
        case GET_TODO_TASKS_FOR_DATE: {
            const from = new Date(new Date(payload).setHours(0, 0, 0, 0));
            const to = new Date(new Date(payload).setHours(24, 0, 0, 0));
            const taskList = await Task.find()
                .where('date')
                .gte(from)
                .lte(to);

            if (taskList.length) {
                res.json(taskList);
            } else if (new Date(payload).setHours(0, 0, 0, 0) === new Date().setHours(0, 0, 0, 0)) {
                const testTaskList = await createTestData();

                res.json(testTaskList);
            } else {
                res.json([]);
            }

            break;
        }

        default:
            res.send(new Error('Unknown action'));
            break;
    }
});

module.exports = app;
