import './TaskCreator.scss';
import React from 'react';

import TaskDateBtn from '~/toDoList/containers/TaskDateBtn/TaskDateBtn.jsx';
import TaskSaveBtn from '~/toDoList/containers/TaskSaveBtn/TaskSaveBtn.jsx';
import TaskCancelBtn from '../TaskCancelBtn/TaskCancelBtn.jsx';
import TaskTextInput from '~/toDoList/containers/TaskTextInput/TaskTextInput.jsx';

function TaskCreator() {
    return (
        <div className="task-creator">
            <TaskDateBtn />
            <TaskSaveBtn />
            <TaskCancelBtn />
            <TaskTextInput />
        </div>
    );
}

export default TaskCreator;
