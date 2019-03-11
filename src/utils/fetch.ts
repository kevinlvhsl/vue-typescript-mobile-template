import axios from 'axios';
import { Toast } from 'vant';
import { getToken } from '@/utils/auth';

const service = axios.create({
  baseURL: process.env.VUE_APP_MOCK_API,
  timeout: 5000,
});

// Request interceptors
service.interceptors.request.use(
  (config) => {
    if (config.params && config.params.hideLoading) {
      // showLoading = false
      delete config.params.hideLoading;
    } else {
      // Indicator.open()
    }
    // Add X-Token header to every request, you can add other custom headers here
    config.headers.Authorization = window.sessionStorage.TOKEN
    || `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1aWQiOiI1YjlmODI5YTliM2JlNDAw
MDFiNDZkOGEiLCJpc3MiOiJodHRwOi8vd3d3Lnpob25nYW4uY29tLyIsImV4cCI6MTU0NzgwNzAwMSw
iaWF0IjoxNTQ1MjE1MDAxLCJqdGkiOiJjMWU3MGNjZi1jODVmLTRlNjEtODMxNi04MTZiMTdjZDA4Y
zkifQ.AyKDNwfuNDmj1esMYWtoxgSFiTX-PgLi4TcpiHE1Z5o`;
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
