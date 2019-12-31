export interface IArticleTagsValidationResponse {
    user_id: String;
    article_validated_id: String;
    tag_score: any;
    record_created_ts: String;
    article_id: String;
    tag_render_flag: any;
    tag_type: String[];
    is_validated: Boolean;
    tag_text: any;
    validated_tags?: any;
}

export interface IArticleTagsValidationRequest {
    user_id: String;
    article_validated_id: String;
    tag_score: any;
    record_created_ts: String;
    article_id: String;
    tag_render_flag: any;
    tag_type: String[];
    is_validated: Boolean;
    tag_text: any;
    validated_tags: any;
}