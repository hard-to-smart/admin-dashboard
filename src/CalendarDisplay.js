import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Pages from './Layout/Pages'

const localizer = momentLocalizer(moment);

const CalendarDisplay = () => {
  const [events, setEvents] = useState([
    // Events array...
    {
      title: 'Event 1',
      start: new Date(),
      end: new Date(new Date().setHours(new Date().getHours() + 1)),
    },
    {
      title: 'Event 2',
      start: new Date(new Date().setDate(new Date().getDate() - 1)),
      end: new Date(new Date().setHours(new Date().getHours() + 1)),
    }
  ]);

  const handleSelectSlot = ({ start, end }) => {
    // handleSelectSlot function...
  };

  return (
    <Pages pageContent={(
      <>   
    <div style={{ height: '600px' , width:'1000px', margin:'auto', marginTop:'10px', justifyContent:'center', alignItems:'center', }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        selectable
        onSelectSlot={handleSelectSlot}
        defaultView="month"
        views={['month', 'week']}
        defaultDate={new Date()} // Set the defaultDate to the current date
      />
    </div>
    </>
    )}/>
  );
};

export default CalendarDisplay;
