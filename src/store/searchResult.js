import { defineStore } from 'pinia'

export const useSearchStore = defineStore({
    id: 'searchStore',
    state: () => ({
        data: {}, // Ini akan menjadi objek kosong awalnya
    }),
    getters: {
        getSearch() {
            return this.data
        }
    },
    actions: {
        setData(data) {
            this.data = data // Ini akan mengganti data dengan data yang diberikan
        }
    }
})
