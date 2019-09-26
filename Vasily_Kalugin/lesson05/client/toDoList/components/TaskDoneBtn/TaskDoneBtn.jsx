import './TaskDoneBtn.scss';
import React from 'react';

import { doneToDoTask } from '../../actions';

function TaskDoneBtn(props) {
    return (
        <button className="todo-task__task-done-btn todo-task__task-done-btn_active" id={props.id}>
            Done
        </button>
    );
}

export default TaskDoneBtn;
