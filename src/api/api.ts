// src/api/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://supercultivated-neumic-rose.ngrok-free.dev',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
