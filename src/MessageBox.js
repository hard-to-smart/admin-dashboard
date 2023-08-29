import React, { useState, useEffect } from 'react';
import Pages from './Layout/Pages';
import axios from 'axios';
import socket from './socketOnetime';
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

	// States to capture the button state, assignee name, and comments for each request
	const [acceptRejectStates, setAcceptRejectStates] = useState({});
	const [assigneeNames, setAssigneeNames] = useState({});
	const [assigneeComments, setAssigneeComments] = useState({});
	const handleAcceptRejectChange = (requestId, value) => {
		setAcceptRejectStates((prevStates) => ({
		  ...prevStates,
		  [requestId]: value
		}));
	  };
	
	  const handleAssigneeNameChange = (requestId, value) => {
		setAssigneeNames((prevNames) => ({
		  ...prevNames,
		  [requestId]: value
		}));
	  };
	
	  const handleAssigneeCommentsChange = (requestId, value) => {
		setAssigneeComments((prevComments) => ({
		  ...prevComments,
		  [requestId]: value
		}));
	}

	const handleSaveAndClick = (requestId) => {
		handleSaveChanges(requestId); // Call handleSaveChanges first
		handleRowClick(requestId);    // Call handleRowClick after saving changes
	  };
	  const handleCross = (requestId) => {
		handleRowClick(requestId);
		
		setAssigneeNames((prevNames) => ({ ...prevNames, [requestId]: null }));
		setAssigneeComments((prevComments) => ({ ...prevComments, [requestId]: null }));
		setAcceptRejectStates((prevStates) => ({ ...prevStates, [requestId]: 'pending' }));
	  };
	  
	const handleSaveChanges = async (requestId) => {
		const updatedRequests = requests.map((request) =>
		  request._id === requestId
			? {
				...request,
				acceptRejectState: acceptRejectStates[requestId],
				assigneeName: assigneeNames[requestId],
				assigneeComments: assigneeComments[requestId]
			  }
			: request
		);
	  
		setRequests(updatedRequests);
	  
		try {
			const requestBody = {
			  requestId, // Make sure requestId is defined
			  status: acceptRejectStates[requestId], // Use the value from your state
			  assignee: assigneeNames[requestId], // Use the value from your state
			  comments: assigneeComments[requestId] // Use the value from your state
			};
		  
			await axios.post('http://localhost:8080/api/admin/updateStatusAssigneeComments', requestBody);
			console.log('Data successfully sent to the server.');
			alert('Data successfully sent to the server.');
			localStorage.setItem('requestData', JSON.stringify({
				requestId,
				status: acceptRejectStates[requestId],
				assignee: assigneeNames[requestId],
				assigneeComments: assigneeComments[requestId]
			  }));
		  } catch (error) {
			console.error('Error updating request on server:', error);
			alert('An error occurred while updating the request.');
		  }
	  };
	  useEffect(() => {
		const savedData = localStorage.getItem('requestData');
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    // Set the state with the retrieved data
    setAcceptRejectStates((prevStates) => ({
      ...prevStates,
      [parsedData.requestId]: parsedData.status
    }));
    setAssigneeNames((prevNames) => ({
      ...prevNames,
      [parsedData.requestId]: parsedData.assignee
    }));
    setAssigneeComments((prevComments) => ({
      ...prevComments,
      [parsedData.requestId]: parsedData.assigneeComments
    }));
  }
		
	  
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
	  
		socket.on('statusAssigneeCommentsUpdated', (updatedData) => {
			setRequests((prevRequests) => {
				const updatedIndex = prevRequests.findIndex(req => req._id === updatedData.requestId);
	  
				if (updatedIndex !== -1) {
					const updatedRequests = [...prevRequests];
					updatedRequests[updatedIndex] = {
					  ...updatedRequests[updatedIndex], // Preserve existing data
					  status: updatedData.status,
					  assignee: updatedData.assignee,
					  comments: updatedData.comments
					};
					return updatedRequests;
				  }
	  
			return prevRequests;
		  });
		});
	  
		socket.on('message', (message) => {
			alert(message); // Display the message in an alert
			console.log('Message from server:', message);
		  });
		
		  socket.on('error', (error) => {
			alert('An error occurred: ' + error); // Display the error in an alert
  			console.error('Socket error:', error); // Add logging
		  });
		  return () => {
			// Remove event listeners using .off
			socket.off('newClientRequirement');
			socket.off('statusAssigneeCommentsUpdated');
			socket.off('message');
			socket.off('error');
		
			// Disconnect the socket
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
					<th className="d-none d-xl-table-cell">Event Time</th>
					<th className="d-none d-xl-table-cell">Room</th>
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
                      <td className="d-none d-xl-table-cell">{new Date(request.requestDate).toDateString()}</td>
                      <td className="d-none d-xl-table-cell">{new Date(request.date).toDateString()}</td>
					  <td className="d-none d-xl-table-cell">{request.time}</td>
					  <td className="d-none d-xl-table-cell">{request.roomOptions}</td>
                      <td>
					  <span className={`badge ${request.status === 'reject' ? 'bg-danger' : request.status === 'accept' ? 'bg-success' :    'bg-warning' }`}>
      				 {request.status === 'reject' ? 'Rejected' :  request.status === 'accept' ? 'Approved' :'Pending'}</span>
                      </td>
                      <td className="d-none d-md-table-cell">{request.assignee !== '' ? request.assignee : '-'}</td>
					  <td className='d-none d-md-table-cell'>{request.comments !== '' ? request.comments : '-'}</td>
					  
                    </tr>
					
                  ))
				   } </tbody>
              </table>
            </div>
          </div>
		  {isFormOpen && selectedRequest && selectedRequest.status === 'Pending' && (
  
  <div className="fixed inset-0 flex items-center lg:p-0 p-2 justify-center bg-black bg-opacity-50 ">
  <fieldset className='w-fit'>
<legend className="text-[14px] italic text-white justify-between flex" ><span>Request ID: {selectedRequest._id} </span> <span ><X className='accent-white cursor-pointer hover:ring-2 hover-ring-primary' onClick={() => handleCross(selectedRequest._id)}/></span></legend>
<div className="bg-white rounded-lg px-6 py-2 shadow-lg  w-fit ">
	<div className="grid grid-cols-2 gap-6 mt-4">
	<div>
		<label htmlFor='name' className="block text-medium  text-slate-700 font-semibold">Name</label>
		<input type="text" name='name' readOnly className="form-input mt-1 outline-none" value={selectedRequest.firstName + ' ' +selectedRequest.lastName}/>
	  </div>
	  
	<div>
		<label htmlFor='date' className="block text-medium  text-slate-700 font-semibold">Date of Request:</label>
		<input type="text" name='requestDate' readOnly className="form-input mt-1 outline-none" value={new Date(selectedRequest.requestDate).toDateString()} />
	  </div>
	  </div>
	
	<div className="grid grid-cols-2 gap-6 mt-4">
	  <div>
		<label htmlFor='phone' className="block text-medium text-slate-700 font-semibold">Phone</label>
		<input name='phone' type="text" readOnly className="form-input mt-1 outline-none" value={selectedRequest.phone} />
	  </div>
	  <div>
		<label htmlFor='email' className="block text-medium text-slate-700 font-semibold">Email</label>
		<input name='email' type="text" readOnly className="form-input mt-1 outline-none" value={selectedRequest.clientEmail} />
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
		<input name='date' type="text" readOnly className="form-input mt-1 outline-none" value={new Date(selectedRequest.date).toDateString()} />
	  </div>
	  </div>
	  <div className="grid grid-cols-2 gap-6 mt-4">
	  <div>
		<label className="block text-medium text-slate-700 font-semibold">Time of Meeting</label>
		<input name='time' type="time" readOnly className="form-input mt-1 outline-none" value={selectedRequest.time} />
	  </div>
	  <div>
		<label htmlFor='duration' className="block text-medium text-slate-700 font-semibold whitespace-nowrap overflow-visible">Duration of Meeting (hours)</label>
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
	<div className='grid grid-cols-2 w-full pb-3 '>
	<button className={`border-[2px] hover:bg-red-400 text-[#1a1ac3] justify-self-center font-[400] rounded-[18px] cursor-pointer py-[1px] px-4 ${
    acceptRejectStates[selectedRequest._id] === 'reject' ? 'bg-red-400' : 'bg-red-200'}`} onClick={() => handleAcceptRejectChange(selectedRequest._id, 'reject')}> Reject </button>                
	 <button className={` hover:bg-green-400 border-[2px] rounded-[15px] text-[#1a1ac3] justify-self-center py-[1px] px-4 font-[400] cursor-pointer ${
    acceptRejectStates[selectedRequest._id] === 'accept' ? 'bg-green-400' : 'bg-green-200'}`} onClick={() => handleAcceptRejectChange(selectedRequest._id, 'accept')}>Accept</button>
	
	</div>
	<div className='grid grid-cols-1 pb-4'>
		<label htmlFor='assigneeName' className="block text-medium text-slate-700 font-semibold">Name of Assignee</label>
		<input type="text" name='assigneeName'  value={assigneeNames[selectedRequest._id] || ''}
                    onChange={(e) => handleAssigneeNameChange(selectedRequest._id, e.target.value)} className="form-input mt-1 outline-none border-2 rounded-lg"  />
	</div>
	<div className='grid grid-cols-1 pb-3'>
		<label htmlFor='assigneeComments' className="block text-medium text-slate-700 font-semibold">Comments</label>
		<input type="text" name='assigneeComments' value={assigneeComments[selectedRequest._id] || ''}
                    onChange={(e) => handleAssigneeCommentsChange(selectedRequest._id, e.target.value)} className="form-input mt-1 outline-none border-2 rounded-lg"  />
	</div>
	<div className='grid justify-end -mr-10 py-2'><button className="btn btn-md btn-primary" onClick={() => handleSaveAndClick(selectedRequest._id)}>Save</button></div>
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
