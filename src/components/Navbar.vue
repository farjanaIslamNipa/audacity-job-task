<template>
  <div class="bg-brand text-white py-4">
    <div class="max-w-[1240px] px-10 xl:px-0 mx-auto flex justify-between items-center">
      <div><router-link to="/" class="text-3xl font-extralight text-[#0dc5d1]"><span class="font-bold">A</span>udacity</router-link></div>
      <div>
        <div v-if="isAuthenticated" class="flex items-center gap-2">
          <span class="text-[#0dc5d1] hover:text-white transition-all duration-300">{{ user }}</span>
          <button @click="handleSignOut" class="text-gray-300 hover:text-white transition-all duration-300 text-sm bg-[#374a5f] px-4 py-1 rounded-md">Sign Out</button>
        </div>
        <router-link v-else to="/sign-in" class="text-[#0dc5d1] pr-1 hover:text-white transition-all duration-300">Sign in</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import { signOut } from "firebase/auth";
import {auth} from '../../firebase.ts'
import {TStorageUser} from '../../types/index'

const isAuthenticated = ref<boolean>(false)

const user : TStorageUser = localStorage.getItem('user')

if(user){
  isAuthenticated.value = true
}

const handleSignOut = async () => {
  await signOut(auth).then(res => {}).catch(err => console.log(err.message))
  isAuthenticated.value = false
  localStorage.removeItem('user')
}

</script>

<style scoped>

</style>