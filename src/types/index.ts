export interface Candidate {
  name: string;
  nim: string;
}

export interface UserJwtPayload {
    id: string;
    nim: string;
    name: string;
    role: string;
}