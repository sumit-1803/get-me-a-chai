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
    <div className='container mx-auto py-5'></div>
    <h1 className='text-center my-5 text-3xl font-bold'>
      Welcome to Your DashBoard ! 
    </h1>

    <form className='max-w-2xl mx-auto'>
        <div className='my-2'>
            <label htmlFor='name' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white '>Name</label>

            <input 
            type='text'></input>
        </div>
    </form>
  </>;
};

export default Dashboard;
