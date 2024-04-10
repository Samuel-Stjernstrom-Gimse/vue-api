<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { BookMetadata } from '../types/types.ts'
import { useRouter } from 'vue-router'

const router = useRouter()
const books = ref<BookMetadata[]>([])
const page = ref<number>(1)
const searchUrl = ref<string>('https://gutendex.com/books/?page=1')

watch(page, async () => {
    searchUrl.value = `https://gutendex.com/books/?page=${page.value}`
    books.value = []
    await fetchData()
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

onMounted(async () => {
    await fetchData()
})

const goToBookPage = (bookId: number) => {
    router.push(`/book/bookPage/${bookId}`)
}

const getCoverImageUrl = (book: BookMetadata): string => {
    return book.formats['image/jpeg'] ?? '../assets/img/book.jpg'
}

const getFormattedSubjects = (subjects: string[]): string[] => {
    return subjects.map((subject) => {
        const index = subject.indexOf('--')
        return index !== -1 ? subject.substring(0, index).trim() : subject.trim()
    })
}

const handlePageTurn = (dir: 'next' | 'prev'): void => {
    dir === 'next' ? page.value++ : page.value <= 1 ? (page.value = 1) : page.value--
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

const truncateTitle = (title: string, maxLength: number) => {
    if (title.length > maxLength) {
        return title.substring(0, maxLength) + '...'
    } else {
        return title
    }
}

const firstFromArray = (arr: string[]) => {
    if (arr.length > 5) return arr.slice(0, 5)
    else return arr
}
</script>

<template>
    <div>
        <div class="page-turners">
            <button @click="handlePageTurn('prev')">prev page</button>
            <h4>{{ page }}</h4>
            <button @click="handlePageTurn('next')">next page</button>
        </div>
        <section>
            <div
                v-if="books.length > 0"
                v-for="book in books"
                :key="book.id"
                @click="goToBookPage(book.id)"
                class="book-wrapper"
            >
                <h3 class="text">{{ truncateTitle(book.title, 20) }}</h3>
                <div class="text" v-for="author in book.authors" :key="author.name">
                    <h5>{{ author.name }}</h5>
                </div>
                <img class="img" :src="getCoverImageUrl(book)" alt="" />
                <div class="text" style="display: flex; flex-wrap: wrap">
                    <h5 v-for="subject in getFormattedSubjects(firstFromArray(book.subjects))" :key="subject">
                        #<span style="color: #8e92ff">{{ subject }} </span>
                    </h5>
                </div>
            </div>
            <div v-else v-for="n in 30" :key="n" class="book-wrapper" style="height: 30vw">
                <h2>Loading...</h2>
                <img class="img" id="load-book" src="../assets/img/book.jpg" alt="" />
            </div>
        </section>
        <div class="page-turners">
            <button @click="handlePageTurn('prev')">prev page</button>
            <h4>{{ page }}</h4>
            <button @click="handlePageTurn('next')">next page</button>
        </div>
    </div>
</template>

<style scoped>
img {
    object-fit: cover;
    z-index: 1;
    width: 100%;
    height: auto;
    max-height: 100%;
    position: absolute;
    border-radius: 4px;
    transition: 0.4s;
    box-shadow: 10px 10px 20px rgba(16, 15, 15, 0.78);
}

.book-wrapper {
    background-color: transparent;
    position: relative;
    width: 15vw;
    height: 60vh;
    padding: 2rem;
    margin: 1rem;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    border-radius: 4px;
    transition: 0.4s;
}
img:hover {
    transition: 0.4s;
    z-index: 0;
    opacity: 0.3;
    box-shadow: 0 0 10px rgb(255, 255, 255);
}
.book-wrapper:hover {
    opacity: 1;
}
h1 {
    font-size: 24px;
    color: #ffffff;
}

section {
    display: grid;
    grid-template-columns: repeat(4, minmax(200px, 4fr));
}

.page-turners {
    margin-bottom: 1rem;
    margin-top: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3rem;
}

#load-book {
    width: 100%;
    height: auto;
    background-color: transparent;
    opacity: 0.1;
}
</style>
