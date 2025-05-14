import { Candidate } from "../types";

export interface IElectionResource {
    id: string;
    title: string;
    candidates: Candidate[];
    expiresAt: Date;
}