<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { BookMetadata } from '../types/types.ts'

const books = ref<BookMetadata[]>([])

const fetchData = async () => {
    try {
        const result = await fetch('https://gutendex.com/books/?page=1')
        const data = await result.json()
        books.value = data.results
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

onMounted(() => {
    fetchData()
})

const getCoverImageUrl = (book: BookMetadata): string => {
    return book.formats['image/jpeg'] ?? ''
}
</script>

<template>
    <section>
        <div id="book-wrapper" @click="" v-for="book in books" :key="book.id">
            <h1>{{ book.title }}</h1>
            <div v-for="subject in book.subjects">
                <span>{{ subject }}</span>
            </div>
            <h1>{{ book.id }}</h1>
            <div v-for="author in book.authors">
                <h3>{{ author.name }}</h3>
            </div>
            <img :src="getCoverImageUrl(book)" alt="" />
        </div>
    </section>
</template>

<style scoped>
h1 {
    font-size: 24px;
    color: #ffffff;
}
#book-wrapper {
    background-color: rgba(83, 91, 242, 0.15);
    width: 20vw;
    padding: 2rem;
    margin: 1rem;
}

section {
    display: grid;
    grid-template-columns: repeat(3, minmax(200px, 4fr));
}
</style>
