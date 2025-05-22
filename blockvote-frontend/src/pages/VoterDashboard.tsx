// src/pages/VoterDashboard.tsx
import React, { useState, useEffect } from 'react';
import PollCard from '../components/PollCard';
import VoterModal from '../components/VoterModal';
import { getPoll } from '../utils/canister';

interface VoterDashboardProps {
  setUserRole: (role: string | null) => void;
}

const VoterDashboard: React.FC<VoterDashboardProps> = ({ setUserRole }) => {
  const [voterId, setVoterId] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [polls, setPolls] = useState<any[]>([]);
  const [selectedPoll, setSelectedPoll] = useState<any | null>(null);

  const handleAuth = () => {
    if (voterId) setAuthenticated(true); // Placeholder; add real auth later
  };

  useEffect(() => {
    if (authenticated) {
      const fetchPolls = async () => {
        // Fetch polls (mocked for now; replace with canister calls)
        const pollPromises = [0, 1].map((id) => getPoll(id)); // Example poll IDs
        const results = await Promise.all(pollPromises);
        setPolls(results.map((r) => r.ok).filter(Boolean));
      };
      fetchPolls();
    }
  }, [authenticated]);

  if (!authenticated) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl mb-4">Voter Login</h1>
        <input
          type="text"
          value={voterId}
          onChange={(e) => setVoterId(e.target.value)}
          placeholder="Enter Voter ID"
          className="p-2 border rounded mb-4"
        />
        <button
          onClick={handleAuth}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Authenticate
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl mb-4">Welcome, {voterId}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {polls.map((poll) => (
          <PollCard
            key={poll.id}
            poll={{
              id: poll.id,
              name: poll.name,
              status: Date.now() < poll.startTime ? 'Upcoming' : Date.now() > poll.endTime ? 'Closed' : 'Active',
              totalVotes: poll.totalVotes,
              onVote: () => setSelectedPoll(poll),
            }}
          />
        ))}
      </div>
      {selectedPoll && (
        <VoterModal
          pollId={selectedPoll.id}
          candidates={selectedPoll.candidates}
          voterId={voterId}
          onClose={() => setSelectedPoll(null)}
          onVoteSuccess={() => {
            setPolls(polls.map((p) => p.id === selectedPoll.id ? { ...p, totalVotes: p.totalVotes + 1 } : p));
          }}
        />
      )}
    </div>
  );
};

export default VoterDashboard;