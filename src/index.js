import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';


const firebase = require('firebase')
require('firebase/firestore')

  firebase.initializeApp({
    apiKey: "AIzaSyA1okDtzoRcExUsmDSymR4ETWzYTcIQ-Sc",
    authDomain: "evernote-clone-47ad7.firebaseapp.com",
    databaseURL: "https://evernote-clone-47ad7.firebaseio.com",
    projectId: "evernote-clone-47ad7",
    storageBucket: "evernote-clone-47ad7.appspot.com",
    messagingSenderId: "338867545773",
    appId: "1:338867545773:web:a027ee6646dae66bf10824",
    measurementId: "G-EXFGHKQELB"
  });
  firebase.analytics();


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
