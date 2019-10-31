import { RECEIVE_AUTH_ERRORS, RECEIVE_CURRENT_USER, CLEAR_ERRORS } from '../auth';

const _nullState = {};

export default function reducer(state = _nullState, action) {
    Object.freeze(state);
    switch(action.type) {
        case RECEIVE_AUTH_ERRORS: {
            return action.errors;
        }
        case RECEIVE_CURRENT_USER: {
            return _nullState;
        }
        case CLEAR_ERRORS: {
            return _nullState;
        }
        default:
            return state;
    }
}