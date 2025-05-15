import { IElectionDoc } from "../models/election.model";
import { Candidate } from "../types";

export class IElectionResource {
    id: string;
    title: string;
    candidates: Candidate[];
    expiresAt: Date;

    constructor(id: string, title: string, candidates: Candidate[], expiresAt: Date) {
        this.id = id;
        this.title = title;
        this.candidates = candidates;
        this.expiresAt = expiresAt;
    }

    static serializeElection(election: IElectionDoc): IElectionResource {
        return {
            id: String(election._id),
            title: election.title,
            candidates: election.candidates,
            expiresAt: election.expiresAt,
        };
    }

    static serializeElectionList(elections: IElectionDoc[]): IElectionResource[] {
        return elections.map(this.serializeElection);
    }

}