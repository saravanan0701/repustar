import { IArticleTagsValidation } from './redux.workbench.tagsvalidation.state';
import {
    WBATV_SET_PENDING_ARTICLES, 
    WBATV_SET_COMPLETED_ARTICLES
} from './redux.workbench.tagsvalidation.action';

const initialState: IArticleTagsValidation = {
    pending_articles: [],
    completed_articles:  [],
};

export const articlesTagValidation = (state = initialState, action: any) => {
  switch (action.type) {
    case WBATV_SET_PENDING_ARTICLES:
      return Object.assign({}, state, { pending_articles: action.payload });
    case WBATV_SET_COMPLETED_ARTICLES:
      return Object.assign({}, state, { completed_articles: action.payload });
    default: return state;
  }
};