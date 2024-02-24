import { useState, useContext, useEffect } from "react";
import { Video } from "cloudinary-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import Clintcontex from "../../createContex/Createcontex";
import ReactPlayer from "react-player";

function MyLecture() {
  const { userData, courseData, setCourseData, setUseEffect } =useContext(Clintcontex);
  const [videos, setVideos] = useState([]);
  const [thumpline, setThumpline] = useState(null);
  const [opendivgallery, setGallery] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [uploadErrors, setUploadErrors] = useState([]); // Track upload errors
  const [videoData, setVideoData] = useState({
    title: "",
    description: "",
    videos: [], // change 'video' to 'videos'
    thumpline: "",
    category: "",
    price: "",
  });

  // display courses

  console.log(courseData);

  // display courses code end here

  const cloudName = "djmrroluc";
  const apiKey = "377863932456872";
  const uploadPreset = "udemyVideo";

  const openAuthPopup = () => {
    setIsOpen(true);
  };

  const closeAuthPopup = () => {
    setIsOpen(false);
  };

  // handle the video file here
  const handleVideoChange = (event) => {
    const newVideos = Array.from(event.target.files);
    setVideos([...videos, ...newVideos]);
  };
  // handle the video file code end here

  // handle input values
  const handleInputChange = (event) => {
    setVideoData({
      ...videoData,
      [event.target.name]: event.target.value,
    });
  };

  // thumpline image change
  const handleThumplineChange = (event) => {
    setThumpline(event.target.files[0]);
  };

  // uploading videos to Cloudinary
  const handleUpload = async () => {
    try {
      setUploadErrors([]); // Clear any previous errors

      if (!videos) {
        toast.error("no video files");
        return;
      }

      setUploading(true);

      const promises = [];
      for (const video of videos) {
        promises.push(
          new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("file", video);
            formData.append("upload_preset", uploadPreset);
            formData.append("api_key", apiKey);

            fetch(`https://api.cloudinary.com/v1_1/${cloudName}/video/upload`, {
              method: "POST",
              body: formData,
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.error) {
                  reject(new Error(data.error.message));
                } else {
                  resolve(data.secure_url); // Update to 'secure_url'
                }
              })
              .catch((error) => {
                reject(error);
              });
          })
        );
      }

      const urls = await Promise.all(promises);
      setVideoData({ ...videoData, videos: [...videoData.videos, ...urls] });
      toast.success("video uploaded success full");
      setVideos([]);
      setUploading(false);
    } catch (error) {
      console.log("Error uploading videos:", error.message);
      setUploadErrors([...uploadErrors, error.message]); // Add error to list
      setUploading(false);
    }
  };
  // upload video code end here

  // handle thumpline single image
  const handleThumpline = async () => {
    try {
      if (!thumpline) {
        toast.error("no thumpline files");
        return;
      }
      setUploading(true);
      const formData = new FormData();
      formData.append("file", thumpline);
      formData.append("upload_preset", "courseImage");
      formData.append("api_key", apiKey);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error.message);
      }

      setVideoData({ ...videoData, thumpline: data.secure_url }); // Update to 'secure_url'

      setUploading(false);
      console.log(thumpline);
    } catch (error) {
      console.log("Error uploading thumpline image:", error.message);
      setUploading(false);
    }
  };

  const handleCategoryChange = (event) => {
    setVideoData({
      ...videoData,
      category: event.target.value,
    });
  };

  //submiting course details to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (Object.keys(videoData).length === 0) {
        toast.error("Video data is empty. Please fill in the required fields.");
        return;
      }

      console.log("Submitted Video Data:", videoData);

      const backendResponse = await axios.post(
        "http://localhost:4001/user/createcourse",
        {
          videoData,
          userData,
        }
      );

      if (backendResponse.data.successful) {
        console.log(backendResponse.data.Data);
        setIsOpen(false);
        toast.success("Course created successfully");
      } else {
        toast.error(backendResponse.data.message || "Failed to create course");
      }
    } catch (error) {
      toast.error("Failed to submit course. Please try again later.");
    }
  };

  //click thumbnail and goes respective video of thumbnail
  const [thumvidoes, setThumpvideos] = useState([]);
  const handleThumbnail = (e, id) => {
    e.preventDefault();
    const wantedCourse = courseData.find((ele) => ele._id === id);
    
    console.log("wantedCourse:", wantedCourse);

    if (wantedCourse) {
      const videos = wantedCourse.videos;
      console.log("videos:", videos);

      setThumpvideos(videos);
    
      setGallery(true);
    }

  };
  console.log("this is thumvideos",thumvidoes)

  // abrivate description
  const truncateText = (text, maxLength) => {
    const words = text.split(' ');
    if (words.length > maxLength) {
      return words.slice(0, maxLength).join(' ') + '...';
    }
    return text;
  };

  const truncateChar = (text, maxLength) => {
    if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
    }
    return text;
};

  //*course edit and delete area

  const [isFormOpen, setFormOpen] = useState(false);
  const [isVideoForm, setsVideoForm] = useState(false);


  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [courseId, setCourseId] = useState('');
  const [newVideos,setNewvideos] = useState([])
  const [deletePopup, setdeletePopup] = useState(false);


  const handleSaveForm = async (e) => {
  e.preventDefault();

  const formData = {
    title: title,
    description: description,
    price: price
  };
  console.log(formData);

  const backendResponse = await axios.put(
    "http://localhost:4001/user/editCourse",
    { courseId, formData } // Include courseId in the request body
  );
  if (backendResponse.data.success) {
    console.log(backendResponse.data.Data);
    setFormOpen(false);
    toast.success("Course edited successfully");
  } else {
    toast.error(backendResponse.data.message || "Failed to edit course");
  }
}

