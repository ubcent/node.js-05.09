import './TaskCancelBtn.scss';
import React from 'react';
import { connect } from 'react-redux';

import { setMutableItem } from '../../actions';

function setMutableItemAction(props) {
    props.dispatch(setMutableItem({ id: null }));
}

function TaskCancelBtn(props) {
    return (
        <button
            className="task-creator__task-cancel-btn task-creator__task-cancel-btn_cancel"
            onClick={() => setMutableItemAction(props)}
        >
            Cancel
        </button>
    );
}

export default connect()(TaskCancelBtn);
