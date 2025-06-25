import React from 'react';
import Calendar from './Calendar';
import '../styles/CalendarPage.css';

const CalendarPage = () => {
  return (
    <div className="calendar-page">
      {/* Left Sidebar */}
      <aside className="sidebar left">
        <h3>Quick Tools</h3>
        <ul>
          <li>🗒️ Notes</li>
          <li>⏰ Reminders</li>
          <li>✅ Tasks</li>
          <li>📊 Productivity Stats</li>
        </ul>
        <div className="quote-box">
          <p>“Plan your day, own your future.”</p>
        </div>
      </aside>

      {/* Calendar */}
      <main className="main-calendar">
        <Calendar />
      </main>

      {/* Right Sidebar */}
      <aside className="sidebar right">
        <h3>Upcoming Holidays</h3>
        <ul>
          <li>🎉 Diwali - Nov 1</li>
          <li>🕉️ Krishna Jayanthi - Aug 26</li>
          <li>📿 Pongal - Jan 14</li>
          <li>🎄 Christmas - Dec 25</li>
        </ul>

        <div className="reminder-box">
          <h4>💡 Tips</h4>
          <p>Stay focused. Review your tasks daily.</p>
        </div>
      </aside>
    </div>
  );
};

export default CalendarPage;
