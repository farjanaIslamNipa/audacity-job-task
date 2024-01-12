import {TAuthInputError} from "../types";

export const validateAuthInput = (email: string, password: string, error: TAuthInputError) => {
  if(email === ""){
    error.email = 'Email field is required'
    return false
  }
  if(password === ""){
    error.password = 'Password field is required'
    return false
  }
  return true
}

 // validate email format
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const isValidEmail = (email: string) => {
    return emailPattern.test(email);
}

// modify firebase error
export const modifiedFirebaseError = (errorMessage: string) : string | null => {
  const regex = /auth\/([^)]*)/;
  const match = errorMessage?.match(regex);
 
  return ((match && match[1] as string)?.replace(/-/g, ' ')) as string
}