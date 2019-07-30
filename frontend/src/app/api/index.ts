import axios, { AxiosRequestConfig } from 'axios';

export abstract class API {
  public static post(route: string, body?: any, config?: AxiosRequestConfig) {
    const uri = 'http://localhost:3001';

    return axios.post(uri + route, body, {
      responseType: 'json',
      withCredentials: true,
      ...config
    });
  }

  public static get(route: string, config?: AxiosRequestConfig) {
    const uri = 'http://localhost:3001';

    return axios.get(uri + route, {
      responseType: 'json',
      withCredentials: true,
      ...config
    });
  }
}
