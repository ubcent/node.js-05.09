import './ToDoTaskList.scss';
import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import CreateTaskBtn from '~/toDoList/components/CreateTaskBtn/CreateTaskBtn.jsx';
import ChooseDateBtn from '~/toDoList/components/ChooseDateBtn/ChooseDateBtn.jsx';
import ToDoTask from '~/toDoList/components/ToDoTask/ToDoTask.jsx';
import TaskCreator from '~/toDoList/components/TaskCreator/TaskCreator.jsx';

class ToDoTaskList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.err);
        return (
            <Router>
                <div className="todo-task-list">
                    <CreateTaskBtn />
                    <ChooseDateBtn date={this.props.selectedTasksDate} />
                    {this.props.mutableItem.id === 'newTask' ? <TaskCreator /> : null}
                    {this.props.toDoTaskList.map(toDoTask => {
                        let result = <ToDoTask key={toDoTask.id} {...toDoTask} />;

                        if (toDoTask.id === this.props.mutableItem.id) {
                            result = <TaskCreator key={toDoTask.id} />;
                        }
                        return result;
                    })}
                </div>
            </Router>
        );
    }
}

function mapStateToProps(state) {
    return state.toDoListData;
}

export default connect(mapStateToProps)(ToDoTaskList);
