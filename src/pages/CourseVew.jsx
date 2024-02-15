import { useState, useContext } from "react";
import Clintcontex from "../createContex/Createcontex";
const CourseView = () => {
  const { courseView, setCourseView } = useContext(Clintcontex);

  console.log(courseView);


  if (!courseView) {
    return (
      <div className="container mx-auto">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="relative m-2 mx-4 h-56 w-auto border border-black bg-slate-700">
        <div className="ml-16 w-[60%] bg-slate-700 h-32 mt-14">
          <hr className="bg-black " />
          <h1 className="text-4xl mx-8 text-white mb-3 mt-3">{courseView.title}</h1>
          <hr className="bg-black " />
        </div>
      </div>

      <div className="flex mb-8">
        <div className="relative z-10 ml-4 w-[70%] border border-black h-[48vh] px-8 shadow-x2">
          <p className="my-2 ">
            <span className="font-bold">Description:-{courseView.description}</span>
            <span className="mx-2"> </span>
          </p>
          <p className="my-2 ">
            <span className="font-bold">Category:-{courseView.category}</span>
            <span className="mx-2"> </span>
          </p>
          <p className="my-2 ">
            <span className="font-bold">Author:-{courseView.name}</span>
            <span className="mx-2"> </span>
          </p>

          <div className="mt-8 border border-black block">
            <h1 className="font-bold mx-5 text-2xl">Reviews</h1>
            <div className="block mx-2 my-2 p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <h5 className="mb-2  font-bold tracking-tight text-gray-900 dark:text-white">
                Noteworthy technology acquisitions 2021
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order
              </p>
            </div>
            <div className="block mx-2 my-2 p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <h5 className="mb-2  font-bold tracking-tight text-gray-900 dark:text-white">
                Noteworthy technology acquisitions 2021
              </h5>
              <p className="font-normal text-gray-700 dark:text-gray-400">
                Here are the biggest enterprise technology acquisitions of 2021
                so far, in reverse chronological order
              </p>
            </div>
          </div>
        </div>

        <div className="absolute right-14 top-10 z-20 w-[20%] mt-20 mb-10">
          <div className="max-w-sm rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800">
            <a href="#">
              <img
                className="rounded-t-lg w-96"
                src={courseView.thumbnail}
                alt=""
              />
            </a>
            <div className="p-5 h-96">
              <a href="#">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Price:{courseView.price}
                </h5>
              </a>
              <button className="py-2 px-16 border border-black block my-3 mx-auto text-center text-white font-bold bg-purple-500 hover:bg-purple-800">
                Buy Now
              </button>

              <hr className="my-2 border border-slate-400 w-60 mx-auto" />

              <input
                type="text"
                className="mt-2 ml-4 border border-black rounded-md"
              />
              <a
                href="#"
                className="inline-flex items-center ml-4 rounded-lg bg-blue-700 px-3 py-2 my-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Apply Coupen
                <svg
                  className="ms-2 h-3.5 w-3.5 rtl:rotate-180"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseView;
