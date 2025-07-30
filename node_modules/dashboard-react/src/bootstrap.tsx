import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import '@global-styles/globals.css';
import Dashboard from './pages/dashboard/Dashboard';

const container = document.getElementById('root');
if (container) {
  ReactDOM.render(
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>,
    container
  );
}

export {};
