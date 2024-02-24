import { useState,useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Clintcontex from "../../createContex/Createcontex";

const AdminLog = () => {
    const navigate = useNavigate()
    const {setAdminlog,Adminlog} = useContext(Clintcontex)
    const [username, setusername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const handleSubmit = async (e) => {

      e.preventDefault();
  
      if (!username || !password) {
        setError('Please fill in all fields');
        return;
      }
  
      try {
        const response = await axios.post('http://localhost:4001/user/admin/login', {username,password},{ withCredentials: true });
       
        if(response.data.success){
            
            setAdminlog(username)
            toast.success("successfully logged")
            navigate('/adminIn')
        }
        
      } catch (error) {
        console.log('Login failed:', error.message);
        toast.error('Login failed. Please try again.');
      }
    };    
    return (
        <div className="flex items-center min-h-screen px-6">
          <div className="mx-auto max-w-sm w-full space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2 text-center">
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="text-gray-500 dark:text-gray-400">
                  Enter your username below to login
                </p>
              </div>
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium leading-none">
                  User Name
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="username please"
                  required
                />
              </div>
              <div className="relative space-y-2">
                <div className="flex items-center">
                  <label htmlFor="password" className="text-sm font-medium leading-none">
                    Password
                  </label>
           
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  required
                />
                <button
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full"
                  type="submit"
                >
                  Login
                </button>
                {error && <p className="text-red-500">{error}</p>}
              </div>
            </form>
        
          </div>
        </div>
      );}

export default AdminLog;
