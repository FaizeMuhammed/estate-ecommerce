"use client";
import React from "react";
import { useState } from "react";
import Script from "next/script";
import axios from "axios";
import { useSelector } from "react-redux";

export default function Cards() {
  const plans = useSelector((state) => state.globalValues.membership);

  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async (price, name, duration) => {
    
    setIsProcessing(true);
    try {
      // console.log(price, name, duration)
      const response = await axios.post("/api/payment");
      const data = await response.data;
      const options = {
        key: "rzp_test_ZKcJLyt29WoYex",
        amount: price * 100,
        currency: "INR",
        name: "realestate",
        description: "test transaction",
        order_id: data.orderId,
        handler: async function (handlerResponse) {
          try {
            const updateResponse = await axios.put("/api/payment", {
              duration: duration,
              name: name
              });
            console.log("User updated successfully", updateResponse.data);
          } catch (error) {
            console.error("Failed to update user", error);
          }
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.log("payment failed", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      disabled={isProcessing}
      className="flex justify-around m-7 bg-white p-10 r-x-[20px] text-white "
    >
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      {plans.map((element, index) => (
        <div
          onClick={() =>
            handlePayment(element.price, element.name, element.duration)
          }
          className="plans flex flex-col gap-[40px] p-7 max-w-[350px] rounded-tr-2xl rounded-br-2xl"
          key={index}
        >
          <div>
            <h3>{element.duration} days</h3>
          </div>
          <div className="flex flex-col gap-[40px] justify-center">
            <div className="flex justify-around">
              <i className=" text-green-400 text-[80px] fa-solid fa-circle-dollar-to-slot"></i>
            </div>
            <h1 className="text-2xl flex text-center">
              One week premium membership
            </h1>
            <ul className="flex flex-col m-auto text-center">
              <li>Unlimited uploads</li>
              <li>25% More reach</li>
              <li>Lorem Ipsum is simply</li>
              <li>Printing and typesetting</li>
            </ul>
            <div className="flex justify-center">
              <p className="max-w-[250px] flex text-center">
                {element.discription}
              </p>
            </div>
            <div>
              <h1 className="text-2xl">{element.price}$</h1>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
