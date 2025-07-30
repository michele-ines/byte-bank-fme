import React from 'react';
import ReactDOM from 'react-dom';
import HeaderPublic from './HeaderPublic';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import '@global-styles'; 
import { store } from '@store/store';

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
