import firebase from 'firebase'
const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyBbX4-nBTT1Cnp_b_oK2ukPxU26csYxNJc",
        authDomain: "insta-clone-cd3dc.firebaseapp.com",
        projectId: "insta-clone-cd3dc",
        storageBucket: "insta-clone-cd3dc.appspot.com",
        messagingSenderId: "839716281477",
        appId: "1:839716281477:web:bebbc6499f816be9c99dec"
})

const auth = firebase.auth()

export {auth}