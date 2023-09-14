<template>
    <v-app id="inspire">
      <v-system-bar class="secondary-color text-light">
        <v-spacer></v-spacer>
        <span class="ms-2">3:13PM</span>
      </v-system-bar>
  
      <v-app-bar app class="primary-color text-light">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-app-bar-title class="website-title">BAKAnime</v-app-bar-title>
        <v-app-bar-title class="website-title"></v-app-bar-title>
        <v-app-bar-title class="website-title"></v-app-bar-title>
        <v-app-bar-title class="website-title"></v-app-bar-title>
        <v-text-field
        style="margin-top: 20px;"
          v-model="search"
          label="Search"
          single-line
        ></v-text-field>
        <v-btn icon="mdi-dots-vertical"></v-btn>
      </v-app-bar>
  
      <v-navigation-drawer v-model="drawer" temporary>
        <v-list nav>
          <router-link to="/" style="text-decoration: none;">
            <v-list-item prepend-icon="mdi-compass" title="Discover" value="discover"></v-list-item>
          </router-link>
          <router-link to="/playlist">
            <v-list-item prepend-icon="mdi-playlist-star" title="Playlist" value="playlist"></v-list-item>
          </router-link>
        </v-list>
      </v-navigation-drawer>
  
      <v-main class="primary-color text-light">
        <slot></slot>
      </v-main>

      
        <v-footer
          class="secondary-color text-light"
        >
          <div>
            <v-btn
              v-for="icon in icons"
              :key="icon"
              class="mx-4"
              :icon="icon"
              variant="text"
            ></v-btn>
          </div>

          <div class="pt-0" style="text-align: center; padding: 40px;">
            Bakanime: Tersedia Terlengkap untuk Mengunduh Batch Anime dengan Subtitle Indonesia

Selamat datang di Bakanime, tempat utama untuk mengunduh batch anime dengan subtitle Indonesia. Kami bertekad menjadi pusat database anime yang beragam. Dengan koleksi yang mencakup tahun 1979 hingga 2022, kami menawarkan lebih dari 3.000 judul anime yang dapat Anda unduh melalui platform seperti Google Drive, Mega.nz, dan lainnya.

Kami dengan bangga menyebut diri kami sebagai "basecamp Anime," sumber utama Anda untuk semua hal terkait anime. Jelajahi dunia animasi Jepang dengan Bakanime dan nikmati akses mudah ke serial favorit Anda.
          </div>

        </v-footer>

    </v-app>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { debounce } from 'lodash';
  import api from '@/api/api';
  import endpoints from '@/api/api-endpoint';
  import {useSearchStore} from '@/store/searchResult';
  import { useRouter } from 'vue-router';
  
  const drawer = ref(null);
  const search = ref('');
  const searchResult = ref([]);
  const route = useRouter();
  
  // Membuat fungsi debounce dengan waktu penundaan 2 detik (2000 ms)
  const debouncedSearch = debounce(async () => {
    try {
      const response = await api.get(endpoints.getSearch() + '/' + search.value);
      searchResult.value = response.data.data;
      sendSearchValue(searchResult.value);
      console.log(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, 2000);
  
  watch(search, () => {
    debouncedSearch();
  });
  
  function sendSearchValue(value) {
    useSearchStore().setData(value);

    route.push('/');

    console.log(useSearchStore().getSearch);
  }
  </script>

  <style>
/* Saat layar kurang dari 600px (perangkat mobile) */
@media (max-width: 600px) {
  .website-title {
    display: none;
  }
}
</style>
  