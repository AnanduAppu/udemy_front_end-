import { useState, useContext } from "react";
import Clintcontex from "../../createContex/Createcontex";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Otpvarificaiton() {
  const [otp, setOtp] = useState("");
  const { userData } = useContext(Clintcontex);
  const navigate = useNavigate();

  const handleChange = (value) => {
    if (value.match(/^\d*$/) && value.length <= 6) {
      setOtp(value);
    }
  };

  const submitToServer = async () => {

    const cookieToken = document.cookie.replace(/(?:(?:^|.*;\s*)userOtp\s*\=\s*([^;]*).*$)|^.*$/, "$1");
       
    if (!cookieToken) {
      toast.error("Token not found");
      return;
    }
    const otptoken = jwtDecode(cookieToken);

    console.log(otptoken)

    if (otp.trim() === "") {
      console.error("OTP is required");
      return;
    }

    try {

      const response = await axios.post("http://localhost:4001/user/signup", {
        userData
      });
      console.log(response);
      if (response.data.success) {
        console.log("Registration successful");
        navigate("/login");
      } else {
        console.log("Registration failed:", response.data.message);
        // Handle the failure case if needed
      }
    } catch (error) {
      console.log("Error during registration:", error.message);
      // Handle the error case if needed
    }
  };

  function yourdata(){
    alert("your all data cleaned , please sign up again")
    navigate("/signup")
  }

  return (
    <>
    {Object.keys(userData).length < 5 ? (
      yourdata()
    ) : (
      <div>
        <div className="py-20 flex flex-1 flex-col justify-center space-y-5 max-w-md mx-auto mt-18">
          <div className="flex flex-col space-y-2 text-center">
            <h2 className="text-3xl md:text-2xl font-bold">Confirm OTP</h2>
            <p className="text-md md:text-xl">
              Enter the OTP we just sent you.
            </p>
          </div>
          <div className="flex flex-col max-w-md space-y-5">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="0"
                value={otp}
                onChange={(e) => handleChange(e.target.value)}
                className="flex-1 px-3 py-2 md:px-4 md:py-3 border-2 border-black rounded-lg font-medium placeholder:font-normal text-center"
              />
            </div>
            <button
              className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white"
              onClick={submitToServer}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    )}
  </>
  )
}

export default Otpvarificaiton