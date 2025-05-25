// src/utils/canister.ts
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory } from '../../../declarations/blockvote-backend';
import { canisterId } from '../../declarations/blockvote-backend'; // auto-generated

const isLocal = process.env.DFX_NETWORK === 'local';
const agent = new HttpAgent({ host: isLocal ? 'http://localhost:8000' : 'https://ic0.app' });

if (isLocal) {
  // Needed for local development to trust self-signed certs
  agent.fetchRootKey().catch(err => {
    console.warn('Could not fetch root key. Is the local replica running?\n', err);
  });
}

const actor = Actor.createActor(idlFactory, { agent, canisterId });

export async function createPoll(
  name: string,
  candidates: string[],
  startTime: bigint,
  endTime: bigint
): Promise<{ ok?: number; err?: string }> {
  try {
    const result = await actor.createPoll(name, candidates, startTime, endTime);
    if ('Ok' in result) return { ok: Number(result.Ok) };
    return { err: result.Err };
  } catch (e) {
    return { err: 'Failed to create poll' };
  }
}

export async function registerVoter(voterId: string): Promise<{ ok?: null; err?: string }> {
  try {
    const result = await actor.registerVoter(voterId);
    if ('Ok' in result) return { ok: null };
    return { err: result.Err };
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
    const result = await actor.castVote(BigInt(pollId), voterId, candidate);
    if ('Ok' in result) return { ok: null };
    return { err: result.Err };
  } catch (e) {
    return { err: 'Failed to cast vote' };
  }
}

export async function getPoll(pollId: number): Promise<{ ok?: any; err?: string }> {
  try {
    const result = await actor.getPoll(BigInt(pollId));
    if ('Ok' in result) return { ok: result.Ok };
    return { err: result.Err };
  } catch (e) {
    return { err: 'Failed to fetch poll' };
  }
}

export async function getResults(pollId: number): Promise<{ ok?: [string, number][]; err?: string }> {
  try {
    const result = await actor.getResults(BigInt(pollId));
    if ('Ok' in result) {
      return { ok: result.Ok.map(([cand, votes]: [string, bigint]) => [cand, Number(votes)]) };
    }
    return { err: result.Err };
  } catch (e) {
    return { err: 'Failed to fetch results' };
  }
}
