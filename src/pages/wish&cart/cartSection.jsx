import Clintcontex from "../../createContex/Createcontex";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

const CartSection = () => {
  const { cartData, userData } = useContext(Clintcontex);

  const [totalPrice, setTotalPrice] = useState(0);

  const total = cartData.reduce((acc, cart) => acc + parseFloat(cart.price), 0).toFixed(2);

  // Update the total price in the state

  useEffect(() => {
    setTotalPrice(total);
  }, [cartData]);

  // remove item from cart

  const removeItem = async (e, id) => {
    e.preventDefault();
    try {
      const courseId = id;
      console.log(courseId, userData);

      const backendResponse = await axios.post(
        "http://localhost:4001/user/cartItemRemove",
        {
          courseId,
          userData,
        }
      );
      window.location.reload();
      if (backendResponse.data && backendResponse.data.successful) {
        toast.success(backendResponse.data.message);
      } else {
        toast.error("Failed remove from cart. Please try again.");
      }
    } catch (error) {
      console.log(error);
    }
  };


// payment section start here 

  const paymentprocess = async (e) => {
    e.preventDefault();
    try {
      const backendResponse = await axios.post(
        "http://localhost:4001/user/payment",
        { amount: total, userData }
      );
  
      if (backendResponse.data) {

        alert(backendResponse.data.message);
        console.log(backendResponse.data.Data);
        handlePayment(backendResponse.data.Data)
      } else {
        toast.error("Failed remove from cart. Please try again.");
      }
    } catch (error) {
      console.log(error); // Log the error here
    }
  };


  const handlePayment = async (data) => {
    try {
      var options = {
        key: "rzp_test_TOl1X0iGsXscGp",
        amount: total,
        currency: "INR",
        name: "udemy",
        description: cartData.description,
        image: "https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg",
        order_id: data,
        handler: function (response) {
          // Define an async function to handle the async operation
          async function handleResponse(response) {
            console.log("hello");
            if (response.razorpay_payment_id) {
              try {
                const backendResponse = await axios.post(
                  "http://localhost:4001/user/ordered",
                  { userData }
                );
                if (backendResponse.data.successful) {
                  alert("Your order was successful");
                  window.location.reload()
                } else {
                  alert("Failed to remove from cart. Please try again.");
                }
                alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
              } catch (error) {
                
                alert("An error occurred while processing the payment");
              }
            } else {
              alert("Payment failed!");
            }
          }
  
          // Call the async function immediately
          handleResponse(response);
        },
        theme: {
          color: "#3399cc",
        },
      };
  
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while processing the payment");
    }
  };


  // payment section end  here 
  return (
    <section className="py-24 bg-gray-100 font-poppins dark:bg-gray-700">
      <div className="px-4 py-6 mx-auto max-w-7xl lg:py-4 md:px-6">
        <div>
          <h2 className="mb-8 text-4xl font-bold dark:text-gray-400">
            Your Cart
          </h2>
        <div className="flex">
          <div className="p-6 mb-8 border bg-gray-50 dark:bg-gray-800 dark:border-gray-80 w-[60%] overflow: auto">
            {/* Cart Items */}
            {cartData.map((cart, ind) => (
              <div
                href="#"
                className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 my-2"
                >
                <img
                  className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                  src={cart.thumbnail}
                 
                  alt=""
                />
                <div className="flex flex-col justify-between p-3 leading-normal w-96">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {cart.title}
                  </h5>
                 
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {cart.description}
                  </p>
                  <div className="flex justify-between"> <p>Price:{cart.price} </p>   
                   <a
                    href=""
                    className="text-end hover:text-red-500"
                    onClick={(e) => removeItem(e, cart._id)}
                  >
                    remove
                  </a></div>
                 
              
                </div>
              </div>
            ))}

            {/* ... (Place your cart items code here) */}
          
          </div>
        <div className="w-[40%]">
          <div className="w-full px-4 mb-4">
              <div className="p-6 border border-blue-100 dark:bg-gray-900 dark:border-gray-900 bg-gray-50 md:p-8">
                <h2 className="mb-8 text-3xl font-bold text-gray-700 dark:text-gray-400">
                  Order Summary
                </h2>

                <div className="flex items-center justify-between pb-4 mb-4">
                  <span className="text-gray-700 dark:text-gray-400">
                    Shipping
                  </span>
                  <span className="text-xl font-bold text-gray-700 dark:text-gray-400">
                    Free
                  </span>
                </div>
                <div className="flex items-center justify-between pb-4 mb-4">
                  <span className="text-gray-700 dark:text-gray-400">
                    Order Total
                  </span>
                  <span className="text-xl font-bold text-gray-700 dark:text-gray-400">
                    {totalPrice}
                  </span>
                </div>
                <h2 className="text-lg text-gray-500 dark:text-gray-400">
                  We offer:
                </h2>
                <div className="flex items-center gap-2 mb-4 ">
                  <a href="#">
                    <img
                      src="https://i.postimg.cc/g22HQhX0/70599-visa-curved-icon.png"
                      alt=""
                      className="object-cover h-16 w-26"
                    />
                  </a>
                  <a href="#">
                    <img
                      src="https://i.postimg.cc/HW38JkkG/38602-mastercard-curved-icon.png"
                      alt=""
                      className="object-cover h-16 w-26"
                    />
                  </a>
                  <a href="#">
                    <img
                      src="https://i.postimg.cc/HL57j0V3/38605-paypal-straight-icon.png"
                      alt=""
                      className="object-cover h-16 w-26"
                    />
                  </a>
                </div>
                <div className="flex items-center justify-between">
                  <button className="block w-full py-4 font-bold text-center text-gray-100 uppercase bg-blue-500 rounded-md hover:bg-blue-600"
                  onClick={(e)=>paymentprocess(e)}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
          <div className="flex flex-wrap justify-between">
            {/* Coupon Section */}
            <div className="w-full px-4 mb-4 lg:w-1/2 ">
              <div className="flex flex-wrap items-center gap-4">
                <span className="text-gray-700 dark:text-gray-400">
                  Apply Coupon
                </span>
                <input
                  type="text"
                  className="w-full px-8 py-4 font-normal placeholder-gray-400 border lg:flex-1 dark:border-gray-700 dark:placeholder-gray-500 dark:text-gray-400 dark:bg-gray-800"
                  placeholder="x304k45"
                  required
                />
                <button className="inline-block w-full px-8 py-4 font-bold text-center text-gray-100 bg-blue-500 rounded-md lg:w-32 hover:bg-blue-600">
                  Apply
                </button>
              </div>
            </div>
            {/* Order Summary Section */}
       
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartSection;
