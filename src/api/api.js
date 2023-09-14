// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://otakudesu-unofficial-api.rzkfyn.xyz/api/v1/', // Ganti dengan URL base API server Anda
  timeout: 10000, // Waktu timeout untuk permintaan
});

export default api;
