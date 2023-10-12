import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Scrypt, bsv } from 'scrypt-ts'
import artifact from '../artifacts/ordinalLock.json'
import { OrdinalLock } from './contracts/ordinalLock';

Scrypt.init({
  apiKey: 'mainnet_18UxLNbxhxIGidmunf5yO5JviNiqC7UqqM0GRWLBDaLACmGpY',
  network: bsv.Networks.mainnet,
})

OrdinalLock.loadArtifact(artifact)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
