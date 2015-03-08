'use strict';

import React from 'react';
import { Route, DefaultRoute } from 'react-router';
import Home from './components/Home.jsx';

export default (
  <Route name="home" path='/' handler={Home}>
  </Route>
);
