import { IMergeTags } from './redux.workbench.mergetags.state';
import {
    WBMT_SET_ACTIVE_CATEGORY,
    WBMT_SET_TAG_GROUP_CATEGORY_LIST,
    WBMT_SET_TAG_GROUP_LIST,
    WBMT_SET_ACTIVE_TAG_GROUP_LIST,
    WBMT_SET_ACTIVE_TAG_INDEX,
    WBMT_SET_DISPLAY_TAG_GROUP_LIST,
    WBMT_SET_SEARCH_TAG_LIST,
    WBMT_ON_CHANGE_VALUES,
    WBMT_SET_LAST_EVALUATED_KEY,
    WBMT_SET_ACTIVE_SINGULAR_LIST,
} from './redux.workbench.mergetags.action';

const initialState: IMergeTags = {
    active_category: '',
    category_list: [],
    tag_group_list: [],
    active_tag_group_list: [],
    active_tag_index: 0,
    display_tag_group_list: [],
    search_list: [],
    last_evaluated_key: '',
    active_singular_tags_list: [],
    new_tag_group: [],
};

export const mergeTags = (state = initialState, action: any) => {
  switch (action.type) {
    case WBMT_SET_ACTIVE_CATEGORY:
      return Object.assign({}, state, { active_category: action.payload });
    case WBMT_SET_TAG_GROUP_CATEGORY_LIST:
        return Object.assign({}, state, { category_list: action.payload });
    case WBMT_SET_TAG_GROUP_LIST:
        return Object.assign({}, state, { tag_group_list: action.payload });
    case WBMT_SET_ACTIVE_TAG_GROUP_LIST:
        return Object.assign({}, state, { active_tag_group_list: action.payload });
    case WBMT_SET_ACTIVE_TAG_INDEX:
        return Object.assign({}, state, { active_tag_index: action.payload });
    case WBMT_SET_DISPLAY_TAG_GROUP_LIST:
        return Object.assign({}, state, { display_tag_group_list: action.payload });
    case WBMT_SET_SEARCH_TAG_LIST:
        return Object.assign({}, state, { search_list: action.payload });
    case WBMT_ON_CHANGE_VALUES:
        const onChangeState = Object.assign({}, state);
        onChangeState.active_tag_group_list!.filter((item: any, index: number)=>{
            if(index === action.index){
                item['group_name'] = action.value;
            }
        });
        return onChangeState;
    case WBMT_SET_LAST_EVALUATED_KEY:
        return Object.assign({}, state, { last_evaluated_key: action.payload });
    case WBMT_SET_ACTIVE_SINGULAR_LIST:
        return Object.assign({}, state, { active_singular_tags_list: action.payload });
    default: return state;  
  }
};