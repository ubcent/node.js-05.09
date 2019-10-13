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
    GET_TODO_TASKS_FOR_DATE,
    GET_TODO_TASKS_FOR_DATE_FULFILLED,
    GET_TODO_TASKS_FOR_DATE_REJECTED,
} from './actionTypes';
import { call, put, fork, takeEvery, takeLatest } from 'redux-saga/effects';
import { rootURL, fetchData } from '~/api.js';

const URL = `${rootURL}/tasks`;
const fetchParam = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
};

// создать новое задание
function* createToDoTask(action) {
    try {
        const param = { ...fetchParam };
        param.body = JSON.stringify(action);

        const response = yield call(fetchData, URL, param);

        if (response.err) {
            throw new Error(response.err);
        }

        yield put({
            type: CREATE_TODO_TASK_FULFILLED,
            payload: {
                id: action.payload.id,
                newId: response,
            },
        });
    } catch (err) {
        yield put({
            type: CREATE_TODO_TASK_REJECTED,
            payload: {
                id: action.payload.id,
                err,
            },
        });
    }
}

// изменить задание по идентификатору
function* changeToDoTask(action) {
    try {
        const param = { ...fetchParam };
        param.body = JSON.stringify(action);

        const response = yield call(fetchData, URL, param);

        if (response.err) {
            throw new Error(response.err);
        }

        yield put({
            type: CHANGE_TODO_TASK_FULFILLED,
            payload: response,
        });
    } catch (err) {
        yield put({
            type: CHANGE_TODO_TASK_REJECTED,
            payload: {
                id: action.payload.id,
                err,
            },
        });
    }
}

// изменить статус задания на "Выполнено" по идентификатору
function* doneToDoTask(action) {
    try {
        const param = { ...fetchParam };
        param.body = JSON.stringify(action);

        const response = yield call(fetchData, URL, param);

        if (response.err) {
            throw new Error(response.err);
        }

        yield put({
            type: DONE_TODO_TASK_FULFILLED,
            payload: response,
        });
    } catch (err) {
        yield put({
            type: DONE_TODO_TASK_REJECTED,
            payload: {
                id: action.payload,
                err,
            },
        });
    }
}

// удалить задание из списка по идентификатору
function* deleteToDoTask(action) {
    try {
        const param = { ...fetchParam };
        param.body = JSON.stringify(action);

        const response = yield call(fetchData, URL, param);

        if (response.err) {
            throw new Error(response.err);
        }

        yield put({
            type: DELETE_TODO_TASK_FULFILLED,
            payload: response,
        });
    } catch (err) {
        yield put({
            type: DELETE_TODO_TASK_REJECTED,
            payload: {
                id: action.payload,
                err,
            },
        });
    }
}

// получить список заданий за дату
function* getToDoTasksForDate(action) {
    try {
        const param = { ...fetchParam };
        param.body = JSON.stringify(action);

        const response = yield call(fetchData, URL, param);

        if (response instanceof Error) {
            throw response;
        }

        yield put({
            type: GET_TODO_TASKS_FOR_DATE_FULFILLED,
            payload: {
                selectedTasksDate: action.payload,
                toDoTaskList: response,
            },
        });
    } catch (err) {
        yield put({
            type: GET_TODO_TASKS_FOR_DATE_REJECTED,
            payload: {
                selectedTasksDate: action.payload,
                err,
            },
        });
    }
}

function* watchCreateToDoTask() {
    yield takeEvery(CREATE_TODO_TASK, createToDoTask);
}

function* watchChangeToDoTask() {
    yield takeEvery(CHANGE_TODO_TASK, changeToDoTask);
}

function* watchDoneToDoTask() {
    yield takeEvery(DONE_TODO_TASK, doneToDoTask);
}

function* watchDeleteToDoTask() {
    yield takeEvery(DELETE_TODO_TASK, deleteToDoTask);
}

function* watchGetTasksForDate() {
    yield takeLatest(GET_TODO_TASKS_FOR_DATE, getToDoTasksForDate);
}

export default function* toDoListSagas() {
    yield fork(watchCreateToDoTask);
    yield fork(watchChangeToDoTask);
    yield fork(watchDoneToDoTask);
    yield fork(watchDeleteToDoTask);
    yield fork(watchGetTasksForDate);
}
