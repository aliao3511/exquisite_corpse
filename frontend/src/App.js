import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import logo from './logo.svg';
// import './App.css';

// import { AuthRoute, ProtectedRoute } from './components/auth/route_util';
// import LoginForm from './components/auth/login_form';
// import SignupForm from './components/auth/signup_form';
// import NavBar from './components/navbar';
// import Home from './components/home';
import Canvas from './components/canvas/canvas';
import Modal from './components/modal/modal';

const App = () => (
  <div>
    {/* <NavBar /> */}
    <Modal />
    {/* <Home /> */}
    {/* <Canvas /> */}
    <Switch>
      <Route path='/' />
      {/* <AuthRoute exact path='/login' component={LoginForm} /> */}
      {/* <AuthRoute exact path='/signup' component={SignupForm} /> */}
    </Switch>
  </div>
);

export default App;
