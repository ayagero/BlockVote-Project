// src/pages/PublicPolls.tsx
import React, { useState, useEffect } from 'react';
import PollCard from '../components/PollCard';
import { getPoll, getResults } from '../utils/canister';

const PublicPolls: React.FC = () => {
  const [polls, setPolls] = useState<any[]>([]);
  const [selectedPollId, setSelectedPollId] = useState<number | null>(null);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    const fetchPolls = async () => {
      const pollPromises = [0, 1].map((id) => getPoll(id)); // Example IDs
      const results = await Promise.all(pollPromises);
      setPolls(results.map((r) => r.ok).filter(Boolean));
    };
    fetchPolls();
  }, []);

  const handleViewResults = async (pollId: number) => {
    setSelectedPollId(pollId);
    const result = await getResults(pollId);
    if (result.ok) setResults(result.ok);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl mb-4">Public Polls</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {polls.map((poll) => (
          <PollCard
            key={poll.id}
            poll={{
              id: poll.id,
              name: poll.name,
              status: Date.now() < poll.startTime ? 'Upcoming' : Date.now() > poll.endTime ? 'Closed' : 'Active',
              totalVotes: poll.totalVotes,
              onViewResults: () => handleViewResults(poll.id),
            }}
          />
        ))}
      </div>
      {selectedPollId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <h2 className="text-xl mb-4">Results for Poll #{selectedPollId}</h2>
            {results.map(([candidate, votes]) => (
              <p key={candidate}>{candidate}: {votes}</p>
            ))}
            <button
              onClick={() => setSelectedPollId(null)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PublicPolls;