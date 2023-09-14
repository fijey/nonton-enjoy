<template>
    <LayoutComponent>
        <v-container>
            <v-row>
            <v-col cols="12" md="6">
                <v-img :src="movieData.poster" alt="Movie Poster" max-width="400"></v-img>
            </v-col>
            <v-col cols="12" md="6">
                <h2 class="headline">{{ movieData.title }}</h2>
                <p>{{ movieData.japanese_title }}</p>
                <p><strong>Rating:</strong> {{ movieData.rating }}</p>
                <p><strong>Produser:</strong> {{ movieData.produser }}</p>
                <p><strong>Type:</strong> {{ movieData.type }}</p>
                <p><strong>Status:</strong> {{ movieData.status }}</p>
                <p><strong>Episode Count:</strong> {{ movieData.episode_count }}</p>
                <p><strong>Duration:</strong> {{ movieData.duration }}</p>
                <p><strong>Release Date:</strong> {{ movieData.release_date }}</p>
                <p><strong>Studio:</strong> {{ movieData.studio }}</p>
                <p><strong>Genres:</strong>
                <span v-for="genre in movieData.genres" :key="genre.name">
                    <a :href="genre.slug">{{ genre.name }}</a>
                    <span v-if="genre !== movieData.genres[movieData.genres.length - 1]">, </span>
                </span>
                </p>
                <p><strong>Synopsis:</strong> {{ movieData.synopsis }}</p>
                <!-- <p><strong>Batch Uploaded:</strong> {{ movieData.batch.uploaded_at }}</p> -->
            </v-col>
            </v-row>
            <v-row>
                <h3 class="headline">Straming Disini</h3>
                <v-col cols="12" sm="12" md="12" lg="12">
                    <iframe :src="moviePlay.stream_url" width="100%" height="500px" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe>
<!--                     
                    <iframe allow="fullscreen 'self'" :src="moviePlay.stream_url" frameborder="0" style="width:100%; height:500px;">

                    </iframe> -->
                </v-col>
            </v-row>
            <h3 class="headline">Episode Lists</h3>
            <v-list>
            <v-list-item v-for="episode in movieData.episode_lists" :key="episode.episode">
                <v-list-item-content>
                <a @click="changeEpisode(episode.slug)">{{ episode.episode }}</a>
                </v-list-item-content>
            </v-list-item>
            </v-list>
            <h3 class="headline">Recommendations</h3>
            <v-row>
            <v-col v-for="recommendation in movieData.recommendations" :key="recommendation.title" cols="12" md="4">
                <v-card>
                <v-img :src="recommendation.poster" alt="Recommendation Poster" height="200"></v-img>
                <v-card-title>{{ recommendation.title }}</v-card-title>
                <v-card-actions>
                    <v-btn :href="recommendation.slug" color="primary" text>More Info</v-btn>
                </v-card-actions>
                </v-card>
            </v-col>
            </v-row>
        </v-container>
    </LayoutComponent>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import LayoutComponent from '@/components/layouts/LayoutComponent.vue';
  import api from '@/api/api.js';
  import endpoint from '@/api/api-endpoint.js';
  import { useRoute } from 'vue-router';
  
  const movieData = ref([]);
  const moviePlay = ref([]);
  const streamingMode = ref(true);
  const isLoading = ref(true);
  
  const route = useRoute();
  const movieSlug = ref(route.params.slug);
  
  onMounted(async () => {
    try {
      const response = await api.get(endpoint.getDetail() + '/' + movieSlug.value);
      isLoading.value = false;
      movieData.value= response.data.data;
      console.log(response);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  });

  const changeEpisode = async (slug) => {
    try {
      const responseEpisode = await api.get(endpoint.getEpisodeBySlug() + '/' + slug.split('/')[3]);
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
  
  