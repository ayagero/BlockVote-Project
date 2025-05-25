// src/components/PollCard.tsx
import React from 'react';

interface PollCardProps {
  poll: { id: number; name: string; status: string; totalVotes: number; onViewResults?: () => void; onVote?: () => void };
}

const PollCard: React.FC<PollCardProps> = ({ poll }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">{poll.name}</h3>
      <p>Status: {poll.status}</p>
      <p>Total Votes: {poll.totalVotes}</p>
      <div className="mt-2 space-x-2">
        {poll.onViewResults && (
          <button
            onClick={poll.onViewResults}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            View Results
          </button>
        )}
        {poll.onVote && (
          <button
            onClick={poll.onVote}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Vote Now
          </button>
        )}
      </div>
    </div>
  );
};

export default PollCard;