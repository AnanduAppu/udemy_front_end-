import React from 'react';
import Clintcontex from "../../createContex/Createcontex";
import { useContext,useState, useEffect} from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

const Serachpage = () => {

const {Courses,setSearchInput,searchinput,Search,setSearch,showWishlistIcon } = useContext(Clintcontex);

const [Data,setData] = useState([])

useEffect(() => {
  function filteritem(itemname) {
    const result = itemname.filter((val) => {
      return Search === "" ? "" : val.title.toLowerCase().includes(Search.toLowerCase());
    });
    setData(result);
    console.log(Search);
    console.log(Data) // Move this line inside useEffect
  }

  filteritem(Courses);

}, [Search]);


  return (
    <div className="mx-auto max-w-[calc(100% - 400px)] border border-black px-3 pb-3 mb-6">
      
      <div className="mx-auto max-w-[calc(100% - 400px)] border border-black px-3 pb-3 mb-6">
  {Data.length === 0 ? (
    <h1 className='my-10 mx-auto'>Searching</h1>
  ) : (
    Data.map((ele, ind) => (
      <div className="max-w-2xl mx-auto mt-24" key={ind}>
        <div className="flex gap-3 bg-white border border-gray-300 rounded-xl overflow-hidden items-center justify-start">
          <div className="relative w-32 h-32 flex-shrink-0">
            <img
              className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50 rounded-lg"
              loading="lazy"
              src={ele.thumbnail}
              
            />
          </div>
          <div className="flex flex-col gap-2 py-2">
            <p className="text-xl font-bold">{ele.title}</p>
            <p className="text-gray-500">
              {ele.description}
            </p>
            <p>Price:</p>
            <span className="flex items-center justify-start text-gray-500">
              <a
                href="https://amitpachange.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                View
              </a>
              <a
                href="https://amitpachange.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block mx-2 my-1"
              >
                Add to Cart
              </a>
              
              {showWishlistIcon && (
        <a>
          <FavoriteBorderIcon />
        </a>
      )}
     
            </span>
          </div>
        </div>
      </div>
    ))
  )}
</div>;
    </div>
  );
};

export default Serachpage;