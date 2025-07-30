import ReactDOM from 'react-dom';
import Home from './pages/Home';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import '@global-styles'; 
import { store } from '@store/store';

const container = document.getElementById('root');
if (container) {
  ReactDOM.render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>,
    container
  );
}

export {};
