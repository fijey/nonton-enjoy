// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://bioskop.bakanime.my.id/', // Ganti dengan URL base API server Anda
  timeout: 60000, // Waktu timeout untuk permintaan
});

export default api;
