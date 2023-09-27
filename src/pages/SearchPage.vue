<template>
    <LayoutComponent>
        <v-container class="search-container" style="padding: 60px;">
            <v-row>
            <v-col cols="12" md="12">
                <v-text-field
                v-model="search"
                label="Cari"
                outlined
                dense
                solo-inverted
                ></v-text-field>
            </v-col>
            </v-row>

            <h5 style="text-align: center;" v-if="search != ''">Hasil Pencarian untuk {{ search }} ditemukan sebanyak {{ searchResults.length }}</h5>
            <SkeletonCard v-if="isLoading"/>
            <v-row v-else>
                <v-col v-for="item in searchResults" :key="item.title"
                class="mt-2" cols="12" sm="6" md="4" lg="3" xl="2">
                    <CategoryMovieItemComponent :movie="item"/>
                </v-col>
            
            </v-row>
        </v-container>
    </LayoutComponent>
  </template>
  
  <script setup>
    import api from '@/api/api';
    import endpoints from '@/api/api-endpoint';
    import LayoutComponent from '@/components/layouts/LayoutComponent.vue';
    import CategoryMovieItemComponent from '@/components/CategoryMovieItemComponent.vue';
    import {ref, watch, onMounted} from 'vue';
    import {debounce} from 'lodash';
    import SkeletonCard from '@/components/loading/SkeletonCard.vue';

    const search = ref("");
    const searchResults = ref([]);
    const isLoading = ref(true);

    onMounted(()=> {
        isLoading.value=false;
    })



      const debouncedSearch = debounce(async () => {
    try {
        const response = await api.get(endpoints.getSearch(search.value));
        searchResults.value = response.data;
        isLoading.value = false;
    } catch (error) {
        isLoading.value = false;
        console.error('Error fetching data:', error);
        }
    }, 2000);
    
    watch(search, () => {
        isLoading.value = true;
        debouncedSearch();
    });
</script>

<style scoped>
.search-container {
  margin-top: 20px;
}

.result-card {
  margin-top: 20px;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
  