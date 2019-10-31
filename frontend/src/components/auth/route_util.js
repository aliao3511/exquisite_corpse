import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const msp = state => (
    { loggedIn: state.auth.authenticated }
);

const Auth = ({ component: Component, loggedIn, ...rest }) => (
    <Route {...rest} render={props => (
        !loggedIn ? (
            <Component {...props} />
        ) : (
            <Redirect to='/home' />
        )
    )} />
);

const Protected = ({ component: Component, loggedIn, ...rest }) => (
    <Route {...rest} render={props => (
        loggedIn ? (
            <Component {...props} />
        ) : (
            <Redirect to='/login' />
        )
    )}
    />
);

export const AuthRoute = withRouter(connect(msp)(Auth));
export const ProtectedRoute = withRouter(connect(msp)(Protected));