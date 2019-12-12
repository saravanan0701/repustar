export interface IAPIRequest<T> {
    data: T;
    token: any;
  }
  
  export interface IAPIResponse<T> {
    error: string;
    data: T;
  }