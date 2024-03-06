import GoogleIcon from '@mui/icons-material/Google';
import { useState,useContext } from 'react';
import Clintcontex from "../../createContex/Createcontex";
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import { Link} from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function Login() {
  const {setauth,setUserData,userData} = useContext(Clintcontex)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  console.log(userData)
const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please fill in both email and password fields.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:4001/user/login', {
        email: email,
        password: password,
      },{ withCredentials: true });

      if (response.data.success) {
        alert(response.data.message);
        var value  = jwtDecode(response.data.accessToken)
        console.log(value)
        setUserData({})
        setauth(true)
        navigate("/")
        
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.log(error);
      alert('An error occurred during login');
    }
  };

  return (
    <div className="px-3 py-16">
      <div className="max-w-md mx-auto bg-white p-3 rounded">
        <div className="px-3 ">
          <form onSubmit={handleSubmit}>
            <div className="text-center">
              <h1 className="text-2xl mb-2">Signin</h1>
            </div>
            <button className="h-12 w-full hover:bg-slate-200 focus:outline-none bg-white border-black border-2 rounded text-black mb-3">
              <GoogleIcon className="text-blue-500" /> Signin using Google
            </button>
            <div className="mt-5">
              <hr className="h-0.5 mt-3" />
              <div className="relative py-4 flex justify-center">
                <span className="absolute px-4 rounded -top-4 left-30 bg-white">Or </span>
              </div>
            </div>

            <div className="relative mb-3">
              <span className="ml-2 bg-white px-2 absolute -top-3 text-sm">Email</span>
              <input
                type="email"
                className="transition duration-500 h-12 rounded w-full px-2 mb-2 border-black border-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative mb-1">
              <span className="ml-2 bg-white px-2 absolute -top-3 text-sm">Password</span>
              <input
                type="password"
                className="transition duration-500 h-12 rounded w-full px-2 mb-2 border-black border-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="text-right mb-3">
              <Link to="/login/emailvarify" className="cursor-pointer text-blue-500 hover:text-blue-700">
                Forgot password?
              </Link>
            </div>
            <button
              style={{ backgroundColor: 'rgb(135,16,216)' }}
              type="submit"
              className="h-12 w-full rounded text-white mb-3 font-bold"
            >
              Signin
            </button>
            <p>No account? new here? <Link to="/signup" className='text-blue-600'> create one</Link></p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
