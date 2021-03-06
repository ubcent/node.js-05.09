import './TaskSaveBtn.scss';
import React from 'react';
import { connect } from 'react-redux';

import { createToDoTask, changeToDoTask } from '../../actions';

function changeToDoTaskAction(props) {
    if (props.id) {
        props.dispatch(changeToDoTask(props));
    } else {
        props.dispatch(createToDoTask(props));
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
