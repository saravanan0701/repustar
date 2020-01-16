import { BaseApi } from '../api/Base.API';
import { endpoints } from '../config/';
import {
    ITagsGroupResponse
} from '../interfaces/Interface.Tags.MergeTags';
import { IAPIResponse } from '../interfaces/Interface.API';

export class RepositorieWorkbenchMergeTags extends BaseApi {
  public getGroupTagsByUser() {
    return new Promise<IAPIResponse<ITagsGroupResponse[]>>((resolve, reject) => {
        
          const userId = localStorage.getItem('user_id');
          
          const apiEndPoint = endpoints.tags_tagsgrouping + '?userId=' + userId;

          this.getInstance().get(apiEndPoint).then((response) => {
              console.log('response ', response);
              
            const tagGroupResponse = {} as IAPIResponse<ITagsGroupResponse[]>;
            tagGroupResponse.body = response.data.body;
            resolve(tagGroupResponse);
          }).catch((error) => {
            reject(error);
          });
    });
  }

//   public saveArticleTags(article: IArticleTagsValidationRequest, articleValidatedId: string){
//     return new Promise<IAPIResponse<IArticleTagsValidationResponse>>((resolve, reject) => {
        
//       const apiEndPoint = endpoints.articles_tagsvalidaiton + '?articleValidatedId=' + articleValidatedId;

//       this.getInstance().put(apiEndPoint, article).then((response) => {
//         const loginResponse = {} as IAPIResponse<IArticleTagsValidationResponse>;
//         loginResponse.body = response.data.body;
//         resolve(loginResponse);
//       }).catch((error) => {
//         reject(error);
//       });
// });

//   }
}