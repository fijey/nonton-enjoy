// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://otakudesu-unofficial-api.rzkfyn.xyz/v1/', // Ganti dengan URL base API server Anda
  timeout: 60000, // Waktu timeout untuk permintaan
});

export default api;
