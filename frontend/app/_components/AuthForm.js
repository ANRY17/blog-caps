'use client';
import React, { useState } from 'react';

const AuthForm = ({ isLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const endpoint = isLogin ? '/api/auth/local' : '/api/auth/local/register';
    const body = isLogin
      ? { identifier: email, password }
      : { username, email, password };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}${endpoint}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error.message || 'An error occurred');
        return;
      }

      const data = await response.json();
      if (data.jwt) {
        localStorage.setItem('token', data.jwt);
        localStorage.setItem(
          'user',
          JSON.stringify({
            username: data.user.username,
            email: data.user.email,
          })
        );
        window.location.href = '/profile';
      } else {
        setError('An error occurred');
      }
    } catch (err) {
      setError('An error occurred');
      console.error('Error:', err);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-4">
        {isLogin ? 'Login' : 'Register'}
      </h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 p-2 border border-gray-300 rounded-md w-full"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        )}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default AuthForm;
