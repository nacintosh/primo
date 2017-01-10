import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

const appProps = window.APP_PROPS;
ReactDOM.render(
    <App videos={appProps}/>, document.getElementById('root'));
