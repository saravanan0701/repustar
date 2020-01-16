import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { auth as authReducer } from './redux.auth/redux.auth.reducer';
import { articlesTagValidation as articlesTagValidationReducer } 
from './redux.workbench.tagsvalidation/redux.workbench.tagsvalidation.reducer';
import { mergeTags as mergeTagsReducer } from './redux.workbench.mergetags/redux.workbench.mergetags.reducer';
import {reducer as toastrReducer} from 'react-redux-toastr';

export const store = createStore(
    combineReducers({ 
        auth: authReducer,
        articlesTagValidation: articlesTagValidationReducer,
        mergeTags: mergeTagsReducer,
        toastr: toastrReducer
    }), 
    composeWithDevTools(applyMiddleware(thunkMiddleware))
)
