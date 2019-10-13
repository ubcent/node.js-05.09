import './TaskCancelBtn.scss';
import React from 'react';
import { connect } from 'react-redux';

import { setMutableItemId } from '~/toDoList/actions';

function setMutableItemIdAction(props) {
    props.dispatch(setMutableItemId(null));
}

function TaskCancelBtn(props) {
    return (
        <button
            className="task-creator__task-cancel-btn task-creator__task-cancel-btn_cancel"
            onClick={() => setMutableItemIdAction(props)}
        >
            Cancel
        </button>
    );
}

export default connect()(TaskCancelBtn);
