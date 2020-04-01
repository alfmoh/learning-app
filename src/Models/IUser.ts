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
