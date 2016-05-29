import React from 'react';
import {Route} from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Stats from './components/Stats';
import Guitar from './components/Guitar';
import AddGuitar from './components/AddGuitar';

export default (
  <Route component={App}>
    <Route path='/' component={Home} />
     <Route path='/add' component={AddGuitar} />
    <Route path='/stats' component={Stats} />
    <Route path='/guitars/:id' component={Guitar} />
  </Route>
);
