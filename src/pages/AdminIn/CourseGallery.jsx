import React, { useState, useContext } from 'react';
import Clintcontex from '../../createContex/Createcontex';

function CourseGallery() {
  const { DataStatus, setDataStatus } = useContext(Clintcontex);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

 console.log(DataStatus) 

  const handleSaveForm = (e) => {
    e.preventDefault();
    // Add your logic here to save the edited course data
    // For example, you can update the course data in the context or make an API request to update the data
    // After saving, close the form
    setIsFormOpen(false);
  };

  return (
    <>
      {/* Pop-up window for editing course */}
      <div
        id="authPopup"
        className={`fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50 ${
          isFormOpen ? '' : 'hidden'
        }`}
      >
        <form className="max-w-sm mx-auto border border-black rounded-lg p-6 my-40 w-96 bg-white">
          <h1 className="my-2">Edit Course</h1>
          <div className="mb-5">
            <label htmlFor="base-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Title
            </label>
            <input
              type="text"
              id="base-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          

          <div className="mb-5">
            <label htmlFor="large-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Description
            </label>
            <input
              type="text"
              id="large-input"
              className="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="small-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Price
            </label>
            <input
              type="number"
              id="small-input"
              className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="flex justify-between py-7">
            <button className="py-2 px-4 bg-red-500 rounded-lg font-bold text-white hover:bg-red-700" onClick={() => setIsFormOpen(false)}>
              Cancel
            </button>
            <button className="py-2 px-4 bg-green-500 rounded-lg font-bold text-white hover:bg-green-700" onClick={(e) => handleSaveForm(e)}>
              Save
            </button>
          </div>
        </form>
      </div>

      {/* Course gallery */}
      <div className="rounded-lg border h-[85vh] text-card-foreground shadow-sm w-full max-w-6xl mx-auto my-2 overflow-auto p-3">
        {/* Render course cards */}
        {DataStatus.CourseData.map((ele, ind) => (
          <div className="rounded-lg text-card-foreground shadow-sm border border-black" data-v0-t="card" key={ind}>
            <div className="px-2 pt-5 flex items-start gap-2">
              <img src={ele.thumbnail} alt="Product Image" width="120" height="120" className="aspect-square object-cover border border-gray-200 dark:border-gray-800" />
              <div className="grid gap-1.5">
                <div className="font-semibold text-lg sm:text-xl">{ele.title}</div>
                <p className="text-sm md:text-base leading-6">{ele.description}</p>
                <div className="font-semibold text-lg sm:text-xl">{ele.price}</div>
              </div>
              <button className="px-4 py-2 rounded-lg font-bold bg-purple-600 hover:bg-purple-500">View</button>
              <button className="inline-flex px-4 py-2 rounded-lg font-bold bg-blue-400 hover:bg-purple-500" onClick={() => setIsFormOpen(true)}>
                Edit
              </button>
              <button className="inline-flex px-4 py-2 rounded-lg font-bold bg-red-500 hover:bg-red-900 hover:text-white duration-30050">Delete</button>
            </div>
            <div className="items-center pb-6 pr-4 flex justify-end"></div>
          </div>
        ))}
      </div>
    </>
  );
}

export default CourseGallery;
