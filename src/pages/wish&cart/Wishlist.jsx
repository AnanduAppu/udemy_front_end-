import React from "react";

import Clintcontex from "../../createContex/Createcontex";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

function Wishlist() {
  const { WishData, userData } = useContext(Clintcontex);

  const removeItem = async (e, id) => {
    e.preventDefault();
    try {
      const courseId = id;
      console.log(courseId, userData);

      const backendResponse = await axios.post(
        "http://localhost:4001/user/wishItemRemove",
        {
          courseId,
          userData,
        }
      );
    
      if (backendResponse.data && backendResponse.data.successful) {
        alert(backendResponse.data.message);
        window.location.reload();
      } else {
        toast.error("Failed remove from cart. Please try again.");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container px-14 mt-8">
      <table className="table w-full">
        <thead>
          <tr>
            <th className="text-left px-4 py-2 font-medium text-gray-500 uppercase tracking-wider">
              Product
            </th>
            <th className="text-right px-4 py-2 font-medium text-gray-500 uppercase tracking-wider">
              Price
            </th>
            <th className="text-right px-4 py-2 font-medium text-gray-500 uppercase tracking-wider"></th>
            <th className="text-right px-4 py-2 font-medium text-gray-500 uppercase tracking-wider"></th>
          </tr>
        </thead>
        <tbody>
          {WishData.map((cart, ind) => (
            <tr key={ind}>
              <td className="border px-4 py-2 text-left ">
                
                <a
                  href="#"
                  className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 mx-auto"
                >
                  <img
                    className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                    src={cart.thumbnail}
                    alt=""
                  />
                  <div className="flex flex-col justify-between p-4 leading-normal">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {cart.title}
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {cart.description}
                    </p>
                  </div>
                </a>
              </td>
              <td className="border px-4 py-2 text-right font-bold "><span className="mt-10">₹{cart.price}</span> </td>
              <td className="border px-4 py-2 text-right">
                <button className="bg-slate-800 hover:bg-slate-950 text-white font-bold py-2 px-4 rounded mt-10">
                  ADD TO CART
                </button>
              </td>
              <td className="border px-4 py-2 text-right">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-10"
                  onClick={(e) => removeItem(e, cart._id)}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Wishlist;
