import { WebService } from './Web.service';
import { User, LoginUser } from '../models/IUser';
import jwt_decode from 'jwt-decode';
export class AuthService extends WebService<User> {
    URL = 'auth';
    loginUser: LoginUser;
    token = '';
    constructor() {
        super();
        this.loginUser = this.getUser();
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
        const user = this.getUser();
        return Date.now() <= user?.exp * 1000;
    }

    getUser(): LoginUser {
        const token = this.getToken();
        if (token) {
            return jwt_decode(token);
        }
        return null;
    }

    private loginSuccess(data: any) {
        this.token = data.tokenString;
        this.setToken(this.token);
        return this.getUser();
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
