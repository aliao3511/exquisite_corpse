import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import logo from './logo.svg';
// import './App.css';

// import { AuthRoute, ProtectedRoute } from './components/auth/route_util';
import './App.css';
import Home from './components/home/home';
import Canvas from './components/canvas/canvas';
import Modal from './components/modal/modal';

// seediing
import Seed from './components/canvas/seed';

const App = () => (
  <div>
    <Modal />
    <Switch>
      <Route path='/draw' component={Canvas} />
      <Route path='/seed' component={Seed} />
      <Route exact path='/' component={Home} />
    </Switch>
  </div>
);

export default App;
