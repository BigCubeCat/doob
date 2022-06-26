import * as actions from './actionTypes';

export const setWindow = id => ({
    type: actions.SET_WINDOW,
    payload: id
})

export const setIsCartoons = value => ({
    type: actions.IS_CARTOONS,
    payload: value
})