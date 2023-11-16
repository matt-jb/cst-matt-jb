import "./CalendarTable.css";
import { UseCalendarDay } from "../../types";

type Props = {
  data: UseCalendarDay[];
  totals: UseCalendarDay;
};

const CalendarTable = ({ data, totals }: Props) => {
  return (
    <table>
      <thead>
        <tr className="header">
          <th>Date</th>
          <th>Number of events</th>
          <th>Total duration [min]</th>
          <th>Longest Event</th>
        </tr>
      </thead>
      <tbody>
        {data.map((event) => (
          <tr className="row" key={event.date}>
            <td className="left">{event.date}</td>
            <td>{event.eventsCount}</td>
            <td>{event.totalEventsDuration}</td>
            <td className="left">{event.longestEvent.title}</td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        <tr className="footer">
          <td className="left">Total</td>
          <td>{totals.eventsCount}</td>
          <td>{totals.totalEventsDuration}</td>
          <td className="left">{totals.longestEvent.title}</td>
        </tr>
      </tfoot>
    </table>
  );
};

export { CalendarTable };
