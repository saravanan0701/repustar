import { IMergeTags } from './redux.workbench.mergetags.state';
import {
    WBMT_SET_ACTIVE_CATEGORY,
    WBMT_SET_TAG_GROUP_CATEGORY_LIST,
    WBMT_SET_TAG_GROUP_LIST,
    WBMT_SET_ACTIVE_TAG_GROUP_LIST,
    WBMT_SET_ACTIVE_TAG_INDEX,
    WBMT_SET_DISPLAY_TAG_GROUP_LIST,
} from './redux.workbench.mergetags.action';

const initialState: IMergeTags = {
    active_category: '',
    category_list: [],
    tag_group_list: [],
    active_tag_group_list: [],
    active_tag_index: 0,
    display_tag_group_list: [],
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
    default: return state;  
  }
};