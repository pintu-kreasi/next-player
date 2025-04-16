import axios from 'axios';
import { GetCookies, RemoveCookies } from '@/app/services/CookiesManager';
import { permanentRedirect, redirect } from 'next/navigation'


const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  async(config) => {
    // const accessToken = localStorage.getItem('accessToken');
    const accessToken = await GetCookies('accessToken')
    
    // const language = localStorage.getItem('language') || 'en';
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    // config.headers['Accept-Language'] = language;
    config.headers['Content-Type'] = 'application/json';
    console.log({config})

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // const refreshToken = localStorage.getItem('refreshToken');
      const refreshToken = await GetCookies('accessToken')
      try {
        // const { data } = await axiosInstance.post('/refresh-token', { token: refreshToken });
        const { data } = await axiosInstance.get('/refresh-token');
        localStorage.setItem('accessToken', data.accessToken);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle token refresh error (e.g., redirect to login)
        console.log('refresh token error')
        RemoveCookies('accessToken')
        var baseUrl = window.location.protocol;
        window.location.replace(baseUrl+'/auth/login');        
      }
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;