import React from 'react';
import ReactDOM from 'react-dom';
import jwt_decode from 'jwt-decode';

// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';
import Root from './root';
import configureStore from './store';
import { setAuthToken, logout } from './modules/auth';

document.addEventListener('DOMContentLoaded', () => {
    let store;

    if (localStorage.jwtToken) {
        setAuthToken(localStorage.jwtToken);
        const decodedUser = jwt_decode(localStorage.jwtToken);
        const preloadedState = { auth: { authenticated: true, user: decodedUser }};
        store = configureStore(preloadedState);
        const currentTime = Date.now() / 1000;
        if (decodedUser.exp < currentTime) {
            store.dispatch(logout());
            window.location.href = '/login';
        } 
    } else {
        store = configureStore({});
    }

    const root = document.getElementById('root');
    ReactDOM.render(<Root store={store} />, root);
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
