// src/store/searchStore.ts
import { reactive, computed } from 'vue'

interface SearchState {
    searchTerm: string
    page: number
}

const state = reactive<SearchState>({
    searchTerm: '',
    page: 1
})

export default {
    state,
    setSearchTerm(searchTerm: string) {
        state.searchTerm = searchTerm
    },
    setPage(page: number) {
        state.page = page
    },
    searchUrl: computed(() => {
        if (state.searchTerm) {
            return `https://gutendex.com/books/?search=${encodeURIComponent(state.searchTerm)}`
        } else {
            return `https://gutendex.com/books/?page=${state.page}`
        }
    })
}
