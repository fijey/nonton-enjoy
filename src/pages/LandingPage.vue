<template>
  <LayoutComponent>
    <v-container v-if="searchResult.length > 0">
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
            <v-container>
              <h1 class="font-weigh-bold">Ongoing Anime</h1>
              <SkeletonCard v-if="isLoading"/>
              <v-row v-else>
                <v-col v-for="item in homes.ongoing_anime" :key="item.title"
                class="mt-2" cols="12" sm="6" md="4" lg="3" xl="2">
                    <MovieItemComponent :movie="item"/>
                </v-col>       
            </v-row>
            </v-container>
          </v-window-item>

          <v-window-item value="complete">
            <v-container>
              <h1 class="font-weigh-bold">Completed Anime</h1>
              <SkeletonCard v-if="isLoading"/>
              <v-row v-else>
                <v-col v-for="item in homes.completed_anime" :key="item.title"
                class="mt-2" cols="12" sm="6" md="4" lg="3" xl="2">
                    <CompleteMovieItemComponent :movie="item"/>
                </v-col>  
              </v-row>
            </v-container>
          </v-window-item>

            <v-window-item v-for="genre in genres" :value="genre.slug" :key="genre.slug">
              {{genre.name}}
            </v-window-item>
        </v-window>
      </v-card-text>
    </v-card>
  </LayoutComponent>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import LayoutComponent from '@/components/layouts/LayoutComponent.vue';
import MovieItemComponent from '@/components/MovieItemComponent.vue';
import CompleteMovieItemComponent from '@/components/CompleteMovieItemComponent.vue';
import SkeletonCard from '@/components/loading/SkeletonCard.vue';
import api from '@/api/api.js';
import endpoint from '@/api/api-endpoint.js';
import { useSearchStore } from '@/store/searchResult';
import { useGenresStore } from '@/store/genresResult';
import { storeToRefs } from 'pinia';

const homes = ref({ ongoing_anime: [], completed_anime: [] });
const genres = ref([]);
const isLoading = ref(true);

const tab = ref(null);
const searchResult = ref([]);

const searchStore = useSearchStore();

const genresStore = useGenresStore();

const {getSearch} = storeToRefs(searchStore);
const {getGenres} = storeToRefs(genresStore);

onMounted(async () => {
  try {
    console.log(getGenres.value.length);
    if(getGenres.value.length < 1){
      const responseGenres = await api.get(endpoint.getGenres());
      genres.value = responseGenres.data.data;
      genresStore.setGenres(genres.value);
      console.log("if");
    }else{
      console.log("else");
      genres.value = getGenres.value;
    }
    const response = await api.get(endpoint.getHome());
    homes.value.ongoing_anime = response.data.data.ongoing_anime;
    homes.value.completed_anime = response.data.data.complete_anime;

    isLoading.value = false;

  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

watch(getSearch, (value) => {
    if(value.length > 0){
      searchResult.value = value;
    }
})
</script>
