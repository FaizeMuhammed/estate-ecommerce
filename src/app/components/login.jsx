"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../features/dataSlice";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { userList } from "../features/dataSlice";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [logDetails, setLogDetails] = useState({
    password: "",
    email: "",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const register = () => {
    NProgress.start();
    try {
      router.push("/register");
    } catch (error) {
      console.log("error while redirecting to register page", error);
    } finally {
      NProgress.done();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLogDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    NProgress.start();
    try {
      const submitLog = await axios.post("/api/login", logDetails);
      if (submitLog.status === 200) {
        try {
          const checkAuth = await axios.get("/api/isAuth");
          if (checkAuth.status === 200) {
            if (submitLog.data.role === "admin") {
              router.push("/adminPanel");
              const response = await axios.get("api/adminData");
              dispatch(userList(response.data.data));
            } else {
              dispatch(loginSuccess());
              router.push("/homePage");
            }
          } else {
            setErrorMessage(checkAuth.data.message || "Authentication failed");
            setShowPopup(true);
          }
        } catch (error) {
          setErrorMessage(error.response?.data.message || error.message);
          setShowPopup(true);
        }
      } else {
        setErrorMessage(submitLog.data.message || "Login failed");
        setShowPopup(true);
      }
    } catch (error) {
      setErrorMessage(error.response?.data.message || error.message);
      setShowPopup(true);
    } finally {
      NProgress.done();
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Login Form */}
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-cyan-500 mb-2">Buyitt!</h1>
            <h2 className="text-2xl font-semibold text-gray-700">Welcome Back..!</h2>
          </div>

          <div className="space-y-4">
            <div>
              <input
                type="text"
                name="email"
                placeholder=" Email"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="password"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-gray-200 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-300 transition duration-200"
            >
              LOGIN
            </button>

            <div className="text-center">
              <span className="text-gray-600">Create an Account </span>
              <button onClick={register} className="text-cyan-500 hover:underline">Register</button>
            </div>

            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-gray-300 w-full"></div>
              
              <div className="border-t border-gray-300 w-full"></div>
            </div>

            <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-50">
              <svg className="w-5 h-5" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
              </svg>
              <span>Google</span>
            </button>

            <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-3 rounded-lg hover:bg-gray-50">
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Facebook</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:block w-1/2 bg-cyan-100 relative">
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="text-white max-w-lg">
           
            {/* Add your image here */}
            <img 
              src="/architecture-5729165_640.jpg"
              alt="Travel"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Error Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Login Failed</h2>
            <p className="text-gray-600">{errorMessage}</p>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 bg-cyan-500 text-white py-2 px-4 rounded-lg hover:bg-cyan-600 transition duration-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}