import { IArticleTagsValidation } from './redux.workbench.tagsvalidation.state';
import {
    WBATV_SET_PENDING_ARTICLES, 
    WBATV_SET_COMPLETED_ARTICLES,
    WBATV_SET_ACTIVE_WB_ARTICLES_LIST,
    WBATV_SET_ACTIVE_WB_ARTICLES_INDEX,
    WBATV_SET_ACTIVE_WB_ARTICLES,
    WBATV_ON_CHANGE_VALUES,
} from './redux.workbench.tagsvalidation.action';

const initialState: IArticleTagsValidation = {
    pending_articles: [],
    completed_articles:  [],
    active_wb_article_list: [],
    active_article_index: 0,
    active_article: {}
};

export const articlesTagValidation = (state = initialState, action: any) => {
  switch (action.type) {
    case WBATV_SET_PENDING_ARTICLES:
      return Object.assign({}, state, { pending_articles: action.payload });
    case WBATV_SET_COMPLETED_ARTICLES:
      return Object.assign({}, state, { completed_articles: action.payload });
    case WBATV_SET_ACTIVE_WB_ARTICLES_LIST:
      return Object.assign({}, state, { active_wb_article_list: action.payload });
    case WBATV_SET_ACTIVE_WB_ARTICLES_INDEX:
      return Object.assign({}, state, { active_article_index: action.payload });
    case WBATV_SET_ACTIVE_WB_ARTICLES:
        return Object.assign({}, state, { active_article: action.payload });
    case WBATV_ON_CHANGE_VALUES:
      const onChangeState = Object.assign({}, state);
      Object.assign(onChangeState.active_article, { [action.props]: action.value });
      return onChangeState;
    default: return state; 
  }
};