const formEdit = (e, id) => {
  e.preventDefault();
  setCourseId(id);
  setFormOpen(true);
};

  const unpopForm = (e) => {
    e.preventDefault();
    setFormOpen(false);
    setCourseId('');
   

  };

  const unpopVideoForm = (e)=>{
    e.preventDefault();
    setsVideoForm(false)
    setVideos([])
    setNewvideos([])
  }


 const videoUploadform= (e,id)=>{
  e.preventDefault();
  setCourseId(id);
  setsVideoForm(true)
 }

  const handleVidofile = (e)=>{
    e.preventDefault();
    const uploadVideos = Array.from(e.target.files);
    setVideos([...videos, ...uploadVideos]);
    console.log(Video.length)

  }

  const videoUploding = async (e)=>{
    e.preventDefault();

    try {
      setUploadErrors([]); // Clear any previous errors

      if (!videos) {
        toast.error("no video files");
        return;
      }

      setUploading(true);

      const promises = [];
      for (const video of videos) {
        promises.push(
          new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append("file", video);
            formData.append("upload_preset", uploadPreset);
            formData.append("api_key", apiKey);

            fetch(`https://api.cloudinary.com/v1_1/${cloudName}/video/upload`, {
              method: "POST",
              body: formData,
            })
              .then((response) => response.json())
              .then((data) => {
                if (data.error) {
                  reject(new Error(data.error.message));
                } else {
                  resolve(data.secure_url); // Update to 'secure_url'
                }
              })
              .catch((error) => {
                reject(error);
              });
          })
        );
      }

      const urls = await Promise.all(promises);
      setNewvideos([ ...urls]);
   
      toast.success("video uploaded success full");
      setVideos([]);
      setUploading(false);
    } catch (error) {
      console.log("Error uploading videos:", error.message);
      setUploadErrors([...uploadErrors, error.message]); // Add error to list
      setUploading(false);
    }
  }

  const handleSaveVideo = async (e) => {
    e.preventDefault();
    console.log(newVideos)
    const backendResponse = await axios.put(
      "http://localhost:4001/user/uploadNewVideos",
      { courseId, newVideos } // Include courseId in the request body
    );
    if (backendResponse.data.success) {
      console.log(backendResponse.data.message);
      setFormOpen(false);
      toast.success("Course video updated successfully");
    } else {
      toast.error(backendResponse.data.message || "Failed to edit course");
    }
  };

