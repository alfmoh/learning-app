import { WebService } from './Web.service';
import { User } from '../models/IUser';
export class AuthService extends WebService<User> {
    URL = 'auth';
    login(data: User) {
        return this.post(data, 'login');
    }

    register(data: User) {
        return this.post(data, 'register');
    }
}
