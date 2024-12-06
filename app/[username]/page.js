'use client';

import React from 'react';
import PaymentPage from '../../components/PaymentPage';  // Adjust the path as needed

const UserProfilePage = ({ params }) => {
  const { username } = React.use(params) ;  // Directly access the 'username' from URL params

  return <PaymentPage username={username} />;
};

export default UserProfilePage;
