<template>
  <div id="app">
     <!-- <metainfo>
        <template v-slot:title="{ content }">{{ content ? `${content} | SITE_NAME` : `SITE_NAME` }}</template>
     </metainfo> -->
     <router-view></router-view>
    </div>
</template>

<script>
import { reactive,computed } from 'vue'; // Ganti dengan impor yang sesuai
import router from './router'; // Impor konfigurasi router
import { useHead } from '@vueuse/head'

export default {
  name: 'App',
  setup() {
    const siteData = reactive({
      description: `Streaming Anime HD Sub Indo, Download High quality`,
      keywords : `anime,streaming anime,download anime, anime sub indo, nonton anime sub indo`,
      ogTitle : `BAKAnime - Streaming Anime, Download Full HD`,
      ogDescription : `Subtitle Indonesia`,
      ogImage : `Subtitle Indonesia`,
      ogUrl : 'https://bakanime.my.id'
    })
    useHead({
      // Can be static or computed
      title: computed(() => siteData.title),
      meta: [
          {
            name: `description`,
            content: computed(() => siteData.description),
          },
          {
            name: `keywords`,
            content: computed(() => siteData.keywords),
          },
          {
            property: `og:title`,
            content: computed(() => siteData.ogTitle),
          },
          {
            property: `og:description`,
            content: computed(() => siteData.ogDescription),
          },
          {
            property: `og:image`,
            content: computed(() => siteData.ogImage),
          },
        ],
     
    })

    return {
      router,
    };
  },
};
</script>
