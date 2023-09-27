<template>
      <v-card style="height:100%" class="border-radius-5">
        <!-- Movie Poster -->
        <v-img :src="movie.poster" alt="Movie Poster" height="200"
              cover class="border-radius-5"></v-img>
  
        <!-- Movie Details -->
        <v-card-title>{{ movie.title }}</v-card-title>
        <v-card-subtitle>{{ movie.release_day }}, {{ movie.newest_release_date }}</v-card-subtitle>
        <v-card-text>
          <div v-if="movie.current_episode">
            <strong>Current Episode:</strong> {{ movie.current_episode }}
          </div>
        </v-card-text>
  
        <!-- Movie Actions (e.g., Watch Now button) -->
        <!-- <v-card-actions style="width: 100%;">
        </v-card-actions> -->
        <router-link style="text-decoration: none;" :to="{ name: 'movie-detail', params: { slug: movie.slug } }">
            <v-btn class="secondary-color text-light" block>Watch Now</v-btn>
        </router-link>
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
  