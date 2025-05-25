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

const VoterModal: React.FC<VoterModalProps> = ({
  pollId,
  candidates,
  voterId,
  onClose,
  onVoteSuccess
}) => {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVote = async () => {
    if (!selectedCandidate) return;
    setLoading(true);
    setError(null); // clear old errors

    try {
      const result = await castVote(pollId, voterId, selectedCandidate);

      if ('ok' in result) {
        onVoteSuccess();
        onClose();
      } else {
        setError(result.err?.toString() ?? 'Unknown error');
      }
    } catch (e) {
      setError('Failed to cast vote');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Cast Your Vote</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="space-y-2">
          {candidates.map((candidate) => (
            <label key={candidate} className="block">
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
        </div>

        <div className="mt-6 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
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
