import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { auth as authReducer } from './redux.auth/redux.auth.reducer';

export const store = (initialState: any) => {
  return createStore(combineReducers({
    auth: authReducer
  }), initialState, composeWithDevTools(applyMiddleware(thunkMiddleware)));
};