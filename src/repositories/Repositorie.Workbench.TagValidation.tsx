import { BaseApi } from '../api/Base.API';
import { endpoints } from '../config/';
import {
    IArticleTagsValidationResponse
} from '../interfaces/Interface.Article.TagsValidation';
import { IAPIResponse } from '../interfaces/Interface.API';

export class RepositorieWorkbenchTagValidation extends BaseApi {
  public getArticleTagsByUser() {
    return new Promise<IAPIResponse<IArticleTagsValidationResponse>>((resolve, reject) => {
        
          const userId = localStorage.getItem('user_id');
          
          const apiEndPoint = endpoints.articles_tagsvalidaiton + '?userId=' + userId;

          this.getInstance().get(apiEndPoint).then((response) => {
            const loginResponse = {} as IAPIResponse<IArticleTagsValidationResponse>;
            loginResponse.body = response.data.body;
            resolve(loginResponse);
          }).catch((error) => {
            reject(error);
          });
    });
  }
}