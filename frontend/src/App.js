import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import logo from './logo.svg';
// import './App.css';

// import { AuthRoute, ProtectedRoute } from './components/auth/route_util';
// import NavBar from './components/navbar';
import Home from './components/home';
import Canvas from './components/canvas/canvas';
import Modal from './components/modal/modal';
import Seed from './components/canvas/seed';

const App = () => (
  <div>
    {/* <NavBar /> */}
    <Modal />
    <Switch>
      <Route path='/draw' component={Canvas} />
      <Route path='/seed' component={Seed} />
      <Route exact path='/' component={Home} />
    </Switch>
  </div>
);

export default App;
