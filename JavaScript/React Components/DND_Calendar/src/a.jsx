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
  // ... (previous state definitions remain the same)

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

  const eventStyleGetter = (event) => {
    const backgroundColor = getEventStatus(event);
    const isSelected = selectedEvents.some((e) => e.id === event.id);

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
        userSelect: "none", // Prevent text selection while clicking
      },
    };
  };

  // ... (other functions remain the same)

  return (
    <div
      className={
        "relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded " +
        (color === "light" ? "bg-white" : "bg-lightBlue-900 text-white")
      }
    >
      {/* ... (header remains the same) */}
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
          defaultView="week"
          defaultDate={new Date()}
          selectable
          resizable
          onEventDrop={moveEvent}
          onEventResize={moveEvent}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={handleSelectEvent}
          onSelectSlot={handleSelectSlot}
          // Add these new props for better selection handling
          draggableAccessor={(event) => !event.present}
          longPressThreshold={10}
        />
      </div>
    </div>
  );
}