import { createRouter, createWebHistory } from 'vue-router';
import SearchPage from "@/pages/SearchPage.vue";
import RegisterPage from "@/pages/RegisterPage.vue";
import LandingPage from "@/pages/LandingPage.vue";
import MovieDetailPage from "@/pages/MovieDetailPage.vue";


const routes = [
  { path: '/', component: LandingPage,name: 'landingpage' },
  { path: '/detail/:type/:slug', component: MovieDetailPage,name: 'detail' },
  { path: '/search', component: SearchPage,name: 'search' },
  { path: '/register', component: RegisterPage,name: 'register' },
  // Tambahkan rute-rute lain di sini
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guard untuk memeriksa autentikasi sebelum navigasi ke rute yang memerlukan autentikasi
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');

  if (to.meta.requiresAuth) {
    if (token) {
      next(); // Lanjutkan navigasi jika token ada
    } else {
      next('/login'); // Alihkan ke halaman login jika token tidak ada
    }
  } else {
    next(); // Lanjutkan navigasi untuk rute lainnya
  }
});

export default router;
