import axios from 'axios';

export const axiosClient = axios.create({
  baseURL: 'http://35.223.230.120', // Don't include trailing backslash
  timeout: 1000,
});
