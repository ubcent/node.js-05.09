import './CreateTaskBtn.scss';
import React from 'react';
import { connect } from 'react-redux';

import { setMutableItem } from '../../actions';

function setMutableItemAction(props) {
    props.dispatch(setMutableItem({ id: 'newTask' }));
}

function CreateTaskBtn(props) {
    return (
        <button className="todo__create-task-btn" onClick={() => setMutableItemAction(props)}>
            Create task
        </button>
    );
}

export default connect()(CreateTaskBtn);
