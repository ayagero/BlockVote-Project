// src/pages/AdminDashboard.tsx
import React, { useState } from 'react';
import { createPoll, registerVoter } from '../utils/canister';

interface AdminDashboardProps {
  setUserRole: (role: string | null) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ setUserRole }) => {
  const [pollName, setPollName] = useState('');
  const [candidates, setCandidates] = useState<string[]>(['']);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [voterId, setVoterId] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const handleCreatePoll = async () => {
    const start = new Date(startTime).getTime() * 1000000; // Convert to nanoseconds
    const end = new Date(endTime).getTime() * 1000000;
    const result = await createPoll(pollName, candidates, start, end);
    setMessage(result.ok ? `Poll #${result.ok} created` : result.err);
  };

  const handleRegisterVoter = async () => {
    const result = await registerVoter(voterId);
    setMessage(result.ok ? 'Voter registered' : result.err);
    setVoterId('');
  };

  return (
    <div className="container mx-auto px-4 py-8 flex">
      <aside className="w-1/4 bg-gray-100 p-4 rounded-lg">
        <nav className="space-y-2">
          <button className="block w-full text-left py-2 px-4 hover:bg-gray-200">Dashboard</button>
          <button className="block w-full text-left py-2 px-4 hover:bg-gray-200">Create Poll</button>
          <button className="block w-full text-left py-2 px-4 hover:bg-gray-200">Manage Voters</button>
          <button onClick={() => setUserRole(null)} class_fields="block w-full text-left py-2 px-4 hover:bg-gray-200">Logout</button>
        </nav>
      </aside>
      <main className="w-3/4 pl-8">
        <h1 className="text-2xl mb-4">Admin Dashboard</h1>
        {message && <p className="mb-4">{message}</p>}
        <div className="mb-8">
          <h2 className="text-xl mb-2">Create Poll</h2>
          <input
            type="text"
            value={pollName}
            onChange={(e) => setPollName(e.target.value)}
            placeholder="Poll Name"
            className="w-full p-2 mb-2 border rounded"
          />
          {candidates.map((cand, idx) => (
            <div key={idx} className="flex mb-2">
              <input
                type="text"
                value={cand}
                onChange={(e) => {
                  const newCandidates = [...candidates];
                  newCandidates[idx] = e.target.value;
                  setCandidates(newCandidates);
                }}
                placeholder="Candidate"
                className="w-full p-2 border rounded"
              />
              <button
                onClick={() => setCandidates(candidates.filter((_, i) => i !== idx))}
                className="ml-2 px-2 bg-red-500 text-white rounded"
              >
                -
              </button>
            </div>
          ))}
          <button
            onClick={() => setCandidates([...candidates, ''])}
            className="mb-2 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Candidate
          </button>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <input
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="w-full p-2 mb-2 border rounded"
          />
          <button
            onClick={handleCreatePoll}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Create Poll
          </button>
        </div>
        <div>
          <h2 className="text-xl mb-2">Register Voter</h2>
          <input
            type="text"
            value={voterId}
            onChange={(e) => setVoterId(e.target.value)}
            placeholder="Voter ID"
            className="w-full p-2 mb-2 border rounded"
          />
          <button
            onClick={handleRegisterVoter}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Voter
          </button>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;