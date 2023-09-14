<template>
      <v-card style="height:100%">
        <!-- Movie Poster -->
        <v-img :src="movie.poster" alt="Movie Poster" height="300"
              cover></v-img>
  
        <!-- Movie Details -->
        <v-card-title>{{ movie.title }}</v-card-title>
        <v-card-subtitle>{{ movie.release_day }}, {{ movie.newest_release_date }}</v-card-subtitle>
        <v-card-text>
          <div>
            <strong>Current Episode:</strong> {{ movie.current_episode }}
          </div>
        </v-card-text>
  
        <!-- Movie Actions (e.g., Watch Now button) -->
        <v-card-actions>
            <router-link :to="{ name: 'movie-detail', params: { slug: movie.slug.split('/')[3] } }">
                <v-btn class="secondary-color text-light">Watch Now</v-btn>
            </router-link>
        </v-card-actions>
      </v-card>
  </template>
  
  <script>
  export default {
    props: {
      movie: {
        type: Object,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add custom CSS styles for your movie card here */
  </style>
  