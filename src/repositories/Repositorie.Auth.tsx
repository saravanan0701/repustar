import { BaseApi } from '../api/Base.API';
import { endpoints } from '../config/';
import {
  ILoginRequest,
  ILoginResponse,
} from '../interfaces/Interface.Auth';
import { IAPIResponse } from '../interfaces/Interface.API';

export class RepositorieAuth extends BaseApi {
  public login(email: string, password: string) {
    return new Promise<IAPIResponse<ILoginResponse>>((resolve, reject) => {
        const data: ILoginRequest = {
            foo1: 'bar1',
            foo2: 'bar2'
          };

          this.getInstance().post(endpoints.login, data).then((response) => {
            const loginResponse = {} as IAPIResponse<ILoginResponse>;
            loginResponse.body = response.data.data;
            resolve(loginResponse);
          }).catch((error) => {
            reject(error);
          });
    });
  }

  public logout() {
    return new Promise((resolve, reject) => {
      localStorage.removeItem('repustart_token');
      resolve();
    });
  }

}