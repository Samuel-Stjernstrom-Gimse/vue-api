<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { BookMetadata } from '../types/types.ts'
import { useRoute } from 'vue-router'

const book = ref<BookMetadata>()
const route = useRoute()
const id = computed(() => route.params.id)
const eBookType: string[] = ['epub+zip', 'octet-stream', 'rdf+xml', 'x-mobipocket-ebook'] as const

const fetchData = async () => {
    try {
        const result = await fetch(`https://gutendex.com/books/${id.value}`)
        book.value = await result.json()
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

const getReadUrl = (book: BookMetadata): string => {
    return book && book.formats && book.formats['text/html'] ? book.formats['text/html'] : ''
}

const getDownloadUrl = (book: BookMetadata, eBookType: string): string => {
    return book && book.formats && book.formats[eBookType] ? book.formats['text/html'] : ''
}
</script>

<template>
    <div v-if="book">
        <div id="page">
            <div id="book-wrap">
                <div>
                    <h2>{{ book.title }}</h2>
                    <div v-for="authors in book.authors">
                        <h4 style="color: #94c5e8; margin-bottom: 2rem"
                            >{{ authors.name }} {{ authors.birth_year }}-{{ authors.death_year }}</h4
                        >
                    </div>
                </div>
                <img id="img" :src="getCoverImageUrl(book)" alt="" />
            </div>
            <div id="btn-wrapper">
                <a :href="getReadUrl(book)"><button>Read Book</button></a>
                <a v-for="type in eBookType" :href="getDownloadUrl(book, type)"
                    ><button>Download: {{ type }}</button></a
                >
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
    gap: 2rem;
    color: #ffffff;
}

#btn-wrapper {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
}

img {
    width: 60%;
    height: auto;
}
</style>
