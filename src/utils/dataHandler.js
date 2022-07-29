export function getMonths() {
    return ['Enero', 'Febrero'];
}
export function getFormattedDates(calendar, month) {
    var items = calendar.map((date) => {
        return {
            date: getDate(date.fecha, month),
        };
    });
    return items;
}

function getDate(fecha, month) {
    if (typeof fecha !== 'string') {
        fecha = fecha.toString();
    }
    var dataMonth = fecha.substring(4, 5);
    dataMonth = parseInt(dataMonth);
    if (month === dataMonth) {
        return fecha.substring(6);
    }
}
/** Creo que es mejor enviar un array entero de los dias con los meses asociativamente
 * meses: {
 *  enero {
 *      1 2 3 4
 * },
 *  febrero {
 *      1 2 3 4
 * }}
 *
 */

export function associateCalendar(calendar) {
    const newCalendar = [];
    newCalendar.push(
        getMonths().map((month, i) => {
            return { month: month, dates: getFormattedDates(calendar, i + 1) };
        })
    );
    console.log(newCalendar);
    return newCalendar[0];
}
