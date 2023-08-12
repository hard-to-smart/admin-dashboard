import React, { useState, useEffect } from 'react';
import Pages from './Layout/Pages'

const Calendar = () => {
  const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [no_of_days, setNoOfDays] = useState([]);
  const [blankdays, setBlankDays] = useState([]);
  const [days, setDays] = useState(DAYS);

  const [events, setEvents] = useState([
    {
      event_date: new Date(2023, 3, 1),
      event_title: "April Fool's Day",
      event_theme: 'blue'
    },
    {
      event_date: new Date(2023, 3, 10),
      event_title: "Birthday",
      event_theme: 'red'
    },
    {
      event_date: new Date(2023, 3, 16),
      event_title: "Upcoming Event",
      event_theme: 'green'
    }
  ]);

  const [event_title, setEventTitle] = useState('');
  const [event_date, setEventDate] = useState('');
  const [event_theme, setEventTheme] = useState('blue');

  const [themes] = useState([
    { value: "blue", label: "Blue Theme" },
    { value: "red", label: "Red Theme" },
    { value: "yellow", label: "Yellow Theme" },
    { value: "green", label: "Green Theme" },
    { value: "purple", label: "Purple Theme" }
  ]);

  const [openEventModal, setOpenEventModal] = useState(false);

  useEffect(() => {
    initDate();
    getNoOfDays();
  }, []);
  
  const initDate = () => {
    const today = new Date();
    setMonth(today.getMonth());
    setYear(today.getFullYear());
  
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    setEventDate(firstDayOfMonth.toDateString());
  };

  const isToday = (date) => {
    const today = new Date();
    const d = new Date(year, month, date);
    return today.toDateString() === d.toDateString();
  };

  const showEventModal = (date) => {
    setEventDate(new Date(year, month, date).toDateString());
    setOpenEventModal(true);
  };

  const addEvent = () => {
    if (event_title === '') return;

    setEvents([...events, { event_date: event_date, event_title: event_title, event_theme: event_theme }]);
    setEventTitle('');
    setEventDate('');
    setEventTheme('blue');
    setOpenEventModal(false);
  };

  const getNoOfDays = () => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dayOfWeek = new Date(year, month).getDay();
    const blankdaysArray = Array.from({ length: dayOfWeek }, (_, i) => i + 1);
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    setBlankDays(blankdaysArray);
    setNoOfDays(daysArray);
  };

  return (
    <Pages
    pageContent={(
    <div className="antialiased sans-serif bg-gray-100 h-auto">
      <div x-data="app()" x-init="[initDate(), getNoOfDays()]" x-cloak>
        <div className="container mx-auto px-4 py-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div><h2 className='bg-blue-500 text-slate-50 p-3 font-semibold'>CALENDAR</h2></div>
            <div className="flex items-center justify-between py-2 px-6">
              <div>
                <span className="text-lg font-bold text-gray-800">{MONTH_NAMES[month-1]}</span>
                <span className="ml-1 text-lg text-gray-600 font-normal">{year}</span>
              </div>
              <div className="border rounded-lg px-1" style={{ paddingTop: '2px' }}>
                <button
                  type="button"
                  className={`leading-none rounded-lg transition ease-in-out duration-100 inline-flex cursor-pointer hover:bg-gray-200 p-1 items-center ${month === 0 ? 'cursor-not-allowed opacity-25' : ''}`}
                  disabled={month === 0}
                  onClick={() => { setMonth((prevMonth) => prevMonth - 1); getNoOfDays(); }}
                >
                  <svg className="h-6 w-6 text-gray-500 inline-flex leading-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="border-r inline-flex h-6"></div>
                <button
                  type="button"
                  className={`leading-none rounded-lg transition ease-in-out duration-100 inline-flex items-center cursor-pointer hover:bg-gray-200 p-1 ${month === 11 ? 'cursor-not-allowed opacity-25' : ''}`}
                  disabled={month === 11}
                  onClick={() => { setMonth((prevMonth) => prevMonth + 1); getNoOfDays(); }}
                >
                  <svg className="h-6 w-6 text-gray-500 inline-flex leading-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="-mx-1 -mb-1">
              <div className="flex flex-wrap" style={{ marginBottom: '-40px' }}>
                {days.map((day, index) => (
                  <div key={index} style={{ width: '14%' }} className="px-2 py-2">
                    <div className="text-gray-600 text-sm uppercase tracking-wide font-bold text-center">
                      {day}
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap border-t border-l">
                {blankdays.map((blankday, index) => (
                  <div key={index} style={{ width: '14%', height: '100px' }} className="text-center border-r border-b px-4 pt-2"></div>
                ))}
                {no_of_days.map((date, dateIndex) => (
                  <div key={dateIndex} style={{ width: '14%', height: '100px' }} className="px-4 pt-2 border-r border-b relative">
                    <div
                      onClick={() => showEventModal(date)}
                      className={`inline-flex w-6 h-6 items-center justify-center cursor-pointer text-center leading-none rounded-full transition ease-in-out duration-100 ${isToday(date) ? 'bg-blue-500 text-white' : 'text-gray-700 hover:bg-blue-200'}`}
                    >
                      {date}
                    </div>
                    <div style={{ height: '80px' }} className="overflow-y-auto mt-1">
                      {events
                        .filter(e => new Date(e.event_date).toDateString() === new Date(year, month, date).toDateString())
                        .map((event, index) => (
                          <div
                            key={index}
                            className={`px-2 py-1 rounded-lg mt-1 overflow-hidden border ${event.event_theme === 'blue' ? 'border-blue-200 text-blue-800 bg-blue-100'
                              : event.event_theme === 'red' ? 'border-red-200 text-red-800 bg-red-100'
                                : event.event_theme === 'yellow' ? 'border-yellow-200 text-yellow-800 bg-yellow-100'
                                  : event.event_theme === 'green' ? 'border-green-200 text-green-800 bg-green-100'
                                    : 'border-purple-200 text-purple-800 bg-purple-100'}`}
                          >
                            <p className="text-sm truncate leading-tight">{event.event_title}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {openEventModal && (
          <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', display: openEventModal ? 'block' : 'none' }} className="fixed z-40 top-0 right-0 left-0 bottom-0 h-full w-full">
            <div className="p-4 max-w-xl mx-auto relative absolute left-0 right-0 overflow-hidden mt-24">
              <div className="shadow rounded-lg bg-white overflow-hidden w-full block p-8">
                <h2 className="font-bold text-2xl mb-6 text-gray-800 border-b pb-2">Add Event Details</h2>
                <div className="mb-4">
                  <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">Event title</label>
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    type="text"
                    value={event_title}
                    onChange={(e) => setEventTitle(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">Event date</label>
                  <input
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-lg w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    type="text"
                    value={event_date}
                    readOnly
                  />
                </div>
                <div className="inline-block w-64 mb-4">
                  <label className="text-gray-800 block mb-1 font-bold text-sm tracking-wide">Select a theme</label>
                  <div className="relative">
                    <select
                      onChange={(e) => setEventTheme(e.target.value)}
                      value={event_theme}
                      className="block appearance-none w-full bg-gray-200 border-2 border-gray-200 hover:border-gray-500 px-4 py-2 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-blue-500 text-gray-700"
                    >
                      {themes.map((theme) => (
                        <option key={theme.value} value={theme.value}>
                          {theme.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="mt-8 text-right">
                  <button
                    type="button"
                    className="bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded-lg shadow-sm mr-2"
                    onClick={() => setOpenEventModal(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-4 border border-gray-700 rounded-lg shadow-sm"
                    onClick={addEvent}
                  >
                    Save Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* /Modal */}
      </div>
    </div>
    )}/>
  );
};

export default Calendar;
