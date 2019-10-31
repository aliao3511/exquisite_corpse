import React from 'react';
import ReactDOM from 'react-dom';
import jwt_decode from 'jwt-decode';

import './index.css';
import App from './App';
// import * as serviceWorker from './serviceWorker';
import configureStore from './store';
import { setAuthToken } from './features/auth/ducks/util';
import { logout } from './modules/auth';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
