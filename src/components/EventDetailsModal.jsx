// src/components/EventDetailsModal.jsx
import React, { useState } from 'react';
import '../styles/Modal.css';

const EventDetailsModal = ({ event, onClose, onUpdateEvent, onDeleteEvent }) => {
  const [editMode, setEditMode] = useState(false);
  const [updatedEvent, setUpdatedEvent] = useState({ ...event });

  const handleChange = (e) => {
    setUpdatedEvent({ ...updatedEvent, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onUpdateEvent(updatedEvent);
    setEditMode(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>📌 Event Details</h3>

        {editMode ? (
          <div className="modal-form">
            <input name="title" value={updatedEvent.title} onChange={handleChange} placeholder="Title" />
            <input name="date" value={updatedEvent.date} onChange={handleChange} type="date" />
            <input name="time" value={updatedEvent.time} onChange={handleChange} type="time" />
            <input name="duration" value={updatedEvent.duration} onChange={handleChange} placeholder="Duration" />
            <button onClick={handleSave}>💾 Save</button>
          </div>
        ) : (
          <div className="modal-details">
            <p><strong>Title:</strong> {event.title}</p>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Time:</strong> {event.time || 'N/A'}</p>
            <p><strong>Duration:</strong> {event.duration || 'N/A'}</p>
          </div>
        )}

        <div className="modal-actions">
          <button onClick={() => setEditMode(!editMode)}>{editMode ? "Cancel Edit" : "✏️ Edit"}</button>
          <button onClick={() => onDeleteEvent(event)}>🗑️ Delete</button>
          <button onClick={onClose}>❌ Close</button>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;
