import './TaskChangeBtn.scss';
import React from 'react';
import { connect } from 'react-redux';

import { setMutableItemId } from '~/toDoList/actions';

function setMutableItemActionId(props) {
    props.dispatch(setMutableItemId(props.id));
}

function TaskChangeBtn(props) {
    return (
        <button
            className="todo-task__task-change-btn todo-task__task-change-btn_expect"
            onClick={() => setMutableItemActionId(props)}
        >
            Change
        </button>
    );
}

export default connect()(TaskChangeBtn);
