import { IArticleTagsValidation } from './redux.workbench.tagsvalidation.state';
import {
    WBATV_SET_PENDING_ARTICLES, 
    WBATV_SET_COMPLETED_ARTICLES,
    WBATV_SET_ACTIVE_WB_ARTICLES_LIST
} from './redux.workbench.tagsvalidation.action';

const initialState: IArticleTagsValidation = {
    pending_articles: [],
    completed_articles:  [],
    active_wb_article_list: []
};

export const articlesTagValidation = (state = initialState, action: any) => {
  switch (action.type) {
    case WBATV_SET_PENDING_ARTICLES:
      return Object.assign({}, state, { pending_articles: action.payload });
    case WBATV_SET_COMPLETED_ARTICLES:
      return Object.assign({}, state, { completed_articles: action.payload });
    case WBATV_SET_ACTIVE_WB_ARTICLES_LIST:
      return Object.assign({}, state, { active_wb_article_list: action.payload });
    default: return state;
  }
};