import { useState, useRef,useContext } from "react";
import toast from "react-hot-toast"
import axios from "axios";
import Clintcontex from "../../createContex/Createcontex";
function Profile() {
 const {userData,setUserData} = useContext(Clintcontex)
  const [uploading, setUploading] = useState(false);
  
  const [imageUrl, setImageUrl] = useState("https://img.freepik.com/premium-vector/transparent-contact-line-icon-phone-communication-social-network-communication-conversation-number-friends-vector-icon-business-advertising_727385-7487.jpg");
 
  const [salary, setSalary] = useState('$10,000');
  const [inputFile,setinputFile] = useState(true)

  const cloudName = "djmrroluc";
  const apiKey = "377863932456872";
 
  const uploadPreset = "userImage";

  const handleImageChange = async (event) => {
    try {
      const file = event.target.files[0];
  
      if (!file) {
       
        toast.error("no image")
        return;
      }
  
      setUploading(true);
  
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
      formData.append('api_key', apiKey);
  
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });
  
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error.message);
      }
  
      const backendResponse = await axios.post('http://localhost:4001/user/userimage', {
        imageUrl:data.secure_url,
        email: userData.email
        
      });

      if (!backendResponse.data.successful) {
        return toast.error(response.data.error,"error");
      }


      setImageUrl(backendResponse.data.Data);
      setUploading(false);
      toast.success("Successful");
      console.log(imageUrl);
      window.location.reload();
    } catch (error) {
      console.error("Error uploading image:", error.message);
      setUploading(false);
      toast.error("failed");
      
    }

  };

  const handleAddImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const fileInputRef = useRef(null);



  // update the profile


const [userDetails,setUserDetails ]= useState({
  name:'',
  email:'',
  phone:''
})

  const setFullName = (value) => {
    setUserDetails((prevuserDetails) => ({
      ...prevuserDetails,
      name: value,
    }));
  };

  const setPhoneNumber = (value) => {
    setUserDetails((prevuserDetails) => ({
      ...prevuserDetails,
      phone: value,
    }));
  };

  const setEmail = (value) => {
    setUserDetails((prevuserDetails) => ({
      ...prevuserDetails,
      email: value,
    }));
  };

  const handleUpdateClick = async () => {
    // Add your logic to handle the update action, e.g., send the updated userData to the server
   
    const Response = await axios.post('http://localhost:4001/user/update', {
      userDetails,
      userData
      });

      if (!Response.data.successful) {
        return toast.error("an error occured");
      }
    toast.success("updated successful")
    window.location.reload();
  };

  return (
    <>
    
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="grid grid-cols-2 gap-4 mb-4 ">
            {/* Column 1 */}
            <div className="flex flex-col items-center justify-center rounded bg-gray-50  dark:bg-gray-800 h-[60vh]">
              <div className="max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg hover:shadow-blue-400">
                <div className="relative h-48 w-full">
                  <img
                    className="w-full h-full object-cover object-center"
                    src={userData.profileimg?userData.profileimg:imageUrl}
                    alt="Profile Image"
                  />
                </div>
                <div className="px-6 py-4">
                  <div className="text-xl font-semibold text-gray-800">
                  {userData.name}
                  </div>
                  <p className="text-gray-600">Udemy User</p>
                </div>
                <div className="px-6 py-4">
                  <button
                    onClick={handleAddImageClick}
                    className="bg-blue-500 text-white py-2 px-2 rounded-lg"
                    disabled={uploading}
                    
                     
                  >
                     {uploading ? 'Uploading...' : 'Add Image'}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                  <button 
                  className="bg-blue-500 text-white  py-2 px-2 mx-2  rounded-lg"
                  onClick={()=>setinputFile(!inputFile)}
                  >
                    Edit profile
                  </button>
                </div>
                <div className="px-6 py-4">
                  <a href="#" className="text-blue-500 hover:underline">
                    View Profile
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col items-center justify-center rounded bg-gray-50 h-[95%] dark:bg-gray-800">
              <div className="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg px-20 py-24">
                <div className="px-4 py-3 sm:px-6">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    User Info
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    Details and information about the user.
                  </p>
                </div>

                {/* where you details shows div */}
                <div className={`border-t border-gray-200 ${inputFile?'':'hidden'}`}>
                  <dl>
                    <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Full name
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {userData.name}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Phone Number
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {userData.phone}
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Email address
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        {userData.email}
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Salary
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        $10,000
                      </dd>
                    </div>
                  </dl>
                </div>
                {/* where your user details shows div ends here */}

                {/* where your user details edit div start here */}
                <div className={`border-t border-gray-200 ${inputFile?'hidden':''}`}>
                  <dl>
                  <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">Full name</dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          value={userDetails.name}
                          onChange={(e) => setFullName(e.target.value)}
                          className="border rounded-md px-2 py-1 w-full"
                        />
                      </dd>
                    </div>
                    <div className="bg-white px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Phone Number
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <input
                          type="text"
                          value={userDetails.phone}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="border rounded-md px-2 py-1 w-full"
                        />
                      </dd>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500">
                        Email address
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                        <input
                          type="email"
                          value={userDetails.email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="border rounded-md px-2 py-1 w-full"
                        />
                      </dd>
                    </div>
              
                  </dl>
                  <button onClick={handleUpdateClick} className="ml-5 py-2 px-2 bg-rose-200 rounded-lg">Update</button>
                </div>
              </div>
               {/* where your user details edit div end here */}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center h-48 mb-4 rounded bg-gray-50 dark:bg-gray-800">
        <p className="text-2xl text-gray-400 dark:text-gray-500">
          <svg
            className="w-3.5 h-3.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </p>
      </div>
    </>
  );
}

export default Profile;
