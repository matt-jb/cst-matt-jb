import { useEffect, useState } from "react";
import { UseCalendarDay } from "../types";
import { fetchEvents, getStartingTotals, getTotals } from "../helpers";

const useCalendarSummary = (numberOfDays: number) => {
  const [totals, setTotals] = useState<UseCalendarDay>(getStartingTotals());
  const [data, setData] = useState<UseCalendarDay[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const events = fetchEvents(numberOfDays);

    events
      .then((events) => {
        const data = events.map((event) => {
          if (event.status === "fulfilled") return event.value;

          return {
            date: "",
            eventsCount: 0,
            totalEventsDuration: 0,
            longestEvent: {
              uuid: "",
              title: "Error, please try again",
              durationInMinutes: 0,
            },
          };
        });

        const totals = getTotals(data);

        setData(data);
        setTotals(totals);
      })
      .catch(() => {
        console.log("Whoops! There was an error fetching data from the API.");
        setIsLoading(false);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [numberOfDays]);

  return {
    data,
    totals,
    isLoading,
    isError,
  };
};

export default useCalendarSummary;
