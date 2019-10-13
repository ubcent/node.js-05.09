import './TaskTextInput.scss';
import React from 'react';
import { connect } from 'react-redux';

import { setMutableItemTaskText } from '~/toDoList/actions';

function setMutableItemTaskTextAction(props, taskText) {
    props.dispatch(setMutableItemTaskText(taskText));
}

function TaskTextInput(props) {
    return (
        <input
            className="task-creator__task-text-input"
            type="text"
            placeholder="Input task text"
            value={props.taskText}
            onChange={event => setMutableItemTaskTextAction(props, event.target.value)}
        ></input>
    );
}

function mapStateToProps(state) {
    return state.toDoListData.mutableItem;
}

export default connect(mapStateToProps)(TaskTextInput);
