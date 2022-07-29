import employees from "../../data/employees.json";
import calendar from "../../data/calendar.json";
import {
    associateCalendar,
    getFormattedDates,
    getMonths,
} from "../../utils/dataHandler";
import "./calendar.css";

function Calendar() {
    /**
     * @description Cant use JSON date to convert to Date Object, so we will modify it a bit here
     * @param {Number} Date from JSON
     * @return {String} Date Object
     */
    function parseDate(date) {
        //Date comes as Number, so lets transform it to String for Date params
        if (typeof date !== "string") {
            date = date.toString();
        }
        const year = date.substring(0, 4);
        const month = date.substring(4, 6);
        const day = date.substring(6);
        return {
            year: year,
            month: month,
            day: day,
        };
    }
    function buildCalendar(calendar) {
        //Retrieving all dates from calendar.json
        const parsedCalendar = calendar.map((dates) => {
            return parseDate(dates.fecha);
        });
        /** Transforming array of dates into an array into their corresponding datetime
         * year {
         *  Year name,
         *  months: {
         *
         *  }
         * }
         */
        var array = { years: [] };
        for (var i = 0; i < parsedCalendar.length; i++) {
            let yearPos = checkIfExists(parsedCalendar[i]["year"], array.years);
            if (yearPos === false) {
                array.years.push({
                    name: parsedCalendar[i]["year"],
                    months: [],
                });
                yearPos = array.years.length - 1;
            }
            let monthPos = checkIfExists(
                parsedCalendar[i]["month"],
                array.years[yearPos].months
            );
            if (monthPos === false) {
                array.years[yearPos].months.push({
                    name: parsedCalendar[i]["month"],
                    days: [],
                });
                monthPos = array.years[yearPos].months.length - 1;
            }
            array.years[yearPos].months[monthPos].days.push({
                name: parsedCalendar[i]["day"],
            });
        }
        return array;
    }
    function checkIfExists(needle, haystack) {
        var pos = false;
        for (var i = 0; i < haystack.length; i++) {
            if (needle === haystack[i].name) {
                pos = i;
            }
        }
        return pos;
    }
    function translate(year, month) {
        const date = new Date(year + ", " + month);
        return date.toLocaleString('default', {month: 'long'});
    }
    return (
        <div className="grid">
                {buildCalendar(calendar["datos"]).years.map((year) => {
                    return (
                        <>
                            <div>{year.name}</div>
                            <div className="grid__header">
                            {year.months.map((month) => {
                                return (
                                    <>
                                        <div className="grid__header__month">
                                            <div className="grid__header__month__item">
                                                {translate(year, month.name)}
                                            </div>
                                            <div className="grid__header__day">
                                                {month.days.map((day) => {
                                                    return (
                                                        <div className="grid__header__day__item">
                                                            {day.name}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </>
                                );
                            })}
                            </div>
                    </>
                )})}
            {/* <div className="grid__header">
                <div className="grid__header__month">
                    {getMonths().map((month) => {
                        return (
                            <div className="grid__header__month__item">
                                {month}
                            </div>
                        );
                    })}
                </div>
                <div className="grid__header__day">
                    {getFormattedDates(calendar["datos"]).map((dates) => {
                        return (
                            <div className="grid__header__day__item">
                                {dates.date}
                            </div>
                        );
                    })}
                </div>
            </div>
            }
            <div className="grid__header">
                {associateCalendar(calendar["datos"]).map((months) => {
                    return (
                        <>
                            <div className="grid__header__month">
                                {months.month}
                            </div>
                            <div className="grid__header__days">
                                {months.dates.map((dates) => {
                                    return (
                                        <div className="grid__header__day__item">
                                            {dates.date}
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    );
                })}
            </div>
            <div className="grid__body">
                <div className="grid__body__item">
                    <h4>Empleados</h4>
                    {employees["data"].map((employee) => {
                        return (
                            <table
                                border="1"
                                cellSpacing="1"
                                className="grid__body__item__employee"
                            >
                                <tr>
                                    <th>
                                        {employee.first_name}
                                        &nbsp;
                                        {employee.last_name}
                                    </th>
                                </tr>
                            </table>
                        );
                    })}
                </div>
            </div> */}
        </div>
    );
}

export default Calendar;
