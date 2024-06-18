'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import Link from 'next/link';
import logoLight from '@/public/logoLight.png';
import 'react-loading-skeleton/dist/skeleton.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
    setLoading(false);
  }, []);

  return (
    <header
      className={`flex justify-between items-center p-4 w-full fixed top-0 left-0 z-20 transition-all duration-300 ${
        isScrolled
          ? 'bg-gray-800 text-white shadow-md'
          : 'bg-black bg-opacity-50 text-white'
      }`}
    >
      <nav className="flex justify-between items-center w-full px-8 text-lg">
        <div className="text-2xl font-bold">
          <Image
            src={logoLight}
            width={100}
            height={100}
            quality={60}
            alt="logo"
          />
        </div>
        <ul
          className={`hidden md:flex space-x-8 ${
            isScrolled ? 'text-white' : 'text-white'
          }`}
        >
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link href="/blog" className="hover:underline">
              Blogs
            </Link>
          </li>
          <li>
            <Link href="/tags" className="hover:underline">
              Tags
            </Link>
          </li>
          <li>
            <Link href="/search" className="hover:underline">
              Search
            </Link>
          </li>
        </ul>
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>

        {/* Profile/Login Button */}
        <div className="hidden md:block">
          {loading ? (
            <Skeleton
              width={80}
              height={40}
              baseColor="rgba(255, 255, 255, 0.2)"
              highlightColor="rgba(255, 255, 255, 0.5)"
            />
          ) : isLoggedIn ? (
            <Link href="/profile">
              <button
                className={`px-4 py-2 rounded text-white ${
                  isScrolled ? 'bg-blue-600' : 'bg-gray-800'
                }`}
              >
                Profile
              </button>
            </Link>
          ) : (
            <Link href="/login">
              <button
                className={`px-4 py-2 rounded text-white ${
                  isScrolled ? 'bg-blue-600' : 'bg-gray-800'
                }`}
              >
                Login
              </button>
            </Link>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <ul className="absolute top-16 right-4 bg-gray-800 text-white flex flex-col items-center md:hidden p-4 space-y-2 rounded-lg shadow-lg">
          <li>
            <a href="/home" className="hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="#blog" className="hover:underline">
              Blogs
            </a>
          </li>
          <li>
            <a href="#about" className="hover:underline">
              Tags
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:underline">
              Search
            </a>
          </li>
          <li>
            {loading ? (
              <Skeleton
                width={80}
                height={40}
                baseColor="rgba(255, 255, 255, 0.2)"
                highlightColor="rgba(255, 255, 255, 0.5)"
              />
            ) : isLoggedIn ? (
              <Link href="/profile">
                <button className="px-4 py-2 bg-blue-600 rounded">
                  Profile
                </button>
              </Link>
            ) : (
              <Link href="/login">
                <button className="px-4 py-2 bg-blue-600 rounded">Login</button>
              </Link>
            )}
          </li>
        </ul>
      )}
    </header>
  );
}
