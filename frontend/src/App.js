import React from 'react';
import { Switch, Route } from 'react-router-dom';
// import logo from './logo.svg';
// import './App.css';

// import { AuthRoute, ProtectedRoute } from './components/auth/route_util';
import './App.css';
import Home from './components/home/home';
import Canvas from './components/canvas/canvas';
import Modal from './components/modal/modal';

// seeding
import Seed from './components/canvas/seed';

// testing
import Scroll from './components/sandbox/scroll';

const App = () => (
  <>
    <Modal />
    <Switch>
      <Route path='/scroll' component={Scroll}/>
      <Route path='/draw' component={Canvas} />
      <Route path='/seed' component={Seed} />
      <Route exact path='/' component={Home} />
    </Switch>
  </>
);

export default App;
