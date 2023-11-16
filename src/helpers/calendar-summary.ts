import dayjs from "dayjs";
import getCalendarEvents, { CalendarEvent } from "../api-client";
import { UseCalendarDay } from "../types";

export function getLongestEvent(events: CalendarEvent[]) {
  return events.reduce((longest, current) => {
    if (current.durationInMinutes > longest.durationInMinutes) {
      return current;
    }
    return longest;
  }, events[0]);
}

export function getTotalEventsDuration(events: CalendarEvent[]) {
  return events.reduce((total, current) => {
    return total + current.durationInMinutes;
  }, 0);
}

export async function fetchEvents(numberOfDays: number) {
  return Promise.allSettled(
    Array.from({ length: numberOfDays }).map(async (_, index) => {
      const today = dayjs();
      const queryDate = today.add(index, "day");
      const singleDaysEvents = await getCalendarEvents(queryDate.toDate());

      return {
        date: queryDate.format("YYYY-MM-DD"),
        eventsCount: singleDaysEvents.length,
        totalEventsDuration: getTotalEventsDuration(singleDaysEvents),
        longestEvent: getLongestEvent(singleDaysEvents),
      };
    })
  );
}

export function getTotals(events: UseCalendarDay[]) {
  const longestEvent = getLongestEvent(
    events.map((event) => event.longestEvent)
  );

  return events.reduce(
    (totals, current) => ({
      ...totals,
      eventsCount: totals.eventsCount + current.eventsCount,
      totalEventsDuration:
        totals.totalEventsDuration + current.totalEventsDuration,
    }),
    getStartingTotals(longestEvent)
  );
}

export function getStartingTotals(
  longestEvent = {
    uuid: "",
    title: "",
    durationInMinutes: 0,
  }
) {
  return {
    date: "Total",
    eventsCount: 0,
    totalEventsDuration: 0,
    longestEvent: longestEvent,
  };
}
