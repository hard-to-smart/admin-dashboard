import React, { useState, useEffect } from 'react';
import Pages from './Layout/Pages';
import axios from 'axios';
import io from 'socket.io-client';
// import Form from './Form';
import { X } from 'react-feather'

const MessageBox = () => {
  const [requests, setRequests] = useState([]);
  const [selectedRequest, setSelectedRequest] = useState(null);
	const [isFormOpen, setIsFormOpen] = useState(false);

	const handleRowClick = (request) => {
		setSelectedRequest(request);
	setIsFormOpen(!isFormOpen);
	};

  useEffect(() => {
    const socket = io('http://localhost:8080');

    async function fetchRequests() {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/getClientRequirements');
        if (response.data.success) {
          setRequests(response.data.clientRequirements);
        }
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    }

    fetchRequests();

    socket.on('newClientRequirement', (newRequirement) => {
      setRequests((prevRequests) => [...prevRequests, newRequirement]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Pages
      pageContent={(
        <div className="row">
          <div className="col-12 d-flex">
            <div className="card flex-fill">
              <div className="card-header">
                <h5 className="card-title mb-0">Reservation Requests Received</h5>
              </div>
              <table className="table table-hover my-0">
                <thead>
                  <tr>
                    <th>Client Name</th>
                    <th>Request ID</th>
                    <th className="d-none d-xl-table-cell">Request Date</th>
                    <th className="d-none d-xl-table-cell">Event Date</th>
                    <th>Status</th>
                    <th className="d-none d-md-table-cell">Assignee</th>
					<th className='d-none d-md-table-cell'>Comments</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <tr key={request._id} className='cursor-pointer' onClick={() => handleRowClick(request)}>
                      <td>{request.firstName} {request.lastName}</td>
                      <td>{request._id}</td>
                      <td className="d-none d-xl-table-cell">{request.requestDate}</td>
                      <td className="d-none d-xl-table-cell">{new Date(request.date).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge bg-warning`}>
                          pending
                        </span>
                      </td>
                      <td className="d-none d-md-table-cell">-</td>
					  <td className='d-none d-md-table-cell'>-</td>
					  
                    </tr>
					
                  ))
				   } </tbody>
              </table>
            </div>
          </div>
		  {isFormOpen && selectedRequest && (
  
  <div className="fixed inset-0 flex items-center lg:p-0 p-2 justify-center bg-black bg-opacity-50 ">
  <fieldset className='w-fit'>
<legend className="text-[14px] italic text-white justify-between flex" ><span>Request ID: {selectedRequest._id} </span> <span ><X className='accent-white cursor-pointer hover:ring-2 hover-ring-primary' onClick={handleRowClick}/></span></legend>
<div className="bg-white rounded-lg px-6 py-2 shadow-lg w-full max-w-md ">
	<div className="grid grid-cols-2 gap-6 mt-4">
	<div>
		<label htmlFor='name' className="block text-medium  text-slate-700 font-semibold">Name</label>
		<input type="text" name='name' readOnly className="form-input mt-1 outline-none" value={selectedRequest.firstName + ' ' +selectedRequest.lastName}/>
	  </div>
	  
	<div>
		<label htmlFor='date' className="block text-medium  text-slate-700 font-semibold">Date of Request:</label>
		<input type="date" name='requestDate' readOnly className="form-input mt-1 outline-none" value={selectedRequest.requestDate} />
	  </div>
	  </div>
	
	<div className="grid grid-cols-2 gap-6 mt-4">
	  <div>
		<label htmlFor='phone' className="block text-medium text-slate-700 font-semibold">Phone</label>
		<input name='phone' type="text" readOnly className="form-input mt-1 outline-none" value={selectedRequest.phone} />
	  </div>
	  <div>
		<label htmlFor='email' className="block text-medium text-slate-700 font-semibold">Email</label>
		<input name='email' type="text" readOnly className="form-input mt-1 outline-none" value={selectedRequest.email} />
	  </div>
	</div>
	<div className="grid grid-cols-2 gap-6 mt-4">
	  <div>
		<label htmlFor='noOfPeople' className="block text-medium text-slate-700 font-semibold whitespace-nowrap">Expected no. of people</label>
		<input name='noOfPeople' type="number" readOnly className="form-input mt-1 outline-none" value={selectedRequest.noOfPeople} />
	  </div>
	  <div>
		<label htmlFor='roomOptions' className="block text-medium text-slate-700 font-semibold">Preferred Room</label>
		<div>
		  <label className="inline-flex items-center">
			<input name='roomOptions' type="radio" className="form-radio outline-none" readOnly checked />
			<span className="ml-2">{selectedRequest.roomOptions}</span>
		  </label>
		</div>
		{/* <div>
		  <label className="inline-flex items-center">
			<input name='roomOptions' type="radio" className="form-radio outline-none" readOnly />
			<span className="ml-2">Room B</span>
		  </label>
		</div> */}
	  </div>
	</div>
	<div className="grid grid-cols-2 gap-6 mt-4">
	  <div>
		<label htmlFor='designation' className="block text-medium  text-slate-700 font-semibold">Designation</label>
		<input name='designation' type="text" readOnly className="form-input mt-1 outline-none" value={selectedRequest.designation} />
	  </div>
	
	  <div>
		<label htmlFor='date' className="block text-medium text-slate-700 font-semibold">Date of Meeting</label>
		<input name='date' type="date" readOnly className="form-input mt-1 outline-none" value={selectedRequest.date} />
	  </div>
	  </div>
	  <div className="grid grid-cols-2 gap-6 mt-4">
	  <div>
		<label className="block text-medium text-slate-700 font-semibold">Time of Meeting</label>
		<input name='time' type="time" readOnly className="form-input mt-1 outline-none" value={selectedRequest.time} />
	  </div>
	  <div>
		<label htmlFor='duration' className="block text-medium text-slate-700 font-semibold">Duration of Meeting</label>
		<input name='duration' type="text" readOnly className="form-input mt-1 outline-none" value={selectedRequest.duration} />
	  </div>
	</div>
	{/* <div className="mt-4">
	  <label className="block text-medium font-medium text-gray-700">Subject</label>
	  <input type="text" readOnly className="form-input mt-1 outline-none" value="Meeting Subject" />
	</div> */}
	<div className="mt-2 grid grid-cols-1">
	  <label htmlFor='description' className="block text-medium  text-slate-700 font-semibold outline-none">Description</label>
	  <textarea name='description'
		readOnly
		className="form-textarea mt-1 resize-none outline-none"
		rows="3"
		value={selectedRequest.description}
	  />
	</div>
	<div className='grid grid-cols-2 gap-6 pb-3'>
	<button className='border-[2px] border-[#1a1ac3] text-[#1a1ac3] font-[400] rounded-[18px] cursor-pointer py-[1px] px-4'> Reject </button>                
	 <button className="bg-[#88bfff] rounded-[15px] text-[#1a1ac3] py-[1px] px-4 font-[400] cursor-pointer">Accept</button>
	
	</div>
	<div className='grid grid-cols-1 pb-4'>
		<label htmlFor='assigneeName' className="block text-medium text-slate-700 font-semibold">Name of Assignee</label>
		<input type="text" name='assigneeName' className="form-input mt-1 outline-none border-2 rounded-lg"  />
	</div>
	<div className='grid grid-cols-1 pb-3'>
		<label htmlFor='assigneeComments' className="block text-medium text-slate-700 font-semibold">Comments</label>
		<input type="text" name='assigneeComments' className="form-input mt-1 outline-none border-2 rounded-lg"  />
	</div>
	<div className='grid justify-end -mr-10 py-2'><button className="btn btn-md btn-primary" onClick={handleRowClick}>Save</button></div>
	</div>
	</fieldset>
	</div>
 
)}
        </div>

      )}
    />
  );
};

export default MessageBox;
