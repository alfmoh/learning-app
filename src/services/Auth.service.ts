import { WebService } from './Web.service';
import { User, LoginUser } from '../models/IUser';
import jwt_decode from 'jwt-decode';
export class AuthService extends WebService<User> {
    URL = 'auth';
    login(data: User) {
        return this.post<any>(data, 'login')
            .then(({ data }) => {
            return this.loginSuccess(data);
        });
    }

    register(data: User) {
        return this.post<any>(data, 'register')
            .then(({ data }) => {
            return this.loginSuccess(data);
        });
    }

    isLoggedIn() {
        const user = this.getUser(this.getToken());
        // if(!user) return false;
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
