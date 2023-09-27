<template>
  <v-card style="height:100%" class="border-radius-5">
    <!-- Movie Poster -->
    <v-img class="border-radius-5" :src="movie.posterImg" alt="Movie Poster" height="200" cover></v-img>

    <!-- Movie Details -->
    <v-card-title>{{ movie.title }}</v-card-title>
    <v-card-subtitle>{{ movie.season }}</v-card-subtitle>
    <v-card-text style="margin-bottom: 1rem;">
      <div>
        <div v-if="movie.episode_count">
          <strong>Total Episode:</strong> {{ movie.episode_count }} <br>
        </div>
        <div v-if="movie.type">
          <strong>Type:</strong>  {{ getType(movie) }} <br>
        </div>
        <div v-if="movie.rating">
          <strong>Rating:</strong> {{ movie.rating }}<br>
        </div>
        <div v-if="movie.studio">
          <strong>Studio:</strong> {{ movie.studio }}<br>
        </div>
        <div v-if="movie.qualityResolution">
          <strong>Resolution :</strong> {{ movie.qualityResolution }}<br>
        </div>
      </div>
      <div style="margin-bottom:20px" v-if="movie.genres.length > 0">
        <strong>Genres:</strong> <br>
            <v-chip v-for="(genre,index) in movie.genres" :key="index" variant="elevated"
                size="x-small" max-lines="1">
                  {{ movie.genres[index] }}
            </v-chip>
      </div>
      <div style="margin-bottom:20px" v-if="movie.casts">
        <strong>Casts:</strong> <br>
            <v-chip v-for="(genre,index) in movie.casts" :key="index" variant="elevated"
                size="x-small" max-lines="1">
                  {{ movie.casts[index] }}
            </v-chip>
      </div>
      <div style="margin-bottom:20px" v-if="movie.directors">
        <strong>Directors:</strong> <br>
            <v-chip v-for="(genre,index) in movie.directors" :key="index" variant="elevated"
                size="x-small" max-lines="1">
                  {{ movie.directors[index] }}
            </v-chip>
      </div>
    </v-card-text>

    <!-- Movie Actions (e.g., Watch Now button) -->
    <router-link v-if="movie._id" :to="{ name: 'detail', params: { type: getType(movie), slug: movie._id } }">
      <v-btn class="secondary-color text-light" style="position: absolute; bottom: 0;" block>Watch Now</v-btn>
    </router-link>
  </v-card>
</template>

<script setup>

import {  defineProps } from 'vue';

// Mendefinisikan props
 defineProps({
  movie: {
    type: Object,
    required: true
  }
});

function getType(movie) {
  if (movie.title.includes("Series")) {
    return "series";
  } else {
    return "movies";
  }
}
</script>

