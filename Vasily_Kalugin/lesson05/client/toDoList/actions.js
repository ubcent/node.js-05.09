import {
    CREATE_TODO_TASK,
    CHANGE_TODO_TASK,
    DONE_TODO_TASK,
    DELETE_TODO_TASK,
    GET_TODO_TASKS_FOR_DATE,
    SET_MUTABLE_ITEM_ID,
    SET_MUTABLE_ITEM_DATE,
    SET_MUTABLE_ITEM_TASK_TEXT,
} from './actionTypes';

// создать новое задание
export function createToDoTask({ id, date, taskText }) {
    const status = date > new Date() ? 'expected' : 'failed';

    return {
        type: CREATE_TODO_TASK,
        payload: { id, date, taskText, status },
    };
}

// изменить выбранное задание
export function changeToDoTask({ id, date, taskText, status }) {
    return {
        type: CHANGE_TODO_TASK,
        payload: { id, date, taskText, status },
    };
}

// завершить задание
export function doneToDoTask(id) {
    return {
        type: DONE_TODO_TASK,
        payload: id,
    };
}

// удалить задание
export function deleteToDoTask(id) {
    return {
        type: DELETE_TODO_TASK,
        payload: id,
    };
}

// передать дату для выборки заданий
export function getToDoTasksForDate(date) {
    return {
        type: GET_TODO_TASKS_FOR_DATE,
        payload: date,
    };
}

// установить свойства нового или выбранного для изменения задания
export function setMutableItemId(id) {
    return {
        type: SET_MUTABLE_ITEM_ID,
        payload: id,
    };
}

// установить дату нового или выбранного для изменения задания
export function setMutableItemDate(date) {
    return {
        type: SET_MUTABLE_ITEM_DATE,
        payload: date || new Date(),
    };
}

// установить текст нового или выбранного для изменения задания
export function setMutableItemTaskText(taskText) {
    return {
        type: SET_MUTABLE_ITEM_TASK_TEXT,
        payload: taskText || '',
    };
}
