import { defineStore } from 'pinia'

export const useGenresStore = defineStore({
    id: 'genresStore',
    state: () => ({
        data: [], // Ini akan menjadi objek kosong awalnya
    }),
    getters: {
        getGenres() {
            return this.data
        }
    },
    actions: {
        setGenres(data) {
            this.data = data // Ini akan mengganti data dengan data yang diberikan
        }
    }
})
