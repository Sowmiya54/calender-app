import React, { useState } from 'react';
import '../styles/Event.css';

const Event = ({ onAddEvent, existingEvents = [] }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    duration: '',
    ampm: 'AM',
  });
  const [conflictMessage, setConflictMessage] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.date || !formData.time) {
      alert("Please fill in Title, Date, and Time");
      return;
    }

    const fullTime = formData.time + ' ' + formData.ampm;
    const isConflict = existingEvents.some(ev =>
      ev.date === formData.date && ev.time === fullTime
    );

    if (isConflict) {
      setConflictMessage("⚠️ An event already exists at this date and time!");
      return;
    }

    const newEvent = {
      ...formData,
      time: fullTime
    };

    delete newEvent.ampm;

    onAddEvent(newEvent);
    setFormData({ title: '', date: '', time: '', duration: '', ampm: 'AM' });
    setShowForm(false);
    setConflictMessage('');
  };

  return (
    <div className="event-wrapper">
      <div className="event-action-bar">
        <button
          className="add-event-button"
          onClick={() => {
            setShowForm(!showForm);
            setConflictMessage('');
          }}
        >
          {showForm ? "Cancel" : "➕ Add New Event"}
        </button>
      </div>

      {showForm && (
        <div className="event-form">
          <input
            type="text"
            name="title"
            placeholder="Event Title"
            value={formData.title}
            onChange={handleChange}
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          <div className="time-picker">
            <input
              type="text"
              name="time"
              placeholder="HH:MM"
              value={formData.time}
              onChange={handleChange}
              maxLength="5"
            />
            <select
              name="ampm"
              value={formData.ampm}
              onChange={handleChange}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
          <input
            type="text"
            name="duration"
            placeholder="Duration (e.g., 1 hr)"
            value={formData.duration}
            onChange={handleChange}
          />
          {conflictMessage && (
            <div className="conflict-message">{conflictMessage}</div>
          )}
          <button className="submit-button" onClick={handleSubmit}>
            Add Event
          </button>
        </div>
      )}
    </div>
  );
};

export default Event;