const [DeleteCourse,setDeleteCourse] = useState('')
  const courseDelete =  async (e,id)=>{
    console.log(`
    courseid:${id}, userid: ${userData._id}
    `)
    e.preventDefault();
    setdeletePopup(true);
    setDeleteCourse(id)
  };

  const handleDelete = async(id)=>{

    if (DeleteCourse) {
      const backendResponse = await axios.delete(
        "http://localhost:4001/user/deletecourse",
        { data: { courseId: DeleteCourse, userId: userData._id }}
      );
      if (backendResponse.data.success) {
        toast.success("deleted successfull");
        setDeleteCourse('')
        
      }
      setdeletePopup(false);
    }
  }

  return (
    <>
    {/* course editing pop up window start here*/}
    <div
        id="authPopup"
        className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 ${
          isFormOpen ? "" : "hidden"
        }`}
      >
  <form className="max-w-sm mx-auto border border-black rounded-lg p-6 my-40 w-96 bg-white">
    <h1 className="my-2">Edit here</h1>
    <div className="mb-5">
        <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
        <input
          type="text"
          id="base-input"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="mb-5">
        <label htmlFor="large-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
        <input
          type="text"
          id="large-input"
          className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
        <input
          type="number"
          id="small-input"
          className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

    <div className="flex justify-between py-7">
    <button
              className="py-2 px-4 bg-red-500 rounded-lg font-bold text-white hover:bg-red-700"
       
              onClick={(e)=>unpopForm(e)}
    >
              Cancel
    </button>
    <button
          className="py-2 px-4 bg-green-500 rounded-lg font-bold text-white hover:bg-green-700"
          onClick={(e)=>handleSaveForm(e)}
    >
          Save
    </button>
    </div>
  </form>
</div>
{/* course editing pop up window end here*/}

{/* course vide uploading code start here */}
<div
        id="authPopup"
        className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 ${
          isVideoForm ? "" : "hidden"
        }`}
      >
  <form className="max-w-sm mx-auto border border-black rounded-lg p-6 my-40 w-96 bg-white">
    <h1 className="my-2">Upload video </h1>
    <div className="mb-5">
       
       
               <label
                htmlFor="file"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Select video
              </label>
              <input
                type="file"
                accept="video/*"
                multiple
                onChange={(e)=>handleVidofile(e)}
              />
     
              <button
                className="my-4 py-2 px-3 bg-green-600 rounded-lg font-semibold"
                onClick={(e) => videoUploding(e)}
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "upload"}
              </button>
      </div>

    
    <div className="flex justify-between ">
    <button
              className="py-2 px-4 bg-red-500 rounded-lg font-bold text-white hover:bg-red-700"
       
              onClick={(e)=>unpopVideoForm(e)}
    >
              Cancel
    </button>
    <button
          className="py-2 px-4 bg-green-500 rounded-lg font-bold text-white hover:bg-green-700"
          onClick={(e)=>handleSaveVideo(e)}
    >
          Save
    </button>
    </div>
  </form>
</div>
{/*course video uploading code end here */}

