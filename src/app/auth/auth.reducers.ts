
import * as Auth from './auth.actions';
import { User } from './user.model';

export interface AuthState {
    user: User;
}

const initState: AuthState = {
    user: null
};

export function AuthReducer(state = initState, action: Auth.acciones): AuthState {

    switch ( action.type ) {

        case Auth.SET_USER:
            return {
                user: { ...action.user }
            };
        default: return state;
    }
}
