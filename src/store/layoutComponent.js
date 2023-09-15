import { defineStore } from 'pinia'

export const useLayoutComponentStore = defineStore({
    id: 'layoutComponentStore',
    state: () => ({
        genreActive: '', // Ini akan menjadi objek kosong awalnya
    }),
    getters: {
        getGenreActive() {
            return this.genreActive
        }
    },
    actions: {
        setGenreActive(data) {
            this.genreActive = data // Ini akan mengganti data dengan data yang diberikan
        },
        setEmpty() {
            this.genreActive = '' // Ini akan mengganti data dengan data yang diberikan
        }
    }
})
