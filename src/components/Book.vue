<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { BookMetadata } from '../types/types.ts'
import { useRouter } from 'vue-router'

const router = useRouter()
const books = ref<BookMetadata[]>([])
const page = ref<number>(1)

const searchUrl = ref<string>('https://gutendex.com/books/?page=1')

watch(page, () => {
    searchUrl.value = `https://gutendex.com/books/?page=${page.value}`
    fetchData()
})

const fetchData = async () => {
    try {
        const result = await fetch(searchUrl.value)
        const data = await result.json()
        books.value = data.results
    } catch (error) {
        console.error('Error fetching data:', error)
    }
}

onMounted(() => {
    fetchData()
})

const goToBookPage = (bookId: number) => {
    router.push(`/book/bookPage/${bookId}`)
}

const getCoverImageUrl = (book: BookMetadata): string => {
    return book.formats['image/jpeg'] ?? ''
}

const handlePageTurn = (dir: 'next' | 'prev'): void => {
    dir === 'next' ? page.value++ : page.value <= 1 ? (page.value = 1) : page.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
}
</script>

<template>
    <div class="page-turners">
        <button @click="handlePageTurn('prev')">prev page</button>
        <button @click="handlePageTurn('next')">next page</button>
    </div>
    <section>
        <div @click="goToBookPage(book.id)" id="book-wrapper" v-for="book in books" :key="book.id">
            <h1>{{ book.title }}</h1>
            <div v-for="author in book.authors">
                <h3>{{ author.name }}</h3>
            </div>
            <img :src="getCoverImageUrl(book)" alt="" />
            <div v-for="subject in book.subjects">
                <p>{{ subject }}</p>
            </div>
        </div>
    </section>
    <button @click="handlePageTurn('prev')">prev page</button>
    <button @click="handlePageTurn('next')">next page</button>
</template>

<style scoped>
h1 {
    font-size: 24px;
    color: #ffffff;
}
#book-wrapper {
    background-color: #213547;
    width: 20vw;
    padding: 2rem;
    margin: 1rem;
    cursor: pointer;
}

section {
    display: grid;
    grid-template-columns: repeat(3, minmax(200px, 4fr));
}

.page-turners {
    display: flex;
    justify-content: center;
    gap: 3rem;
}
</style>
