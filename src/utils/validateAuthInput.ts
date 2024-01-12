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