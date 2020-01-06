import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { baseUrl } from '../config';
// import { IAPIRequest } from '../interfaces/Interface.API';

const clientConfig: AxiosRequestConfig = {
  baseURL: baseUrl,
  headers:{
    'Content-Type': 'application/json',
  },
};

export const HTTP: AxiosInstance = axios.create(clientConfig);