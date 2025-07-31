import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import '@global-styles'; 

const container = document.getElementById('root')!;
ReactDOM.render(<App />, container);

export {};
