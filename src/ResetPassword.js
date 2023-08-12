import React, { useEffect, useRef } from 'react';
import { X } from 'react-feather';

const ResetPass = ({ toggleChangePass, changePass }) => {
  const changePassDivRef = useRef(null);

  const handleClickOutsideChangePass = (event) => {
    if (changePass && changePassDivRef.current && !changePassDivRef.current.contains(event.target)) {
      toggleChangePass();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutsideChangePass, true);
    return () => {
      document.removeEventListener('click', handleClickOutsideChangePass, true);
    };
  }, [changePass]);

  return (
    <div className="fixed inset-0 flex items-center lg:p-0 p-2 justify-center bg-black bg-opacity-50">
      <div ref={changePassDivRef} className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-[800px]">
        <div className="w-full relative p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
        <div className='flex justify-end right-5 top-6 absolute cursor-pointer' onClick={toggleChangePass}><X/></div>
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
          </h2>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
            <div>
              <label htmlFor="current-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Current Password</label>
              <input type="password" name="current-password" id="current-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
            </div>
            <div>
              <label htmlFor="new-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">New Password</label>
              <input type="password" name="new-password" id="new-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
              <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
            </div>
            <div className="flex justify-center">
            <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" >Reset password</button>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
