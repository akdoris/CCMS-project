import axios from 'axios';

// This points to your ccms-backend (running on port 5000)
const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Automatically attach the JWT token to every request if the user is logged in
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token && req.headers) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;