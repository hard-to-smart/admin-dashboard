import "./app.css";
import React, {useState, useEffect} from "react";
import { FaTruck, FaUsers, FaDollarSign, FaShoppingCart, FaTasks, FaCheck, FaCross, FaCrosshairs, FaTimes, FaInfo, FaExclamation, FaRupeeSign } from "react-icons/fa";
import Pages from './Layout/Pages'
import axios from "axios";

const Dashboard = () => {
  // const [defaultDate, setDefaultDate] = useState("");
  const [counts, setCounts] = useState({
    meetingsAccepted: 0,
    meetingsDeclined: 0,
    pendingMeetings: 0,
    auditoriumCount:0,
    conferenceRoomCount:0
  });

  useEffect(() => {
    // Fetch counts for different statuses
    const fetchCounts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/getEventsByStatus');
        const { success, counts } = response.data;
        if (success) {
          setCounts(counts);
        }
      } catch (error) {
        console.error('Error fetching meeting counts:', error);
      }
    };

    fetchCounts();
  }, []);
  const [todaysMeetings, setTodaysMeetings] = useState([]);

  useEffect(() => {
    const fetchTodaysMeetings = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/admin/getTodaysMeetings');
        const { success, todayMeetings } = response.data;
        if (success) {
          setTodaysMeetings(todayMeetings);
        }
      } catch (error) {
        console.error('Error fetching today\'s meetings:', error);
      }
    };
    fetchTodaysMeetings();
}, []);
  // useEffect(() => {
  //   const date = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000);
  //   const formattedDate = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
  //   setDefaultDate(formattedDate);
  // }, []);
  return (
    <Pages
    pageContent={(
    <div className=" flex flex-col">
      {/* cards */}
      <div className="row">
        <div className="flex flex-col p-10 px-10 justify-center items-center">
          <div className="w-100">
            <div className="row justify-around">
              {/* column1 */}
              <div className="col-sm-2">
                {/* Add your fourth card here */}
                <div className="card">
                  <div className="card-body  bg-success bg-opacity-60">
                    <div className="row">
                      <div className="col mt-0">
                        <h5 className="card-title text-black">Meetings Accepted</h5>
                      </div>

                      <div className="col-sm-auto">
                        <div className="stat text-primary">
                          <FaCheck className="align-middle" />
                        </div>
                      </div>
                    </div>
                    <h1 className="mt-4 mb-3">{counts.meetingsAccepted}</h1>
                    <div className="mb-0">
                      
                      <br></br>
                      <br></br>
                    </div>
                  </div>
                </div>
              </div>
              

              {/* column3 */}
              <div className="col-sm-2">
                {/* Add your third card here */}
                <div className="card">
                  <div className="card-body bg-danger bg-opacity-50">
                    <div className="row">
                      <div className="col mt-0">
                        <h5 className="card-title text-black">Meetings Declined</h5>
                      </div>

                      <div className="col-sm-auto">
                        <div className="stat text-primary">
                          <FaTimes className="align-middle" />
                        </div>
                      </div>
                    </div>
                    <h1 className="mt-4 mb-3">{counts.meetingsDeclined}</h1>
                    <div className="mb-0">
                      
                    <br></br>
                      <br></br>
                    </div>
                  </div>
                </div>
              </div>

             
              <div className="col-sm-2">
                {/* Add your fourth card here */}
                <div className="card">
                  <div className="card-body  bg-warning">
                    <div className="row">
                      <div className="col mt-0">
                        <h5 className="card-title text-black">Pending Meeting requests</h5>
                      </div>

                      <div className="col-sm-auto">
                        <div className="stat text-primary">
                          <FaExclamation className="align-middle" />
                        </div>
                      </div>
                    </div>
                    <h1 className="mt-4 mb-3">{counts.pendingMeetings}</h1>
                    <div className="mb-0">
                      
                    <br></br>
                      <br></br>
                    </div>
                  </div>
                </div>
              </div>
            {/* column3 */}
            <div className="col-sm-2">
                {/* Add your 4th card here */}
                <div className="card">
                  <div className="card-body bg-info bg-opacity-50">
                    <div className="row">
                      <div className="col mt-0">
                        <h5 className="card-title text-black">Amount Collected</h5>
                      </div>

                      <div className="col-sm-auto">
                        <div className="stat text-primary">
                        <FaRupeeSign className="align-middle" />
                        </div>
                      </div>
                    </div>
                    <h1 className="mt-1 mb-3">{counts.auditoriumCount * 100 + counts.conferenceRoomCount * 200}</h1>
                    <div className="mb-0">
                     
                    <span className="text-muted">Auditorium: {counts.auditoriumCount * 100}</span>
               <br></br>
                    <span className="text-muted">Conference Room: {counts.conferenceRoomCount *200} </span>
                  
                    </div>
                  </div>
                </div>
              </div>

             

            </div>
          </div>
        </div>
      </div>
      
    
      {/* today's tasks */}
      <div className="row justify-evenly">
      <div className="col-12 col-md-6 col-xxl-3 d-flex order-2 order-xxl-3">
        <div className="card flex-fill w-100 bg-todo">
          <div className="card-header flex flex-row justify-center gap-3">
           
          <FaTasks />
          <h5 className="card-title mb-0 ">Today's Meetings</h5>
          </div>
          <div className="card-body d-flex">
            <div className="align-self-center w-100">
              
            <table className="table mb-0">
            <tbody>
              {/* Render today's meetings here */}
              {todaysMeetings.length > 0 ? (
                todaysMeetings.map((meeting, index) => (
                  <tr key={index}>
                    <td>{meeting.roomOptions}</td>
                    <td>{meeting.time}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2">No meetings today</td>
                </tr>
              )}
            </tbody>
          </table>
            </div>
          </div>
        </div>
      </div>
    
    </div>
    </div>
      )}/>
  );
};

export default Dashboard;
