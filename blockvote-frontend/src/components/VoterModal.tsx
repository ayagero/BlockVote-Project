// src/components/VoterModal.tsx
import React, { useState } from 'react';
import { castVote } from '../utils/canister';

interface VoterModalProps {
  pollId: number;
  candidates: string[];
  voterId: string;
  onClose: () => void;
  onVoteSuccess: () => void;
}

const VoterModal: React.FC<VoterModalProps> = ({ pollId, candidates, voterId, onClose, onVoteSuccess }) => {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVote = async () => {
    if (!selectedCandidate) return;
    setLoading(true);
    try {
      const result = await castVote(pollId, voterId, selectedCandidate);
      if (result.ok) {
        onVoteSuccess();
        onClose();
      } else {
        setError(result.err);
      }
    } catch (e) {
      setError('Failed to cast vote');
    }
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl mb-4">Cast Your Vote</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {candidates.map((candidate) => (
          <label key={candidate} className="block mb-2">
            <input
              type="radio"
              name="candidate"
              value={candidate}
              onChange={() => setSelectedCandidate(candidate)}
              className="mr-2"
            />
            {candidate}
          </label>
        ))}
        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button
            onClick={handleVote}
            disabled={loading || !selectedCandidate}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
          >
            {loading ? 'Submitting...' : 'Submit Vote'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VoterModal;