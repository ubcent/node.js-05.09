import './ChooseDateBtn.scss';
import '~/assets/scss/plugins/react-datepicker.scss';
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';

import { getToDoTasksForDate } from '~/toDoList/actions';

class DatePickerCustomInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button className="todo__custom-date-btn todo__custom-date-btn_active" onClick={this.props.onClick}>
                {this.props.value}
            </button>
        );
    }
}

function getToDoTasksForDateAction(props, date) {
    props.dispatch(getToDoTasksForDate(date));
}

function ChooseDateBtn(props) {
    return (
        <div className="todo__choose-date-btn">
            <DatePicker
                selected={props.date}
                onChange={date => getToDoTasksForDateAction(props, date)}
                dateFormat="dd.MM.yyyy"
                withPortal
                peekNextMonth
                showMonthDropdown
                showYearDropdown
                dropdownMode="select"
                customInput={<DatePickerCustomInput />}
            />
        </div>
    );
}

export default connect()(ChooseDateBtn);
