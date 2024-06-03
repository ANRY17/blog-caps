'use client';
import { useState, useEffect } from 'react';

function ProfilePage() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUserInfo(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserInfo = async (token) => {
    try {
      const response = await fetch('http://localhost:1337/api/users/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const userData = await response.json();
        setUserInfo(userData);
      } else {
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading user info...</p>;
  }

  if (!userInfo) {
    return <p>Please log in to see your profile.</p>;
  }

  return (
    <div>
      <h1>Welcome, {userInfo.username}</h1>
      <p>Email: {userInfo.email}</p>
    </div>
  );
}

export default ProfilePage;
