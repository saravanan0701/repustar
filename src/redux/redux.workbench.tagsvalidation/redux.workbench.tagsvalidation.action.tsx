export const WBATV_SET_PENDING_ARTICLES = 'WBATV/SET_PENDING_ARTICLES';
export const WBATV_SET_COMPLETED_ARTICLES = 'WBATV/WBATV_SET_COMPLETED_ARTICLES';
export const WBATV_SET_ACTIVE_WB_ARTICLES_LIST = 'WBATV/WBATV_SET_ACTIVE_WB_ARTICLES_LIST';
export const WBATV_SET_ACTIVE_WB_ARTICLES_INDEX = 'WBATV/WBATV_SET_ACTIVE_WB_ARTICLES_INDEX';
export const WBATV_SET_ACTIVE_WB_ARTICLES = 'WBATV/WBATV_SET_ACTIVE_WB_ARTICLES';

export const getArticlesTag = (articlsList: any) => (dispatch: any) => {
  
  let pendingArticles = articlsList.filter( (it: any) => it.is_validated === false );
  dispatch({ type: WBATV_SET_PENDING_ARTICLES, payload: pendingArticles });
  
  let completedArticles = articlsList.filter( (it: any) => it.is_validated === true );
  dispatch({ type: WBATV_SET_COMPLETED_ARTICLES, payload: completedArticles });
  if (localStorage.getItem('active_list_type') === 'completed_articles'){
    dispatch(setActiveList(completedArticles, 'completed_articles'));
  }else {
    dispatch(setActiveList(pendingArticles, 'pending_articles'));
  } 
};

export const setActiveList = (articlsList: any, listType: string) => {  
  return (dispatch: any) => {
      dispatch(setActiveWBAciveArticles(articlsList, listType));    
  };
};

export const setActiveArticleIndex = (articleIndex: any) =>{
  localStorage.setItem('active_list_id', articleIndex);
  return (dispatch: any) => {
      dispatch({
        type: WBATV_SET_ACTIVE_WB_ARTICLES_INDEX,
        payload: articleIndex,
      });    
  };
}

export const setActiveArticle = (article: any) =>{
  if(article.is_validated === false){
    const validated_tags = [...article.tag_text];
    article['validated_tags'] = validated_tags;
  }
  
  return (dispatch: any) => {
      dispatch({
        type: WBATV_SET_ACTIVE_WB_ARTICLES,
        payload: article,
      });    
  };
}

export const setActiveWBAciveArticles = (articlsList: any, listType: string) =>  {
  localStorage.setItem('active_list_type', listType);
  return {
    type: WBATV_SET_ACTIVE_WB_ARTICLES_LIST,
    payload: articlsList,
  };
};