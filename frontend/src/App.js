import React from 'react';
import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/auth/route_util';
// import logo from './logo.svg';
// import './App.css';

import LoginForm from './components/auth/login_form';
import SignupForm from './components/auth/signup_form';
import NavBar from './components/navbar';
// import Home from './components/home';
import Canvas from './components/canvas';

const App = () => (
  <div>
    <NavBar />
    {/* <Home /> */}
    <Canvas />
    <Switch>
      {/* <AuthRoute exact path='/' component={<div>hi</div>} /> */}
      <AuthRoute exact path='/login' component={LoginForm} />
      <AuthRoute exact path='/signup' component={SignupForm} />
    </Switch>
  </div>
);

export default App;
