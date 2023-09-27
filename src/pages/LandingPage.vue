<template>
  <LayoutComponent>
    <v-container v-if="isLoading">
      <SkeletonCardVue/>
    </v-container>
    <v-container v-else>
      <v-card>
        <v-tabs
          align-tabs="center"
          v-model="tab"
          bg-color="secondary-color"
          class="secondary-color text-light">
          <v-tab value="movies">Movies</v-tab>
          <v-tab value="series">Series</v-tab>
        </v-tabs>
        <v-tabs
          align-tabs="center"
          v-model="genre"
          bg-color="secondary-color"
          class="secondary-color text-light">
          <v-tab v-for="(gen,index) in defaultGenres" :key="index" :value="defaultGenres[index]">{{defaultGenres[index]}}</v-tab>
        </v-tabs>
  
        <v-card-text style="margin:0 !important; padding:0 !important;">
          <v-window v-model="tab"  class="primary-color text-light">
              <v-window-item value="movies">
                <v-container style="padding:60px">
                  <h1 class="font-weigh-bold">Movies - {{ genre }}</h1>
                  <SkeletonCard v-if="isLoading"/>
                  <v-row v-else>
                    <v-col v-for="item in movie" :key="item._id"
                    class="mt-2" cols="12" sm="6" lg="3" xl="2">
                        <CategoryMovieItemComponent :movie="item"/>
                    </v-col>  
                  </v-row>
                </v-container>
              </v-window-item>
              <v-window-item value="series">
                <v-container style="padding:60px">
                  <h1 class="font-weigh-bold">Series {{ genre }}</h1>
                  <SkeletonCard v-if="isLoading"/>
                  <v-row v-else>
                    <v-col v-for="item in movie" :key="item._id"
                    class="mt-2" cols="12" sm="6" lg="3" xl="2">
                        <CategoryMovieItemComponent :movie="item"/>
                    </v-col>  
                  </v-row>
                </v-container>
              </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>
    </v-container>
  </LayoutComponent>

</template>

<script setup>
import { onMounted,ref } from 'vue';
import { watch } from 'vue';
import api from '@/api/api';
import endpoint from '@/api/api-endpoint';
import LayoutComponent from '@/components/layouts/LayoutComponent.vue';
import CategoryMovieItemComponent from '@/components/CategoryMovieItemComponent.vue';
import SkeletonCardVue from '@/components/loading/SkeletonCard.vue';
import {useGenresStore} from '@/store/genresResult';

const movie = ref([]);
const genres = ref([]);
const genre = ref('popular');
const isLoading = ref(true);
const tab = ref('movies');
const defaultGenres = useGenresStore().getDefaultGenres;

onMounted(async ()=> {
  getMovieOrSeries(genre.value);
  getGenres();
});

const getGenres = async () => {
   const data =  await api.get(endpoint.getGenres());
   genres.value = data.data;
}
const getMovieByGenre = async () => {
   const data =  await api.get(endpoint.getMovieByGenre(genre.value));
   movie.value = data.data;
   isLoading.value = false;
}

const getMovieByDefaultGenre = async () => {
  const data =  await api.get(endpoint.getMovieByDefaultGenre(genre.value));
   movie.value = data.data;
   isLoading.value = false;
}
const getSeriesByDefaultGenre = async () => {
  const data =  await api.get(endpoint.getSeriesByDefaultGenre(genre.value));
   movie.value = data.data;
   isLoading.value = false;
}

const getMovieOrSeries = (value) => {
  if(tab.value == "movies"){
      if(defaultGenres.includes(value)){
        getMovieByDefaultGenre();
      }else{
        getMovieByGenre();
      }
  }else{
      if(defaultGenres.includes(value)){
        getSeriesByDefaultGenre();
      }
    }
}

watch(tab, () => {
isLoading.value = true;
getMovieOrSeries(genre.value);
});

watch(genre,(value) => {
    isLoading.value =true;

    getMovieOrSeries(value);
})
</script>