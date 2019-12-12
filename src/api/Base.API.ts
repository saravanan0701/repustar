import { HTTP } from './Axios.Singleton';
export class BaseApi {
  protected getInstance() {
    return HTTP;
  }
}