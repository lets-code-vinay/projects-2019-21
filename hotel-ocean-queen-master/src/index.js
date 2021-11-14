import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
// import './index.css';
import App from './App';
import {RoomProvider} from './context';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <RoomProvider>
      <Router>
        <App />
      </Router>
    </RoomProvider>
,
  document.getElementById('root')
);

serviceWorker.unregister();
