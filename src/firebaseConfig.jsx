import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDsf_wDiZsrwpA4cK6RJeqAd0cI-qut5K8",
  authDomain: "skelbimai-b389e.firebaseapp.com",
  projectId: "skelbimai-b389e",
  storageBucket: "skelbimai-b389e.appspot.com",
  messagingSenderId: "978524492228",
  appId: "1:978524492228:web:cd942d71cd852090be5491"
};

export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const storage = getStorage(app);