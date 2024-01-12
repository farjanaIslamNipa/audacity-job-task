<template>
  <div class="max-w-[1240px] mx-auto my-10">
    <div class="h-[400px] w-[450px] object-cover mx-auto">
      <video autoplay controls ref="videoRef" :src="selectedVideo?.src" ></video>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, computed} from 'vue'
import { videos } from '../data/videos'
import { useRoute } from "vue-router";

const video = ref(null)
const route = useRoute()
const videoRef = ref(null)

const selectedVideo = computed(() => { 
  return (videos.find(video => String(video?.id) === route?.params?.id))
})




</script>

<style scoped>

</style>