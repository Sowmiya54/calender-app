import React, { useState } from 'react';
import dayjs from 'dayjs';
import '../styles/Calendar.css';
import eventsData from '../data/Event.json';
import Event from './Event';
import EventDetailsModal from './EventDetailsModal';
import '../styles/Event.css';
import '../styles/Modal.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [isYearView, setIsYearView] = useState(false);
  const [userEvents, setUserEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const today = dayjs().format('YYYY-MM-DD');
  const startOfMonth = currentDate.startOf('month');
  const startDay = startOfMonth.day();
  const daysInMonth = currentDate.daysInMonth();

  const generateCalendar = () => {
    const dates = [];
    for (let i = 0; i < startDay; i++) dates.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      dates.push(dayjs(currentDate).date(d));
    }
    return dates;
  };

  const goToPrev = () => {
    setCurrentDate(
      isYearView ? currentDate.subtract(1, 'year') : currentDate.subtract(1, 'month')
    );
  };

  const goToNext = () => {
    setCurrentDate(
      isYearView ? currentDate.add(1, 'year') : currentDate.add(1, 'month')
    );
  };

  const handleMonthClick = (monthIndex) => {
    setCurrentDate(currentDate.month(monthIndex));
    setIsYearView(false);
  };

  const handleYearChange = (e) => {
    const newYear = parseInt(e.target.value);
    if (!isNaN(newYear)) {
      setCurrentDate(currentDate.year(newYear));
    }
  };

  const handleAddEvent = (newEvent) => {
    const isConflict = [...userEvents, ...eventsData].some(
      (ev) =>
        ev.date === newEvent.date &&
        ev.time.trim().toLowerCase() === newEvent.time.trim().toLowerCase()
    );

    if (isConflict) {
      alert('⚠️ Conflict: Another event already exists at the same date and time!');
      return;
    }

    setUserEvents((prev) => [...prev, newEvent]);
  };

  const handleUpdateEvent = (updatedEvent) => {
    setUserEvents((prev) =>
      prev.map((ev) =>
        ev.title === selectedEvent.title &&
        ev.date === selectedEvent.date &&
        ev.time === selectedEvent.time
          ? updatedEvent
          : ev
      )
    );
    setSelectedEvent(null);
  };

  const handleDeleteEvent = (eventToDelete) => {
    setUserEvents((prev) =>
      prev.filter(
        (ev) =>
          !(
            ev.title === eventToDelete.title &&
            ev.date === eventToDelete.date &&
            ev.time === eventToDelete.time
          )
      )
    );
    setSelectedEvent(null);
  };

  const calendarDates = generateCalendar();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getEventsForDate = (date) => {
    const formatted = date.format('YYYY-MM-DD');
    const staticEvents = eventsData.filter((ev) => ev.date === formatted);
    const addedEvents = userEvents.filter((ev) => ev.date === formatted);
    return [...staticEvents, ...addedEvents];
  };

  const knownHolidays = {
    "2025-01-01": "New Year",
    "2025-01-14": "Pongal",
    "2025-08-15": "Independence Day",
    "2025-10-20": "Diwali",
    "2025-12-25": "Christmas"
  };

  return (
    <>
      <Event onAddEvent={handleAddEvent} existingEvents={[...userEvents, ...eventsData]} />

      <div className="calendar-container">
        <div className="calendar-header">
          <button onClick={goToPrev}>◀</button>
          {isYearView ? (
            <input
              type="number"
              value={currentDate.year()}
              onChange={handleYearChange}
            />
          ) : (
            <h2 onClick={() => setIsYearView(true)}>
              {currentDate.format('MMMM')} <b>{currentDate.format('YYYY')}</b>
            </h2>
          )}
          <button onClick={goToNext}>▶</button>
        </div>

        {isYearView ? (
          <div className="year-grid">
            {monthNames.map((month, index) => (
              <div
                key={index}
                className="month-box"
                onClick={() => handleMonthClick(index)}
              >
                {month}
              </div>
            ))}
          </div>
        ) : (
          <div className="calendar-grid">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div className="calendar-day-name highlight-row" key={day}>
                {day}
              </div>
            ))}
            {calendarDates.map((date, index) => {
              const isToday = date && date.format('YYYY-MM-DD') === today;
              const events = date ? getEventsForDate(date) : [];

              const dayName = date ? date.format('dddd') : '';
              const formattedDate = date ? date.format('YYYY-MM-DD') : '';
              const isSunday = dayName === 'Sunday';
              const isFixedHoliday = knownHolidays.hasOwnProperty(formattedDate);
              const holidayTitle = isFixedHoliday ? knownHolidays[formattedDate] : (isSunday ? 'Sunday' : '');
              const isHoliday = isFixedHoliday || isSunday;

              return (
                <div
                  key={index}
                  className={`calendar-day ${isToday ? 'today' : ''} ${isHoliday ? 'holiday' : ''}`}
                  title={isHoliday ? holidayTitle : ''}
                >
                  {date ? date.date() : ''}
                  {events.map((ev, idx) => (
                    <div
                      key={idx}
                      className="event-card"
                      onClick={() => setSelectedEvent(ev)}
                      title={`${ev.title} at ${ev.time}`}
                    >
                      <div className="event-time">{ev.time}</div>
                      <div className="event-title">{ev.title}</div>
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {selectedEvent && (
        <EventDetailsModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onUpdateEvent={handleUpdateEvent}
          onDeleteEvent={handleDeleteEvent}
        />
      )}
    </>
  );
};

export default Calendar;
