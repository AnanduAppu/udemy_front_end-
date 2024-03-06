import {useContext} from 'react'
import { toast } from 'react-hot-toast';
import Clintcontex from "../createContex/Createcontex";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function DisplayAllCrs() {

const  navigate = useNavigate()

const {Courses,cartData,setCartData,userData,setCourseView} = useContext(Clintcontex)


const addingtoCart = async (e, id) => {
    e.preventDefault();
  
    try {
      const AddProduct = Courses.find(ele => ele._id === id);
      const checkProduct = cartData.find(ele => ele._id === id);
  
      if (checkProduct) {
        toast.error("Product already in cart");
      } else {
        const courseId = id;
        console.log(courseId,userData)
        const existingLecture = userData.mylecture.includes(courseId)
        const existingLearning = userData.mylearnings.includes(courseId)
  
  
        if (existingLecture) {
        toast.error("course alredy in your mylecture")
        return
          }
      if (existingLearning) {
          toast.error("course alredy in your learnings")
          return
          }
        setCartData((prevCart) => [...prevCart, AddProduct]);
  
        const backendResponse = await axios.post('http://localhost:4001/user/addToCart', {
          courseId,
          userData
        });
  
        if (backendResponse.data && backendResponse.data.successful) {
          toast.success(backendResponse.data.message);
          
          window.location.reload();
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


  const viewCourse = async (e, id) => {
    e.preventDefault();
    const findCourse = Courses.find(ele => ele._id === id);
    if (!findCourse) {
      toast.error("Product not found");
      return;
    }
    const instructorId = findCourse.instructor;
  
    try {
      const backendResponse = await axios.post('http://localhost:4001/user/courseView', {
        instructorId
      });
      if (backendResponse.data && backendResponse.data.success) {
        toast.success(backendResponse.data.message);
  
        // Update the course details with data from the backend response
        findCourse.name = backendResponse.data.DataName;
        findCourse.email = backendResponse.data.DataEmail;
  
        // Set the updated course details in state and navigate to courseView
        setCourseView(findCourse);
        navigate("/courseView");
      } else {
        toast.error(backendResponse.data.message);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An error occurred while fetching course data");
    }
  }


  return (
    <>
<body className='w-full'>
<div className="  w-full h-[90vh] p-3 overflow-auto">
{Courses.map((ele,ind)=>(
    <div className="border border-black dark:border-gray-800 rounded-lg overflow-hidden my-3">
    <div className="flex items-start gap-6 p-4">
      <img
        alt="Product Image"
        className="aspect-square object-cover border border-gray-200 dark:border-gray-800"
        height={120}
        src={ele.thumbnail}
        width={120}
      />
      <div className="grid gap-1.5">
        <div className="font-semibold text-lg sm:text-xl">{ele.title}</div>
        <p className="text-sm md:text-base leading-6">{ele.description}</p>
        <div className="font-semibold text-lg sm:text-xl"> ₹{ele.price}</div>
        <span>
          <button className="inline-flex mx-2 px-5 py-2 bg-purple-500 rounded-lg font-bold hover:text-white"
          onClick={(e)=>viewCourse(e,ele._id)}
          >
            View
          </button>
          <button className="px-5 py-2 border border-black font-bold hover:bg-purple-600 hover:text-white"
          onClick={(e)=>addingtoCart(e,ele._id)}
          >
            Add to Cart
          </button>
        </span>

      </div>
    </div>
  </div>
))}

</div>
</body>
    </>
  )
}

export default DisplayAllCrs