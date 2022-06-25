import * as actions from './actionTypes';


export default function reducer(state = {window_id: 0}, action) {
    switch (action.type) {

        case actions.SET_WINDOW:
            state.window_id = action.payload.id;
            return state;

        default:
            return state;
    }
}