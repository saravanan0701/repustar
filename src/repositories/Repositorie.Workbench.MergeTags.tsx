import { BaseApi } from '../api/Base.API';
import { endpoints } from '../config/';
import {
    ITagsGroupResponse,
    ITagsListResponse,
    ISingularTagsListResponse
} from '../interfaces/Interface.Tags.MergeTags';
import { IAPIResponse } from '../interfaces/Interface.API';
import { loadingBarFill } from '@aws-amplify/ui';

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

  public getSingularTags(last_evaluated_key: string){
    return new Promise<IAPIResponse<ISingularTagsListResponse>>((resolve, reject) => {
          console.log('last_evaluated_key ', last_evaluated_key.length);
          
          let apiEndPoint = ''
          if(last_evaluated_key.length > 0){
            apiEndPoint = endpoints.tags_addtagdirectory + '?LastEvaluatedKey=' + last_evaluated_key;
          }else{
            apiEndPoint = endpoints.tags_addtagdirectory;
          }
          
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
    console.log('tagGroup ', tagGroup);
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

  public removeTagFromGroup(tag: string, groupId: string, validated_tags_list: []){
    return new Promise<IAPIResponse<ISingularTagsListResponse>>((resolve, reject) => {
      const apiEndPoint = endpoints.tags_addtagdirectory;

      const data = {
        'is_removed': 1,
        'tag': tag,
        'group_id': groupId,
        'validated_tags_list': validated_tags_list
      }

      this.getInstance().put(apiEndPoint, data).then((response) => {
        const tagListResponse = {} as IAPIResponse<ISingularTagsListResponse>;
        tagListResponse.body = response.data.body;
        resolve(tagListResponse);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  public deleteTagFromDirectory(tag: string){
    return new Promise<IAPIResponse<ISingularTagsListResponse>>((resolve, reject) => {
      const apiEndPoint = endpoints.tags_addtagdirectory;

      const data = {
        'is_deleted': 1,
        'tag': tag
      }

      this.getInstance().put(apiEndPoint, data).then((response) => {
        const tagListResponse = {} as IAPIResponse<ISingularTagsListResponse>;
        tagListResponse.body = response.data.body;
        resolve(tagListResponse);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  public saveTagsGroup(tagGroup: string, tag_type: string, group_name: string ){
    const data = {
      'user_id' : localStorage.getItem('user_id'),
      'tag_type' : tag_type,
      'group_name': group_name,
      'tags_group': tagGroup
    }
    return new Promise<IAPIResponse<ITagsListResponse[]>>((resolve, reject) => {
      const apiEndPoint = endpoints.tags_tagsgrouping;
      this.getInstance().post(apiEndPoint, data).then((response) => {
        console.log('response from put method ', response);
        const tagsResponse = {} as IAPIResponse<ITagsListResponse[]>;
        tagsResponse.body = response.data.body;
        resolve(tagsResponse);
      }).catch((error) => {
        reject(error);
      });
    });
  }

  public saveTags(tag: string, tag_type: string){
    const data = {
      'user_id' : localStorage.getItem('user_id'),
      'tag_type' : tag_type,
      'tag': tag,
      'tag_std': tag,
      'source': `user workbench ${localStorage.getItem('user_id')}`,
      'is_grouped': 0,
      'conditional_delete': 0
    }
    
    return new Promise<IAPIResponse<ITagsListResponse[]>>((resolve, reject) => {
      const apiEndPoint = endpoints.tags_addtagdirectory;
      this.getInstance().post(apiEndPoint, data).then((response) => {
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