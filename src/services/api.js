import axios from 'axios';

const API = axios.create({
  baseURL: 'https://taskapp-backend.onrender.com/api',
});

// Automatically attach token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
