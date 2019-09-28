import './TaskDateBtn.scss';
import '~/assets/scss/plugins/react-datepicker.scss';
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import { connect } from 'react-redux';

import { setMutableItemDate } from '~/toDoList/actions';

class DatePickerCustomInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button
                className="task-creator__custom-date-btn task-creator__custom-date-btn_active"
                onClick={this.props.onClick}
            >
                {this.props.value}
            </button>
        );
    }
}

function setMutableItemDateAction(props, date) {
    props.dispatch(setMutableItemDate(date));
}

function TaskDateBtn(props) {
    return (
        <div className="task-creator__task-date-btn">
            <DatePicker
                selected={props.date}
                onChange={date => setMutableItemDateAction(props, date)}
                showTimeInput
                dateFormat="dd.MM.yyyy (HH:mm)"
                timeFormat="HH:mm"
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

function mapStateToProps(state) {
    return state.toDoListData.mutableItem;
}

export default connect(mapStateToProps)(TaskDateBtn);
