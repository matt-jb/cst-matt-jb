import { CalendarEvent } from "../api-client";

export type UseCalendarDay = {
  date: string;
  eventsCount: number;
  totalEventsDuration: number;
  longestEvent: CalendarEvent;
};
