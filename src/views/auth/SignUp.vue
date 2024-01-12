<template>
    <div class='bg-brand h-screen flex items-center justify-center w-full'>
      <div class='w-full'>
        <div class="auth-form">
          <p class='text-dark text-xl leading-6 font-semibold'>Sign up to join with Audacity</p>
          <div class="mt-[52px]">
            <form @submit.prevent="handleSignUp">
              <div class="mb-5">
                <label class='text-defaultGray text-sm font-medium mb-[6px] block'>Email</label>
                <input v-model="email" type="text" class="form-input">
                <p v-if="error?.email" class="text-red-500">{{ error.email }}</p>
              </div>
              <div class="mb-5">
                <label class='text-defaultGray text-sm font-medium mb-[6px] block'>Password</label>
                <input v-model="password" type="text" class="form-input">
                <p v-if="error?.password" class="text-red-500">{{ error.password }}</p>
              </div>
              <div class="mt-8 mb-8 mx-auto max-w-[320px]">
              <button class="auth-btn" type="submit">Sign Up</button>
              </div>
              <div class='text-lightGray text-base font-medium'>Already have an account? <router-link to="/sign-in" class='text-[#377DFF]'>Sign In</router-link></div>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { auth } from '../../firebase.ts'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from 'vue-router';
import { TAuthInputError } from '../../types';
import { validateAuthInput, isValidEmail } from '../../utils/validateAuthInput'


const email = ref<string>('')
const password = ref<string>('')
const error = ref<TAuthInputError>({
  email: '',
  password: ''
})

const router = useRouter()


// Sign up method
const handleSignUp = async () => {
  if(validateAuthInput(email.value, password.value, error.value)){
    await createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential: any) => {
      if(userCredential?.user){
        localStorage.setItem('user', userCredential?.user?.email)
        router.push('/')
      }
    })
    .catch((error : any) => {
     console.log(error.message)
    });
  }
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
