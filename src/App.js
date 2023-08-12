import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Calendar from './Calendar';
import TicketStatusTable from "./TicketStatusTable";
import MessageBox from "./MessageBox";
import From from './From'
import ResetPassword from './ResetPassword'
import Login from './Login'
import Forgotpass from "./Forgotpass";
import CalendarDisplay from "./CalendarDisplay";
import Dashboard from "./Dashboard"
import ResetPassword2 from "./ResetPassword2";
const App = () => {
  return (
    
    <Routes>
    <Route exact path="/CalendarDisplay" element={<CalendarDisplay/>}></Route>
    <Route exact path="/Dashboard" element={<Dashboard/>}> </Route>
    <Route exact path="/TicketStatusTable" element={<TicketStatusTable/>}> </Route> 
    <Route exact path="/Calendar" element={<Calendar/>}> </Route> 
    <Route exact path="/MessageBox" element={<MessageBox/>}> </Route> 
    <Route exact path="/From" element={<From/>}> </Route>
    <Route exact path="/ResetPassword" element={<ResetPassword/>}> </Route>
    <Route exact path="/" element={<Login/>}> </Route>
    <Route exact path='Forgotpass' element={<Forgotpass/>}> </Route>
    <Route exact path="/ResetPassword2" element={<ResetPassword2/>}></Route> 
    </Routes>
    
  )
}

export default App;
