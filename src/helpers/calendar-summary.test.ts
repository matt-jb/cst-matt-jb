import { CalendarEvent } from "../api-client";
import {
  getLongestEvent,
  fetchEvents,
  getTotalEventsDuration,
  getTotals,
  getStartingTotals,
} from "./calendar-summary";
import { UseCalendarDay } from "../types";

describe("getTotalEventsDuration", () => {
  it("should return 0 when given an empty array", () => {
    const events: CalendarEvent[] = [];
    const result = getTotalEventsDuration(events);
    expect(result).toEqual(0);
  });

  it("should return the sum of all event durations", () => {
    const events: CalendarEvent[] = [
      { uuid: "UUID Event 1", title: "Event 1", durationInMinutes: 30 },
      { uuid: "UUID Event 2", title: "Event 2", durationInMinutes: 60 },
      { uuid: "UUID Event 3", title: "Event 3", durationInMinutes: 90 },
    ];
    const result = getTotalEventsDuration(events);
    expect(result).toEqual(180);
  });
});

describe("getLongestEvent", () => {
  it("should return undefined when given an empty array", () => {
    const events: CalendarEvent[] = [];
    const result = getLongestEvent(events);
    expect(result).toBeUndefined();
  });

  it("should return the longest event", () => {
    const events: CalendarEvent[] = [
      { uuid: "UUID Event 1", title: "Event 1", durationInMinutes: 30 },
      { uuid: "UUID Event 2", title: "Event 2", durationInMinutes: 60 },
      { uuid: "UUID Event 3", title: "Event 3", durationInMinutes: 90 },
    ];
    const result = getLongestEvent(events);
    expect(result).toEqual(events[2]);
  });

  it("should return the first event when all events have the same duration", () => {
    const events: CalendarEvent[] = [
      { uuid: "UUID Event 1", title: "Event 1", durationInMinutes: 60 },
      { uuid: "UUID Event 2", title: "Event 2", durationInMinutes: 60 },
      { uuid: "UUID Event 3", title: "Event 3", durationInMinutes: 60 },
    ];
    const result = getLongestEvent(events);
    expect(result).toEqual(events[0]);
  });
});

describe("getTotals", () => {
  it("should return the correct totals when given an array of events", () => {
    const events = [
      {
        date: "2022-01-01",
        eventsCount: 2,
        totalEventsDuration: 120,
        longestEvent: {
          uuid: "UUID Event 1",
          title: "Event 1",
          durationInMinutes: 60,
        },
      },
      {
        date: "2022-01-02",
        eventsCount: 1,
        totalEventsDuration: 30,
        longestEvent: {
          uuid: "UUID Event 2",
          title: "Event 2",
          durationInMinutes: 30,
        },
      },
    ];

    const result = getTotals(events);

    expect(result).toEqual({
      date: "Total",
      eventsCount: 3,
      totalEventsDuration: 150,
      longestEvent: {
        uuid: "UUID Event 1",
        title: "Event 1",
        durationInMinutes: 60,
      },
    });
  });

  it("should return the correct totals when given an empty array", () => {
    const events: UseCalendarDay[] = [];

    const result = getTotals(events);

    expect(result).toEqual(getStartingTotals());
  });
});

describe("fetchEvents", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return an empty array when numberOfDays is 0", async () => {
    const result = await fetchEvents(0);
    expect(result).toEqual([]);
  });
});
