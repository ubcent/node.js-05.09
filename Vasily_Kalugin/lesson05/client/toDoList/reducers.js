import {
    CREATE_TODO_TASK_FULFILLED,
    CREATE_TODO_TASK_REJECTED,
    CHANGE_TODO_TASK_FULFILLED,
    CHANGE_TODO_TASK_REJECTED,
    DONE_TODO_TASK_FULFILLED,
    DONE_TODO_TASK_REJECTED,
    DELETE_TODO_TASK_FULFILLED,
    DELETE_TODO_TASK_REJECTED,
    GET_TASKS_FOR_DATE_FULFILLED,
    GET_TASKS_FOR_DATE_REJECTED,
    SET_MUTABLE_ITEM,
    SET_MUTABLE_ITEM_DATE,
    SET_MUTABLE_ITEM_TASK_TEXT,
} from './actionTypes';

const initState = {
    selectedTasksDate: new Date(),
    mutableItem: {
        id: null,
        date: new Date(),
        taskText: '',
        status: '',
    },
    toDoTaskList: [
        {
            id: 'id',
            date: new Date(),
            taskText: 'Create todo list',
            status: 'expected',
        },
    ],
};

const reducersToDoList = (state = initState, { type, payload }) => {
    switch (type) {
        case CREATE_TODO_TASK_FULFILLED:
            return { ...state };
        case CREATE_TODO_TASK_REJECTED:
            return { ...state };
        case CHANGE_TODO_TASK_FULFILLED:
            return { ...state };
        case CHANGE_TODO_TASK_REJECTED:
            return { ...state };
        case DONE_TODO_TASK_FULFILLED:
            return { ...state };
        case DONE_TODO_TASK_REJECTED:
            return { ...state };
        case DELETE_TODO_TASK_FULFILLED:
            return { ...state };
        case DELETE_TODO_TASK_REJECTED:
            return { ...state };
        case GET_TASKS_FOR_DATE_FULFILLED:
            return { ...state };
        case GET_TASKS_FOR_DATE_REJECTED:
            return { ...state };
        case SET_MUTABLE_ITEM: {
            let newMutableItem = { ...state.mutableItem };
            newMutableItem.id = payload.id;
            newMutableItem.date = payload.date;
            newMutableItem.taskText = payload.taskText;
            newMutableItem.status = payload.status;

            return { ...state, mutableItem: newMutableItem };
        }
        case SET_MUTABLE_ITEM_DATE: {
            let newMutableItem = { ...state.mutableItem };
            newMutableItem.date = payload;

            return { ...state, mutableItem: newMutableItem };
        }
        case SET_MUTABLE_ITEM_TASK_TEXT: {
            let newMutableItem = { ...state.mutableItem };
            newMutableItem.taskText = payload;

            return { ...state, mutableItem: newMutableItem };
        }
        default:
            return { ...state };
    }
};

export default reducersToDoList;
