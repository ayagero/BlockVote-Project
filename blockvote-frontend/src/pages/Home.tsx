import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-4">Welcome to BlockVote</h2>
      <p className="mb-4">Secure and transparent voting on the blockchain.</p>
      <Link to="/vote" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Start Voting
      </Link>
    </div>
  );
};

export default Home;