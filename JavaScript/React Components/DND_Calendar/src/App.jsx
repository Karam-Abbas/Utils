import React, { useState } from "react";
import moment from "moment";
import { momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import { Calendar } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

export default function ScheduleCalendar({
  color = "light",
  title = "Scheduler",
}) {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Event 1",
      start: new Date(2025, 0, 1, 10, 0, 0),
      end: new Date(2025, 0, 1, 11, 0, 0),
      present: true,
    },
    {
      id: 2,
      title: "Event 2",
      start: new Date(2025, 0, 2, 13, 0, 0),
      end: new Date(2025, 0, 2, 14, 0, 0),
      present: false,
    },
    {
      id: 3,
      title: "Event 3",
      start: new Date(2025, 0, 13, 9, 0, 0),
      end: new Date(2025, 0, 13, 10, 0, 0),
      present: null,
    },
    {
      id: 4,
      title: "Event 4",
      subtitle: "New Event",
      start: new Date(2025, 0, 14, 10, 0, 0),
      end: new Date(2025, 0, 14, 11, 0, 0),
      present: null,
    },
    {
      id: 5,
      title: "Event 5",
      subtitle: "New Event",
      start: new Date(2025, 0, 14, 11, 0, 0),
      end: new Date(2025, 0, 14, 12, 0, 0),
      present: null,
    },
    {
      id: 6,
      title: "Event 6",
      subtitle: "New Event",
      start: new Date(2025, 0, 14, 12, 0, 0),
      end: new Date(2025, 0, 14, 13, 0, 0),
      present: null,
    },
    {
      id: 7,
      title: "Event 7",
      subtitle: "New Event",
      start: new Date(2025, 0, 14, 13, 0, 0),
      end: new Date(2025, 0, 14, 14, 0, 0),
      present: null,
    },
  ]);

  const [selectedEvents, setSelectedEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleSelectEvent = (event, e) => {
    // Prevent the default behavior which might interfere with our selection
    e.preventDefault();
    e.stopPropagation();

    // Get whether it's a multi-select attempt (Ctrl/Cmd key pressed)
    const isMultiSelect = e.ctrlKey || e.metaKey || e.shiftKey;

    setSelectedEvents((prevSelectedEvents) => {
      // For multi-select
      if (isMultiSelect) {
        const isCurrentlySelected = prevSelectedEvents.some(
          (e) => e.id === event.id
        );
        if (isCurrentlySelected) {
          // Remove the event if it's already selected
          return prevSelectedEvents.filter((e) => e.id === event.id);
        } else {
          // Add the event to selection
          return [...prevSelectedEvents, event];
        }
      }
      
      // For single select
      const isOnlySelectedEvent = 
        prevSelectedEvents.length === 1 && 
        prevSelectedEvents[0].id === event.id;

      // If it's the only selected event, unselect it
      if (isOnlySelectedEvent) {
        return [];
      }
      
      // Otherwise, select only this event
      return [event];
    });
  };

  const handleSelectSlot = (slotInfo) => {
    const clickedDate = moment(slotInfo.start).startOf("day");
    if (selectedDate) {
      const choice = confirm(
        `You are moving all the events of ${selectedDate} to ${clickedDate}`
      );
      if (choice) {
        //If we already had a date selected, move events from selectedDate to clicked date
        moveEventsToDate(selectedDate, clickedDate);
        setSelectedDate(null); // Clear the selection
      } else {
        alert("No date moved!");
      }
    } else {
      // First click - select the source date
      setSelectedDate(clickedDate);
    }
  };

  const moveEventsToDate = (sourceDate, targetDate) => {
    const now = moment().startOf("day");
    sourceDate = moment(sourceDate).startOf("day");
    targetDate = moment(targetDate).startOf("day");

    // Find all events on the source date
    const eventsOnSourceDate = events.filter((event) =>
      moment(event.start).startOf("day").isSame(sourceDate)
    );

    if (eventsOnSourceDate.length === 0) {
      alert("No events found on the selected date.");
      return;
    }

    // Check if target date is in the past
    if (targetDate.isBefore(now)) {
      alert("Cannot move events to past dates.");
      return;
    }

    // Check if any event is completed
    if (eventsOnSourceDate.some((event) => event.present === true)) {
      alert("Cannot move completed events.");
      return;
    }

    // Calculate the date difference in milliseconds
    const dateDiff = targetDate.diff(sourceDate);

    // Create proposed moves for all events
    const proposedMoves = eventsOnSourceDate.map((event) => ({
      ...event,
      start: new Date(event.start.getTime() + dateDiff),
      end: new Date(event.end.getTime() + dateDiff),
    }));

    // Check for overlaps with existing events on target date
    const sourceEventIds = eventsOnSourceDate.map((e) => e.id);
    const hasOverlaps = proposedMoves.some((proposedEvent) =>
      events.some(
        (existingEvent) =>
          !sourceEventIds.includes(existingEvent.id) &&
          moment(existingEvent.start).startOf("day").isSame(targetDate) &&
          isOverlapping(proposedEvent, existingEvent)
      )
    );

    if (hasOverlaps) {
      alert(
        "Cannot move events - there would be time conflicts on the target date."
      );
      return;
    }

    // If no overlaps, proceed with moving all events
    setEvents((prevEvents) =>
      prevEvents.map((event) => {
        const moveEvent = proposedMoves.find((move) => move.id === event.id);
        return moveEvent || event;
      })
    );
  };

  const isOverlapping = (event1, event2) => {
    return (
      event1.id !== event2.id &&
      ((event1.start >= event2.start && event1.start < event2.end) ||
        (event1.end > event2.start && event1.end <= event2.end) ||
        (event1.start <= event2.start && event1.end >= event2.end))
    );
  };

  const hasOverlap = (newEvent, excludeEventIds = []) => {
    return events.some(
      (existingEvent) =>
        !excludeEventIds.includes(existingEvent.id) &&
        isOverlapping(newEvent, existingEvent)
    );
  };

  const moveEvent = ({ event, start, end }) => {
    const now = moment().startOf("day");
    const targetDate = moment(start).startOf("day");
    const eventsToMove =
      selectedEvents.length > 0 && selectedEvents.includes(event)
        ? selectedEvents
        : [event];

    // Check if target date is in the past
    if (targetDate.isBefore(now)) {
      alert("Cannot move events to past dates.");
      return;
    }

    // Check if any selected event is completed
    if (eventsToMove.some((evt) => evt.present === true)) {
      alert("Cannot move completed events.");
      return;
    }

    // Calculate time difference for the moved event
    const timeDiff = start.getTime() - event.start.getTime();

    // Create proposed moves while maintaining original durations
    const proposedMoves = eventsToMove.map((evt) => {
      const eventDuration = evt.end.getTime() - evt.start.getTime();
      const newStart = new Date(evt.start.getTime() + timeDiff);
      const newEnd = new Date(newStart.getTime() + eventDuration);

      return {
        ...evt,
        start: newStart,
        end: newEnd,
      };
    });

    // Check for overlaps with non-selected events
    const selectedEventIds = eventsToMove.map((evt) => evt.id);
    const hasOverlaps = proposedMoves.some((proposedEvent) =>
      hasOverlap(proposedEvent, selectedEventIds)
    );

    if (hasOverlaps) {
      alert(
        "Cannot move events to these time slots - overlapping with existing events."
      );
      return;
    }

    // If no overlaps, proceed with moving all selected events
    setEvents((prevEvents) =>
      prevEvents.map((existingEvent) => {
        const matchingMove = proposedMoves.find(
          (move) => move.id === existingEvent.id
        );
        return matchingMove || existingEvent;
      })
    );
  };

  const getEventStatus = (event) => {
    const now = moment().startOf("day").toDate();
    const eventDate = moment(event.start).startOf("day").toDate();

    if (eventDate < now) {
      return event.present ? "#34c759" : "#ff3b30"; // green:red
    } else if (eventDate.getTime() === now.getTime()) {
      return "#007aff"; // blue
    } else {
      return "#007aff"; // blue
    }
  };

  const eventStyleGetter = (event) => {
    const backgroundColor = getEventStatus(event);
    const isSelected = selectedEvents.includes(event);

    return {
      style: {
        backgroundColor: isSelected ? "yellow" : backgroundColor,
        color: isSelected ? "black" : "white",
        borderRadius: "8px",
        border: isSelected ? "2px solid #666" : "1px solid #ddd",
        padding: "5px",
        display: "flex",
        alignItems: "center",
        cursor: event.present ? "not-allowed" : "pointer",
      },
    };
  };

  return (
    <div
      className={
        "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
        (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
      }
    >
      <div className="rounded-t mb-0 px-4 py-3 border-0">
        <div className="flex flex-wrap items-center justify-between">
          <div className="relative w-full max-w-full flex-grow flex-1">
            <h3
              className={
                "font-semibold text-lg " +
                (color === "light" ? "text-blueGray-700" : "text-white")
              }
            >
              {title}
            </h3>
          </div>
          {selectedDate && (
            <div className="text-sm text-blue-500">
              Click another date to move events from{" "}
              {selectedDate.format("MMM DD, YYYY")}
            </div>
          )}
        </div>
      </div>
      <div className="px-4 pb-4" style={{ height: "80vh" }}>
        <DnDCalendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          step={30}
          timeslots={1}
          min={new Date(2024, 0, 1, 9, 0, 0)}
          max={new Date(2024, 0, 1, 17, 0, 0)}
          defaultView="month"
          defaultDate={new Date()}
          selectable
          resizable
          onEventDrop={moveEvent}
          onEventResize={moveEvent}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
        />
      </div>
    </div>
  );
}
