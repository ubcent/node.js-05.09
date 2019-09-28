import './TaskDeleteBtn.scss';
import React from 'react';
import { connect } from 'react-redux';

import { deleteToDoTask } from '~/toDoList/actions';

function deleteToDoTaskAction(props) {
    props.dispatch(deleteToDoTask(props.id));
}

function TaskDeleteBtn(props) {
    return (
        <button
            className="todo-task__task-delete-btn todo-task__task-delete-btn_cancel"
            onClick={() => deleteToDoTaskAction(props)}
        >
            Delete
        </button>
    );
}

export default connect()(TaskDeleteBtn);
