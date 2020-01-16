export const WBMT_SET_ACTIVE_CATEGORY = 'WBMT/SET_ACTIVE_CATEGORY';
export const WBMT_SET_TAG_GROUP_LIST = 'WBMT/SET_TAG_GROUP_LIST';
export const WBMT_SET_ACTIVE_TAG_GROUP_LIST = 'WBMT/SET_ACTIVE_TAG_GROUP_LIST';
export const WBMT_SET_TAG_GROUP_CATEGORY_LIST = 'WBMT/SET_TAG_GROUP_CATEGORY_LIST';
export const WBMT_SET_ACTIVE_TAG_INDEX = 'WBMT/SET_ACTIVE_TAG_INDEX';
export const WBMT_SET_DISPLAY_TAG_GROUP_LIST = 'WBMT/SET_DISPLAY_TAG_GROUP_LIST';


export const setActiveCategory = (activeCategory: string) => {
      return (dispatch: any) => {
      dispatch({
        type: WBMT_SET_ACTIVE_CATEGORY,
        payload: activeCategory,
      });    
  };
}

export const setCategoryList = (categoryList: string[]) => {
    return (dispatch: any) => {
        dispatch({
        type: WBMT_SET_TAG_GROUP_CATEGORY_LIST,
        payload: categoryList,
        });    
    };
}

export const setTagGroupList = (tagGroupsList: any) => {
    tagGroupsList.map((item:any, i: number) => {
        const tags_text = [...item.tags_group];  
        let initialValue: any = [];
        let validated_tags = tags_text.reduce((obj:any, innerItem: any) => {
            return [...obj, {[innerItem]: 0}]
        }, initialValue);
        tagGroupsList[i]['validated_tags_list'] = validated_tags;
    });
    
    return (dispatch: any) => {
        dispatch({
            type: WBMT_SET_TAG_GROUP_LIST,
            payload: tagGroupsList,
        });    
    };
} 

export const setActiveGroupList = (tagGroupsList: any) => {

    tagGroupsList.map((item:any, i: number) => {
        const tags_text = [...item.tags_group];  
        let initialValue: any = [];
        let validated_tags = tags_text.reduce((obj:any, innerItem: any) => {
            return [...obj, {[innerItem]: 0}]
        }, initialValue);
        tagGroupsList[i]['validated_tags_list'] = validated_tags;
    });
    return (dispatch: any) => {
        dispatch({
            type: WBMT_SET_ACTIVE_TAG_GROUP_LIST,
            payload: tagGroupsList,
        });    
    };
}

export const setDisplayGroupList = (tagGroupsList: any) => {
    return (dispatch: any) => {
        dispatch({
            type: WBMT_SET_DISPLAY_TAG_GROUP_LIST,
            payload: tagGroupsList,
        });    
    };
}

export const setActiveTagIndex = (activeTagIndex: number) => {
    return (dispatch: any) => {
        dispatch({
            type: WBMT_SET_ACTIVE_TAG_INDEX,
            payload: activeTagIndex,
        });    
    };
}
// export const getArticlesTag = (articlsList: any) => (dispatch: any) => {
  
//   let pendingArticles = articlsList.filter( (it: any) => it.is_validated === false );
//   dispatch({ type: WBATV_SET_PENDING_ARTICLES, payload: pendingArticles });
  
//   let completedArticles = articlsList.filter( (it: any) => it.is_validated === true );
//   dispatch({ type: WBATV_SET_COMPLETED_ARTICLES, payload: completedArticles });
//   if (localStorage.getItem('active_list_type') === 'completed_articles'){
//     dispatch(setActiveList(completedArticles, 'completed_articles'));
//   }else {
//     dispatch(setActiveList(pendingArticles, 'pending_articles'));
//   } 
// };

// export const setActiveList = (articlsList: any, listType: string) => {  
//   return (dispatch: any) => {
//       dispatch(setActiveWBAciveArticles(articlsList, listType));    
//   };
// };

// export const setActiveArticleIndex = (articleIndex: any) =>{
//   localStorage.setItem('active_list_id', articleIndex);
//   return (dispatch: any) => {
//       dispatch({
//         type: WBATV_SET_ACTIVE_WB_ARTICLES_INDEX,
//         payload: articleIndex,
//       });    
//   };
// }

// export const setActiveArticle = (article: any) =>{
//   if(article.is_validated === false){
//     const tags_text = [...article.tag_text];
    
//     let validated_tags = tags_text.map((item)=>{
//       let initialValue: any = [];
//       return item.reduce((obj:any, innerItem: any) => {
//         return [...obj, {[innerItem]: 0}]
//       }, initialValue);
  
//     });
//     article['validated_tags'] = validated_tags;
//   }
  
//   return (dispatch: any) => {
//       dispatch({
//         type: WBATV_SET_ACTIVE_WB_ARTICLES,
//         payload: article,
//       });    
//   };
// }

// export const onChangeProps = (props: any, value: any) => {
//   return{
//     props,
//     value,
//     type: WBATV_ON_CHANGE_VALUES,
//   };
// };

// export const setActiveWBAciveArticles = (articlsList: any, listType: string) =>  {
//   localStorage.setItem('active_list_type', listType);
//   return {
//     type: WBATV_SET_ACTIVE_WB_ARTICLES_LIST,
//     payload: articlsList,
//   };
// };