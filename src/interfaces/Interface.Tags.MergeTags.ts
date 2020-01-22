export interface ITagsGroupResponse {
    id: String;
    user_id: String;
    record_created_ts: String;
    tag_type: String;
    tags_group: any;
    validated_tags_list?: any;
    group_name?: String;
}

export interface ITagsListResponse{
    id: String;
    source: String;
    tag_type: String;
    tag: String;
    tag_std: String;
    conditional_delete: Number;
    tags_gsi_key: Number;
    is_grouped: Number;
}

export interface ISingularTagsListResponse{
    items: ISingularTagsItem[];
    lastEvaluatedKey: ISingularTagsLastEvaluatedKey,
}

export interface ISingularTagsItem{
    is_grouped: Number,
    source: String;
    tag: String;
    id: String;
    tag_type: String;
    tag_std: String;
}

export interface ISingularTagsLastEvaluatedKey{
    id: String;
}