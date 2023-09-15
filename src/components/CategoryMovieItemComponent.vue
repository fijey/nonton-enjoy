<template>
  <v-card style="height:100%" class="border-radius-5">
    <!-- Movie Poster -->
    <v-img class="border-radius-5" :src="movie.poster" alt="Movie Poster" height="200" cover></v-img>

    <!-- Movie Details -->
    <v-card-title>{{ movie.title }}</v-card-title>
    <v-card-subtitle>{{ movie.season }}</v-card-subtitle>
    <v-card-text style="margin-bottom: 1rem;">
      <div>
        <div v-if="movie.episode_count">
          <strong>Total Episode:</strong> {{ movie.episode_count }} <br>
        </div>
        <div v-if="movie.rating">
          <strong>Rating:</strong> {{ movie.rating }}<br>
        </div>
        <div v-if="movie.studio">
          <strong>Studio:</strong> {{ movie.studio }}<br>
        </div>
        <div v-if="movie.status">
          <strong>Status</strong> {{ movie.status }}<br>
        </div>
      </div>
      <div style="margin-bottom:20px">
        <strong>Genres:</strong> <br>
            <v-chip v-for="genre in movie.genres" :key="genre.slug" variant="elevated"
                size="x-small" max-lines="1">
                  {{ genre.name }}
            </v-chip>
      </div>
    </v-card-text>

    <!-- Movie Actions (e.g., Watch Now button) -->
    <router-link v-if="movie.slug" :to="{ name: 'movie-detail', params: { slug: movie.slug.split('/')[3] } }">
      <v-btn class="secondary-color text-light" style="position: absolute; bottom: 0;" block>Watch Now</v-btn>
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
