import React from 'react';
import ReactDOM from 'react-dom';
import BoulderBuddy from './components/BoulderBuddy';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <BrowserRouter>
    <BoulderBuddy />
  </BrowserRouter>,
  document.getElementById('root')
);

