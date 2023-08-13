import React from "react";
import TopNav from "../TopNav"
import Sidebar from '../Sidebar'
import Footer from "../Footer";

const Page = ({ pageContent  }) => {
  return (
    
    <div className="flex flex-row relative">
        <div className="sidebar">
      <Sidebar />
    </div>

  

  <div className="flex flex-col flex-1">
  <div className="header">
    <TopNav />
  </div>
    <div className="content-body overflow-y-auto overflow-x-hidden relative z-0">
      {pageContent}
    </div>
    {/* <div>
       <Footer /> 
    </div> */}
  </div>
</div>
  )}

export default Page
