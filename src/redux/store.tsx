import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { auth as authReducer } from './redux.auth/redux.auth.reducer';
import { articlesTagValidation as articlesTagValidationReducer } 
from './redux.workbench.tagsvalidation/redux.workbench.tagsvalidation.reducer';

export const store = createStore(
    combineReducers({ 
        auth: authReducer,
        articlesTagValidation: articlesTagValidationReducer
    }), 
    composeWithDevTools(applyMiddleware(thunkMiddleware))
)
