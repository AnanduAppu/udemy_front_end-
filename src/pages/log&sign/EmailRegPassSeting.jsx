import {useState, useContext} from 'react'
import Clintcontex from "../../createContex/Createcontex";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function EmailRegPassSeting() {

    const { jwtres } = useContext(Clintcontex);

    const navigate = useNavigate()
    let name = jwtres.name
    let email = jwtres.email

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const togglePasswordVisibility = () => {
      setPasswordVisible(!passwordVisible);
    };

    

    const handleSubmit = (e)=>{
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Password and Confirm Password do not match.');
            return;
          }

        axios.post("http://localhost:4001/user/emailPasswordSetting",{name:name,email:email,password:password})
                    .then((res) => {
                      
                      if (res.data.status === true) {
                        alert(res.data.message)
                        navigate("/");
                      }
                    })
                    .catch((err) => {
                      alert(err);
                      
                    });
    }

  return (
    <div>
      <div className="container mx-auto p-4 bg-white">
        <div className="w-full md:w-1/2 lg:w-1/3 mx-auto my-12">
          <h1 className="text-lg font-bold">Hello {jwtres.name}</h1>
          <form className="flex flex-col mt-4">
            <div className="relative">
              <input
                type={passwordVisible ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="px-4 py-3 mt-4 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
                placeholder="Password"
              />
              <span
                className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? '👁️' : '👁️‍🗨️'}
              </span>
            </div>
            <input
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="px-4 py-3 mt-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"
              placeholder="Confirm Password"
            />
            <button
              type="submit"
              className="mt-4 px-4 py-3 leading-6 text-base rounded-md border border-transparent text-white focus:outline-none bg-blue-500 text-blue-100 hover:text-white focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer inline-flex items-center w-full justify-center items-center font-medium focus:outline-none"
              onClick={(e)=>handleSubmit(e)}
            >
              Set Password
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EmailRegPassSeting