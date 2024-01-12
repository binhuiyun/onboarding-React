import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import store from './redux/store';
import {jwtDecode} from 'jwt-decode';
import { Provider } from 'react-redux';

import { setCurrentEmployee } from './redux/employeeSlice';


if (localStorage.getItem('token')) {
  store.dispatch(setCurrentEmployee(jwtDecode(localStorage.getItem('token'))));
}
  

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
