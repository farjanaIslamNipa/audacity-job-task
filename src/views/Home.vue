<template>
  <navbar />
  <div class="max-w-[1240px] px-10 xl:px-0 mx-auto my-10">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="video in videoList" :key="video?.id" class="relative rounded-lg">
        <video :src="video?.src" class="rounded-lg"></video>
        <div class="bg-brand text-white text-end px-4 py-3 absolute bottom-0 w-full bg-opacity-50 rounded-lg rounded-t-none">
          <router-link :to="`/watch-video/${video?.id}`" class="bg-[#03A1AB] px-3 py-1 rounded-md text-sm">Watch Video</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, provide} from 'vue'
import { videos } from '../data/videos'
import Navbar from '../components/app/Navbar.vue';

const videoList = ref(videos)

export type TUser = {
  email: string,
  token: string
}

const user = ref({
  email: 'user email',
  token: 'token'
})

provide('userData', user)


</script>

<style scoped>

</style>