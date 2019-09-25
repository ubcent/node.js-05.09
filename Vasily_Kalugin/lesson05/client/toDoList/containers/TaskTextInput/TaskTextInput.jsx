import './TaskTextInput.scss';
import React from 'react';
import { connect } from 'react-redux';

import { setMutableTaskText } from '../../actions';

function setMutableTaskTextAction(props, taskText) {
    props.dispatch(setMutableTaskText(taskText));
}

function TaskTextInput(props) {
    return (
        <input
            className="task-creator__task-text-input"
            type="text"
            placeholder="Input task text"
            value={props.taskText}
            onChange={event => setMutableTaskTextAction(props, event.target.value)}
        ></input>
    );
}

function mapStateToProps(state) {
    return state.toDoListData.mutableItem;
}

export default connect(mapStateToProps)(TaskTextInput);
