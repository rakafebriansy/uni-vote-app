import { IElectionDoc } from '../models/election.model';
import { IElectionResource } from '../resources/election.resource';

export function serializeElection(election: IElectionDoc): IElectionResource {
    return {
        id: String(election._id),
        title: election.title,
        candidates: election.candidates,
        expiresAt: election.expiresAt,
    };
}

export function serializeElectionList(elections: IElectionDoc[]): IElectionResource[] {
    return elections.map(serializeElection);
}
