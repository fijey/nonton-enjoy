<template>
  <LayoutComponent>
    <v-container v-if="searchResult.length > 0">
      <v-btn @click="resetSearch()">Bersihkan Hasil Pencarian</v-btn>
      <h1 class="font-weigh-bold">Hasil Pencarian</h1>

      <SkeletonCard v-if="isLoading"/>
      <v-row v-else>
        <v-col v-for="item in searchResult" :key="item.title"
         class="mt-2" cols="12" sm="6" md="4" lg="3" xl="2">
            <MovieItemComponent :movie="item"/>
        </v-col>
       
      </v-row>
    </v-container>
    <v-card>
      <v-tabs
        v-model="tab"
        bg-color="secondary-color"
        class="secondary-color text-light"
      >
        <v-tab value="on-going">On Going Anime</v-tab>
        <v-tab value="complete">Complete Anime</v-tab>
        <v-tab v-for="genre in genres" :value="genre.slug" :key="genre.slug">{{ genre.name }}</v-tab>
      </v-tabs>

      <v-card-text style="margin:0 !important; padding:0 !important;">
        <v-window v-model="tab" class="primary-color text-light">
          <v-window-item value="on-going">
            <v-container style="padding:60px">
              <h1 class="font-weigh-bold" style="margin-bottom: 20px;">Ongoing Anime</h1>
              <SkeletonCard v-if="isLoading"/>
              <v-row v-else>
                <v-col v-for="item in dataAnime" :key="item.title"
                class="mt-2" cols="12" sm="6" md="4" lg="3" xl="2">
                    <MovieItemComponent :movie="item"/>
                </v-col>       
            </v-row>
            </v-container>
          </v-window-item>

          <v-window-item value="complete">
            <v-container style="padding:60px">
              <h1 class="font-weigh-bold">Completed Anime</h1>
              <SkeletonCard v-if="isLoading"/>
              <v-row v-else>
                <v-col v-for="item in dataAnime" :key="item.title"
                class="mt-2" cols="12" sm="6" md="4" lg="3" xl="2">
                    <CompleteMovieItemComponent :movie="item"/>
                </v-col>  
              </v-row>
            </v-container>
          </v-window-item>

            <v-window-item v-for="genre in genres" :value="genre.slug" :key="genre.slug">
              <v-container style="padding:60px">
                <h1 class="font-weigh-bold">{{tab}}</h1>
                <SkeletonCard v-if="isLoading"/>
                <v-row v-else>
                  <v-col v-for="item in dataAnime" :key="item.title"
                  class="mt-2" cols="12" sm="6" lg="3" xl="2">
                      <CategoryMovieItemComponent :movie="item"/>
                  </v-col>  
                </v-row>
              </v-container>
            </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
    <div class="text-center">
      <v-pagination
        v-model="page"
        :length="pagination.last_visible_page ?? 1"
        :total-visible="4"
      ></v-pagination>
    </div>
  </LayoutComponent>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import LayoutComponent from '@/components/layouts/LayoutComponent.vue';
import MovieItemComponent from '@/components/MovieItemComponent.vue';
import CompleteMovieItemComponent from '@/components/CompleteMovieItemComponent.vue';
import CategoryMovieItemComponent from '@/components/CategoryMovieItemComponent.vue';
import SkeletonCard from '@/components/loading/SkeletonCard.vue';
import api from '@/api/api.js';
import endpoint from '@/api/api-endpoint.js';
import { useSearchStore } from '@/store/searchResult';
import { useGenresStore } from '@/store/genresResult';
import { useLayoutComponentStore } from '@/store/layoutComponent';
import { storeToRefs } from 'pinia';

const dataAnime = ref([]);
const genres = ref([]);
const isLoading = ref(true);

const tab = ref('on-going');
const page = ref(1);
const pagination = ref({});
const searchResult = ref([]);

const searchStore = useSearchStore();
const genresStore = useGenresStore();
const layoutComponentStore = useLayoutComponentStore();

const {getSearch} = storeToRefs(searchStore);
const {getGenres} = storeToRefs(genresStore);
const genreActive = computed(()=> layoutComponentStore.genreActive);

onMounted(async () => {
  try {

    if(getSearch.value.length > 0){
      searchResult.value = getSearch.value;
    }

    if(getGenres.value.length < 1){
      const responseGenres = await api.get(endpoint.getGenres());
      genres.value = responseGenres.data.data;
      genresStore.setGenres(genres.value);
      console.log("if");
    }else{
      console.log("else");
      genres.value = getGenres.value;
    }
    getData(page.value);
    // homes.value.completed_anime = response.data.data.complete_anime;


  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

watch(getSearch, (value) => {
    if(value.length > 0){
      searchResult.value = value;
    }
})

watch(page, (value) => {
    isLoading.value  = true;
    getData(value);
})

watch(genreActive, (value) => {
  tab.value = value;
})
watch(tab, () => {
    isLoading.value  = true;
    getData(1);
})

const resetSearch = () => {
  console.log("BUTTON DI KLIK");
  searchResult.value = [];
  useSearchStore().setEmpty();
}

const getData = async (page) => {
  let response;
  if(tab.value == "on-going"){
       response = await api.get(endpoint.getOngoing()+'/'+page);
  }else if (tab.value == "complete"){
       response = await api.get(endpoint.getComplete()+'/'+page);
  }else{
      response = await api.get('genres'+'/'+tab.value+'/'+page);
    }

    if(tab.value != "on-going" && tab.value != "complete"){
      dataAnime.value = response.data.data.anime;
      pagination.value = response.data.data.pagination;
    }else{
      dataAnime.value = response.data.data;
      pagination.value = response.data.pagination;
    }
    isLoading.value =false;
}
</script>
