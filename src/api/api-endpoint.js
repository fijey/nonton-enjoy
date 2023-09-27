const endpoints = {
    getGenres: () => {
        return 'genres';
    },
    getHome: () => {
        return 'home';
    },
    getDetail: (type,_id) => {
        if (type == "movie") type = 'movies';
        return `/${type}/${_id}`;
    },
    getEpisodeBySlug: () => {
        return 'episode';
    },
    getSearch: (title) => {
        return `search/${title}`;
    },
    getMovieByGenre: (genre) => {
        return `genres/${genre}`;
    },
    getMovieByDefaultGenre: (genre) => {
        return `${genre}/movies`;
    },
    getSeriesByDefaultGenre: (genre) => {
        return `${genre}/series`;
    },
    getComplete: () => {
        return'complete-anime';
    },
    // Tambahkan endpoint lainnya di sini
  };
  
  // Mengekspor objek endpoints agar dapat diimpor di file JavaScript lainnya
  export default endpoints;
  