// components/Navigation.js
'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="text-white">
            Home
          </Link>
        </li>
        <li>
          <Link href="/blog" className="text-white">
            Blog
          </Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <Link href="/profile" className="text-white">
                Profile
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  localStorage.removeItem('token');
                  window.location.href = '/login';
                }}
                className="text-white"
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/login" className="text-white">
                Login
              </Link>
            </li>
            <li>
              <Link href="/register" className="text-white">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
