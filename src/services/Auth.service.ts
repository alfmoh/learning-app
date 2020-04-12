import { WebService } from './Web.service';
import { User, LoginUser } from '../models/IUser';
import jwt_decode from 'jwt-decode';
export class AuthService extends WebService<User> {
    URL = 'auth';
    loginUser: LoginUser;
    constructor() {
        super();
        this.loginUser = this.getUser(this.getToken());
    }
    login(data: User) {
        return this.post<any>(data, 'login').then(({ data }) => {
            return this.loginSuccess(data);
        });
    }

    register(data: User) {
        return this.post<any>(data, 'register').then(({ data }) => {
            return this.loginSuccess(data);
        });
    }

    logout() {
        localStorage.removeItem('token');
        this.loginUser = null;
    }

    isLoggedIn() {
        const user = this.getUser(this.getToken());
        return Date.now() <= user?.exp * 1000;
    }

    private getUser(token: string): LoginUser {
        if (token) {
            return jwt_decode(token);
        }
        return null;
    }

    private loginSuccess(data: any) {
        const token = data.tokenString;
        this.setToken(token);
        return this.getUser(token);
    }

    private setToken(token: any) {
        if (token) {
            localStorage.setItem('token', token);
        }
    }

    private getToken() {
        return localStorage.getItem('token');
    }
}
