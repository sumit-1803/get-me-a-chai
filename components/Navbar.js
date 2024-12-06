"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dashboard, Delete, DeleteForever, Logout, Man } from "@mui/icons-material";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const pathname = usePathname(); // Get current pathname

  // Function to check token
  const checkToken = () => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // If token exists, set to true
  };

  useEffect(() => {
    // Initial token check
    checkToken();

    // Listen to changes in localStorage for token updates
    const handleStorageChange = () => {
      checkToken();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleSignOut = () => {
    // Clear token and refresh
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    window.location.href = "/"; // Redirect to home after logout
  };

  return (
    <nav className="bg-indigo-800 z-50 fixed top-0 w-full text-white flex justify-between px-4 h-16 items-center">
      {/* Logo Section */}
      <div>
        <Link className="logo font-bold text-lg flex justify-center items-center" href="/">
          <img
            src="https://media2.giphy.com/media/KanTM1jNrX7TgQ2d4X/giphy.gif?cid=6c09b952pfgv0n376m7hxzqa4tayg0xkrdk8zgwa1ad4unxp&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"
            width={50}
            alt="DevSponsor Logo"
          />
          <span className="ml-2">DevSponsor</span>
        </Link>
      </div>

      {/* Right Side Section */}
      <div className="relative">
        {isAuthenticated ? (
          // Render Dropdown for authenticated users
          <>
            <button
              onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
              onClick={() => setShowDropdown(!showDropdown)}
              id="dropdownDefaultButton"
              className="text-white mx-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              type="button"
            >
              Hello, User
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <div
              id="dropdown"
              className={`z-10 ${showDropdown ? "" : "hidden"} bg-white animate-fadeIn divide-y mt-4 absolute divide-gray-100 rounded-lg shadow w-44`}
            >
              <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
                <li>
                  <Link href="/dashboard" className=" px-4 py-2 hover:bg-gray-200 transition-colors duration-300 rounded-md flex items-center">
                    <Dashboard className="-ml-1.5 mr-2.5" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className=" px-4 py-2 hover:bg-gray-200 transition-colors duration-300 rounded-md flex items-center">
                    <Man className="-ml-1.5 mr-2.5" />
                    Your Profile
                  </Link>
                </li>
                <li>
                  <button
                    className=" px-4 py-2 hover:bg-gray-200 transition-colors duration-300 w-full text-left rounded-md flex items-center"
                    onClick={handleSignOut}
                  >
                    <Logout className="me-2" />
                    Sign out
                  </button>
                </li>
              </ul>

            </div>
          </>
        ) : (
          // Render Login Button for unauthenticated users
          pathname !== "/login" && (
            <Link href="/login">
              <button className="relative mt-2 inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none">
                <span className="relative px-2.5 py-2 text-white transition-all ease-in duration-75 bg-[#3730a3] rounded-md group-hover:bg-opacity-0">
                  Login
                </span>
              </button>
            </Link>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;
