"use client";
import React, { useState, useEffect } from 'react';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { toast, ToastContainer } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling

const Dashboard = () => {
  const [showTooltip, setShowTooltip] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    profilePicture: '',
    coverPicture: '',
    razorpayId: '',
    razorpaySecret: '',
    uploadProfile: null
  });

  // Fetch existing data when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        alert('You need to log in first.');
        return;
      }

      const response = await fetch('/api/dashboard', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();

      if (response.ok) {
        setFormData({
          name: data.name || '',
          email: data.email || '',
          username: data.username || '',
          profilePicture: data.profilePicture || '',
          coverPicture: data.coverPicture || '',
          razorpayId: data.razorpayId || '',
          razorpaySecret: data.razorpaySecret || ''
        });
      } else {
        alert(data.message || 'Error fetching dashboard details');
      }
    };

    fetchData();
  }, []);

  // Update form state when input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value
    }));
  };

  // Handle form submission
  const handleSave = async (e) => {
    e.preventDefault();

    // Get the JWT token from localStorage or cookies
    const token = localStorage.getItem('token');  // Or from cookies: document.cookie

    if (!token) {
      alert('You need to log in first.');
      return;
    }

    // POST request to save dashboard details
    const response = await fetch('/api/dashboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...formData,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      // Display a toast notification
      toast.success('Details saved successfully');
    } else {
      alert(result.message || 'Error saving details');
    }
  };



  return (
    <div className="animate-fadeIn container mx-auto py-5">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-center my-5 text-3xl font-bold">Welcome to your Dashboard</h1>
        <p className="text-center text-white">Fill the mandatory fields to start your Profile</p>
      </div>

      <form className="max-w-2xl mx-auto" onSubmit={handleSave}>
        <div className="my-2">
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleInputChange}
            className="block w-full px-3 py-2 text-gray-900 bg-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="my-2">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
          <input
            type="email"
            id="email"
            disabled={true}
            value={formData.email}
            onChange={handleInputChange}
            className="block w-full px-3 py-2 text-gray-900 bg-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="my-2">
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"> Username <span className='text-red-700'>*</span></label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleInputChange}
            className="block w-full px-3 py-2 text-gray-900 bg-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        {/* Profile Picture Section with Link or File Upload */}
        <div className="my-4 relative animate-fadeIn">
          <label
            htmlFor="profilePicture"
            className=" mb-2 text-sm font-medium text-gray-900 dark:text-white flex items-center"
          >
            Profile Picture
            <button
              type="button"
              className="ml-2 animate-fadeIn text-gray-500 hover:text-gray-700"
              onClick={() => setShowTooltip(!showTooltip)} // Toggle tooltip on click
            >
              <InfoOutlinedIcon fontSize="small" />
            </button>
          </label>

          {/* Tooltip */}
          {showTooltip && (
            <div
              className="absolute animate-fadeIn mt-2 p-3 text-sm text-white bg-gray-800 rounded-lg shadow-lg w-64 z-10"
              onMouseLeave={() => setShowTooltip(false)} // Hide tooltip on mouse leave
            >
              <p>
                Paste an image URL to upload your profile picture.
              </p>
              <button
                className="mt-2 px-2 py-1 bg-indigo-500 hover:bg-indigo-600 rounded text-white text-xs"
                onClick={() => setShowTooltip(false)}
              >
                Got it!
              </button>
            </div>
          )}
          <div className="flex items-center space-x-4">
            {/* URL Input */}
            <input
              type="text"
              id="profilePicture"
              value={formData.profilePicture}
              onChange={handleInputChange}
              placeholder="Enter image URL"
              className="block w-2/3 px-3 py-2 text-gray-900 bg-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <span className="text-sm font-medium text-gray-600">OR</span>
            {/* Disabled File Input with Overlay */}
            <div className="relative w-full sm:w-1/3">
              <input
                type="file"
                accept="image/*"
                disabled
                className="block w-full h-full px-3 py-2 text-gray-400 bg-gray-200 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm cursor-not-allowed"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-70 rounded-md">
                <span className="text-gray-500 text-xs sm:text-sm font-semibold">
                  Coming Soon
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="my-2">
          <label htmlFor="coverPicture" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover Picture</label>
          <input
            type="text"
            id="coverPicture"
            value={formData.coverPicture}
            onChange={handleInputChange}
            className="block w-full px-3 py-2 text-gray-900 bg-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>


        <div className="my-2">
          <label htmlFor="razorpayId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay ID</label>
          <input
            type="text"
            id="razorpayId"
            value={formData.razorpayId}
            onChange={handleInputChange}
            className="block w-full px-3 py-2 text-gray-900 bg-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="my-2">
          <label htmlFor="razorpaySecret" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Razorpay Secret</label>
          <input
            type="text"
            id="razorpaySecret"
            value={formData.razorpaySecret}
            onChange={handleInputChange}
            className="block w-full px-3 py-2 text-gray-900 bg-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="my-2">
          <button type="submit" className="block w-full px-3 py-2 text-white bg-[#3730a3] mt-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">Save</button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Dashboard;
