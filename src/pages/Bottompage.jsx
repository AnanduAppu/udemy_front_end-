import React from 'react'
import createlearn from '../assets/verticalCreateLecture.jpg'
import imageBusiness from '../assets/businessimage.png'
import Clintcontex from "../createContex/Createcontex";
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
function Bottompage() {
    const navigate = useNavigate()
    const {auth} = useContext(Clintcontex);
  return (
    <div className="flex relative my-4">
    <div className="w-[50%] ms-48 me-4 relative">
      <img  className='' src={createlearn}  alt="" />
      <button className="absolute bottom-[50%] left-4 px-4 py-3 bg-slate-100 text-black font-bold border border-black hover:bg-fuchsia-500 hover:text-white duration-500"
      onClick={()=>{
        if(auth){
            navigate('/user/userpage/mylecture')
        }else{
            alert("you have to login")
            navigate('/login')
        }
      }}>

  Create Your Lecture
</button>
    </div>
    <div className="w-[50%] mt-[10%] me-48 ms-4">
      <img src={imageBusiness} alt="" />

    </div>
  </div>
  )
}

export default Bottompage