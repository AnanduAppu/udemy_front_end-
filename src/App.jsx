import Homepage from "./pages/Homepage";
import Assemble from "./pages/assemble";
import{Routes,Route,}  from "react-router-dom"
import Login from "./pages/log&sign/login";
import SignUp from "./pages/log&sign/signUp";
import Clintcontex from "./createContex/Createcontex";
import { useState,useEffect } from "react";
import Otpvarificaiton from "./pages/log&sign/Otpvari";
import Resetpass from "./pages/log&sign/Resetpass";
import ResetPass2 from "./pages/log&sign/ResetPass2";
import EmailRegPassSeting from "./pages/log&sign/EmailRegPassSeting"
import { toast, Toaster } from "react-hot-toast";
import VarMailorPhon from "./pages/log&sign/VarifyEmailorPhone";
import UserProfile from "./pages/userProfile/userProfile";
import Profile from "./pages/userProfile/Profile";
import Mylecture from "./pages/userProfile/Mylecture";
import { jwtDecode } from "jwt-decode";
import { isEqual } from "lodash";
import axios from "axios";
import CartSection from "./pages/wish&cart/cartSection";
import Wishlist from "./pages/wish&cart/Wishlist";
import CourseView from "./pages/CourseVew";
import MyLearnings from "./pages/userProfile/myLearnings";
import VideoGallery from "./pages/videostreaming/playerTemplate";
import AdminLog from "./pages/AdminIn/adminLog";
import MainPage from "./pages/AdminIn/MainPage";
import MainContent from "./pages/AdminIn/MainContent";
import Userpage from "./pages/AdminIn/Userpage";
import CourseGallery from "./pages/AdminIn/CourseGallery";
import ProfileSettings from "./pages/AdminIn/ProfileSettings";
import OrderDetails from "./pages/AdminIn/orderData";
import DisplayAllCrs from "./pages/DisplayAllCrs";



function App() {

  const [userData,setUserData] = useState({});
  const [emailOtp, setEmailOtp] = useState('');
  const [jwtres,Setjwtres] = useState('');
  const [auth,setauth] =useState(false) ;
  const [Courses,SetCourses] = useState([])
  const [getCourseUpdation, SetCourseUpdation] = useState(true);
  const [searchinput,setSearchInput]= useState(false);
  const [Search,setSearch]= useState('');
  const [showWishlistIcon,setWishlistIcon] = useState(false)
  const [courseView, setCourseView] = useState(null)
  const [myLearnings,setMylearnings] = useState([])
  const [mylearningStream,setMyLearnStream] =  useState({})
  const [Adminlog,setAdminlog]=useState('')

  // data getting from cookies after refresh

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cookiesArray = document.cookie.split(';');
        const cookies = cookiesArray.reduce((acc, cookie) => {
          const [name, value] = cookie.trim().split('=');
          acc[name] = value;
          return acc;
        }, {});

      
        const cookieToken = cookies.token;
      

        if (!cookieToken) {
          setauth(false);
          console.log("hellow")
          return;
        }

        const userDetails = jwtDecode(cookieToken);
        const id = userDetails.userData.email

        console.log(id);
        const response = await axios.post('http://localhost:4001/user/useraccess', {
          email:id
           });
           setauth(true);
        if (!response.data.successful) {
          return toast.error(response.data.error,"error");
        }
          
        const value = response.data.Data


        if (!isEqual(userData, value)) {
          setUserData(value);
          setWishlistIcon(true)
          console.log(value);
          }
       
      } catch (error) {
        console.error('Error fetching data:', error);
     
      }
    };

    fetchData(); 

  }, [userData]);

  // getting course data from backend

  useEffect(()=>{
    async function fetchCourses(){
    
      try {
        
        const response = await axios.get('http://localhost:4001/user/allcourses');
        SetCourses(response.data.Data);
        
        console.log(Courses)
        SetCourseUpdation(false); 
      } catch (error) {
        console.log('Error fetching courses:', error);
      }
    
    
    }
    
    if (getCourseUpdation) {
      fetchCourses();
    }
    },[getCourseUpdation])



    //userProfile course showing 
    const [courseData, setCourseData] = useState([]);
    const [startUseEffect, setUseEffect] = useState(true);

      useEffect(()=>{
        async function fetchCourses(){
          try {
            const cookiesArray = document.cookie.split(';');
            const cookies = cookiesArray.reduce((acc, cookie) => {
              const [name, value] = cookie.trim().split('=');
              acc[name] = value;
              return acc;
            }, {});
    
          
            const cookieToken = cookies.token;
            console.log(cookieToken);
    
            if (!cookieToken) {
              setauth(false);
              console.log("hellow")
              return;
            }
    
            const userDetails = jwtDecode(cookieToken);
            const id = userDetails.userData.id

            const backendResponse = await axios.get(`http://localhost:4001/user/usercourses`,{headers:{
              id:id
            }});

            
            if (backendResponse.data.successful) {
              //const myLectures = backendResponse.data.Data.map(courseString => JSON.parse(courseString));
              //console.log(backendResponse.data.Data)
              setCourseData(backendResponse.data.Data);
              //console.log(myLectures); // Log the data immediately after setting the state
            
              setUseEffect(false);
            }
          } catch (error) {
            toast.error(error.message || 'Failed to load');
          }
        }
        fetchCourses()

      },[startUseEffect])


