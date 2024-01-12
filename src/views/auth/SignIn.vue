<template>
    <div class='bg-white h-screen flex items-center justify-center w-full'>
      <div class='w-full'>
        <div class="bg-white max-w-[320px] xs:max-w-[400px] sm:max-w-[444px] mx-auto pt-[54px] pb-16 px-5  xs:px-10 sm:px-[62px] border border-[#EEE] rounded-2xl shadow-[0px_8px_8px_-4px_rgba(16,24,40,0.03),0px_20px_24px_-4px_rgba(16,24,40,0.08)]">
          <!-- <div class="flex gap-[10px] mb-[22px]">
            <img class='h-11 w-[50px]' src='' alt="Stack Logo" />
            <h1 class='text-defaultGray text-[28px] font-bold'>Audacity</h1>
          </div> -->
          <div v-if="user">{{ user?.email }}</div>
          <button v-if="user" @click="handleSignOut">sign out</button>
          <p class='text-dark text-xl leading-6 font-semibold'>Sign in to join with Audacity</p>
          <div class="mt-[52px]">
            <form @submit.prevent="handleSignIn">
              <div class="mb-5">
                <label class='text-defaultGray text-sm font-medium mb-[6px] block'>Email</label>
                <input v-model="email" type="text" class="h-11 
                      w-[100%]
                      bg-white 
                      border 
                      rounded-lg 
                      px-[14px] 
                      py-[10px]  
                      placeholder:text-[##A9ACB5] 
                      placeholder:text-base 
                      focus:outline-none 
                      focus:border-brand
                      shadow-[0px_0px_0px_4px_#FEE4E2,0px_1px_2px_0px_rgba(16, 24, 40, 0.05)]">
              </div>
              <div class="mb-5">
                <label class='text-defaultGray text-sm font-medium mb-[6px] block'>Password</label>
                <input v-model="password" type="text" class="h-11 
                  w-[100%]
                  bg-white 
                  border 
                  rounded-lg 
                  px-[14px] 
                  py-[10px]  
                  placeholder:text-[##A9ACB5] 
                  placeholder:text-base 
                  focus:outline-none 
                  focus:border-brand
                  shadow-[0px_0px_0px_4px_#FEE4E2,0px_1px_2px_0px_rgba(16, 24, 40, 0.05)]">
              </div>
              <div class="mt-[17px] flex gap-3">
                <div class="h-1 w-11 rounded-[2px] bg-[#F04438]"></div>
                <div class="h-1 w-11 rounded-[2px] bg-[#F04438]"></div>
                <div class="h-1 w-11 rounded-[2px] bg-[#F3F3F3]"></div>
                <div class="h-1 w-11 rounded-[2px] bg-[#F3F3F3]"></div>
                <div class="h-1 w-11 rounded-[2px] bg-[#F3F3F3]"></div>
                <div class="h-1 w-11 rounded-[2px] bg-[#F3F3F3]"></div>
              </div>
              <div class="mt-[17px] mb-8 mx-auto max-w-[320px]">
              <button class="bg-brand text-white text-base font-semibold leading-6 capitalize flex justify-center items-center h-11 w-[100%] rounded-lg" type="submit">Submit</button>
              </div>
              <div class='text-lightGray text-base font-medium'>Already have an account? <router-link to="/sign-up" class='text-[#377DFF]'>Sign up</router-link></div>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import {auth} from '../../firebase.ts'
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import {useRouter} from 'vue-router';

const email = ref('')
const password = ref('')
const user : any = ref(null)
const isAuthenticated = ref(false)
const router = useRouter()

const handleSignIn = async () => {
  await signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential: any) => {
     if(userCredential?.user) {
        localStorage.setItem('user', userCredential?.user?.email)
      }
         //Go to '/defaultpath' if no redirectPath value is set
         router.replace(sessionStorage.getItem('redirectPath') || '/watch-video');

          //Cleanup redirectPath
          sessionStorage.removeItem('redirectPath');
      
      // if(userCredential?.user) {
      //   localStorage.setItem('user', userCredential?.user?.email)
      //   router.push('/watch-video')
      // }
    })
    .catch((error : any) => {
     console.log(error.message)
    });
}
onAuthStateChanged(auth, currentUser => {
  user.value = currentUser
 
})

const handleSignOut = async () => {
  await signOut(auth).then(res => {}).catch(err => console.log(err.message))
  localStorage.removeItem('user')
}
</script>

<style scoped>

</style>