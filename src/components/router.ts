import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Book from './Book.vue'
import BookPage from './BookPage.vue'

const routes: RouteRecordRaw[] = [
    { path: '/', component: Book },
    { path: '/book', component: Book },
    { path: '/book/bookPage/:id', component: BookPage, props: true } // Dynamic route with props
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router
