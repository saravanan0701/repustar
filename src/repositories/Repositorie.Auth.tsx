import { BaseApi } from '../api/Base.API';
import {
  ILoginRequest,
  ILoginResponse,
} from '../interfaces/Interface.Auth';
import { IAPIResponse } from '../interfaces/Interface.API';

export class RepositorieAuth extends BaseApi {
  public login(email: string, password: string) {
    return new Promise<IAPIResponse<ILoginResponse>>((resolve, reject) => {
        const data: ILoginRequest = {
            username: email,
            password: password,
          };

          this.getInstance().post('auth_login', data).then((response) => {
            const loginResponse = {} as IAPIResponse<ILoginResponse>;
            loginResponse.data = response.data.data;
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