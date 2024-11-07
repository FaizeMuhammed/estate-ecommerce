"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { authUser } from "../features/dataSlice";
import NProgress from "nprogress";

export default function RegisterCard() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [otpField, setOtpField] = useState(false);
  const [details, setDetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const login = () => {
    NProgress.start();
    try {
      router.push("/");
    } catch (error) {
      console.log("error while redirecting to login page", error);
    } finally {
      NProgress.done();
    }
  };

  const registerUser = async () => {
    setOtpField(!otpField);
    const regist = await axios.post("api/register", {
      action: "register",
      details,
    });
    console.log(regist);
  };

  const verify = async () => {
    const checkOtp = await axios.post("api/register", {
      action: "verify",
      details,
      enteredOtp: otp,
    });
    if (checkOtp.status === 200) {
      router.push("homePage");
    }
    console.log(checkOtp, "user added successfully");
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Register Form */}
      <div className="w-full md:w-1/2 p-8 flex flex-col justify-center items-center bg-white">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-cyan-500 mb-2">Buyitt!</h1>
            <h2 className="text-2xl font-semibold text-gray-700">Welcome..!</h2>
          </div>

          <div className="space-y-4">
            <div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            {otpField && (
              <div className="animate-fadeIn">
                <input
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
                <p className="text-sm text-gray-600 mt-2">
                  Please enter the OTP sent to your email
                </p>
              </div>
            )}

            {!otpField ? (
              <button
                onClick={registerUser}
                className="w-full bg-cyan-500 text-white py-3 rounded-lg font-semibold hover:bg-cyan-600 transition duration-200"
              >
                Register
              </button>
            ) : (
              <button
                onClick={verify}
                className="w-full bg-cyan-500 text-white py-3 rounded-lg font-semibold hover:bg-cyan-600 transition duration-200"
              >
                Verify OTP
              </button>
            )}

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

            <div className="text-center mt-6">
              <p className="text-gray-600">
                Already have an account?{" "}
                <button
                  onClick={login}
                  className="text-cyan-500 hover:text-cyan-600 font-semibold hover:underline"
                >
                  Login here
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Image and Text */}
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
    </div>
  );
}