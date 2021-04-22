import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import fontAwesomeInitialize from './assets'
fontAwesomeInitialize()

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);