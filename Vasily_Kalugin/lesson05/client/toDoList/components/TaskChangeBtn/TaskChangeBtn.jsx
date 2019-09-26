import './TaskChangeBtn.scss';
import React from 'react';
import { connect } from 'react-redux';

import { setMutableItem } from '../../actions';

function setMutableItemAction(props) {
    props.dispatch(setMutableItem(props));
}

function TaskChangeBtn(props) {
    return (
        <button
            className="todo-task__task-change-btn todo-task__task-change-btn_expect"
            onClick={() => setMutableItemAction(props)}
        >
            Change
        </button>
    );
}

export default connect()(TaskChangeBtn);
