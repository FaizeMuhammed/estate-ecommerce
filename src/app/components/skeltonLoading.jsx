import React from "react";

export default function Skelton() {
  return (
    <div className="h-[100vh] bg-gray-200 flex justify-center items-center">
      <div className="w-[600px] space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-[50px] h-[50px] bg-gray-300 rounded-full animate-pulse"></div>
          <div className="h-[20px] bg-gray-300 rounded-full w-3/4 animate-pulse"></div>
        </div>

        <div className="space-y-4">
          <div className="flex space-x-4">
            <div className="w-[50px] h-[50px] bg-gray-300 rounded-full animate-pulse"></div>
            <div className="flex-1 space-y-2">
              <div className="h-[20px] bg-gray-300 rounded-lg animate-pulse w-1/2"></div>
              <div className="h-[20px] bg-gray-300 rounded-lg animate-pulse w-3/4"></div>
            </div>
          </div>
          <div className="flex space-x-4 justify-end">
            <div className="flex-1 space-y-2">
              <div className="h-[20px] bg-gray-300 rounded-lg animate-pulse w-3/4"></div>
              <div className="h-[20px] bg-gray-300 rounded-lg animate-pulse w-1/2"></div>
            </div>
            <div className="w-[50px] h-[50px] bg-gray-300 rounded-full animate-pulse"></div>
          </div>
        </div>

        <div className="flex justify-center mt-6">
          <div className="w-[400px] h-[50px] bg-gray-300 rounded-full animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
