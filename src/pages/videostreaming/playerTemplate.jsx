
import ReactPlayer from "react-player";

import { useContext,useState  } from 'react'
import Clintcontex from "../../createContex/Createcontex";

function VideoGallery() {
  const {mylearningStream} =useContext(Clintcontex);

console.log(mylearningStream)
const [selectVideo,setSelectVideo]=useState( mylearningStream.videos[0])
const [selectedVideo, setSelectedVideo] = useState(mylearningStream.videos.length > 0 ? mylearningStream.videos[0] : null);
// Store the selected video

  const handleVideoClick = (video) => {
    setSelectVideo(video); // Update the selected video state
  };
  return (
    <>
      <div className="container">
        {/* First Row */}
        <div className="rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-700">
          <div className="grid grid-cols-3">
            <div className="flex h-[70vh] items-center justify-center rounded border border-black bg-gray-50 dark:bg-gray-800 col-span-2 w-[100%]">
              {selectedVideo ? ( // Conditionally render the selected video
                <ReactPlayer
                  className="react-player"
                  url={selectVideo}
                  controls
                  width="100%"
                  height="100%"
                />
              ) : (
                // Render a placeholder while no video is selected
                <p className="text-2xl text-gray-400 dark:text-gray-500">
                  Select a video from the list.
                </p>
              )}
            </div>

            <div className="sm:ml-1">
              <div className="flex h-[70vh] flex-wrap items-center justify-start gap-x-4 rounded border border-black bg-gray-50 dark:bg-gray-800 overflow-y-auto">
                {/* Dynamically map video data and handle click events */}
                
                  
                <div className="lg:border-l lg:pl-2 ">
                  {mylearningStream.videos.map((video, ind) => (
                    <div
                      className={`flex items-start mb-3 pb-3 border border-black ${
                        selectVideo === video ? "bg-gray-200 dark:bg-gray-700" : ""
                      }`}
                      onClick={() => handleVideoClick(video)}
                      key={ind}
                    >
                      <div className="inline-block mr-3">
                        <div
                          className="w-20 h-20 bg-cover bg-center"
                          style={{
                            backgroundImage:
                              "url(https://static.vecteezy.com/system/resources/previews/001/505/014/non_2x/video-player-icon-free-vector.jpg)",
                          }}
                        ></div>
                      </div>
                      <div className="text-sm w-[350px]">
                        <p className="text-gray-800 text-xs font-bold pb-2 pt-2">part: {ind + 1}</p>
                        <p className="text-gray-900 font-medium hover:text-indigo-600 text-center leading-none">
                          {mylearningStream.title} 
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                
             
              </div>
            </div>
          </div>
        </div>

        {/* Second Row */}
        <div className="rounded-lg border-2 border-dashed border-gray-200 p-4 dark:border-gray-700 mt-4">
          <div className="grid grid-cols-3">
            <div className="flex h-80 items-center justify-center rounded border border-black bg-gray-50 dark:bg-gray-800 col-span-2">
              <p className="text-2xl text-gray-400 dark:text-gray-500"></p>
            </div>

            <div className="sm:ml-1">
              <div className="flex h-80 items-center justify-center rounded border border-black bg-gray-50 dark:bg-gray-800">
                <p className="text-2xl text-gray-400 dark:text-gray-500">
         
   
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default VideoGallery;
