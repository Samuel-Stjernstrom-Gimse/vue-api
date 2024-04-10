<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<template>
    <div id="header">
        <h1 style="cursor: pointer" @click="router.push(`/book`)">Gutenberg</h1>
        <div id="">
            <input />
        </div>
        <button>Search</button>
    </div>
</template>

<style scoped>
#header {
    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    gap: 1rem;
    left: 0;
    top: 0;
    width: 100vw;
    height: 10vh;
    background-color: #535bf2;
}

#suggestions li {
    padding: 0.5rem;
    cursor: pointer;
}

#suggestions li:hover,
#suggestions li.active {
    background-color: #ddd;
}
</style>
