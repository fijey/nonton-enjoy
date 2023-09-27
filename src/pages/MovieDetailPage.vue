<template>
    <LayoutComponent>
      <v-container v-if="isLoading">
            <v-row>
              <v-col cols="12" md="6">
                <v-skeleton-loader :elevation="9" class="secondary-color" style="height:100%" type="card"></v-skeleton-loader>
              </v-col>

              <v-col cols="12" md="6" style="line-height: 2rem;">
                <v-skeleton-loader class="secondary-color" type="paragraph"></v-skeleton-loader> <br>
                <v-skeleton-loader class="secondary-color" type="paragraph"></v-skeleton-loader> <br>
                <v-skeleton-loader class="secondary-color" type="paragraph"></v-skeleton-loader> <br>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div>
                    <v-card :elevation="20" style="padding:20px" class="secondary-color text-light">
                      <p><strong>Synopsis:</strong> {{ movieData.synopsis }}</p>
                    </v-card>
                </div>
              </v-col>
            </v-row>
            <div>
              <v-skeleton-loader v-if="isLoading" :elevation="9" class="secondary-color" style="height:100%" type="card"></v-skeleton-loader>
              <v-row v-else>
                  <h3 class="headline">Straming Disini</h3> <br>
                  <v-col cols="12" sm="12" md="12" lg="12">
                    <v-combobox
                    v-model="selectEpisode"
                    clearable
                    label="Mau Nonton Episode Berapa ? "
                    :items= episode_lists
                    variant="solo-filled"
                  ></v-combobox>
                  </v-col>
                  <v-col cols="12" sm="12" md="12" lg="12">
                    <h5>
                      {{ selectEpisode }}
                    </h5> 
                      <iframe :src="moviePlay.stream_url" width="100%" height="500px" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>
  <!--                     
                      <iframe allow="fullscreen 'self'" :src="moviePlay.stream_url" frameborder="0" style="width:100%; height:500px;">
  
                      </iframe> -->
                  </v-col>
              </v-row>
            </div>
            <div style="margin-top:20px;margin-bottom:20px"></div>
            
            <h3 class="headline">Recommendations</h3>
            <v-row>
            <v-col v-for="recommendation in movieData.recommendations" :key="recommendation.title" cols="12" sm="6" md="3">
              <MovieItemComponent :movie="recommendation" @click="changeSlug(recommendation.slug)" />
            </v-col>
            </v-row>
      </v-container>
      <v-container v-else>
            <v-row>
              <v-col cols="12" md="6">
                <v-card style="background-color: rgba(240, 248, 255, 0);">
                <div class="text-center d-flex justify-center">
                  <v-img :src="movieData.posterImg" alt="Movie Poster" style="height: 60vh !important;"></v-img>
                </div>
              </v-card>
              </v-col>

              <v-col cols="12" md="6" style="line-height: 2rem;">
                  <h1 class="headline">{{ movieData.title }}</h1>
                  <p>{{ movieData.japanese_title }}</p>
                  <p><strong>Rating:</strong> {{ movieData.rating }}</p>
                  <p><strong>Director: </strong>  
                    <span v-for="(director,index) in movieData.directors" :key="index">
                      {{ movieData.directors[index] }}
                      <span v-if="index != movieData.directors.length - 1">, </span>
                    </span>
                  </p>
                  <p><strong>Director: </strong>  
                    <span v-for="(cast,index) in movieData.casts" :key="index">
                      {{ movieData.casts[index] }}
                      <span v-if="index != movieData.casts.length - 1">, </span>
                    </span>
                  </p>
                  <p><strong>Type:</strong> {{ movieData.type }}</p>
                  <p><strong>Resolution Quality:</strong> {{ movieData.quality }}</p>
                  <p><strong>Episode Count:</strong> {{ movieData.episode_count }}</p>
                  <p><strong>Duration:</strong> {{ movieData.duration }}</p>
                  <p><strong>Release Date:</strong> {{ movieData.releaseDate }}</p>
                  <p><strong>Countries: </strong> 
                    <span v-for="(countrie,index) in movieData.countries" :key="index">
                      {{ movieData.countries[index] }}
                      <span v-if="index != movieData.countries.length - 1">, </span>
                    </span>
                  </p>
                  <p><strong>Genres:</strong> <br>
                    <v-chip v-for="(genre,index) in movieData.genres" :key="index" variant="elevated"
                        size="x-small" max-lines="1">
                          {{ movieData.genres[index] }}
                    </v-chip>
                  </p>
                  <div style="margin-bottom:20px" v-if="movieData.seasons">
                        <span v-for="(season,index) in movieData.seasons" :key="index">
                            <strong>Season : </strong> {{ season.season }} <br>
                            <strong>Total Episode : </strong> {{ season.totalEpisodes }}
                        </span>
                  </div>
                  <!-- <p><strong>Batch Uploaded:</strong> {{ movieDataData.batch.uploaded_at }}</p> -->
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <div>
                    <v-card :elevation="20" style="padding:20px" class="secondary-color text-light">
                      <p><strong>Synopsis:</strong> {{ movieData.synopsis }}</p>
                    </v-card>
                </div>
              </v-col>
            </v-row>
            <div v-if="movieData.seasons" style="margin-top:40px">
                  <v-select
                    v-model = seasons_choose
                    label="Pilih Season"
                    :items="seasons_option"
                    variant="solo-filled"
                  ></v-select>
                  <v-select
                    v-model = episodes_choose
                    label="Pilih Episode"
                    :items="episodes_option"
                    variant="solo-filled"
                  ></v-select>
            </div>
            <v-row>
              <v-col cols="12" sm="12" md="12" lg="12">
                  <h3>Season {{ seasons_choose }} Episode {{ episodes_choose }}</h3>
                  <v-container v-for="movie in moviePlay" :key="movie.provider">
                    <a :href="movie.url" target="_blank" style="text-decoration:none">
                      <v-chip role="button" x-size="large" class="secondary-color text-light">
                        {{ movie.provider }} <br>
                      </v-chip>
                    </a><br>
                    Tersedia Resolusi <br>
                    <span v-for="(resolusi,index) in movie.resolutions" :key="index">
                      {{ resolusi }} <br>
                    </span>
                  </v-container>
                </v-col>
            </v-row>
      </v-container>
    </LayoutComponent>
  </template>
  
  <script setup>
  import { ref, onMounted,watch,computed } from 'vue';
  import LayoutComponent from '@/components/layouts/LayoutComponent.vue';
  import MovieItemComponent from '@/components/MovieItemComponent.vue';
  import api from '@/api/api.js';
  import endpoint from '@/api/api-endpoint.js';
  import { useRoute } from 'vue-router';
  import { useHead } from '@vueuse/head';
  
  const selectEpisode = ref('');
  const movieData = ref([]);
  const moviePlay = ref([]);
  const streamingMode = ref(true);
  const isLoading = ref(true);
  const episode_lists = ref([]);

  const seasons_option = ref([]);
  const episodes_option = ref([]);

  const seasons_choose = ref(1);
  const episodes_choose = ref(1);
  
  const route = useRoute();
  const movieSlug = ref(route.params.slug);
  const typeSlug = ref(route.params.type);

  
  onMounted(async () => {
    useHead({
      // Can be static or computed
      title: computed(() => movieData.value.title),
      meta: [
          {
            name: `description`,
            content: computed(() => movieData.value.title),
          },
          {
            name: `keywords`,
            content: computed(() => movieData.value.title),
          },
          {
            property: `og:title`,
            content: computed(() => 'BAKANIME  '+movieData.value.title),
          },
          {
            property: `og:description`,
            content: computed(() => movieData.value.synopsis ?? movieData.value.title),
          },
          // {
          //   property: `og:image`,
          //   content: computed(() => movieData.value.poster),
          // },
        ],
     
    })
    try {
      await playMovie(seasons_choose.value,episodes_choose.value);
      // await changeEpisode(movieData.value.episode_lists[0].slug.split('/')[3]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });

  watch(selectEpisode, (value) => {
    console.log(value);
    isLoading.value = true;
    changeEpisode(value);
})
  watch(movieSlug, (value) => {
    console.log(value);
    playMovie(value);
})

const changeSlug = (value) => {
  isLoading.value = true;
  movieSlug.value = value.split('/')[3];
  window.scrollTo({ top: 0, behavior: "smooth" });
}

  const playMovie = async (season,episode) => {
    try {
      console.log(episodes_choose.value);
      const response = await api.get(endpoint.getDetail(typeSlug.value,movieSlug.value));
      isLoading.value = false;
      movieData.value= response.data;
    
      const responsePlay = await api.get(endpoint.getDetail(typeSlug.value,movieSlug.value) + '/streams?season='+season+'&episode='+episode);
      isLoading.value = false;
      moviePlay.value= responsePlay.data;

      for (const value of movieData.value.seasons) {
        for (let i = 1; i <= movieData.value.seasons.length; i++) {
            seasons_option.value.push(i.toString());
        }
        if (value.season === seasons_choose.value) {
          episodes_option.value = []; // Membuat array kosong untuk episodes_option
          for (let i = 1; i <= value.totalEpisodes; i++) {
            episodes_option.value.push(i.toString());
          }
          break; // Menghentikan perulangan setelah menemukan season yang sesuai
        }
      }

      // console.log(moviePlay.value[0].url);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  const changeEpisode = async (slug) => {
    try {
      const responseEpisode = await api.get(endpoint.getEpisodeBySlug() + '/' + slug);
      isLoading.value = false;
      moviePlay.value= responseEpisode.data.data;
      streamingMode.value=true;

      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  watch(seasons_choose,(value)=>{
    isLoading.value = true;
    playMovie(value, episodes_choose);
  });
  watch(episodes_choose,(value)=>{
    isLoading.value = true;
    playMovie(seasons_choose.value, value);
  });

  </script>

  <style>
.box_item_ads_popup{
  display: none !important;
}
</style>
  
  