import {
    CREATE_TODO_TASK_FULFILLED,
    CREATE_TODO_TASK_REJECTED,
    CHANGE_TODO_TASK_FULFILLED,
    CHANGE_TODO_TASK_REJECTED,
    DONE_TODO_TASK_FULFILLED,
    DONE_TODO_TASK_REJECTED,
    DELETE_TODO_TASK_FULFILLED,
    DELETE_TODO_TASK_REJECTED,
    GET_TODO_TASKS_FOR_DATE_FULFILLED,
    GET_TODO_TASKS_FOR_DATE_REJECTED,
    SET_MUTABLE_ITEM_ID,
    SET_MUTABLE_ITEM_DATE,
    SET_MUTABLE_ITEM_TASK_TEXT,
} from './actionTypes';
import { isEqualDays } from '~/toDoList/helpers';

const initMutableItem = {
    id: null,
    date: new Date(),
    taskText: '',
};

const initState = {
    selectedTasksDate: new Date(),
    mutableItem: { ...initMutableItem },
    toDoTaskList: [
        {
            id: 'id',
            date: new Date(),
            taskText: 'Create todo list',
            status: 'expected',
        },
    ],
    err: null,
};

const reducersToDoList = (state = initState, { type, payload }) => {
    switch (type) {
        // запрос на создание нового задания вернул новое задание
        case CREATE_TODO_TASK_FULFILLED: {
            if (isEqualDays(state.selectedTasksDate, payload.date)) {
                const mutableItem = { ...initMutableItem };
                const toDoTaskList = [...state.toDoTaskList].push(payload);

                toDoTaskList.sort((item1, item2) => (item1.date < item2.date) - (item2.date < item1.date));

                return { ...state, mutableItem, toDoTaskList, err: null };
            }

            return { ...state, err: null };
        }

        // запрос на создание нового задания вернул ошибку
        case CREATE_TODO_TASK_REJECTED: {
            const mutableItem = { ...initMutableItem };

            return { ...state, mutableItem, err: payload };
        }

        // запрос на изменение задания вернул измененное задание
        case CHANGE_TODO_TASK_FULFILLED: {
            if (isEqualDays(state.selectedTasksDate, payload.date)) {
                const mutableItem = { ...initMutableItem };
                const toDoTaskList = state.toDoTaskList.map(task => {
                    if (task.id === payload.id) {
                        return payload;
                    }

                    return task;
                });

                return { ...state, mutableItem, toDoTaskList, err: null };
            }

            return { ...state, err: null };
        }

        // запрос на изменение задания вернул ошибку
        case CHANGE_TODO_TASK_REJECTED: {
            const mutableItem = { ...initMutableItem };

            return { ...state, mutableItem, err: payload };
        }

        // запрос на изменение статуса задания на "Выполнено" вернул
        // идентификатор обновленного задания
        case DONE_TODO_TASK_FULFILLED: {
            const toDoTaskList = state.toDoTaskList.map(task => {
                if (task.id === payload) {
                    task.status = 'done';
                }

                return task;
            });

            return { ...state, toDoTaskList, err: null };
        }

        // запрос на изменение статуса задания на "Выполнено" вернул ошибку
        case DONE_TODO_TASK_REJECTED:
            return { ...state, err: payload };

        // запрос на удаление задания по идентификатору вернул
        // идентификатор удаленного задания
        case DELETE_TODO_TASK_FULFILLED: {
            const toDoTaskList = state.toDoTaskList.filter(task => task.id !== payload);

            return { ...state, toDoTaskList, err: null };
        }

        // запрос на удаление задания по идентификатору вернул ошибку
        case DELETE_TODO_TASK_REJECTED:
            return { ...state, err: payload };

        // запрос на список заданий вернул новый список заданий
        case GET_TODO_TASKS_FOR_DATE_FULFILLED: {
            const { selectedTasksDate, toDoTaskList } = payload;

            return { ...state, selectedTasksDate, toDoTaskList, err: null };
        }

        // запрос на список заданий вернул ошибку
        case GET_TODO_TASKS_FOR_DATE_REJECTED: {
            const { selectedTasksDate, err } = payload;

            return { ...state, selectedTasksDate, err };
        }

        // выбор задания для редактирование по идентификатору
        case SET_MUTABLE_ITEM_ID: {
            let mutableItem = state.toDoTaskList.find(task => task.id === payload);

            if (!mutableItem) {
                mutableItem = { id: payload, date: new Date(), taskText: '' };
            }

            return { ...state, mutableItem, err: null };
        }

        // изменение даты редактируемого задания
        case SET_MUTABLE_ITEM_DATE: {
            const mutableItem = { ...state.mutableItem };
            mutableItem.date = payload;

            return { ...state, mutableItem, err: null };
        }

        // изменение текста редактируемого задания
        case SET_MUTABLE_ITEM_TASK_TEXT: {
            const mutableItem = { ...state.mutableItem };
            mutableItem.taskText = payload;

            return { ...state, mutableItem, err: null };
        }

        default:
            return { ...state };
    }
};

export default reducersToDoList;
