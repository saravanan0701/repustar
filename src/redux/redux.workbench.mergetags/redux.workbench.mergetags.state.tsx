import {
    ITagsGroupResponse
} from '../../interfaces/Interface.Tags.MergeTags';


export interface IMergeTags {
    active_category?: string;
    category_list?: string[];
    tag_group_list?: ITagsGroupResponse[];
    active_tag_group_list?: ITagsGroupResponse[];
    display_tag_group_list?: ITagsGroupResponse[];
    active_tag_index?: number;
    search_list?: string[];
    last_evaluated_key?: string;
    active_singular_tags_list?: any;
}
