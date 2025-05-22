// src/utils/canister.ts
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from './blockvote.did'; // Generate this from Motoko canister

const agent = new HttpAgent({ host: 'http://localhost:8000' }); // Update to mainnet later
const canisterId = 'ryjl3-tyaaa-aaaaa-aaaba-cai'; // Replace with your deployed canister ID
const actor = Actor.createActor(idlFactory, { agent, canisterId });

export async function createPoll(
  name: string,
  candidates: string[],
  startTime: bigint,
  endTime: bigint
): Promise<{ ok?: number; err?: string }> {
  try {
    const result = await actor.createPoll(name, candidates, startTime, endTime);
    return result.Ok ? { ok: Number(result.Ok) } : { err: result.Err };
  } catch (e) {
    return { err: 'Failed to create poll' };
  }
}

export async function registerVoter(voterId: string): Promise<{ ok?: null; err?: string }> {
  try {
    const result = await actor.registerVoter(voterId);
    return result.Ok ? { ok: null } : { err: result.Err };
  } catch (e) {
    return { err: 'Failed to register voter' };
  }
}

export async function castVote(
  pollId: number,
  voterId: string,
  candidate: string
): Promise<{ ok?: null; err?: string }> {
  try {
    const result = await actor.castVote(pollId, voterId, candidate);
    return result.Ok ? { ok: null } : { err: result.Err };
  } catch (e) {
    return { err: 'Failed to cast vote' };
  }
}

export async function getPoll(pollId: number): Promise<{ ok?: any; err?: string }> {
  try {
    const result = await actor.getPoll(pollId);
    return result.Ok ? { ok: result.Ok } : { err: result.Err };
  } catch (e) {
    return { err: 'Failed to fetch poll' };
  }
}

export async function getResults(pollId: number): Promise<{ ok?: [string, number][]; err?: string }> {
  try {
    const result = await actor.getResults(pollId);
    return result.Ok ? { ok: result.Ok.map(([cand, votes]) => [cand, Number(votes)]) } : { err: result.Err };
  } catch (e) {
    return { err: 'Failed to fetch results' };
  }
}