import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './app.css'
import { Calendar, Clipboard, MessageSquare } from 'react-feather';
import { FaUserCircle } from 'react-icons/fa';
const Sidebar = () => {
  const [isTextVisible, setTextVisible] = useState(() => {
    const storedValue = localStorage.getItem('isTextVisible');
    return storedValue ? JSON.parse(storedValue) : true;
  });
  const [activePage, setActive] =useState('');
  const handleActive=(tabName)=>{
    setActive(tabName);
  }
  const location = useLocation();
  
  useEffect(() => {
    // Set the active page based on the current URL path
    setActive(location.pathname);
  }, [location]);

  useEffect(() => {
    // Store the 'isOpen' state in localStorage whenever it changes
    localStorage.setItem('isTextVisible', JSON.stringify(isTextVisible));
  }, [isTextVisible]);
  const handleToggleText = () => {
    setTextVisible(prevState => !prevState);
  };
  return (
    <div className='flex flex-row bg-inherit'>
    <div className="wrapper">
     
      <nav id="sidebar" className={`sidebar h-full`} >
      
        <div className="sidebar-content">
          <div className="sidebar-brand cursor-default">
            <div className='flex flex-row items-center justify-center'>
              <FaUserCircle size={30}  className="align-middle"/>
            <span className={`align-middle pl-2 text-[20px] ${isTextVisible ? "visible" : "hidden"}`}>Admin</span>
            </div>
          </div>

          <ul className="sidebar-nav">
            <li className={`sidebar-item ${activePage==='/Dashboard'?"active":''}`} onClick={()=>handleActive('/Dashboard')}>
              <Link to="/Dashboard" className="sidebar-link">
                <div className='flex flex-row'><Clipboard className="align-middle"/>
                <span className={`align-middle ${isTextVisible ? "visible" : "hidden"}`}>Dashboard</span></div>
              </Link>
            </li>

            <li className={`sidebar-item ${activePage==='/MessageBox'?"active":''}`} onClick={()=>handleActive('/MessageBox')}>
              <Link to="/MessageBox" className="sidebar-link">
               <div className='flex flex-row'> <MessageSquare className="align-middle" />
                <span  className={`align-middle ${isTextVisible ? "visible" : "hidden"}`}>Message Box</span></div>
              </Link>
            </li>

            

            <li className={`sidebar-item ${activePage==='/CalendarDisplay'?"active":''}`} onClick={()=>handleActive('/CalendarDisplay')}>
              <Link to="/CalendarDisplay" className="sidebar-link">
                <div className='flex flex-row'><Calendar className="align-middle" />
                <span  className={`align-middle ${isTextVisible ? "visible" : "hidden"}`}>Calendar</span></div>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      </div>
      <div className='relative'>
      <a className={`flex sidebar-toggle absolute z-10 p-2 pt-4 `} onClick={handleToggleText} >
            <i className="hamburger align-self-center "></i>
          </a>
      </div>
    </div>
  );
};

export default Sidebar;
