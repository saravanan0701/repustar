import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { api } from '../config';
import { IAPIRequest } from '../interfaces/Interface.API';

const clientConfig: AxiosRequestConfig = {
  baseURL: api,
  headers:{
    'Content-Type': 'application/json',
  },
  transformRequest: [
    (data:any) => {
      const token = localStorage.getItem('repustar_token');
      const request: IAPIRequest<any> = {
        data: data,
        token: token
      };
      return JSON.stringify(request);
    },
  ],
};

export const HTTP: AxiosInstance = axios.create(clientConfig);