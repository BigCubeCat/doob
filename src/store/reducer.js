import * as actions from './actionTypes';

export default function reducer(
    state = {window_id: 0, is_cartoons: false}, action) {
  switch (action.type) {

    case actions.SET_WINDOW:
      state.window_id = action.payload.id;
      return state;
    case actions.IS_CARTOONS:
      return {
        is_cartoons: !state.is_cartoons,
        window_id: state.window_id
      };
    default:
      return state;
  }
}