import "./CalendarSummary.css";
import { CalendarTable } from "./CalendarTable";
import useCalendarSummary from "../hooks/useCalendarSummary";

const numberOfDays = process.env.REACT_APP_NUMBER_OF_DAYS
  ? parseInt(process.env.REACT_APP_NUMBER_OF_DAYS)
  : 7;

const CalendarSummary: React.FunctionComponent = () => {
  const { data, totals, isLoading, isError } = useCalendarSummary(numberOfDays);

  return (
    <>
      <h2>Calendar summary</h2>
      <div className="wrapper">
        {data && data.length > 0 && (
          <CalendarTable data={data} totals={totals} />
        )}
        {isLoading && <div>Loading...</div>}
        {isError && <div>Whooops! There was an error. Please try again.</div>}
      </div>
    </>
  );
};

export default CalendarSummary;
