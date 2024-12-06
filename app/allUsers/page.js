"use client"

import { useEffect, useState } from 'react';
import Link from 'next/link';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    // Fetch all users from your API
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/allUsers');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false); // Set loading to false once data is fetched
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="p-4">
        <h1 className="text-3xl font-semibold text-center mb-6">All Users</h1>
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500 border-solid"></div>
        </div>
        <p className="text-center mt-4">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="grid mt-8 grid-cols-3 gap-4">
        {users.length === 0 ? (
          <p>No users found</p>
        ) : (
          users.map((user) => (
            <Link key={user._id} href={`/users/${user.username}`}>
              <div className="animate-fadeIn border bg-[#2a2a3a] p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between h-full">
                <img
                  src={user.profilePicture || '/default-profile.jpg'}
                  alt={user.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h2 className="text-xl font-semibold text-center">{user.name}</h2>
                <p className="text-center text-sm">{user.email}</p>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default AllUsers;
