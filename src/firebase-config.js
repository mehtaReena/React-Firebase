
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
// eslint-disable-next-line
const firebaseApp = initializeApp({
    apiKey: "AIzaSyAdq2i7o6gMc6MTThficux1LSWuCYif2eA",
    authDomain: "cafes-app-c0b7e.firebaseapp.com",
    projectId: "cafes-app-c0b7e",
    storageBucket: "cafes-app-c0b7e.appspot.com",
    messagingSenderId: "459854395633",
    appId: "1:459854395633:web:cab0e1b6c5b6e2fbc19150",
    measurementId: "G-3ZBZJZZJ9D"
});

 export const db = getFirestore();












