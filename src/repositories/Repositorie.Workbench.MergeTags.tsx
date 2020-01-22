import { BaseApi } from '../api/Base.API';
import { endpoints } from '../config/';
import {
    ITagsGroupResponse,
    ITagsListResponse,
    ISingularTagsListResponse
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

  public getSingularTags(){
    return new Promise<IAPIResponse<ISingularTagsListResponse>>((resolve, reject) => {
          const apiEndPoint = endpoints.tags_addtagdirectory;

          this.getInstance().get(apiEndPoint).then((response) => {
              console.log('response ', response);
              
            const tagListResponse = {} as IAPIResponse<ISingularTagsListResponse>;
            tagListResponse.body = response.data.body;
            resolve(tagListResponse);
          }).catch((error) => {
            reject(error);
          });
    });
  }

  public searchTags(query: string){
    return new Promise<IAPIResponse<ITagsListResponse[]>>((resolve, reject) => {
      const apiEndPoint = endpoints.tags_searchtagsdirectory + '?query=' + query;
      this.getInstance().get(apiEndPoint).then((response) => {
        console.log('response ', response);
        
        const tagsResponse = {} as IAPIResponse<ITagsListResponse[]>;
        tagsResponse.body = response.data.body;
        resolve(tagsResponse);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  public updateTagsGroup(tagGroup: string, id: string){
    return new Promise<IAPIResponse<ITagsListResponse[]>>((resolve, reject) => {
      const apiEndPoint = endpoints.tags_tagsgrouping + '?groupId=' + id;
      this.getInstance().put(apiEndPoint, tagGroup).then((response) => {
        console.log('response from put method ', response);
        const tagsResponse = {} as IAPIResponse<ITagsListResponse[]>;
        tagsResponse.body = response.data.body;
        resolve(tagsResponse);
      }).catch((error) => {
        reject(error);
      });
    });
  }
}