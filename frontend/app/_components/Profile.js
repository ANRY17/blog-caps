'use client';
import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  return (
    <div className="container mx-auto py-6">
      {user ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">Profile</h1>
          <p>
            <strong>Username:</strong> {user.username}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <button
            onClick={handleLogout}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      ) : (
        <div>
          <p>Please log in to view your profile.</p>
          <p>
            Dont have an account?{' '}
            <a href="/register" className="text-blue-500">
              Register
            </a>
          </p>
          <p>
            Already have an account?{' '}
            <a href="/login" className="text-blue-500">
              Login
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
