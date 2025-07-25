import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import HeaderPublic from './HeaderPublic';
import './index.css';

const container = document.getElementById('root');
if (container) {
  ReactDOM.render(
    <BrowserRouter>
      <HeaderPublic />
    </BrowserRouter>,
    container
  );
}

export {};
