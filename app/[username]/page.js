"use server"
import React from 'react';

import PaymentPage from '../../components/PaymentPage';
import { notFound } from 'next/navigation';
import connectDB from '../db/connectDB';
import User from '../models/User';

const Username = async ({ params }) => {
  const { username } = params; // Destructure params correctly

  console.log(`Checking user: ${username}`);

  try {
    // Ensure the database connection is successful
    await connectDB();

    // Query the database to find the user
    const user = await User.findOne({ username });

    // If user does not exist, return a 404
    if (!user) {
      console.log("User not found.");
      return notFound();
    }

    console.log("User found:", user);

    // Render the PaymentPage with the username prop
    return <PaymentPage username={username} />;
  } catch (error) {
    console.error("Error fetching user:", error);
    return notFound();
  }
};

export default Username;
