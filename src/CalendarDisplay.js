import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Pages from './Layout/Pages';
import axios from 'axios'; // Import axios for making API requests

const localizer = momentLocalizer(moment);

const CalendarDisplay = () => {
  const [events, setEvents] = useState([]);
    // Events array...
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/admin/getEvents');
          const fetchedEvents = response.data.map(event => {
            const eventDate = new Date(event.date);
            const eventTime = event.time.split(':').map(Number);
            eventDate.setHours(eventTime[0], eventTime[1], 0, 0);
    
            const end = new Date(eventDate.getTime() + event.duration * 60 * 60 * 1000);
    
            return {
              title: `${event.firstName} ${event.lastName}`,
              start: eventDate,
              end: end,
            };
          });
    
          setEvents(fetchedEvents);
          console.log(fetchedEvents);
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      };
    
      fetchEvents();
    }, []);
    

  

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
