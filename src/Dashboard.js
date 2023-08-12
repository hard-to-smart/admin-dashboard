import "./app.css";
import React, {useState, useEffect} from "react";
import { FaTruck, FaUsers, FaDollarSign, FaShoppingCart, FaTasks } from "react-icons/fa";
import Pages from './Layout/Pages'


const Dashboard = () => {
  const [defaultDate, setDefaultDate] = useState("");

  useEffect(() => {
    const date = new Date(Date.now() - 5 * 24 * 60 * 60 * 1000);
    const formattedDate = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;
    setDefaultDate(formattedDate);
  }, []);
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
              <div className="col-sm-3">
                {/* Add your fourth card here */}
                <div className="card">
                  <div className="card-body  bg-success bg-opacity-60">
                    <div className="row">
                      <div className="col mt-0">
                        <h5 className="card-title text-black">Requests Accepted</h5>
                      </div>

                      <div className="col-sm-auto">
                        <div className="stat text-primary">
                          <FaShoppingCart className="align-middle" />
                        </div>
                      </div>
                    </div>
                    <h1 className="mt-1 mb-3">64</h1>
                    <div className="mb-0">
                      <span className="text-danger">
                        <i className="mdi mdi-arrow-bottom-right"></i> -2.25%
                      </span>
                      <span className="text-muted">Since last week</span>
                    </div>
                  </div>
                </div>
              </div>
              

              {/* column3 */}
              <div className="col-sm-3">
                {/* Add your third card here */}
                <div className="card">
                  <div className="card-body bg-danger bg-opacity-50">
                    <div className="row">
                      <div className="col mt-0">
                        <h5 className="card-title text-black">Meetings Declined</h5>
                      </div>

                      <div className="col-sm-auto">
                        <div className="stat text-primary">
                          <FaShoppingCart className="align-middle" />
                        </div>
                      </div>
                    </div>
                    <h1 className="mt-1 mb-3">64</h1>
                    <div className="mb-0">
                      <span className="text-danger">
                        <i className="mdi mdi-arrow-bottom-right"></i> -2.25%
                      </span>
                      <span className="text-muted">Since last week</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* column4 */}
              <div className="col-sm-3">
                {/* Add your fourth card here */}
                <div className="card">
                  <div className="card-body  bg-warning">
                    <div className="row">
                      <div className="col mt-0">
                        <h5 className="card-title text-black">Pending Meeting requests</h5>
                      </div>

                      <div className="col-sm-auto">
                        <div className="stat text-primary">
                          <FaShoppingCart className="align-middle" />
                        </div>
                      </div>
                    </div>
                    <h1 className="mt-1 mb-3">64</h1>
                    <div className="mb-0">
                      <span className="text-danger">
                        <i className="mdi mdi-arrow-bottom-right"></i> -2.25%
                      </span>
                      <span className="text-muted">Since last week</span>
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
        <div className="card flex-fill w-100">
          <div className="card-header flex flex-row justify-center gap-3">
           
          <FaTasks />
          <h5 className="card-title mb-0">Today's Meetings</h5>
          </div>
          <div className="card-body d-flex">
            <div className="align-self-center w-100">
              
              <table className="table mb-0">
                <tbody>
                  <tr>
                    <td>Room 1</td>
                    <td className="text-end">15:00</td>
                  </tr>
                  <tr>
                    <td>Room 2</td>
                    <td className="text-end">13:00</td>
                  </tr>
                  <tr>
                    <td>Room 3</td>
                    <td className="text-end">10:00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    

     
{/* calendar */}
<div class="col-12 col-md-6 col-xxl-3 d-flex order-1 order-xxl-1">
							<div class="card flex-fill">
								<div class="card-header">

									<h5 class="card-title mb-0">Calendar</h5>
								</div>
								<div class="card-body d-flex">
									<div class="align-self-center w-100">
										<div class="chart">
											<div id="datetimepicker-dashboard">{defaultDate}</div>
										</div>
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
