import React from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import MainContent from './MainContent'
import Userpage from './Userpage'
import CourseGallery from './CourseGallery'
import ProfileSettings from './ProfileSettings'
import { Outlet } from 'react-router-dom'
import {useEffect,useState,useContext} from 'react'
import Clintcontex from "../../createContex/Createcontex";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-hot-toast'

function MainPage() {

  const {DataStatus,setDataStatus,setAdminlog,Adminlog} = useContext(Clintcontex);




    useEffect(() => {
      const fetchUserData = async () => {
          const cookiesArray = document.cookie.split(';');
          const cookies = cookiesArray.reduce((acc, cookie) => {
              const [name, value] = cookie.trim().split('=');
              acc[name] = value;
              return acc;
          }, {});
  
          const cookieToken = cookies.adminAuth;
  
          if (!cookieToken) {
              setAuth(false);
              console.log("hello");
              return;
          }
  
          const userDetails = jwtDecode(cookieToken);
          const adminName = userDetails.username;
          console.log(adminName);
          setAdminlog(adminName);

          try {
            if (Adminlog===adminName) {
              const responseStatus = await axios.get('http://localhost:4001/user/admin/status');
              if (responseStatus.data.success) {
                  setDataStatus(responseStatus.data.Data);
              }
            }
            
          } catch (error) {
            toast.error(error)
          }
      


      };
  
      fetchUserData(); // Call the async function
  
  }, [Adminlog]);





  return (
    <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
      <Sidebar />
      <div className="flex flex-col ">
        <Header />
        <Outlet />
      </div>
    </div>
  )
}

export default MainPage