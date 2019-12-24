export const WBATV_SET_PENDING_ARTICLES = 'WBATV/SET_PENDING_ARTICLES';
export const WBATV_SET_COMPLETED_ARTICLES = 'WBATV/WBATV_SET_COMPLETED_ARTICLES';
export const WBATV_SET_ACTIVE_WB_ARTICLES_LIST = 'WBATV/WBATV_SET_ACTIVE_WB_ARTICLES_LIST';

export const getArticlesTag = (articlsList: any) => (dispatch: any) => {
  
  let pendingArticles = articlsList.filter( (it: any) => it.is_validated === false );
  dispatch({ type: WBATV_SET_PENDING_ARTICLES, payload: pendingArticles });
  
  let completedArticles = articlsList.filter( (it: any) => it.is_validated === true );
  dispatch({ type: WBATV_SET_COMPLETED_ARTICLES, payload: completedArticles });
  dispatch(setActiveList(pendingArticles));
};

export const setActiveList = (articlsList: any) => {  
    //dispatch({ type: WBATV_SET_ACTIVE_ARTICLES, payload: articlsList });
    return (dispatch: any) => {
        dispatch(setActiveWBAciveArticles(articlsList));    
    };
};

export const setActiveWBAciveArticles = (articlsList: any) =>  {
    return {
      type: WBATV_SET_ACTIVE_WB_ARTICLES_LIST,
      payload: articlsList,
    };
  };