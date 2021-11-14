//act as rootReducer
import { combineReducers } from 'redux'
import authReducer from './auth.reducers';
import userReducer from './user.reducer';

export const rootReducer =  combineReducers({
        auth: authReducer,
        user:userReducer
})


