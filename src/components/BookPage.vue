<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { BookMetadata } from '../types/types.ts'
import { useRoute } from 'vue-router'

const book = ref<BookMetadata>({})
const route = useRoute()
const id = computed(() => route.params.id)

const fetchData = async () => {
    try {
        const result = await fetch(`https://gutendex.com/books/${id.value}`)
        const data = await result.json()
        book.value = data
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

onMounted(() => {
    fetchData()
})

const getCoverImageUrl = (book: BookMetadata): string => {
    return book && book.formats && book.formats['image/jpeg'] ? book.formats['image/jpeg'] : ''
}
</script>

<template>
    <div v-if="book">
        <div id="page">
            <div id="book-wrap">
                <div>
                    <h1>{{ book.title }}</h1>
                    <div v-for="authors in book.authors">
                        <h3>{{ authors.name }}</h3>
                        <h3>Birth year: {{ authors.birth_year }}</h3>
                        <h3>Death year: {{ authors.death_year }}</h3>
                    </div>
                </div>
                <img id="img" :src="getCoverImageUrl(book)" alt="" />
            </div>
        </div>
    </div>
</template>

<style scoped>
#page {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
#book-wrap {
    color: #ffffff;
}
</style>
