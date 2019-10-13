import './TaskSaveBtn.scss';
import React from 'react';
import { connect } from 'react-redux';

import { createToDoTask, changeToDoTask } from '~/toDoList/actions';

function changeToDoTaskAction(props) {
    if (/newTask/.test(props.id)) {
        props.dispatch(createToDoTask(props));
    } else {
        props.dispatch(changeToDoTask(props));
    }
}

function TaskSaveBtn(props) {
    return (
        <button
            className="task-creator__task-save-btn task-creator__task-save-btn_expect"
            onClick={() => changeToDoTaskAction(props)}
        >
            Save
        </button>
    );
}

function mapStateToProps(state) {
    return state.toDoListData.mutableItem;
}

export default connect(mapStateToProps)(TaskSaveBtn);
