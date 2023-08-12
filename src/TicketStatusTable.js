import React from 'react';

const TicketStatusTable = () => {
  const ticketData = [
    {
      request_id: 1,
      employee_id: 101,
      status: 'Pending',
      request_date: '2023-07-20',
      event_date: '2023-07-25',
      event_time: '15:00',
      subject: 'Query about product',
    },
    {
      request_id: 2,
      employee_id: 102,
      status: 'Accepted',
      request_date: '2023-07-21',
      event_date: '2023-07-28',
      event_time: '10:30',
      subject: 'Service request',
    },
    // Add more data as needed
  ];

  return (
    <div className='flex w-screen h-screen '>
    <div className='flex justify-center items-center '>
    <div className="overflow-x-auto ">
      <table className="table-auto w-full border-purple-700 border-2">
        <thead className='bg-purple-500 text-[#fff] border-purple-700 border-2'>
          <tr>
            <th className="px-4 py-2">Request ID</th>
            <th className="px-4 py-2">Employee ID</th>
            <th className="px-4 py-2">Status</th>
            <th className="px-4 py-2">Request Date</th>
            <th className="px-4 py-2">Event Date</th>
            <th className="px-4 py-2">Event Time</th>
            <th className="px-4 py-2">Subject</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {ticketData.map((ticket) => (
            <tr key={ticket.request_id}>
              <td className="border px-4 py-2">{ticket.request_id}</td>
              <td className="border px-4 py-2">{ticket.employee_id}</td>
              <td className="border px-4 py-2">
                <span
                  className={`status-badge ${
                    ticket.status === 'Pending'
                      ? 'badge-pending'
                      : ticket.status === 'Accepted'
                      ? 'badge-accepted'
                      : 'badge-rejected'
                  }`}
                >
                  {ticket.status}
                </span>
              </td>
              <td className="border px-4 py-2">{ticket.request_date}</td>
              <td className="border px-4 py-2">{ticket.event_date}</td>
              <td className="border px-4 py-2">{ticket.event_time}</td>
              <td className="border px-4 py-2">{ticket.subject}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none"
                  onClick={() => console.log('Button Clicked')}
                >
                  Update Status
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </div>
  );
};

export default TicketStatusTable;
