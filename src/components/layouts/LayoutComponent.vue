<template>
    <v-app id="inspire">
      <v-system-bar class="secondary-color text-light">
        <v-spacer></v-spacer>
        <span class="ms-2">3:13PM</span>
      </v-system-bar>
  
      <v-app-bar app class="primary-color text-light">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-app-bar-title>Nonton Enjoy</v-app-bar-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
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
    </v-app>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { debounce } from 'lodash';
  import api from '@/api/api';
  import endpoints from '@/api/api-endpoint';
  import {useSearchStore} from '@/store/searchResult';
  
  const drawer = ref(null);
  const search = ref('');
  const searchResult = ref([]);
  
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


    console.log(useSearchStore().getSearch);
  }
  </script>
  