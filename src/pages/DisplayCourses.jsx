
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useState,useContext,useEffect } from 'react';
import { toast } from 'react-hot-toast';
import Clintcontex from "../createContex/Createcontex";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {useNavigate} from "react-router-dom";


function DisplayCourses() {

  const navigate = useNavigate()

const {Courses,cartData,setCartData,userData,showWishlistIcon,
  WishData,
  setWishData,setCourseView , 
  setReviewDis} = useContext(Clintcontex)
console.log(Courses)
const [selectedCategory, setSelectedCategory] = useState("All courses");

const filteredCourses = selectedCategory === "All courses"
  ? Courses
  : Courses.filter(course => course.category === selectedCategory);

const truncateText = (text, maxLength) => {
  const words = text.split(' ');
  if (words.length > maxLength) {
    return words.slice(0, maxLength).join(' ') + '...';
  }
  return text;
};


//item addding to cart
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

//item addding to wishlist
const addingtoWishlist = async (e, id) => {
  e.preventDefault();

  try {
    const AddWish = Courses.find(ele => ele._id === id);
    const checkWish = WishData.find(ele => ele._id === id);

    if (checkWish) {
      toast.error("Product already in cart");
    } else {
      const courseId = id;
   

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
      setWishData((prevWish) => [...prevWish, AddWish]);

      const backendResponse = await axios.post('http://localhost:4001/user/addToWishlist', {
        courseId,
        userData
      });

      if (backendResponse.data && backendResponse.data.successful) {
        toast.success(backendResponse.data.message);
        window.location.reload();
        //setCartStatus()
      } else {
        toast.error("Failed to add to wishlist. Please try again.");
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


      const response = await axios.get(`http://localhost:4001/user/showReview`, {
            headers: { id }
          });
          if (response.data.success) {
            
            setReviewDis(response.data.review);
            console.log(response.data.review)
          } else {
            console.error("Failed to fetch reviews:", response.data.message);
          }


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
  <h1 className='text-center text-4xl font-semibold'>All Courses</h1>
  <div className="mx-16 my-5 border px-4 border-black">
  <div className="flex items-center justify-center py-4 md:py-8 flex-wrap">
      <Button
        variant="outlined"
        color="primary"
        className="text-blue-700 hover:text-white hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:bg-gray-900 dark:focus:ring-blue-800"
        onClick={()=>setSelectedCategory("All courses")}
      >
        All courses
      </Button>
      <Button
        variant="outlined"
        className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800"
        onClick={()=>setSelectedCategory("Photography")}
      >
        Photography
      </Button>
      <Button
        variant="outlined"
        className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800"
        onClick={()=>setSelectedCategory("Web Development")}
      >
        web development
      </Button>
      <Button
        variant="outlined"
        className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800"
        onClick={()=>setSelectedCategory("Python")}
      >
        Python
      </Button>
      <Button
        variant="outlined"
        className="text-gray-900 border border-white hover:border-gray-200 dark:border-gray-900 dark:bg-gray-900 dark:hover:border-gray-700 bg-white focus:ring-4 focus:outline-none focus:ring-gray-300 rounded-full text-base font-medium px-5 py-2.5 text-center me-3 mb-3 dark:text-white dark:focus:ring-gray-800"
        onClick={()=>setSelectedCategory("Trading")}
     >
        Trading
      </Button>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-10">
  {filteredCourses.slice(0, 4).map((card, index) => (
    <Card key={index} sx={{ maxWidth: 345, height: '100%' }} className="border border-black flex flex-col">
      <CardMedia
        component="img"
        alt={card.title}
        height="140"
        image={card.thumbnail}
        style={{ objectFit: 'cover', flex: '1' }}
      />
      <CardContent style={{ flex: '1' }}>
        <Typography gutterBottom variant="h6" component="div">
          {card.title}
        </Typography>
        <Typography variant="body2" color="text.secondary" style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {truncateText(card.description, 10)}
        </Typography>
        <Typography variant="body2"  style={{  textOverflow: 'ellipsis' }} className=" font-bold overflow-hidden">
        ₹{card.price}
        </Typography>

      </CardContent>
      <CardActions>
        <Button size="small" onClick={(e)=>viewCourse(e,card._id)}>View</Button>
        <Button size="small" onClick={(e)=>addingtoCart(e,card._id)}>Add to Cart</Button>
        {showWishlistIcon && (
    <Button onClick={(e) => addingtoWishlist(e, card._id)}>
      <FavoriteBorderIcon />
    </Button>
  )}
      </CardActions>
    </Card>
  ))}
 
</div>
<p className='text-end mb-3 text-blue-400 cursor-pointer' onClick={()=>navigate("/ViewAllCrs")}>view all</p>   
  </div>
  </>
  )
}

export default DisplayCourses