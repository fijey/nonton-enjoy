<template>
    <v-col class="mt-2" cols="12">
      <strong>{{ categoryName }}</strong>
    </v-col>
  </template>
  
  <script setup>
  import { defineProps } from 'vue';
  
  const { categoryName } = defineProps(['categoryName']);
  </script>
  