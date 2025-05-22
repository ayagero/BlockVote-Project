// src/pages/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-blue-100 p-8 rounded-lg text-center mb-8">
        <h1 className="text-3xl font-semibold mb-4">Secure. Transparent. Decentralized Voting.</h1>
        <Link to="/polls" className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600">
          View Active Polls
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl mb-2">For Admins</h2>
          <p>Manage elections securely.</p>
          <Link to="/admin" className="text-blue-500 hover:underline">Login</Link>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl mb-2">For Voters</h2>
          <p>Cast your vote with confidence.</p>
          <Link to="/voter" className="text-blue-500 hover:underline">Login</Link>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl mb-2">For Everyone</h2>
          <p>See real-time results.</p>
          <Link to="/polls" className="text-blue-500 hover:underline">View Polls</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;