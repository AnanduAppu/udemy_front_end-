import React from 'react'
import { useContext } from 'react'
import Clintcontex from "../../createContex/Createcontex";
import { useNavigate } from 'react-router-dom';
function MyLearnings() {

  const navigate = useNavigate()

  const {myLearnings,setMyLearnStream} =useContext(Clintcontex);

  console.log(myLearnings);

  const selectCourse = (id)=>{

    const selectedCourse = myLearnings.find(course => course._id === id);
  if (selectedCourse) {
    
    setMyLearnStream(selectedCourse);
    navigate("/videoPlayer")
  } else {
    console.log(`Course with id ${id} not found`);
  }

    
  }

  return (
    <>
   
    <div
    className="ml-72 overflow-auto w-[70%] h-[65vh]  p-8 mt-24 border border-slate-400 "
    >
    <h1 className='font-bold text-3xl'>My Learnings</h1>
    <hr className='my-2'/>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {myLearnings.map((ele,ind)=>(

            <div key={ind} className="p-2 m-2 border border-black rounded-lg">
            <span className="flex h-54 w-44  rounded-full mx-2">
              <img src={ele.thumbnail} alt="" />
            </span>
            <h1 className="my-2">Title:-{ele.title}</h1>
            <p className="my-2">Author:-</p>
            <div className="flex">
              <button className="py-2 bg-black w-full rounded-lg text-white font-bold mx-2 hover:bg-purple-400 " onClick={()=>selectCourse(ele._id)}>View</button>
              <button className="py-2 bg-black w-full rounded-lg text-white font-bold hover:bg-red-500">Delete</button>
            </div>
            </div>


      ))}




    </div>
  </div>
  </>
 
  )
}

export default MyLearnings