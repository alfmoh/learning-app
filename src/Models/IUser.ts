export interface IUser {
    userName: string;
    email: string;
    password: string;
}

export class User implements IUser {
    userName: string;
    email: string;
    password: string;
}

export class LoginUser {
    nameid: number;
    given_name: string;
    email: string;
    nbf: number;
    exp: number;
    iat: number;
}