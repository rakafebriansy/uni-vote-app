export interface IElectionCreateRequest {
    title: string,
    candidates: Candidate[],
    expiresAt: string
}