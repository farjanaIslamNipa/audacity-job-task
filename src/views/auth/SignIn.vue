<template>
    <div class='bg-brand h-screen flex items-center justify-center w-full'>
      <div class='w-full'>
        <div class="auth-form">

          <p class='text-dark text-xl leading-6 font-semibold'>Sign in to join with Audacity</p>
          <div class="mt-[52px]">
            <form @submit.prevent="handleSignIn">
              <div class="mb-5">
                <label class='text-defaultGray text-sm font-medium mb-[6px] block'>Email</label>
                <input v-model="email" type="text" class="form-input shadow-[0px_0px_0px_4px_#FEE4E2,0px_1px_2px_0px_rgba(16, 24, 40, 0.05)]">
                <p v-if="error?.email" class="text-red-500">{{ error.email }}</p>
              </div>
              <div class="mb-5">
                <label class='text-defaultGray text-sm font-medium mb-[6px] block'>Password</label>
                <input v-model="password" type="password" class="form-input shadow-[0px_0px_0px_4px_#FEE4E2,0px_1px_2px_0px_rgba(16, 24, 40, 0.05)]">
                  <p v-if="error?.password" class="text-red-500">{{ error.password }}</p>
                  <p v-if="firebaseError" class="text-red-500 pt-1 capitalize">{{ firebaseError }}</p>
              </div>
              <div class="mt-8 mb-6 mx-auto max-w-[320px]">
              <button class="auth-btn" type="submit">Sign In</button>
              </div>
            </form>
            <div class="mb-3">
              <button @click="googleSignIn" class="flex justify-center items-center gap-2 border border-gray-300 rounded-full w-full py-2">
                <img src="/images/google.svg" alt="Google Icon" class="h-6 w-6">
                <span class="inline-block text-sm font-medium">Sign in with Google</span>
              </button>
            </div>
            <div class='text-lightGray text-base font-medium text-center'>Already have an account? <router-link to="/sign-up" class='text-[#377DFF]'>Sign up</router-link></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue';
import {auth} from '../../firebase.ts'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {TAuthInputError} from '../../types';
import { validateAuthInput, isValidEmail, modifiedFirebaseError } from '../../utils/validateAuthInput'

const provider = new GoogleAuthProvider();
// import {useRouter} from 'vue-router';

const email = ref<string>('')
const password = ref<string>('')
const error = ref<TAuthInputError>({
  email: '',
  password: ''
})
const firebaseError = ref<string>('')
// const router = useRouter()

// Sign in method
const handleSignIn = async () => {
  if(validateAuthInput(email.value, password.value, error.value)){
    await signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential: any) => {
     if(userCredential?.user) {
        localStorage.setItem('user', userCredential?.user?.email)
        // router.push({name: 'WatchVideo'})
      }
    })
    .catch((error : any) => {
      console.log(error.message)
      firebaseError.value = modifiedFirebaseError(error.message) as string
    });
  }
}

const googleSignIn = async() => {
 await signInWithPopup(auth, provider)
  .then((result) => {
    const user = result?.user?.displayName;
    localStorage.setItem('user', user as string)
  }).catch((error) => {
    console.log(error.message)

  });
}


// Removing error message for appropriate input value
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