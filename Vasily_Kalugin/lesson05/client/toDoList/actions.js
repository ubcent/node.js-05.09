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

export function doneToDoTask(id) {
    return {
        type: DONE_TODO_TASK,
        payload: id,
    };
}

export function deleteToDoTask() {
    return {
        type: DELETE_TODO_TASK,
        payload: id,
    };
}

export function getTasksForDate(date) {
    return {
        type: GET_TASKS_FOR_DATE,
        payload: date,
    };
}

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

export function setMutableItem({ id, date, taskText, status }) {
    let result;

    if (id === null) {
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

export function setMutableDate(date) {
    return {
        type: SET_MUTABLE_ITEM_DATE,
        payload: date || new Date(),
    };
}

export function setMutableTaskText(taskText) {
    return {
        type: SET_MUTABLE_ITEM_TASK_TEXT,
        payload: taskText || '',
    };
}
