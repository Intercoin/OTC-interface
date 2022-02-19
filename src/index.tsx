import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Web3ReactProvider } from '@web3-react/core';
import Web3 from 'web3';

import App from './App';
import reportWebVitals from './reportWebVitals';

import 'react-toastify/dist/ReactToastify.css';
import './assets/styles/index.scss';

function getLibrary(provider) {
  return new Web3(provider);
}

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <BrowserRouter>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </BrowserRouter>
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

reportWebVitals();
