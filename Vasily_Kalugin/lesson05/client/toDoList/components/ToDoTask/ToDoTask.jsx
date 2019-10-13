import './ToDoTask.scss';
import React from 'react';

import TaskChangeBtn from '../TaskChangeBtn/TaskChangeBtn.jsx';
import TaskDoneBtn from '../TaskDoneBtn/TaskDoneBtn.jsx';
import TaskDeleteBtn from '../TaskDeleteBtn/TaskDeleteBtn.jsx';

import taskDoneImg from '~/assets/images/toDoList/taskDone.png';
import taskExpectedImg from '~/assets/images/toDoList/taskExpected.png';
import taskFailedImg from '~/assets/images/toDoList/taskFailed.png';

function getFormatTime(date) {
    const hours = date
        .getHours()
        .toString()
        .padStart(2, '0');
    const minutes = date
        .getMinutes()
        .toString()
        .padStart(2, '0');

    return `${hours}:${minutes}`;
}

function setStatusImg(status) {
    switch (status) {
        case 'done':
            return <img className="todo-task__status-ico" src={taskDoneImg} />;
        case 'expected':
            return <img className="todo-task__status-ico" src={taskExpectedImg} />;
        case 'failed':
            return <img className="todo-task__status-ico" src={taskFailedImg} />;
        default:
            return null;
    }
}

function ToDoTask(props) {
    return (
        <div className="todo-task">
            {setStatusImg(props.status)}
            <p className="todo-task__time">{getFormatTime(props.date)}</p>
            <TaskDeleteBtn id={props.id} />
            <TaskChangeBtn id={props.id} />
            <TaskDoneBtn id={props.id} />
            <p className="todo-task__text">{props.taskText}</p>
        </div>
    );
}

export default ToDoTask;
