"use client";
import React, { useEffect, useState } from 'react';
import PaymentPage from '../../components/PaymentPage';
import jwt from 'jsonwebtoken';

const Username = () => {
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        // Step 1: Get the token from localStorage
        const token = localStorage.getItem('token');

        if (!token) {
          throw new Error('Token is missing');
        }

        // Step 2: Decode the token to get the user's email
        const decoded = jwt.decode(token); // jwt.decode does not verify, just decodes
        const userEmail = decoded?.email;

        if (!userEmail) {
          throw new Error('Email not found in token');
        }

        // Step 3: Fetch the username from the dashboard API route
        const response = await fetch('/api/dashboard', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Pass the token for auth
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch username');
        }

        const data = await response.json();

        // Extract the username from the data
        setUsername(data.username);
        setIsLoading(false); // Set loading to false after successful fetch
      } catch (error) {
        console.error(error);
        setError(error.message);
        setIsLoading(false); // Set loading to false even on error
      }
    };

    fetchUsername();
  }, []); // Empty dependency array means it will run once when the component mounts

  // Show loading state
  if (isLoading) {
    return <center className='flex my-[40%] mx-[50%]'>Loading...</center>;
  }

  // Show error if any occurred
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render PaymentPage when username is successfully fetched
  return <PaymentPage username={username} />;
};

export default Username;
