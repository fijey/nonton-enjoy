<template>
    <v-app id="inspire">
      <v-system-bar class="secondary-color text-light">
        <v-row>
          <v-col class="website-title" style="text-align: left;">
            <span class="ms-2">BAKAnime - Streaming & Download Free Anime Subtitle Indonesia</span>
          </v-col>
          <v-col>
              <span class="ms-2">{{ currentTime }}</span>
          </v-col>
        </v-row>
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
  
      <v-navigation-drawer v-model="drawer" temporary class="secondary-color text-light">
        <v-list nav>
          <router-link to="/" class="text-decoration-none">
            <v-list-item class="text-light" prepend-icon="mdi-compass" title="Home" value="Home"></v-list-item>
          </router-link>
          <router-link to="/" class="text-decoration-none">
            <v-list-item class="text-light" prepend-icon="mdi-search-web" title="Cari Anime Yang Kamu Mau" value="Cari"></v-list-item>
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
  import { ref, watch, onMounted } from 'vue';
  import { debounce } from 'lodash';
  import api from '@/api/api';
  import endpoints from '@/api/api-endpoint';
  import {useSearchStore} from '@/store/searchResult';
  import { useRouter } from 'vue-router';
  
  const drawer = ref(null);
  const search = ref('');
  const searchResult = ref([]);
  const route = useRouter();
  let currentTime = ref('');
  
  onMounted(()=> {
    setInterval(() => {
      updateJam();
    }, 1000);
  })
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
    if(value.length > 0){
      useSearchStore().setData(value);
      route.push('/');
      console.log(useSearchStore().getSearch);
    }else{
      alert("Tidak Ada Hasil Pencarian");
    }


  }

  const updateJam = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      currentTime.value = `${hours}:${minutes}:${seconds}`;
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
  