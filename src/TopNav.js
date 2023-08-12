import React, {useState, useEffect, useRef} from 'react';
import { Link, useLocation } from 'react-router-dom';
import ResetPassword from './ResetPassword';

import { Bell, MessageSquare, Calendar, User, Settings, HelpCircle, LogOut, Clipboard, AlignLeft, AlignRight } from 'react-feather';
// import Sidebar from './Sidebar';
import Logo from "./logo.png"
// import * as bootstrap from "bootstrap";


const TopNav = () => {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] =useState(false);
  const [changePass, setChangePass] = useState(false);

  const toggleChangePass = () =>{
    setChangePass(!changePass);
  }
  const toggleProfile= () =>{
    setProfileOpen(!isProfileOpen);
  }

  const profileDivRef = useRef(null);

  const handleClickOutsideProfile = (event) => {
    if (isProfileOpen && profileDivRef.current && !profileDivRef.current.contains(event.target)) {
      setProfileOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutsideProfile, true);
    return () => {
      document.removeEventListener("click", handleClickOutsideProfile, true);
    };
    });

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const dropdownDivRef = useRef(null);

  const handleClickOutsideDropdown = (event) => {
    if (isDropdownOpen && dropdownDivRef.current && !dropdownDivRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutsideDropdown, true);
    return () => {
      document.removeEventListener("click", handleClickOutsideDropdown, true);
    };
    });


  const [logOut,setLogOut] = useState(false);
  const handleLogOut=() => {
    setLogOut(!logOut);
  }
  const logoutDivRef = useRef(null);

  const handleClickOutsideLogout = (event) => {
    if (logOut && logoutDivRef.current && !logoutDivRef.current.contains(event.target)) {
      setLogOut(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutsideLogout, true);
    return () => {
      document.removeEventListener("click", handleClickOutsideLogout, true);
    };
  }, [logOut]);


  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };
  return (
    <div className="wrapper ">
      <div className="main">
        <nav className="navbar navbar-expand navbar-light bg-cyan-950">
          <a href="https://stpi.in/en" className='mx-10'><img src={Logo}  className='h-[60px] w-[300px]'/></a>

          <div className="navbar-collapse collapse">
            <ul className="navbar-nav navbar-align visible flex flex-row items-center justify-center gap-4">
              
                <li className="nav-item dropdown relative">
                <div className="nav-icon dropdown-toggle cursor-pointer" href="#" id="alertsDropdown" data-bs-toggle="dropdown"  onClick={toggleDropdown}>
                  <div className="position-relative ">
                  <Bell size={30} className="align-middle text-white" />
                    <div className="indicator bg-yellow-400">4</div>
                  </div>
                </div>
                {isDropdownOpen && (
                 <div ref={dropdownDivRef} className="dropdown-content absolute top-full w-[300px] right-10 z-10 bg-white p-2 rounded shadow-xl">
                 {/* Add your dropdown content here */}
                 <div className="flex flex-col pt-2 items-center">
                        <h2 className="font-semibold">Request</h2>
                        <p className="text-[#EFC319] text-[14px] font-[500]">See All</p>
                      </div>
                      <hr />
                     
                      {/* friend reqs */}
                      <div className="flex items-center justify-between ">
                        <div className="flex flex-col items-center align-middle justify-center">
                        <a href="#" className=" py-2 px-4 text-gray-800 hover:bg-gray-100">Item 1</a>
                    <a href="#" className=" py-2 px-4 text-gray-800 hover:bg-gray-100">Item 2</a>
                    <a href="#" className="py-2 px-4 text-gray-800 hover:bg-gray-100">Item 3</a>
                         </div>
                        </div>
                        </div>
                    
                )}
              </li>
                <li className="nav-item dropdown">
                <button  className="bg-transparent border border-white rounded px-2 py-1 text-white">English</button>

                </li>
                <li className="nav-item dropdown relative">
                <div className="position-relative cursor-pointer" onClick={toggleProfile}>
                  <User size={30} fontSize={30} className="align-middle text-white" />
                </div>
                {isProfileOpen && (
                 <div ref={profileDivRef} className="dropdown-content absolute top-full w-fit z-10 bg-white p-2 rounded shadow-xl -left-12">
                 {/* Add your dropdown content here */}
                  <div className="flex flex-col items-center align-middle justify-center">
                  <div className=" p-2 text-gray-800 hover:bg-gray-100 cursor-pointer"  style={{textDecorationLine:"none"}} onClick={toggleChangePass}>Change Password</div> 
                  {changePass && (<ResetPassword toggleChangePass={toggleChangePass} changePass={changePass}/>)}    
                        <div className=" p-2 text-gray-800 hover:bg-gray-100 cursor-pointer" style={{textDecorationLine:"none"}} onClick={handleLogOut}>Log Out</div>
                        {logOut && (
                    <div className='fixed inset-0 flex items-center lg:p-0 p-2 justify-center bg-black bg-opacity-50  z-50'>

                     <div ref={logoutDivRef} className='bg-white flex flex-col items-center gap-3 px-10 py-4 justify-center rounded-[20px] p-4'> 
                      <p className='font-[600]'>Are you sure you want to log out? </p>
                     <Link to="/">               <button class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" onClick={handleLogOut}>Log Out</button></Link>               
      <button className='border-[2px] focus:ring-4 focus:outline-none focus:ring-primary-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center border-primary-700 text-primary-700  cursor-pointer ' onClick={handleLogOut}>Cancel</button>

                      </div>
                  </div>

                )}
                         </div>
                        </div>
                       )}
    
</li>
            </ul>
          </div>
        </nav>
      </div>
    
    </div>
  );
};

export default TopNav;
 {/* <li className="nav-item dropdown">
              <div className="flex flex-col items-center px-2">
                <div className='flex flex-row'>
            <input
              type="radio"
              name="theme"
              value="light"
              checked={theme === 'light'}
              onChange={handleThemeChange}
              className="mr-1 "
            />
            <label for='light' className=" text-white ">Light</label>
            </div>
            <div className='flex flex-row'>
            <input
              type="radio"
              name="theme"
              value="dark"
              checked={theme === 'dark'}
              onChange={handleThemeChange}
              className="mr-1"
            />
              
            <label for="dark" className='text-white'>Dark</label>
            </div>
          </div>
                </li> */}
            