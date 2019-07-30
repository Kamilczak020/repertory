import axios, { AxiosRequestConfig } from 'axios';
import * as qs from 'qs';

export abstract class API {
  public static post(route: string, body?: object, config?: AxiosRequestConfig) {
    const uri = 'http://localhost:3001';

    return axios.post(uri + route, qs.stringify(body), {
      responseType: 'json',
      withCredentials: true,
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      ...config
    });
  }
}
