import {
    CREATE_TODO_TASK,
    CHANGE_TODO_TASK,
    DONE_TODO_TASK,
    DELETE_TODO_TASK,
    GET_TASKS_FOR_DATE,
    SET_MUTABLE_ITEM,
    SET_MUTABLE_ITEM_DATE,
    SET_MUTABLE_ITEM_TASK_TEXT,
} from './actionTypes';

// завершить задание
export function doneToDoTask(id) {
    return {
        type: DONE_TODO_TASK,
        payload: id,
    };
}

// удалить задание
export function deleteToDoTask() {
    return {
        type: DELETE_TODO_TASK,
        payload: id,
    };
}

// передать дату для выборки заданий
export function getTasksForDate(date) {
    return {
        type: GET_TASKS_FOR_DATE,
        payload: date,
    };
}

// создать новой задание
export function createToDoTask({ date, taskText }) {
    const now = new Date();
    let status = 'failed';

    if (date > now) {
        status = 'expected';
    }

    return {
        type: CREATE_TODO_TASK,
        payload: { date, taskText, status },
    };
}

// изменить выбранное задание
export function changeToDoTask({ id, date, taskText }) {
    const now = new Date();
    let status = 'failed';

    if (date > now) {
        status = 'expected';
    }

    return {
        type: CHANGE_TODO_TASK,
        payload: { id, date, taskText, status },
    };
}

// установить свойства нового или выбранного для изменения задания
export function setMutableItem({ id, date, taskText, status }) {
    let result;

    if (id === null || id === 'newTask') {
        result = {
            type: SET_MUTABLE_ITEM,
            payload: { id, date: new Date(), taskText: '', status: '' },
        };
    } else {
        result = {
            type: SET_MUTABLE_ITEM,
            payload: { id, date, taskText, status },
        };
    }

    return result;
}

// установить дату нового или выбранного для изменения задания
export function setMutableDate(date) {
    return {
        type: SET_MUTABLE_ITEM_DATE,
        payload: date || new Date(),
    };
}

// установить текст нового или выбранного для изменения задания
export function setMutableTaskText(taskText) {
    return {
        type: SET_MUTABLE_ITEM_TASK_TEXT,
        payload: taskText || '',
    };
}