{/*course delete pop up */}
{deletePopup&& (
        <div id="popup-modal" tabIndex="-1" className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 mx-[40%]  items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button type="button" onClick={()=>setdeletePopup(false)} className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-4 md:p-5 text-center">
                <svg className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this product?</h3>
                <button onClick={(e)=>handleDelete(e)} type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
                  Yes, I'm sure
                </button>
                <button onClick={()=>setdeletePopup(false)} type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
{/*course delete pop up */}

      {/* display thumbline image */}
      <div
        className={`ml-72 overflow-auto w-[70%] h-[65vh]  px-4 mt-24 border border-slate-400 \ ${
          opendivgallery ? "hidden" : ""
        }`}
        >
        <div className="p-5 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {courseData.map((course, ind) => (
          <div key={ind} >
            {/* Card 1 */}
            <div className="rounded overflow-hidden shadow-lg">
              <a className="cursor-pointer" onClick={(e) => handleThumbnail(e, course._id)}> 
              <img className="w-72 h-40" src={course.thumbnail} alt="Mountain" />
              </a>
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{truncateChar(course.title, 16)}</div>
                <p className="text-gray-700 text-base">
                {truncateText(course.description, 4)}
                </p>
              </div>
              <div className="px-6 pt-2 pb-2 w-72"> 
                <button className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-blue-500" onClick={(e)=>formEdit(e,course._id)}>Edit</button>
                <button className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-red-500" onClick={(e)=>courseDelete(e,course._id)}>Delete</button>
                <button className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-blue-500" onClick={(e)=>videoUploadform(e,course._id)}>+video</button>
              </div>
            </div>
   
          </div>
         
          ))}
        </div>
      </div>

      {/* display Display videos */}
      <div
        className={`ml-72 overflow-auto w-[70%] h-[65vh]  p-8 mt-24 border border-slate-400 ${
          opendivgallery ? "" : "hidden"
        }`}
        >
        <button
          className="px-2 py-2 bg-slate-600 rounded-lg text-white my-2"
          onClick={() => setGallery(false)}
        >
          Back
        </button>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {thumvidoes.map((video, videoIndex) => (
            <>
          
            <div key={videoIndex}  >
             
              <ReactPlayer
               
                className="react-player"
                url={video} // Update your_base_video_url with the actual base URL
                controls
                width="100%"
                height="100%"
              />
            </div>
            </>
          
        
            
          ))}
        </div>
      </div>

      {/* display thumbline image and videos section end here*/}



      {/* popup window which help to upload vedio and its desctiptions         */}
      <div
        id="authPopup"
        className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 ${
          isOpen ? "" : "hidden"
        }`}
      >
        <div className="bg-white p-3 rounded shadow-md">
          <h2 className=" font-bold my-1">create your class..</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-2">
              <label
                htmlFor="title"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Title
              </label>
              <input
                type="text"
                value={videoData.title}
                onChange={handleInputChange}
                name="title"
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="mb-2">
              <label
                htmlFor="description"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={videoData.description}
                onChange={handleInputChange}
                rows="2"
                className="block p-2.5 w-full py-1 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                required
              ></textarea>
            </div>
            <div className="mb-2">
              <label
                htmlFor="file"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Select video
              </label>
              <input
                type="file"
                accept="video/*"
                multiple
                onChange={handleVideoChange}
              />
              <button
                className="my-4 py-2 px-3 bg-green-600 rounded-lg font-semibold"
                onClick={handleUpload}
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "upload"}
              </button>

              {uploadErrors.length > 0 && (
                <div className="my-1 text-red-500">
                  {uploadErrors.map((error, index) => (
                    <p key={index}>{error}</p>
                  ))}
                </div>
              )}
            </div>
            <div className="mb-2">
              <label
                htmlFor="thumpline"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Thumpline
              </label>
              <input
                type="file"
                accept="image/*"
                id="thumpline"
                name="thumpline"
                onChange={handleThumplineChange}
                className=" py-2 border rounded-md focus:outline-none focus:border-blue-500"
                required
              />
              <button
                className="my-2 py-2 px-3 bg-green-600 rounded-lg font-semibold"
                onClick={handleThumpline}
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
            <div className="mb-2">
              <label
                htmlFor="price"
                className="block text-gray-600 text-sm font-medium mb-2"
              >
                Price
              </label>
              <input
                type="number"
                value={videoData.price}
                onChange={handleInputChange}
                id="price"
                name="price"
                pattern="[0-9]*"
              />
            </div>
            <div className="mb-1">
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Category
              </label>
              <select
                id="category"
                value={videoData.category}
                onChange={handleCategoryChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                required
              >
                <option selected>Select category</option>
                <option value="Web Development">Web Development</option>
                <option value="Photography">Photography</option>
                <option value="Python">Python</option>
                <option value="Graphic Design">Graphic Design</option>
                <option value="Trading">Trading</option>
                <option value="Language">Language</option>
              </select>
            </div>

            <div className="flex justify-end">
              <button
                className="my-1 mx-6 py-2 px-3 bg-red-600 rounded-lg font-semibold"
                onClick={closeAuthPopup}
              >
                Close
              </button>
              <button
                className="my-1 py-2 px-3 bg-green-600 rounded-lg font-semibold"
                type="submit"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* popup window which help to upload vedio and its desctiptions  div end here */}

      <div className="ml-72">
        <button
          className="my-8 py-3 px-3 bg-purple-500 rounded-lg font-bold hover:bg-purple-900  hover:text-white"
          onClick={openAuthPopup}
        >
          Create lecture
        </button>
      </div>


    </>
  );
}

export default MyLecture;
