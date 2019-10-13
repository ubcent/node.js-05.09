import './TaskDoneBtn.scss';
import React from 'react';
import { connect } from 'react-redux';

import { doneToDoTask } from '~/toDoList/actions';

function doneToDoTaskAction(props) {
    props.dispatch(doneToDoTask(props.id));
}

function TaskDoneBtn(props) {
    return (
        <button
            className="todo-task__task-done-btn todo-task__task-done-btn_active"
            onClick={() => doneToDoTaskAction(props)}
        >
            Done
        </button>
    );
}

export default connect()(TaskDoneBtn);
