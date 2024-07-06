import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link to="/" className="hover:text-red-400">Juridex</Link>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link to="/login" className="hover:text-red-400">Login</Link>
          <Link to="/dashboard" className="hover:text-red-400">Dashboard</Link>
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-gray-700">
          <Link to="/login" className="block px-4 py-2 hover:bg-gray-600">Login</Link>
          <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-600">Dashboard</Link>
        </div>
      )}
    </nav>
  );
}

export default Header;
