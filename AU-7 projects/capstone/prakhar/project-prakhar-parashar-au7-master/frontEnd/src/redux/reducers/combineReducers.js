import {combineReducers, createStore, applyMiddleware, compose} from 'redux'
import userReducer from './userReducer'
import postReducer from './postReducer'
import thunk from 'redux-thunk'


const rootReducer = combineReducers ({
userReducer,
postReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(applyMiddleware(thunk)));
//const store = createStore(rootReducer, applyMiddleware(thunk),   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

 export default store