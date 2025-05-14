export interface IUserRegisterRequest {
    nim: string;
    name: string;
    password: string;
    role: string;
}

export interface IUserLoginRequest {
    nim: string;
    password: string;
}