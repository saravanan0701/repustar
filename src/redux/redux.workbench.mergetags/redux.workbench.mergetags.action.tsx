export const WBMT_SET_ACTIVE_CATEGORY = 'WBMT/SET_ACTIVE_CATEGORY';
export const WBMT_SET_TAG_GROUP_LIST = 'WBMT/SET_TAG_GROUP_LIST';
export const WBMT_SET_ACTIVE_TAG_GROUP_LIST = 'WBMT/SET_ACTIVE_TAG_GROUP_LIST';
export const WBMT_SET_TAG_GROUP_CATEGORY_LIST = 'WBMT/SET_TAG_GROUP_CATEGORY_LIST';
export const WBMT_SET_ACTIVE_TAG_INDEX = 'WBMT/SET_ACTIVE_TAG_INDEX';
export const WBMT_SET_DISPLAY_TAG_GROUP_LIST = 'WBMT/SET_DISPLAY_TAG_GROUP_LIST';
export const WBMT_SET_SEARCH_TAG_LIST = 'WBMT/SET_SEARCH_TAG_LIST';
export const WBMT_ON_CHANGE_VALUES = 'WBMT/ON_CHANGE_VALUES';
export const WBMT_SET_ACTIVE_SINGULAR_LIST = 'WBMT/SET_ACTIVE_SINGULAR_LIST';
export const WBMT_SET_LAST_EVALUATED_KEY = 'WBMT/SET_LAST_EVALUATED_KEY';
export const WBMT_SET_NEW_TAG_GROUP = 'WBMT/SET_NEW_TAG_GROUP';


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
        if(tagGroupsList[i]['validated_tags'] && tagGroupsList[i]['validated_tags'].length > 0){
            const tags_text = [...item.validated_tags];  
            tagGroupsList[i]['validated_tags_list'] = tags_text
            if(tagGroupsList[i]['is_validated'] !== 1){
                tagGroupsList[i]['group_name'] = '';
                tagGroupsList[i]['is_validated'] = 0;
            }
        }else{
            const tags_text = [...item.tags_group];  
            tagGroupsList[i]['validated_tags_list'] = tags_text;
            tagGroupsList[i]['group_name'] = '';
            tagGroupsList[i]['is_validated'] = 0;
        }
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
        if(tagGroupsList[i]['validated_tags'] && tagGroupsList[i]['validated_tags'].length > 0){
            const tags_text = [...item.validated_tags];  
            tagGroupsList[i]['validated_tags_list'] = tags_text
            if(tagGroupsList[i]['is_validated'] !== 1){
                tagGroupsList[i]['group_name'] = '';
                tagGroupsList[i]['is_validated'] = 0;
            }
        }else{
            const tags_text = [...item.tags_group];  
            tagGroupsList[i]['validated_tags_list'] = tags_text;
            tagGroupsList[i]['group_name'] = '';
            tagGroupsList[i]['is_validated'] = 0;
        }
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

export const setSearchList = (searchList: []) => {
    return (dispatch: any) => {
        dispatch({
            type: WBMT_SET_SEARCH_TAG_LIST,
            payload: searchList,
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

export const setActiveSingularTagsList = (tagsList: []) => (dispatch: any) => {
    dispatch({
        type: WBMT_SET_ACTIVE_SINGULAR_LIST,
        payload: tagsList,
    });  
}

export const setLastEvaluatedKey = (lastIndex: any) => (dispatch: any) => {
    dispatch({ 
        type: WBMT_SET_LAST_EVALUATED_KEY, 
        payload: lastIndex 
    });
}

export const onChangeProps = (props: any, index: any, value: any) => {
    return{
      props,
      index,
      value,
      type: WBMT_ON_CHANGE_VALUES,
    };
  };

export const setNewTagsList =(tagsList: []) => (dispatch: any) => {
    dispatch({
        type: WBMT_SET_NEW_TAG_GROUP,
        payload: tagsList,
    });  
}