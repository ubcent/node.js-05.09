import {
    CREATE_TODO_TASK,
    CREATE_TODO_TASK_FULFILLED,
    CREATE_TODO_TASK_REJECTED,
    CHANGE_TODO_TASK,
    CHANGE_TODO_TASK_FULFILLED,
    CHANGE_TODO_TASK_REJECTED,
    DONE_TODO_TASK,
    DONE_TODO_TASK_FULFILLED,
    DONE_TODO_TASK_REJECTED,
    DELETE_TODO_TASK,
    DELETE_TODO_TASK_FULFILLED,
    DELETE_TODO_TASK_REJECTED,
    GET_TODO_TASKS_FOR_DATE_FULFILLED,
    GET_TODO_TASKS_FOR_DATE_REJECTED,
    SET_MUTABLE_ITEM_ID,
    SET_MUTABLE_ITEM_DATE,
    SET_MUTABLE_ITEM_TASK_TEXT,
} from './actionTypes';
import { isEqualDays, resolveAwaitingItem, sortTaskListByDate, findAvailableNewTaskId } from '~/toDoList/helpers';

let awaitingCreateToDoTasks = [];
let awaitingChangeToDoTasks = [];
let awaitingDoneToDoTasks = [];
let awaitingDeleteToDoTasks = [];

const initMutableItem = {
    id: null,
    date: new Date(),
    taskText: '',
};

const initState = {
    newTaskId: findAvailableNewTaskId(awaitingCreateToDoTasks),
    selectedTasksDate: new Date(),
    mutableItem: { ...initMutableItem },
    toDoTaskList: [],
    err: null,
};

