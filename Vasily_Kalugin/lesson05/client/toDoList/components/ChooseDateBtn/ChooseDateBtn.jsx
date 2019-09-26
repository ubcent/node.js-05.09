import './ChooseDateBtn.scss';
import React from 'react';

function getFormatDate(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date
        .getDate()
        .toString()
        .padStart(2, '0');

    return `${day}.${month}.${year}`;
}

function ChooseDateBtn(props) {
    return <button className="todo__choose-date-btn">{getFormatDate(props.currentDate)}</button>;
}

export default ChooseDateBtn;
