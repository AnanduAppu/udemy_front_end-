import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Clintcontex from "../createContex/Createcontex";


const CourseView = () => {
  const { courseView,cartData,setCartData,userData,Courses, reviewDis} = useContext(Clintcontex);
 
  const navigate = useNavigate()


  const addingtoCart = async (e) => {
    e.preventDefault();
  
    try {
      const AddProduct = Courses.find(ele => ele._id === courseView._id);
      const checkProduct = cartData.find(ele => ele._id === courseView._id);
  
      if (checkProduct) {
        toast.error("Product already in cart");
      } else {
        const courseId =courseView._id;
        console.log(courseId,userData)
        setCartData((prevCart) => [...prevCart, AddProduct]);
  
        const backendResponse = await axios.post('http://localhost:4001/user/addToCart', {
          courseId,
          userData
        });
  
        if (backendResponse.data && backendResponse.data.successful) {
          toast.success(backendResponse.data.message);
          
          //window.location.reload();
          navigate('/user/cart')
          //setCartStatus()
        } else {
          toast.error("Failed to add to cart. Please try again.");
          
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Error occurred. Please try again later.");
    }
  };

  if (!courseView) {
    return (
      <div className="container mx-auto">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="relative m-2 mx-4 h-56 w-auto border border-black bg-slate-700 ">
        <div className="ml-16 w-[60%] bg-slate-700 h-32 mt-14">
          <hr className="bg-black " />
          <h1 className="text-4xl mx-8 text-white mb-3 mt-3">{courseView.title}</h1>
          <hr className="bg-black " />
        </div>
      </div>

      <div className="flex mb-8 ml-2 h-full">
        <div className="relative z-10 ml-4 w-[70%] border border-black  px-8 shadow-x2 ]">
          <p className="my-2 ">
            <span className="font-bold">Description:-{courseView.description}</span>
            <span className="mx-2"> </span>
          </p>
          <p className="my-2 ">
            <span className="font-bold">Category:-{courseView.category}</span>
            <span className="mx-2"> </span>
          </p>
          <p className="my-2 ">
            <span className="font-bold">Author:-{courseView.name}</span>
            <span className="mx-2"> </span>
          </p>

          <div className="mt-8 border border-slate-500 block overflow-auto m-5">
            <h1 className="font-bold mx-5 text-2xl">Reviews</h1>
            {reviewDis.length===0?<div>No Reviews</div>:reviewDis.map((ele,ind)=>(
              <>
                          <article className="p-3 my-4 border border-slate-400 rounded-lg mx-5">
            <div className="flex items-center mb-4">
              <img className="w-10 h-10 me-4 rounded-full" src={ele.reviewer.profileimg} alt="" />
              <div className="font-medium dark:text-white">
                <p>{ele.reviewer.name}</p>
              </div>
            </div>
            <time dateTime="2017-05-03 19:00">{ele.createdAt.slice(0,7)}</time>
            <p className="mb-2 text-gray-500 dark:text-gray-400">{ele.comment}</p>

            <aside>
            
              <div className="flex items-center mt-3">
              <a href="#" className={`px-2 py-1.5 text-xs font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 ${ ele. reviewer._id === userData._id ? "" : "hidden"}`}>Edi</a>
              </div>
              </aside>
             </article>
              </>
      ))}

             
          </div>
        </div>

        <div className="absolute right-14 top-10 z-20 w-[20%] mt-20 mb-10">
          <div className="max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
            <a href="#">
              <img
                className="rounded-t-lg w-96"
                src={courseView.thumbnail}
                alt=""
              />
            </a>
            <div className="p-5 h-96">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Price:{courseView.price}
                </h5>
              </a>
              <button className="py-2 px-16 border border-black block my-3 mx-auto text-center text-white font-bold bg-purple-500 hover:bg-purple-800"
              onClick={(e)=>addingtoCart(e)}
              >
                Buy Now
              </button>

              <hr className="my-2 border border-slate-400 w-60 mx-auto" />

              <input
                type="text"
                className="mt-2 ml-4 border border-black rounded-md"
              />
              <a
                href="#"
                className="inline-flex items-center ml-4 rounded-lg bg-blue-700 px-3 py-2 my-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Apply Coupen
                <svg
                  className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseView;
