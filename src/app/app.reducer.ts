
import { ActionReducerMap } from '@ngrx/store';

import * as fromUi from './shared/ui.reducers';
import * as fromAuth from './auth/auth.reducers';


export interface AppState {
    Ui: fromUi.State;
    Auth: fromAuth.AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
    Ui: fromUi.uiReducer,
    Auth: fromAuth.AuthReducer
};

