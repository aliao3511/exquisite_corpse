import axios from 'axios';
import jwt_decode from 'jwt-decode';

// action types
const LOGOUT = 'e-c/auth/LOGOUT';
const RECEIVE_USER_SIGN_IN = 'e-c/auth/RECEIVE_USER_SIGN_IN';
export const RECEIVE_CURRENT_USER = 'e-c/auth/RECEIVE_CURRENT_USER';
export const RECEIVE_AUTH_ERRORS = 'e-c/auth/RECEIVE_AUTH_ERRORS';
export const CLEAR_ERRORS = 'e-c/auth/CLEAR_ERRORS';

// reducer
const _nullState = {
    authenticated: false,
    user: null,
};

export default function reducer(state = _nullState, action = {}) {
    Object.freeze(state);
    debugger
    switch(action.type) {
        case LOGOUT:
            return _nullState;
        case RECEIVE_CURRENT_USER:
            return {
                ...state,
                authenticated: !!action.user,
                user: action.user
            };
        case RECEIVE_USER_SIGN_IN:
            return {
                ...state,
                signedIn: true
            };
        default: 
            return state;
    }
}

// util
export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

// action creators
export const logoutUser = () => ({
    type: LOGOUT
});

export const receiveUserSignIn = () => ({
    type: RECEIVE_USER_SIGN_IN
});

export const receiveCurrentUser = user => ({
    type: RECEIVE_CURRENT_USER,
    user
});

export const receiveAuthErrors = errors => ({
    type: RECEIVE_AUTH_ERRORS,
    errors
});

export const clearErrors = () => ({
    type: CLEAR_ERRORS,
});

// thunk action creators
export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    return dispatch(logoutUser());
};

export const signup = user => async dispatch => {
    try {
        debugger
        await axios.post('/api/users/register', user);
        return dispatch(receiveUserSignIn());
    } catch(err) {
        return dispatch(receiveAuthErrors(err.response.data));
    }
};

export const login = user => async dispatch => {
    try{
        const res = await axios.post('/api/users/login', user);
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        const { id, name } = decoded;
        return dispatch(receiveCurrentUser({ id, name }));
    } catch(err) {
        return dispatch(receiveAuthErrors(err.response.data));
    }
};