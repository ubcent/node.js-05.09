import './CreateTaskBtn.scss';
import React from 'react';
import { connect } from 'react-redux';

import { setMutableItemId } from '~/toDoList/actions';

function setMutableItemIdAction(props) {
    props.dispatch(setMutableItemId(props.newTaskId));
}

function CreateTaskBtn(props) {
    return (
        <button className="todo__create-task-btn" onClick={() => setMutableItemIdAction(props)}>
            Create task
        </button>
    );
}

export default connect()(CreateTaskBtn);
