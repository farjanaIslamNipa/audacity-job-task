<template>
    <div class='bg-brand h-screen flex items-center justify-center w-full'>
      <div class='w-full'>
        <div class="bg-white max-w-[320px] xs:max-w-[400px] sm:max-w-[444px] mx-auto pt-[54px] pb-16 px-5  xs:px-10 sm:px-[62px] border border-[#EEE] rounded-2xl shadow-[0px_8px_8px_-4px_rgba(16,24,40,0.03),0px_20px_24px_-4px_rgba(16,24,40,0.08)]">
          <!-- <div class="flex gap-[10px] mb-[22px]">
            <img class='h-11 w-[50px]' src='' alt="Stack Logo" />
            <h1 class='text-defaultGray text-[28px] font-bold'>Audacity</h1>
          </div> -->
          <!-- <div v-if="user">{{ user?.email }}</div>
          <button v-if="user" @click="handleSignOut">sign out</button> -->
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
                <p v-if="error?.email" class="text-red-500">{{ error.email }}</p>
              </div>
              <div class="mb-5">
                <label class='text-defaultGray text-sm font-medium mb-[6px] block'>Password</label>
                <input v-model="password" type="password" class="h-11 
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
                  <p v-if="error?.password" class="text-red-500">{{ error.password }}</p>
                  {{ firebaseError }}
              </div>
              <div class="mt-8 mb-8 mx-auto max-w-[320px]">
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
import {ref, watch} from 'vue';
import {auth} from '../../firebase.ts'
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import {useRouter} from 'vue-router';

const email = ref('')
const password = ref('')
const user : any = ref(null)
const error = ref({
  email: '',
  password: ''
})
const firebaseError = ref('')
const router = useRouter()

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isValidEmail = (email: string) => {
    return emailPattern.test(email);
  }

const validateSignIn = () => {
  if(email.value === ""){
    error.value.email = 'Email field is required'
    return false
  }
  if(password.value === ""){
    error.value.password = 'Password field is required'
    return false
  }
  return true
}

const handleSignIn = async () => {
  if(validateSignIn()){
    await signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential: any) => {
     if(userCredential?.user) {
        localStorage.setItem('user', userCredential?.user?.email)
        localStorage.setItem('token', userCredential?.user?.accessToken)
        router.push({name: 'WatchVideo'})
      }
    })
    .catch((error : any) => {
      console.log(error.message)
     if(error.message.includes('invalid-credential')){
      console.log('invalid-credential')
      firebaseError.value = 'firebaseError'
     }
    });
  }

}
onAuthStateChanged(auth, currentUser => {
  user.value = currentUser
 
})


watch(email, (currentValue) => {
  if(currentValue !== ""){
    error.value.email = ''
  }
  if(!isValidEmail(currentValue)){
    error.value.email = 'Invalid email format'
  }else{
    error.value.email = ''
  }
})
watch(password, (currentValue) => {
  if(currentValue !== ""){
    error.value.password = ''
  }
})
</script>

<style scoped>

</style>