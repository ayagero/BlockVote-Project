import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to BlockVote</h1>
      <p className="mb-4">Secure and transparent voting on the blockchain.</p>
      <Link
        to="/vote"
        aria-label="Start Voting"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      > Start Voting
      </Link>
    </main>
  );
};

export default Home;
