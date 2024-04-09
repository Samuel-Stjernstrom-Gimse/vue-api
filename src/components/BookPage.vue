<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { BookMetadata } from '../types/types.ts'
import { useRoute } from 'vue-router'

const book = ref<BookMetadata>({})
const route = useRoute() // Access current route
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
        <h1>{{ book.title }}</h1>
        <p>{{ book.authors }}</p>
        <img :src="getCoverImageUrl(book)" alt="" />
    </div>
</template>

<style scoped></style>
