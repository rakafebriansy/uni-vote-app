import { Candidate } from "../types";

export interface IElectionCreateRequest {
    title: string,
    candidates: Candidate[],
    expiresAt: string
}

export interface IVoteCreateRequest {
    nim: string,
    candidateNim: string
}