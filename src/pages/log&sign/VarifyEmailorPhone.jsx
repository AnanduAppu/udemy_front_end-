import { useContext } from "react";
import axios from "axios";
import Clintcontex from "../../createContex/Createcontex";
import { useNavigate } from "react-router-dom";

function VarMailorPhon() {
  const { userData } = useContext(Clintcontex);
  console.log(userData)
  const email = userData.email
  const phone = userData.phone
const navigate = useNavigate ()
  const handlePhoneVerification = () => {
    axios.post("http://localhost:4001/user/Phoneotpsend",  phone,{withCredentials:true})
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
      navigate("/signup/varify/otp")
  };

  const handleEmailVerification = () => {
    axios.post("http://localhost:4001/user/Emailotpsend", { email},{withCredentials:true})
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
      navigate("/signup/varify/otp")
  };

  return (

    <div className="border border-black-200 mx-48 my-10">
      <div className="mx-auto text-center px-9 py-9">
        <div>
          <button
            className="bg-black text-white px-2 py-2 rounded-lg hover:bg-gray-800 hover:text-gray-200"
            onClick={handlePhoneVerification}
          >
            Verify Phone
          </button>
        </div>
        <p>or</p>
        <div>
          <button
            className="bg-black text-white px-2 py-2 rounded-lg hover:bg-gray-800 hover:text-gray-200"
            onClick={handleEmailVerification}
          >
            Verify Email
          </button>
        </div>
      </div>
    </div>
  );
}

export default VarMailorPhon;
