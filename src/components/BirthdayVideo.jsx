import React from "react";
import { Link } from "react-router-dom";
import videoFile from "../assets/0128.mp4";
console.log("Path to video file:", videoFile);
const BirthdayVideo = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white">
      <video
        className="w-full max-w-2xl rounded-lg shadow-lg"
        controls
        autoPlay
      >
        <source src={videoFile} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <Link
        to="/cake"
        className="mt-6 flex items-center gap-2 px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-700 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </Link>
    </div>
  );
};

export default BirthdayVideo;
