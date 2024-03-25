import axios from "axios";
import { useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import Clintcontex from "../../createContex/Createcontex";
import { GoogleLogin } from '@react-oauth/google';
function SignUp() {
  const initialFormData = {
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  };

  const navigate = useNavigate();
  const { setUserData,Setjwtres } = useContext(Clintcontex);
  
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePhoneChange = (value, data, event, formattedValue) => {
    // Check if the entered value has more than 10 digits
    if (formattedValue.replace(/\D/g, '').length <= 12) {
      setFormData({
        ...formData,
        phone: value,
      });
    }
  };

  const sendToServer = () => {
    setUserData(formData)
      if (Object.keys(formData).length !== 0) {
        
    
          navigate("/signup/varify")
  }};


  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (formData.name === '') {
      newErrors.name = 'Name is required';
    }

    if (formData.email === '') {
      newErrors.email = 'Email is required';
    }

    if (formData.phone === '') {
      newErrors.phone = 'User Name is required';
    }

    if (formData.password === '') {
      newErrors.password = 'Password is required';
    }

    if (formData.confirmPassword === '') {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      
      console.log(formData);
      sendToServer()

    
     
    }
  };
      
        return (
          <div className="bg-gray-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center">
              <div className="bg-white px-6 rounded shadow-md text-black w-full">
                <p className="mb-1 text-1xl font-bold">Sign up and learn...</p>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    className={`block border ${
                      errors.name ? 'border-red-500' : 'border-black'
                    } w-full p-3 rounded mb-4 form-control`}
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                  />
      
                  <input
                    type="text"
                    className={`block border ${
                      errors.email ? 'border-red-500' : 'border-black'
                    } w-full p-3 rounded mb-4`}
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                      
                  <PhoneInput
                    inputProps={{
                      name: 'phone',
                      required: true,
                      autoFocus: true,
                    }}
                    containerClass={`block border ${
                      errors.phone ? 'border-red-500' : 'border-black'
                    } w-full p-3 rounded mb-4 form-control`}
                    inputClass="w-full"
                    country={'in'}
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    limitMaxLength={true} 
                  />
                  <input
                    type="password"
                    className={`block border ${
                      errors.password ? 'border-red-500' : 'border-black'
                    } w-full p-3 rounded mb-4`}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                  />
      
                  <input
                    type="password"
                    className={`block border ${
                      errors.confirmPassword ? 'border-red-500' : 'border-black'
                    } w-full p-3 rounded mb-4`}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
      
                  <button
                    type="submit"
                    style={{ backgroundColor: 'rgb(135,16,216)' }}
                    className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
                  >
                    Create Account
                  </button>
                </form>
      
                <div className="text-center text-sm text-grey-dark mt-4">
                  By signing up, you agree to the{' '}
                  <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a className="no-underline border-b border-grey-dark text-grey-dark" href="#">
                    Privacy Policy
                  </a>
                </div>
              </div>
      
              <div className="text-grey-dark mt-3">
                Already have an account?{' '}
                <a className="no-underline border-b border-blue text-blue" href="/login">
                  Log in
                </a>
                <p className=" text-center">or</p>
                <hr/>
               
                <GoogleLogin 
                width={400}
                  onSuccess={credentialResponse => {
                    
                    var value  = jwtDecode(credentialResponse.credential)
                    const Enteredemail=value.email
                    console.log(Enteredemail)
                    Setjwtres(value)
                    axios.post("http://localhost:4001/user/emailResgistration",{Enteredemail})
                    .then((res) => {
                      
                      if (res.data.status === false) {
                        alert("you already have an account")
                        navigate("/login");
                      }else{
                        alert("need to insert password")
                        navigate("/signup/emailreg");
                        
                      }
                    })
                    .catch((err) => {
                      alert(err);
                      
                    });
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                  
                 />
              </div>
            </div>
          </div>
        );
      }
      
      export default SignUp;