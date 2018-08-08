import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import App from './App';

var app = (
  <BrowserRouter>
    <Route component={App} />
  </BrowserRouter>
);

render(app, document.getElementById('app'));