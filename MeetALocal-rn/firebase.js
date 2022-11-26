import * as firebase from "firebase/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCy5eEwbDEzJoeXcX0VGyn74X5LOb4uk1s",
  authDomain: "meet-a-local-7c296.firebaseapp.com",
  projectId: "meet-a-local-7c296",
  storageBucket: "meet-a-local-7c296.appspot.com",
  messagingSenderId: "373114898802",
  appId: "1:373114898802:web:8058a3b8c97d5b648e35eb",
  measurementId: "G-EX88HYYK9X",
  databaseURL: "https://meet-a-local-7c296-default-rtdb.firebaseio.com",
};


initializeApp(firebaseConfig);
export const database = getFirestore();

