import axios from 'axios';
import { Toast } from 'vant';
import { getToken } from '@/utils/auth';

const service = axios.create({
  baseURL: process.env.VUE_APP_MOCK_API,
  timeout: 10 * 1000,
});

// Request interceptors
service.interceptors.request.use(
  (config) => {
    if (config.params && config.params.hideLoading) {
      // showLoading = false
      delete config.params.hideLoading;
    } else {
      Toast({ type: 'loading' , duration: 10 * 1000})
    }
    // Add Token header to every request, you can add other custom headers here
    config.headers.TOKEN = window.sessionStorage.TOKEN;
    return config;
  },
  (error) => {
    Toast({
      message: error.message,
      duration: 3 * 1000,
    });
    Promise.reject(error);
  },
);

// Response interceptors
service.interceptors.response.use(
  (response) => {
    // You can change this part for your own usage.
    const res = response.data;
    if (res.code !== 0) {
      Toast({
        message: res.message,
        type: 'error',
        duration: 5 * 1000,
      });
      return Promise.reject('error with code: ' + res.code);
    } else {
      return response.data;
    }
  },
  (error) => {
    Toast({
      message: error.message,
      type: 'error',
      duration: 4 * 1000,
    });
    return Promise.reject(error);
  },
);

export default service;
