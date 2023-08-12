import React from 'react'
import Pages from './Layout/Pages'
import './app.css'
const From = () => {
  return (
    <Pages
    pageContent={(
			
		<div className="fixed inset-0 flex items-center lg:p-0 p-2 justify-center bg-black bg-opacity-50">
			  
			  <fieldset className='w-fit'>
		<legend className="text-[14px] italic text-white" >Request ID: 123456</legend>
		<div className="bg-white rounded-lg px-6 py-2 shadow-lg w-fit max-w-md ">
				<div className="grid grid-cols-2 gap-4">
				  
				  <div>
					<label className="block text-sm font-medium text-gray-700">Employee ID</label>
					<input type="text" readOnly className="form-input mt-1 outline-none" value="EMP123" />
				  </div>
				  <div>
					<label className="block text-sm font-medium text-gray-700">Date of Request</label>
					<input type="date" readOnly className="form-input mt-1 outline-none" value="2023-07-27" />
				  </div>
				</div>
				<div className="grid grid-cols-2 gap-4 mt-4">
				  <div>
					<label className="block text-sm font-medium text-gray-700">Name</label>
					<input type="text" readOnly className="form-input mt-1 outline-none" value="John Doe" />
				  </div>
				  <div>
					<label className="block text-sm font-medium text-gray-700">Designation</label>
					<input type="text" readOnly className="form-input mt-1 outline-none" value="Software Engineer" />
				  </div>
				</div>
				<div className="grid grid-cols-2 gap-4 mt-4">
				  <div>
					<label className="block text-sm font-medium text-gray-700">Phone</label>
					<input type="text" readOnly className="form-input mt-1 outline-none" value="123-456-7890" />
				  </div>
				  <div>
					<label className="block text-sm font-medium text-gray-700">Email</label>
					<input type="text" readOnly className="form-input mt-1 outline-none" value="john.doe@example.com" />
				  </div>
				</div>
				<div className="grid grid-cols-2 gap-4 mt-4">
				  <div>
					<label className="block text-sm font-medium text-gray-700">Expected number of people</label>
					<input type="number" readOnly className="form-input mt-1 outline-none" value="5" />
				  </div>
				  <div>
					<label className="block text-sm font-medium text-gray-700">Preferred Room</label>
					<div>
					  <label className="inline-flex items-center">
						<input type="radio" className="form-radio outline-none" readOnly checked />
						<span className="ml-2">Room A</span>
					  </label>
					</div>
					<div>
					  <label className="inline-flex items-center">
						<input type="radio" className="form-radio outline-none" readOnly />
						<span className="ml-2">Room B</span>
					  </label>
					</div>
				  </div>
				</div>
				<div className="grid grid-cols-3 gap-2 mt-4">
				  <div>
					<label className="block text-sm font-medium text-gray-700">Date of Meeting</label>
					<input type="date" readOnly className="form-input mt-1 outline-none" value="2023-07-28" />
				  </div>
				  <div>
					<label className="block text-sm font-medium text-gray-700">Time of Meeting</label>
					<input type="time" readOnly className="form-input mt-1 outline-none" value="15:00" />
				  </div>
				  <div>
					<label className="block text-sm font-medium text-gray-700">Duration of Meeting</label>
					<input type="text" readOnly className="form-input mt-1 outline-none" value="1 hour" />
				  </div>
				</div>
				<div className="mt-4">
				  <label className="block text-sm font-medium text-gray-700">Subject</label>
				  <input type="text" readOnly className="form-input mt-1 outline-none" value="Meeting Subject" />
				</div>
				<div className="mt-2">
				  <label className="block text-sm font-medium text-gray-700 outline-none">Description</label>
				  <textarea
					readOnly
					className="form-textarea mt-1 resize-none outline-none"
					rows="3"
					value="This is the description of the meeting."
				  />
				</div>
				<div className='grid grid-cols-2 gap-2'>
				<button className="bg-[#88bfff] rounded-[15px] text-[#1a1ac3] py-1 px-10 font-[400] cursor-pointer"> Reject </button>                
     			<button className='border-[3px] border-[#1a1ac3] text-[#1a1ac3] font-[400] rounded-[18px] cursor-pointer py-1 px-[38px]'>Accept</button>

				</div>
				</div>
				</fieldset>
				
			  </div>
			  
			
			
	
		
    )}/>
  )
}

export default From