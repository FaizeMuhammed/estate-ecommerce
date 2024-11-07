"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { allPlots } from "../features/dataSlice";
import { filterProduct } from "../features/dataSlice";
import {
  chatCollections,
  wishlistdata,
  membershipPlans,
} from "../features/dataSlice";
import NProgress from "nprogress";
import "nprogress/nprogress.css";


export default function Header() {
  const router = useRouter();
  const products = useSelector((state) => state.globalValues.allProducts);
  const [searchTerm, setSearchTerm] = useState("");
   const dispatch = useDispatch();

   useEffect(() => {
    const fetchData = async () => {
      try {
       const data = await axios.get('api/Products')
       dispatch(allPlots(data.data.plots))
       dispatch(filterProduct(data.data.plots))
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);


  const handleInputChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
  
    // If the search input is empty, dispatch all products (reset to original data)
    if (searchTerm === "") {
       dispatch(filterProduct(products)); // Fetch and dispatch the full product list from the API
    } else {
      // Otherwise, filter the products based on the search term
      const filteredProducts = products.filter(product =>
        product.title.toLowerCase().includes(searchTerm) ||
        product.location.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
      );
      dispatch(filterProduct(filteredProducts)); // Dispatch action to set filtered products
    }
  };
  




  const profile = async () => {
    NProgress.start();
    try {
      router.push("/profile");
    } 
    catch{
      console.log('error while navigating to profile')
    } finally {
      NProgress.done();
    }
  };
  const wishlist = async () => {
    NProgress.start();
    try {
      const list = await axios.get("api/wishlist");
      dispatch(wishlistdata(list.data.productsWithImages));
      router.push("/wishlist");
    } catch (error) {
      console.log(error);
    } finally {
      NProgress.done();
    }
  };

  const premium = async () => {
    NProgress.start();
    try {
      router.push("/subscriptions");
      const result = await axios.get("api/membership");
      dispatch(membershipPlans(result.data.cards));
    } catch (error) {
      console.log(error);
    } finally {
      NProgress.done();
    }
  };
  const home = async () => {
    NProgress.start();
    try {
      router.push("/homePage");
    } catch (error) {
      console.log("error while switching page", error);
    }
    NProgress.done();
  };
  const message = async () => {
    NProgress.start();
    try {
      const result = await axios.get("api/chat", {
        params: {
          method: "involvedChats",
        },
      });
      router.push("/messages");
      console.log(result.data.name, '')
      dispatch(chatCollections(result.data.name));
    } catch (error) {
      console.log("error while getting involved chats", error);
    } finally {
      NProgress.done();
    }
  };

  return (
    <div className="sticky z-10 w-full bg-[white]  top-0 border-b-2 py-3">
      <div className="flex p-3 justify-around w-full items-center  border-b-black">
        <div>
          <h1 className="text-5xl font-bold text-blue-500">Buyitt!</h1>
        </div>
        
<div
  class="p-5 overflow-hidden w-[60px] h-[60px] hover:w-[270px] bg-[#4070f4] shadow-[2px_2px_20px_rgba(0,0,0,0.08)] rounded-full flex group items-center hover:duration-300 duration-300"
>
  <div class="flex items-center justify-center fill-white">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      id="Isolation_Mode"
      data-name="Isolation Mode"
      viewBox="0 0 24 24"
      width="22"
      height="22"
    >
      <path
        d="M18.9,16.776A10.539,10.539,0,1,0,16.776,18.9l5.1,5.1L24,21.88ZM10.5,18A7.5,7.5,0,1,1,18,10.5,7.507,7.507,0,0,1,10.5,18Z"
      ></path>
    </svg>
  </div>
  <input
    type="text"
    class="outline-none text-[20px] bg-transparent w-full text-white font-normal px-4"
    placeholder="Search"
            value={searchTerm}
            onChange={handleInputChange}
  />
</div>

        
        <ul className="flex space-x-[60px] navbar font-bold">
          <li >
<button
  class="relative py-2 px-8 text-blue-500 text-base font-bold nded-full overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out  hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
  onClick={home}
>
  Home
</button>
</li>
          <li>
<button
  class="relative py-2 px-8 text-blue-500 text-base font-bold nded-full overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out  hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
>
  About
</button>
</li>
          <li>
<button
  class="relative py-2 px-8 text-blue-500 text-base font-bold nded-full overflow-hidden bg-white rounded-full transition-all duration-400 ease-in-out  hover:scale-105 hover:text-white hover:shadow-lg active:scale-90 before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-blue-500 before:to-blue-300 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-full hover:before:left-0"
>
  Contact
</button>
</li>
        </ul>
         
<button
  class="invert hover:rotate-2 brightness-150 dark:brightness-100 group hover:shadow-lg hover:shadow-yellow-700/60 transition ease-in-out hover:scale-105 p-1 rounded-2xl bg-gradient-to-br from-yellow-800 via-yellow-600 to-yellow-800 hover:from-yellow-700 hover:via-yellow-800 hover:to-yellow-600"
  onClick={premium}
>
  <div
    class="px-6 py-2 backdrop-blur-xl bg-black/80 rounded-xl font-semibold w-full h-full"
  >
    <div
      class="group-hover:scale-100 flex group-hover:text-yellow-500 text-yellow-600 gap-1"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.8"
        class="w-6 h-6 stroke-yellow-600 group-hover:stroke-yellow-500 group-hover:stroke-{1.99}"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
        ></path>
      </svg>
      Premium
    </div>
  </div>
</button>

        <i
          onClick={wishlist}
          className="text-blue-400 text-2xl fa-solid fa-heart hover:text-3x1"
        ></i>
       
        <i
          onClick={message}
          className="text-blue-400 text-2xl fa-solid fa-message hover:text-3x1"
        ></i>
         <i
          onClick={profile}
          className="text-blue-500 text-3xl fa-solid fa-user p-2 border border-blue-400"
        ></i>
      </div>
    </div>
  );
}
