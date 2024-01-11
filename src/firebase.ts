import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAmsgLeUtkzwl14So9GDCPiy3HBudG6oxo",
  authDomain: "audacity-task.firebaseapp.com",
  projectId: "audacity-task",
  storageBucket: "audacity-task.appspot.com",
  messagingSenderId: "282405279792",
  appId: "1:282405279792:web:aae3d88067c03eada8b5f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)