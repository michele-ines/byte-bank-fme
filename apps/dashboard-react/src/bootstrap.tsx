import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import './index.css';

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
