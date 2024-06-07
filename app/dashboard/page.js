"use client"
import React from 'react';

import { getSession } from 'next-auth/react'; // Import getSession directly
import { useLastNavigation } from 'next/navigation'; // Import useLastNavigation for client-side navigation


const Dashboard = () => {
  const checkSessionAndNavigate = async () => {
    const { data: session } = await getSession(); // Use getSession directly to check the session status
    const navigation = useLastNavigation(); // Client-side navigation

    if (!session) {
      // If there is no session, redirect to the login page
      navigation.navigate("/login");
    } else {
      // If there is a session, redirect to the dashboard page
      navigation.navigate("/dashboard");
    }
  };



  React.useEffect(() => {
    checkSessionAndNavigate(); // Call the function to check the session and navigate
  }, []); // Pass an empty dependency array to ensure this effect only runs once after component mount

  // Return null during the initial render to avoid rendering anything on the server





  return <>

  {/* Make a form here with input feilds as Name , email ,username , profile pitchure , cover pitchure ,  razorpay id , razorpay secret and a save button */}
    <div className='container mx-auto py-5'>
    <h1 className='text-center my-5 text-3xl font-bold'>
      Welcome to Your Dashboard!
    </h1>

    <form className='max-w-2xl mx-auto'>
        <div className='my-2'>
            <label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Name</label>
            <input type='text' id='name' className='block w-full px-3 py-2 text-gray-900 bg-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'/>
        </div>
        <div className='my-2'>
            <label htmlFor='email' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email</label>
            <input type='email' id='email' className='block w-full px-3 py-2 text-gray-900 bg-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'/>
        </div>
        <div className='my-2'>
            <label htmlFor='username' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Username</label>
            <input type='text' id='username' className='block w-full px-3 py-2 text-gray-900 bg-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'/>
        </div>
        <div className='my-2'>
            <label htmlFor='profile-pitchure' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Profile Picture</label>
            <input type='text' id='profile-pitchure' className='block w-full px-3 py-2 text-gray-900 bg-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'/>
        </div>
        <div className='my-2'>
            <label htmlFor='cover-pitchure' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Cover Picture</label>
            <input type='text' id='cover-pitchure' className='block w-full px-3 py-2 text-gray-900 bg-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'/>
        </div>
        <div className='my-2'>
            <label htmlFor='razorpay-id' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Razorpay ID</label>
            <input type='text' id='razorpay-id' className='block w-full px-3 py-2 text-gray-900 bg-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'/>
        </div>
        <div className='my-2'>
            <label htmlFor='razorpay-secret' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Razorpay Secret</label>
            <input type='text' id='razorpay-secret' className='block w-full px-3 py-2 text-gray-900 bg-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'/>
        </div>
        <div className='my-2'>
            <button type='submit' className='block w-full px-3 py-2 text-white bg-blue-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50'>Save</button>
        </div>
    </form>
</div>

  </>;
};

export default Dashboard;