//cart states 
const [cartStaus,setCartStatus]=useState(null);

const [cartData,setCartData] = useState([])
//

//cart showing
useEffect(() => {
  const fetchCart = async()=> {
    try {
     
      const cookiesArray = document.cookie.split(';');
      const cookies = cookiesArray.reduce((acc, cookie) => {
        const [name, value] = cookie.trim().split('=');
        acc[name] = value;
        return acc;
      }, {});

    
      const cookieToken = cookies.token;
      console.log(cookieToken);

      if (!cookieToken) {
        setauth(false);
        console.log("hellow")
        return;
      }

      const userDetails = jwtDecode(cookieToken);
      const id = userDetails.userData.email

      console.log(id);

      
      const backendResponse = await axios.get(`http://localhost:4001/user/cartShow/${id}`);

      if (backendResponse.data.successful) {
        console.log(backendResponse.data.Data);
        console.log(backendResponse.data.additional);

        setCartData(cartData.length === 0 ? backendResponse.data.Data : cartData);
        setCartStatus(cartStaus === null ? backendResponse.data.additional : cartStaus);
      }
    } catch (error) {
      toast.error("failed");
    }
  }

  fetchCart();
}, []);


//wishlist area
const [WishStaus,setWishStatus]=useState(null);
const [WishData,setWishData] = useState([])
const [wishcolor,setWishColor] = useState('black')

useEffect(() => {
  const fetchWish = async()=> {
    try {
     
      const cookiesArray = document.cookie.split(';');
      const cookies = cookiesArray.reduce((acc, cookie) => {
        const [name, value] = cookie.trim().split('=');
        acc[name] = value;
        return acc;
      }, {});

    
      const cookieToken = cookies.token;
      console.log(cookieToken);

      if (!cookieToken) {
        setauth(false);
        console.log("hellow")
        return;
      }

      const userDetails = jwtDecode(cookieToken);
      const id = userDetails.userData.email

      console.log(id);

      
      const backendResponse = await axios.get(`http://localhost:4001/user/wishlistshow/${id}`);

      if (backendResponse.data.successful) {
        console.log(backendResponse.data.Data);

        console.log(backendResponse.data.additional);

        setWishData(WishData.length === 0 ? backendResponse.data.Data : WishData);
        setWishStatus(WishStaus === null ? backendResponse.data.additional : WishStaus);
      }
    } catch (error) {
      toast.error("failed");
    }
  }

  fetchWish();
}, []);

//


//admin datas

const [DataStatus,setDataStatus] = useState({})


//
const data={
  userData,
  setUserData,
  emailOtp, 
  setEmailOtp,
  jwtres,
  Setjwtres,
  auth,
  setauth,
  Courses,
  SetCourses,
  getCourseUpdation,
  SetCourseUpdation,
  courseData, 
  setCourseData,
  setUseEffect,
  cartStaus,
  setCartStatus,
  cartData,
  setCartData,
  searchinput,
  setSearchInput,
  Search,
  setSearch,
  showWishlistIcon,
  setWishlistIcon,
  WishStaus,
  setWishStatus,
  WishData,
  setWishData,
  showWishlistIcon,
  setWishlistIcon,
  courseView,
  setCourseView,
  myLearnings,
  setMylearnings,
  mylearningStream,
  setMyLearnStream,
  DataStatus,
  setDataStatus,
  setAdminlog,
  Adminlog
}
  return (
    <>
    <Toaster />
    <Clintcontex.Provider value={data}>
      <Routes>
        <Route path="/" element={<Assemble/>}>
        <Route index element={<Homepage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>

        {/* protected routes */}
        <Route path="/signup/varify/otp" element={<Otpvarificaiton/>}/>
        <Route path="/login/emailvarify" element={<Resetpass/>}/>
        <Route path="/login/emailvarify/resetpass" element={<ResetPass2/>}/>
        <Route path="/singnup/emailreg" element={<EmailRegPassSeting/>}/>
        <Route path="singup/varify" element={<VarMailorPhon/>}/>
        <Route path="/user/cart" element={<CartSection/>}/>
        <Route path="/user/wishlist" element={<Wishlist/>}/>
        <Route path = "/courseView" element={<CourseView/>}/>
        {/* protected routes */}
       
        <Route path = "/videoPlayer" element={<VideoGallery/>}/>
        <Route path = "/ViewAllCrs" element={<DisplayAllCrs/>}/>
        
      </Route>
        
        <Route path= "/user/userpage" element={ <UserProfile/>} >
         <Route index element={<Profile/>}/>
         <Route path="/user/userpage/mylecture" element={<Mylecture/>}/>
         <Route path="/user/userpage/mylearings" element={<MyLearnings/>}/>

        </Route>
        <Route path= "/user/Adminlogin" element={ <AdminLog/>} />
        <Route path= "/adminIn" element={ <MainPage/>} >
         <Route index element={<MainContent/>}/>
         <Route path="/adminIn/users" element={<Userpage/>}/>
         <Route path="/adminIn/courses" element={<CourseGallery/>}/>
         <Route path="/adminIn/order" element={<OrderDetails/>}/>
         <Route path="/adminIn/profile" element={<ProfileSettings/>}/>
         

        </Route>
      </Routes>
      
      
      </Clintcontex.Provider>
    </>
  );
}

export default App;