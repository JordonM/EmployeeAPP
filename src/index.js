import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
  <BrowserRouter>
    <App />
    <style>{'body { background-color: #C0C0C0; }'}</style>
  </BrowserRouter>,
  document.getElementById('root')
);
