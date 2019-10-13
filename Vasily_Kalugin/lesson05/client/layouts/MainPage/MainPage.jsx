import './MainPage.scss';
import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import ToDoTaskList from '~/toDoList/containers/ToDoTaskList/ToDoTaskList.jsx';

function MainPage() {
    return (
        <Router>
            <Redirect to="/tasks" />
            <div className="main-page">
                <Route path="/tasks" component={ToDoTaskList} />
            </div>
        </Router>
    );
}

export default MainPage;
