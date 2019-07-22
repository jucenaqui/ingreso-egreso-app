import * as FromUi from './ui.actions';

export interface State {
    isLoading: boolean;
}

const initState: State = {
    isLoading: false
};

export function uiReducer( state = initState, action: FromUi.acciones ): State {

    switch ( action.type ) {

        case FromUi.ACTIVAR_LOADING:
            return {
                isLoading: true
            };
        case FromUi.DESACTIVAR_LOADING:
            return {
                isLoading: false
            };
        default: return state;

    }
}
