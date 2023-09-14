const endpoints = {
    getGenres: () => {
        return 'genres';
    },
    getHome: () => {
        return 'home';
    },
    getDetail: () => {
        return 'anime';
    },
    getEpisodeBySlug: () => {
        return 'episode';
    },
    getSearch: () => {
        return'search';
    },
    getOngoing: () => {
        return'ongoing-anime';
    },
    getComplete: () => {
        return'complete-anime';
    },
    // Tambahkan endpoint lainnya di sini
  };
  
  // Mengekspor objek endpoints agar dapat diimpor di file JavaScript lainnya
  export default endpoints;
  