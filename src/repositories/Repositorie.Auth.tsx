import { BaseApi } from '../api/Base.API';
import { Auth } from "aws-amplify";

export class RepositorieAuth extends BaseApi {
  public login(email: string, password: string) {
    return new Promise((resolve, reject) => {
        Auth.signIn(email, password).then((response) =>{
          resolve(response);
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