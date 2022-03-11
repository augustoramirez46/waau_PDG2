// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { auth } from 'firebase/compat/auth';
// import { getAuth, createUserWithEmailAndPassword } from "firebase/compat/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCmTNrZ5mO27K30VkQTChoPHUU9Jrtxjno",
    authDomain: "waau-firebase-database.firebaseapp.com",
    projectId: "waau-firebase-database",
    storageBucket: "waau-firebase-database.appspot.com",
    messagingSenderId: "639444500748",
    appId: "1:639444500748:web:1872431aec9f65ecaa8929"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const authentic = firebase.auth();
export { authentic };
//const app = initializeApp(firebaseConfig);
//export const auth = getAuth(app);