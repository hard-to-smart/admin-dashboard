import React, {useState, useRef, useEffect} from 'react'
import Pages from './Layout/Pages'
import {CheckSquare, Crosshair, X } from 'react-feather';
import { Link } from 'react-router-dom';
const Forgotpass = () => {

    const [alert, setAlert] = useState(false);
    function displayAlert() {
        setAlert(true);
        setTimeout(() => {
            setAlert(false);
          }, 7000);
    }   
return(
    <Pages pageContent={(
      <>   
      <div className="fixed inset-0 flex items-center lg:p-0 p-2 justify-center bg-black bg-opacity-50">

  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto ">
      
      <div class=" relative w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
       <Link to="/"> <div className='flex justify-end right-5 top-6 absolute cursor-pointer'><X/></div></Link>
          <h1 class="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Forgot your password?
          </h1>
          <p class="font-light text-gray-500 dark:text-gray-400"> Just type in your email and we will send you a code to reset your password!</p>
          <form class="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#" onSubmit={displayAlert}>
              <div>
                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
              </div>
              {/* <div class="flex items-start">
                  <div class="flex items-center h-5">
                    <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                  </div>
                  <div class="ml-3 text-sm">
                    <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                  </div>
              </div> */}
              <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" >Reset password</button>

              
          </form>

      </div>
    
  </div>
  {alert && (
                     <div class="transition-opacity duration-300 ease-out flex shadow-2xl  flex-col absolute  top-20 left-60 bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
                     <div className='flex flex-row'><CheckSquare/> <p class="font-bold text-[18px] ml-4">Link sent to mail</p></div>
                     <p class="text-[16px] italic font-thin">A link has been sent on your email id to reset the password. In case of no mail received please recheck the email you have typed or try again later. </p>
                   </div>
              )}
</div>

</>
)}/>
  )
}

export default Forgotpass