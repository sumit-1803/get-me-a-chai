"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dashboard, Logout, Man, Delete } from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import jwt from "jsonwebtoken";
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [userResults, setUserResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  const checkToken = () => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  };

  useEffect(() => {
    checkToken();
    const handleStorageChange = () => {
      checkToken();
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Handle search input change with debounce
  useEffect(() => {
    const timeoutId = setTimeout(async () => {
      if (searchQuery.trim()) {
        setIsLoading(true);
        try {
          const response = await fetch(`/api/users?search=${searchQuery}`);
          const data = await response.json();
          setUserResults(data.users || []);
        } catch (error) {
          console.error("Error fetching user data:", error);
          toast.error("Error fetching users");
        } finally {
          setIsLoading(false);
        }
      } else {
        setUserResults([]); // Clear results when search is empty
      }
    }, 500); // Delay the API call by 500ms

    return () => clearTimeout(timeoutId); // Cleanup timeout on change
  }, [searchQuery]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  const handleDeleteUser = async () => {
    const token = localStorage.getItem("token");
    let email = "";

    if (token) {
      try {
        const decoded = jwt.decode(token);
        if (decoded && decoded.email) {
          email = decoded.email;
        }
      } catch (error) {
        console.error("Error deleting user token not decoded properly:", error);
        return toast.error("Server error");
      }
    }

    if (!email) {
      return toast.error("No email found in the token");
    }

    // Now that email is available, make the API call to delete the user
    const response = await fetch('/api/auth/signup', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const result = await response.json();

    if (response.ok) {
      toast.success(`User ${email} deleted successfully`);
      // Sign out the user after deleting the account
      handleSignOut();
      // Delete token from local storage
      localStorage.removeItem("token");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <nav className="bg-indigo-800 z-50 fixed top-0 w-full text-white flex justify-between px-4 h-16 items-center">
      <div className="flex items-center">
        <Link className="logo font-bold text-lg flex justify-center items-center" href="/">
          <img
            src="https://media2.giphy.com/media/KanTM1jNrX7TgQ2d4X/giphy.gif?cid=6c09b952pfgv0n376m7hxzqa4tayg0xkrdk8zgwa1ad4unxp&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=s"
            width={50}
            alt="DevSponsor Logo"
          />
          <span className="ml-2 text-sm sm:text-base md:text-lg">Devo<span className="text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-blue-500">Sponsor</span></span>
        </Link>
      </div>

      <div className="flex items-center justify-end space-x-4">
        {/* Search Input Section */}
        <div className="relative hidden sm:block">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 w-32 sm:w-56 md:w-64 rounded-lg bg-white text-gray-800 text-xs sm:text-sm"
          />
          {userResults.length > 0 && (
            <div className="absolute left-0 mt-2 w-full bg-white shadow-lg rounded-lg max-h-60 overflow-auto z-10">
              <ul>
                {userResults.map((user) => (
                  <li key={user.id}>
                    <Link
                      href={`/${user.username}`}
                      className="block px-4 py-2 hover:bg-gray-200 transition-colors duration-300 rounded-md"
                      onClick={() => setSearchQuery("")}
                    >
                      <span className="text-black">{user.username}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Authentication & Dropdown */}
        <div className="relative right-0 flex-shrink-0 items-center space-x-4">
          {isAuthenticated ? (
            <>
              <button
                onClick={() => setShowDropdown((prev) => !prev)}
                id="dropdownDefaultButton"
                className="text-white mx-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                type="button"
              >
                Hello, User
                <svg
                  className={`w-2.5 h-2.5 ms-3 transition-transform duration-300 ${showDropdown ? "rotate-180" : "rotate-0"}`}
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
                className={`z-10 ${showDropdown ? "" : "hidden"} bg-white animate-fadeIn divide-y mt-4 absolute divide-gray-100 rounded-lg shadow w-44 right-2`}
              >
                <ul className="text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
                  <li>
                    <Link
                      href="/dashboard"
                      className="px-4 py-2 hover:bg-gray-200 transition-colors duration-300 rounded-md flex items-center"
                      onClick={() => setShowDropdown(false)}
                    >
                      <Dashboard className="-ml-1.5 mr-2.5" />
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/profile"
                      className="px-4 py-2 hover:bg-gray-200 transition-colors duration-300 rounded-md flex items-center"
                      onClick={() => setShowDropdown(false)}
                    >
                      <Man className="-ml-1.5 mr-2.5" />
                      Your Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      className="px-4 py-2 hover:bg-gray-200 transition-colors duration-300 w-full text-left rounded-md flex items-center"
                      onClick={() => {
                        handleSignOut();
                        setShowDropdown(false);
                      }}
                    >
                      <Logout className="me-2" />
                      Sign out
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={handleDeleteUser}
                      className="px-4 py-2 text-red-600 hover:bg-red-500 hover:text-white transition-colors duration-300 w-full text-left rounded-md flex items-center"
                    >
                      <Delete className="mr-2" />
                      Delete Account
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
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
      </div>
    </nav>
  );

};

export default Navbar;
