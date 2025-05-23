import React from "react";
import { Link } from "react-router-dom";

const Header = ({ userRole, setUserRole }) => {
  return (
    <header className="bg-white shadow py-4">
      <div className="container mx-auto flex justify-between items-center px-4">
        <h1 className="text-2xl font-bold">BlockVote</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-blue-500 hover:underline">Home</Link>
            </li>
            <li>
              <Link to="/vote" className="text-blue-500 hover:underline">Vote</Link>
            </li>
            {userRole === "admin" && (
              <li>
                <Link to="/admin" className="text-blue-500 hover:underline">Admin</Link>
              </li>
            )}
          </ul>
        </nav>
        <div>
          <select
            value={userRole}
            onChange={(e) => setUserRole(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="voter">Voter</option>
            <option value="admin">Admin</option>
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;