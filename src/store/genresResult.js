import { defineStore } from 'pinia'

export const useGenresStore = defineStore({
    id: 'genresStore',
    state: () => ({
        defaultGenres: ['popular','recent-release','top-rated'],
        genres: []
    }),
    getters: {
        getDefaultGenres() {
            return this.defaultGenres;
        },
        getGenres(){
            return this.genres;
        },
    },
    actions: {
        setGenres(data) {
            this.genres = data // Ini akan mengganti data dengan data yang diberikan
        }
    }
})
