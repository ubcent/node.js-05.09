import './MainPage.scss';
import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import ToDoTaskList from '~/toDoList/containers/ToDoTaskList/ToDoTaskList.jsx';

function MainPage() {
    return (
        <Router>
            <Link to="/task" className="main-page">
                Перейти на туду
            </Link>
            <div className="main-page">
                <Route path="/task" component={ToDoTaskList} />
            </div>
        </Router>
    );
}

export default MainPage;
