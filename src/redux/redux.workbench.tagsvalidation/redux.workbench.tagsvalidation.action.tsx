export const WBATV_SET_PENDING_ARTICLES = 'WBATV/SET_PENDING_ARTICLES';
export const WBATV_SET_COMPLETED_ARTICLES = 'WBATV/WBATV_SET_COMPLETED_ARTICLES';

export const getArticlesTag = (articlsList: any) => (dispatch: any) => {
  
  let pendingArticles = articlsList.filter( (it: any) => it.is_validated === false );
  dispatch({ type: WBATV_SET_PENDING_ARTICLES, payload: pendingArticles });
  
  let completedArticles = articlsList.filter( (it: any) => it.is_validated === true );
  dispatch({ type: WBATV_SET_COMPLETED_ARTICLES, payload: completedArticles });
};