const reducersToDoList = (state = initState, { type, payload }) => {
    switch (type) {
        // запрос на создание нового задания вернул новое задание
        case CREATE_TODO_TASK: {
            if (isEqualDays(state.selectedTasksDate, payload.date)) {
                const mutableItem = { ...initMutableItem };
                let toDoTaskList = [...state.toDoTaskList];

                toDoTaskList.push(payload);
                toDoTaskList = sortTaskListByDate(toDoTaskList);
                awaitingCreateToDoTasks.push(payload);

                return {
                    ...state,
                    newTaskId: findAvailableNewTaskId(awaitingCreateToDoTasks),
                    mutableItem,
                    toDoTaskList,
                    err: null,
                };
            }

            return { ...state, err: null };
        }

        case CREATE_TODO_TASK_FULFILLED: {
            const { id, newId } = payload;
            const awaitingItem = awaitingCreateToDoTasks.find(awaitingItem => awaitingItem.id === id);
            let toDoTaskList = [...state.toDoTaskList];

            if (awaitingItem !== -1 && isEqualDays(state.selectedTasksDate, awaitingItem.date)) {
                toDoTaskList = toDoTaskList.map(task => {
                    if (task.id === id) {
                        task.id = newId;
                    }

                    return task;
                });

                awaitingCreateToDoTasks = resolveAwaitingItem(awaitingCreateToDoTasks, id);
            }

            return { ...state, toDoTaskList, err: null };
        }

        // запрос на создание нового задания вернул ошибку
        case CREATE_TODO_TASK_REJECTED: {
            const { id, err } = payload;
            const awaitingItem = awaitingCreateToDoTasks.find(awaitingItem => awaitingItem.id === id);
            let toDoTaskList = [...state.toDoTaskList];

            if (awaitingItem !== -1 && isEqualDays(state.selectedTasksDate, awaitingItem.date)) {
                toDoTaskList = toDoTaskList.reduce((result, task) => {
                    if (task.id !== id) {
                        result.push(task);
                    }

                    return result;
                }, []);

                awaitingCreateToDoTasks = resolveAwaitingItem(awaitingCreateToDoTasks, id);
            }

            return { ...state, toDoTaskList, err };
        }

        // запрос на изменение задания вернул измененное задание
        case CHANGE_TODO_TASK: {
            const { id, date } = payload;
            const mutableItem = { ...initMutableItem };
            const toDoTaskList = state.toDoTaskList.reduce((result, task) => {
                if (task.id === id) {
                    if (isEqualDays(state.selectedTasksDate, date)) {
                        result.push(payload);
                    }

                    awaitingChangeToDoTasks.push(task);
                } else {
                    result.push(task);
                }

                return result;
            }, []);

            return { ...state, mutableItem, toDoTaskList, err: null };
        }

        case CHANGE_TODO_TASK_FULFILLED: {
            const { id } = payload;

            awaitingChangeToDoTasks = resolveAwaitingItem(awaitingChangeToDoTasks, id);

            return { ...state, err: null };
        }

        // запрос на изменение задания вернул ошибку
        case CHANGE_TODO_TASK_REJECTED: {
            const { id, err } = payload;
            const awaitingItem = awaitingChangeToDoTasks.find(awaitingItem => awaitingItem.id === id);
            let toDoTaskList = [...state.toDoTaskList];

            if (awaitingItem !== -1) {
                if (isEqualDays(state.selectedTasksDate, awaitingItem.date)) {
                    let isTaskRestored = false;

                    toDoTaskList = toDoTaskList.map(task => {
                        if (task.id === awaitingItem.id) {
                            isTaskRestored = true;

                            return awaitingItem;
                        }

                        return task;
                    });

                    if (!isTaskRestored) {
                        toDoTaskList.push(awaitingItem);
                    }
                }

                toDoTaskList = sortTaskListByDate(toDoTaskList);
                awaitingChangeToDoTasks = resolveAwaitingItem(awaitingChangeToDoTasks, id);
            }

            return { ...state, toDoTaskList, err };
        }

        // запрос на изменение статуса задания на "Выполнено" вернул
        // идентификатор обновленного задания
        case DONE_TODO_TASK: {
            const toDoTaskList = state.toDoTaskList.map(task => {
                if (task.id === payload) {
                    const { id, status } = task;

                    awaitingDoneToDoTasks.push({ id, status });
                    task.status = 'done';
                }

                return task;
            });

            return { ...state, toDoTaskList, err: null };
        }

        case DONE_TODO_TASK_FULFILLED: {
            const { id } = payload;

            resolveAwaitingItem(awaitingDoneToDoTasks, id);

            return { ...state, err: null };
        }

        // запрос на изменение статуса задания на "Выполнено" вернул ошибку
        case DONE_TODO_TASK_REJECTED: {
            const { id, err } = payload;
            const toDoTaskList = state.toDoTaskList.map(task => {
                if (task.id === id) {
                    const awaitingItem = awaitingDoneToDoTasks.find(awaitingItem => awaitingItem.id === id);

                    if (awaitingItem !== -1) {
                        task.status = awaitingItem.status;
                        awaitingDoneToDoTasks = resolveAwaitingItem(awaitingDoneToDoTasks, id);
                    }
                }

                return task;
            });

            return { ...state, toDoTaskList, err };
        }

        // запрос на удаление задания по идентификатору вернул
        // идентификатор удаленного задания
        case DELETE_TODO_TASK: {
            const toDoTaskList = [...state.toDoTaskList].reduce((result, task) => {
                if (task.id === payload) {
                    awaitingDeleteToDoTasks.push(task);
                } else {
                    result.push(task);
                }

                return result;
            }, [])

            return { ...state, toDoTaskList, err: null };
        }

        case DELETE_TODO_TASK_FULFILLED: {
            const { id } = payload;

            awaitingDeleteToDoTasks = resolveAwaitingItem(awaitingDeleteToDoTasks, id);

            return { ...state, err: null };
        }

        // запрос на удаление задания по идентификатору вернул ошибку
        case DELETE_TODO_TASK_REJECTED: {
            const { id, err } = payload;
            const awaitingItem = awaitingDeleteToDoTasks.find(awaitingItem => awaitingItem.id === id);
            let toDoTaskList = [...state.toDoTaskList];

            if (awaitingItem !== -1) {
                toDoTaskList.push(awaitingItem);
                toDoTaskList = sortTaskListByDate(toDoTaskList);
                awaitingDeleteToDoTasks = resolveAwaitingItem(awaitingDeleteToDoTasks, id);
            }

            return { ...state, toDoTaskList, err };
        }

        // запрос на список заданий вернул новый список заданий
        case GET_TODO_TASKS_FOR_DATE_FULFILLED: {
            let { selectedTasksDate, toDoTaskList } = payload;

            toDoTaskList = toDoTaskList.map(task => ({
                id: task._id,
                date: new Date(task.date),
                taskText: task.taskText,
                status: task.status,
            }));
            toDoTaskList = sortTaskListByDate(toDoTaskList);

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
