import {
    IArticleTagsValidationResponse
} from '../../interfaces/Interface.Article.TagsValidation';


export interface IArticleTagsValidation {
    pending_articles?: IArticleTagsValidationResponse[] | [];
    completed_articles?: IArticleTagsValidationResponse[] | [];
    active_wb_article_list?: IArticleTagsValidationResponse[] | [];
}
