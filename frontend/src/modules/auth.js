import axios from 'axios';

// util
export const setAuthToken = token => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
};

// action types
const RECEIVE_USER_LOGOUT = 'RECEIVE_USER_LOGOUT';

// action creators
export const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
});

// thunk action creators
export const logout = () => dispatch => {
    localStorage.removeItem('jwtToken');
    APIUtil.setAuthToken(false);
    return dispatch(logout(user));
};