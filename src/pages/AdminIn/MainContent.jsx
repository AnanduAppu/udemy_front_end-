import axios from "axios";
import { useState,useContext } from "react";
import Clintcontex from "../../createContex/Createcontex";

function MainContent() {
const {DataStatus,setDataStatus} = useContext(Clintcontex);

console.log(DataStatus)
    return (
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          <a className="rounded-lg  bg-card text-card-foreground shadow-sm border border-black hover:border-x-black" data-v0-t="card">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">Total Users</h3>
              <p className="text-sm text-muted-foreground">Active users on the platform</p>
            </div>
            <div className="p-6 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="h-8 w-8 mr-2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span className="font-semibold text-2xl">{DataStatus.totalUser}</span>
            </div>
          </a>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">Total Courses</h3>
              <p className="text-sm text-muted-foreground">available courses for sale</p>
            </div>
            <div className="p-6 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="h-8 w-8 mr-2">
                <path d="m7.5 4.27 9 5.15"></path>
                <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path>
                <path d="m3.3 7 8.7 5 8.7-5"></path>
                <path d="M12 22V12"></path>
              </svg>
              <span className="font-semibold text-2xl">{DataStatus. totalCourse}</span>
            </div>
          </div>
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm" data-v0-t="card">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="text-2xl font-semibold whitespace-nowrap leading-none tracking-tight">Revenue</h3>
              <p className="text-sm text-muted-foreground">Income generated this month</p>
            </div>
            <div className="p-6 flex items-center justify-center">
            
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
              
              <span className="font-semibold text-2xl">₹ {DataStatus.totalProfit}</span>
            </div>
          </div>
 
        </div>
      </main>
    );
  }
  
  export default MainContent