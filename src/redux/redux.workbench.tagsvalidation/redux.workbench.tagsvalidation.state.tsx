import {
    IArticleTagsValidationResponse
} from '../../interfaces/Interface.Article.TagsValidation';


export interface IArticleTagsValidation {
    pending_articles?: IArticleTagsValidationResponse[] | [];
    completed_articles?: IArticleTagsValidationResponse[] | [];
}
