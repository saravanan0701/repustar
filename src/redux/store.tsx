import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { auth as authReducer } from './redux.auth/redux.auth.reducer';

export const store = createStore(
    combineReducers({ 
        auth: authReducer
    }), 
    composeWithDevTools(applyMiddleware(thunkMiddleware))
)
