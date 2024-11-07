"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { viewDetails } from "../features/dataSlice";
import Skelton from "./skeltonLoading";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { Heart, MapPin, ExternalLink } from 'lucide-react';

export default function Listing() {
  const dispatch = useDispatch();
  const router = useRouter();
  // const { products, status, error } = useSelector((state) => state.products);
   const products = useSelector((state) => state.globalValues.filteredProducts)  || [];

  // const products = useSelector((state) => state.globalValues.filteredProduct) || [];

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //      const data = await axios.get('api/Products')
  //      console.log(data.data.plots, 'kkkkkkkkkkkkkkkkkkklllllllllll')
  //      dispatch(allPlots(data.data.plots))
  //       await dispatch(getProducts()).unwrap();
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };

  //   fetchData();
  // }, [dispatch]);

  const moreDetails = async (details) => {
    NProgress.start();
    try {
      dispatch(viewDetails(details));
      router.push(`/productDetails`);
    } catch (error) {
      console.log(error, "error while loading product details");
    } finally {
      NProgress.done();
    }
  };

  if (status === "loading") {
    NProgress.start();
    return (
      <div>
        <Skelton />
      </div>
    );
  }

  if (status === "failed") {
    NProgress.done();
    return <div>Error loading products. Please try again later.</div>;
  }
  NProgress.done();
  return (
    <div className="container m-auto font-sans pt-5 flex justify-center flex-col bg-blue-100">
      <div>
        <h1 className="text-3xl p-5 pb-10 text-blue-400 font-bold">Explore</h1>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((details, index) => (
        <div
          key={index}
          className="group relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
          onClick={() => moreDetails(details)}
        >
          {/* Image Container */}
          <div className="relative h-48 overflow-hidden">
            <img 
              src={details.imageUrl} 
              alt={details.title}
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Favorite Button */}
            <button className="absolute top-3 right-3 p-2 bg-white/90 rounded-full shadow-md transform transition-all duration-300 hover:scale-110 hover:bg-red-50">
              <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 transition-colors" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            {/* Title */}
            <h3 className="font-semibold text-lg text-blue-400 transition-colors group-hover:text-blue-600">
              {details.title.length > 12 
                ? details.title.slice(0, 15) + "..."
                : details.title}
            </h3>

            {/* Location */}
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <p className="text-sm">
                {details.location.length > 15
                  ? details.location.slice(0, 15) + "..."
                  : details.location}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between">
              <p className="text-xl font-bold text-blue-600">
                {details.price}
              </p>
              <button className="p-2 rounded-lg bg-blue-50 text-blue-600 transform transition-all duration-300 hover:bg-blue-100 hover:scale-105">
                <ExternalLink className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Overlay for click feedback */}
          <div className="absolute inset-0 bg-white/0 transition-colors duration-300 group-active:bg-black/5" />
        </div>
      ))}
    </div>
      </div>
    </div>
  );
}
