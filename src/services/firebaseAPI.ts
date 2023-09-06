// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCx85Ed4C-VX4eM2np61VFhyE4hb2Iq-w4",
  authDomain: "app-todo-list-react-7f44d.firebaseapp.com",
  databaseURL: "https://app-todo-list-react-7f44d-default-rtdb.firebaseio.com",
  projectId: "app-todo-list-react-7f44d",
  storageBucket: "app-todo-list-react-7f44d.appspot.com",
  messagingSenderId: "147565428222",
  appId: "1:147565428222:web:66eeb1bf28875bc52714af"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

const auth = getAuth(app)

export { auth, db }