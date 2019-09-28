export function isEqualDays(date1, date2) {
    const millisecondsInDay = 86400000;

    return (date1 / millisecondsInDay).toFixed(0) === (date2 / millisecondsInDay).toFixed(0);
}
