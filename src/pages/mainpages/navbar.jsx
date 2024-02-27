import logimg from "../../assets/Udemy New 2021.png";
import SearchIcon from "@mui/icons-material/Search";
import LanguageIcon from "@mui/icons-material/Language";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Clintcontex from "../../createContex/Createcontex";
import { useContext, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import axios from "axios";
import { toast } from "react-hot-toast";


function Navbar() {
  const { auth, setauth,cartStaus,setSearchInput,searchinput,Search,setSearch,showWishlistIcon,setWishlistIcon } = useContext(Clintcontex);

const navigate = useNavigate()
  const clearCookie = (cookieName) => {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  const logoutHandle = async () => {
    try {
      const response = await axios.get("http://localhost:4001/user/logout");

      if (response.data === "Cookie cleared successfully") {
        clearCookie("token");
        toast.success("Logout successful");
        setauth(false);
        setWishlistIcon(false)
      } else {
        alert("Logout failed");
      }
    } catch (error) {
      alert("Error during logout:", error);
      toast.error("Error during logout");
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }
  return (
    <div className="relative">
      <header className=" py-3 w-full bg-white shadow-xl ring-1 ring-slate-900/5">
        <nav className=" flex items-center space-x-3">
          <Link to="/" >
            <img
              src={logimg}
              alt="logo"
              width={100}
              height={10}
              className="ml-6"
            />
          </Link>
          <ul className="flex justify-between space-x-5 ">
         <li className="pt-2 relative" > <button  onClick={toggleDropdown}>Categories
         </button> 
         <svg
          className={`w-2.5 h-2.5 ms-3 ${isOpen ? 'transform rotate-180' : ''}`}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
        {isOpen && (
        <div
          id="dropdown"
          className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute top-full left-0 mt-1"
        >
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Photography
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              web development
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Python
              </a>
            </li>
            <li>
              <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
              Trading
              </a>
            </li>
          </ul>
        </div>
      )}
         
         </li>
            <li>
              <span className="my-10  pl-[5px] py-[13px] rounded-full border-slate-500 border-2">
                <button>
                  <SearchIcon />
                </button>{" "}
                <input
                  type="text"
                  className=" rounded-full focus:outline-none w-[40rem] h-12 "
             
                  onChange={(evt)=>setSearch(evt.target.value) }
                  onClick={()=>setSearchInput(!searchinput)}  
                />
              </span>
            </li>
            <li className="pt-2 cursor-pointer">udemy Business</li>
            <li className="pt-2 cursor-pointer">Teach on Udemy</li>
            <li className="pt-2 cursor-pointer">
             <Link to="/user/cart"><ShoppingCartOutlinedIcon />{cartStaus}</Link> 
            </li>
            <div className={auth ? "flex hidden" : "flex "}>
              <li className="pt-2 cursor-pointer mr-3">
                <span className="border-black border-2 py-2 px-3 font-bold hover:bg-slate-300">
                  <Link to="/login">Log in</Link>
                </span>
              </li>
              <li className="pt-2 cursor-pointer mr-3">
                <span className="border-black border-2 bg-black py-2 px-3 font-bold text-white">
                  <Link to="/signup">Sign Up</Link>
                </span>
              </li>
              <li className="pt-2 cursor-pointer ">
                <span className="border-black border-2 py-2 px-2 text-center">
                  {" "}
                  <LanguageIcon />
                </span>
              </li>
            </div>
            <div
              className={
                auth ? "flex justify-around" : "flex justify-around hidden"
              }
            >
              <li className="pt-2 cursor-pointer mr-3">
                <span
                  className="py-2 px-2 font-bold "
                  style={{ fontSize: "14px" }}
                >
                  <Link to="/user/wishlist">
                    <FavoriteBorderIcon />
                  </Link>
                </span>
              </li>

              <li className="pt-2 cursor-pointer mr-3">
                <span
                  className="py-2 px-3 font-bold"
                  style={{ fontSize: "14px" }}
                >
                  <a onClick={()=>navigate('/user/userpage/mylearings')}>

                    <MenuBookIcon />
                  </a>
                </span>
              </li>
              <li className="pt-2 cursor-pointer mr-3">
                <span
                  className="py-2 pl-3 pr-1 font-bold"
                  style={{ fontSize: "14px" }}
                >
                  <Link to="/user/userpage">
                    <AccountCircleIcon />
                    <KeyboardArrowDownIcon />
                  </Link>
                </span>
              </li>
              <li className="pt-2 cursor-pointer ">
                <span
                  className="border-black border-2 py-2 px-2 text-center"
                  onClick={logoutHandle}
                >
                  {" "}
                  <LogoutIcon />
                </span>
              </li>
            </div>
          </ul>

        </nav>

      </header>

      
    </div>
  
  );
}

export default Navbar;
