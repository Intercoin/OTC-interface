import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';

import App from './App';
import reportWebVitals from './reportWebVitals';

import './assets/styles/index.scss';

function getLibrary(provider) {
  return new Web3(provider);
}

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
