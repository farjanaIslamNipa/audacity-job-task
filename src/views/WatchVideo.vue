<template>
  <Navbar />
  <div class="max-w-[1240px] mx-auto p-8 md:p-12">
    <div class="max-h-[600px] max-w-[650px] object-cover mx-auto rounded-[20px] border-[20px] border-[#2a8c930d] shadow-[rgba(50,50,93,0.25)_0px_2px_5px_-1px,rgba(0,0,0,0.3)_0px_1px_3px_-1px]">
        <video autoplay controls ref="videoRef" :src="selectedVideo?.src" ></video>
      </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue'
import { videos } from '../data/videos'
import { useRoute } from "vue-router";
import Navbar from '../components/app/Navbar.vue';

const video = ref(null)
const route = useRoute()
const videoRef = ref(null)

const selectedVideo = computed(() => { 
  return (videos.find(video => String(video?.id) === route?.params?.id))
})




</script>

<style scoped>

</style>