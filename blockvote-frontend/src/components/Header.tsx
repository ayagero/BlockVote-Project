// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  userRole: string | null;
  setUserRole: (role: string | null) => void;
}

const Header: React.FC<HeaderProps> = ({ userRole, setUserRole }) => {
  return (
    <header className="bg-white shadow py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-blue-600 text-2xl font-semibold">BlockVote</Link>
        <nav className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
          <Link to="/polls" className="text-gray-700 hover:text-blue-600">Polls</Link>
          <Link to="/about" className="text-gray-700 hover:text-blue-600">About</Link>
          {userRole ? (
            <button
              onClick={() => setUserRole(null)}
              className="text-gray-700 hover:text-blue-600"
            >
              Logout
            </button>
          ) : (
            <>
              <Link to="/admin" className="text-gray-700 hover:text-blue-600">Admin Login</Link>
              <Link to="/voter" className="text-gray-700 hover:text-blue-600">Voter Login</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;