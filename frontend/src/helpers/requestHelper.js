import axios from 'axios';
import { getToken, saveToken } from './localStorage';
import { refreshToken } from '../features/User/userApi';

// TODO: Add interceptor to refresh token
// TODO: Add BASEURL

export const IMAGE_DIR = window.location.origin.includes('localhost')
  ? 'http://localhost:3000/images/'
  : window.location.origin + 'images/'

export const DOWNLOAD_DIR = window.location.origin.includes('localhost')
  ? 'http://localhost:3000/drops/'
  : window.location.origin + 'drops/'

const BASE_URL = window.location.origin.includes('localhost') 
  ? 'http://localhost:3000/api/v1' 
  : '/api/v1'

//@todo Figure which campus api url to put here
export const CAMPUS_API = window.location.origin.includes('localhost') 
  ? 'http://localhost:4000/api/v1' 
  : ''

const requestHelper = axios.create({
  baseURL: BASE_URL,
});

requestHelper.interceptors.request.use(function(config) {
  // resets token in case user hard refreshes the page
  const token = getToken().access_token;
  config.headers.common['Authorization'] = token
    ? `Bearer ${token}`
    : '';
  return config;
});

requestHelper.interceptors.response.use(
  (response) => {
    return response;
  },

  async (error) => {
    console.log(error)
    const originalConfig = error.config;
    if (error.response) {
      if (error.response.status === 401 && !originalConfig.retry) {
        console.log("Going to try again...")
        originalConfig._retry = true;
        return handleRefreshToken(originalConfig);
      } else {
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

async function handleRefreshToken(originalConfig) {
  const response = await refreshToken({
    refreshToken: getToken() ?.refresh_token,
  });
  console.log(response)
  const token = response.data;
  const { access_token } = token;
  saveToken(token);

  originalConfig.headers.Authorization = `Bearer ${access_token}`;
  return requestHelper(originalConfig);
}

export default requestHelper;
