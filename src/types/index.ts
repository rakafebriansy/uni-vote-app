export interface Candidate {
  name: string;
  nim: string;
  votes?: Vote[]

}

export interface UserJwtPayload {
  id: string;
  nim: string;
  name: string;
  role: string;
}

export interface Vote {
  nim: string;
}