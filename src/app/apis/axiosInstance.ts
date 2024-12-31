import axios from 'axios';
// import { GetCookies } from '@/app/services/CookiesManager';


const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    // const accessToken = GetCookies('accessToken')
    
    // const language = localStorage.getItem('language') || 'en';
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    // config.headers['Accept-Language'] = language;
    config.headers['Content-Type'] = 'application/json';

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
      const refreshToken = localStorage.getItem('refreshToken');
      try {
        const { data } = await axiosInstance.post('/auth/refresh-token', { token: refreshToken });
        localStorage.setItem('accessToken', data.accessToken);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Handle token refresh error (e.g., redirect to login)
      }
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;