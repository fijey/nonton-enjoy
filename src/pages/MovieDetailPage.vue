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
                  <v-img :src="movieData.poster" alt="Movie Poster" style="height: 60vh !important;"></v-img>
                </div>
              </v-card>
              </v-col>

              <v-col cols="12" md="6" style="line-height: 2rem;">
                  <h1 class="headline">{{ movieData.title }}</h1>
                  <p>{{ movieData.japanese_title }}</p>
                  <p><strong>Rating:</strong> {{ movieData.rating }}</p>
                  <p><strong>Produser:</strong> {{ movieData.produser }}</p>
                  <p><strong>Type:</strong> {{ movieData.type }}</p>
                  <p><strong>Status:</strong> {{ movieData.status }}</p>
                  <p><strong>Episode Count:</strong> {{ movieData.episode_count }}</p>
                  <p><strong>Duration:</strong> {{ movieData.duration }}</p>
                  <p><strong>Release Date:</strong> {{ movieData.release_date }}</p>
                  <p><strong>Studio:</strong> {{ movieData.studio }}</p>
                  <p><strong>Genres:</strong> <br>
                    <v-chip v-for="genre in movieData.genres" :key="genre.slug" variant="elevated"
                        size="x-small" max-lines="1">
                          {{ genre.name }}
                    </v-chip>
                  </p>
                  <!-- <p><strong>Batch Uploaded:</strong> {{ movieData.batch.uploaded_at }}</p> -->
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
            <v-row>
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
            <div style="margin-top:20px;margin-bottom:20px"></div>
            <v-row>
              <v-col>
                <div>
                  <h1>Mau Didownload juga Boleh</h1>
                    <v-card  :elevation="20" style="padding:20px" class="secondary-color text-light">
                      <div  v-for="(format,index) in moviePlay.download_urls" :key="index">
                        <h3>
                            {{index}}
                        </h3>
                        <v-row  v-for="(resolution,index) in format" :key="index" cols="12" sm="12">
                            <v-col class="title" cols="12" sm="12">
                              <v-row>
                                <v-col cols="12" sm="12" md="12">
                                  {{ resolution.resolution }} 
                                </v-col>
                                <v-col v-for="(provider,index) in resolution.urls" :key="index"  sm="6" md="1">
                                  <v-chip variant="elevated" max-lines="1">
                                    <a class="text-light" style="text-decoration:none" :href="`${provider.url}`" target="_blank">
                                      {{ provider.provider }}
                                    </a>
                                  </v-chip>
                                </v-col>
                              </v-row>
                            </v-col>
                        </v-row>
                        <hr style="margin-top:40px;margin-bottom:40px;">
                      </div>
                      <!-- <v-chip variant="elevated"
                      size="x-large" max-lines="1">
                            {{ index }} <br>
                        </v-chip> -->
                    </v-card>
                </div>
              </v-col>
            </v-row>
            <div style="margin-top:20px;margin-bottom:20px"></div>
            <h3 class="headline">Recommendations</h3>
            <v-row>
            <v-col v-for="recommendation in movieData.recommendations" :key="recommendation.title" cols="12" sm="6" md="3">
              <MovieItemComponent :movie="recommendation" @click="changeSlug(recommendation.slug)" />
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
  
  const route = useRoute();
  const movieSlug = ref(route.params.slug);

  
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
            content: computed(() => 'BAKANIME - '+movieData.value.title),
          },
          {
            property: `og:description`,
            content: computed(() => movieData.value.synopsis ?? movieData.value.title),
          },
          {
            property: `og:image`,
            content: computed(() => movieData.value.poster),
          },
        ],
     
    })
    try {
      await playMovie(movieSlug.value);
      await changeEpisode(movieData.value.episode_lists[0].slug.split('/')[3]);
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

  const playMovie = async (value) => {
    try {
      const response = await api.get(endpoint.getDetail() + '/' + value);
      isLoading.value = false;
      movieData.value= response.data.data;
      episode_lists.value = movieData.value.episode_lists.map((episode) => episode.slug.split('/')[3]);
      
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
  </script>

  <style>
.box_item_ads_popup{
  display: none !important;
}
</style>
  
  