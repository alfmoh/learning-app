import { createContext } from 'react';
import { AuthService } from '../../services/Auth.service';

export const AppContext = createContext({
    auth: new AuthService()
});

export const LocationContext = createContext({
    path: {
        prev: '',
        current: ''
    }
});
