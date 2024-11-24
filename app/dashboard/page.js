"use client";
import { getSession } from 'next-auth/react';
import React, { useState , useEffect } from 'react';

const Dashboard = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    profilePicture: '',
    coverPicture: '',
    razorpayId: '',
    razorpaySecret: ''
  });

// Fetch existing data when the component mounts
useEffect(() => {
  const fetchData = async () => {
    const session = await getSession();
    if (!session) {
      alert('You need to log in first.');
      return;
    }

    const userId = session.user.id;

    // GET request to fetch existing dashboard data
    const response = await fetch(`/api/dashboard?userId=${userId}`);
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
}, []); // Empty dependency array ensures this runs only once on component mount


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
    const session = await getSession();
    if (!session) {
      alert('You need to log in first.');
      return;
    }

    const userId = session.user.id;

    // POST request to save dashboard details
    const response = await fetch('/api/dashboard', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...formData,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      alert('Details saved successfully');
    } else {
      alert(result.message || 'Error saving details');
    }
  };


  return (
    <div className="container mx-auto py-5">
      <h1 className="text-center my-5 text-3xl font-bold">Welcome to Your Dashboard!</h1>

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
            value={formData.email}
            onChange={handleInputChange}
            className="block w-full px-3 py-2 text-gray-900 bg-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="my-2">
          <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleInputChange}
            className="block w-full px-3 py-2 text-gray-900 bg-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="my-2">
          <label htmlFor="profilePicture" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Profile Picture</label>
          <input
            type="text"
            id="profilePicture"
            value={formData.profilePicture}
            onChange={handleInputChange}
            className="block w-full px-3 py-2 text-gray-900 bg-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
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
          <button type="submit" className="block w-full px-3 py-2 text-white bg-blue-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">Save</button>
        </div>
      </form>
    </div>
  );
};

export default Dashboard;
