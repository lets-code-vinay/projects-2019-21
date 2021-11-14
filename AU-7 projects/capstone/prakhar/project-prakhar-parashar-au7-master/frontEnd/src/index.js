import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import './index.css'
import {Provider} from 'react-redux'
import store from './redux/reducers/combineReducers'
import axios from 'axios'


axios.defaults.baseURL = process.env.REACT_APP_BASE_URL
 if(localStorage.getItem("token")){ 
   const token = localStorage.getItem("token")
   console.log(token)
   axios.defaults.headers.common = {'Authorization': `bearer ${token}`}
 }

ReactDOM.render(
  <React.StrictMode>
    
   <Provider store= {store}>
  
   <App />
   </Provider>
    
  </React.StrictMode>,
  document.getElementById('root')
);


