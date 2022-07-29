import employees from "../../data/employees.json";
import calendar from "../../data/calendar.json";
import { associateCalendar, getFormattedDates, getMonths } from "../../utils/dataHandler";
import './calendar.css';

function Calendar() {
    return (
        <div className="grid">
          { <div className="grid__header">
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
            </div>}
            <div className="grid__header">
                {associateCalendar(calendar['datos']).map((months) => {
                    return (
                        <>
                        <div className="grid__header__month">{months.month}</div>
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
                    {employees["data"].map((employee) => {
                        return (
                            <div className="grid__body__item__employee">
                                {employee.first_name}
                                {employee.last_name}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Calendar;