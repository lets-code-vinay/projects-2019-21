import React, {useEffect} from 'react';
import { useSelector, useDispatch} from 'react-redux';
import {Route, Switch} from 'react-router-dom';
import './App.css';
import Home from './containers/Home/index';
import Signup from './containers/Signup/index';
import Signin from './containers/Signin/index';
import PrivateRoute from './components/HOC/PrivateRoute'
import { isUserLoggedIn } from './actions';

function App() {

    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
     
    useEffect(()=> {
        if(!auth.authenticate){
            dispatch(isUserLoggedIn());
        }
    }, [])

  return (
    <div className="App">
       <Switch>
         <PrivateRoute path='/' component= {Home} />
         <PrivateRoute path='/products' component= {() => <p>Products</p>} />
         <PrivateRoute path='/orders' component= {() => <p>Orders</p>} />


         <Route path='/signup' component= {Signup} />
         <Route path='/signin' component= {Signin} />

       </Switch>
    </div>
  );
}

export default App;
