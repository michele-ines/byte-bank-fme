import ReactDOM from 'react-dom';
import Dashboard from './pages/dashboard/Dashboard';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import '@global-styles'; 
import { store } from '@store/store';


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