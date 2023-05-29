import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBrKZFsUfzV-hWynIl8lbf76Q46b-cpIKE",
    authDomain: "savelah-storage.firebaseapp.com",
    projectId: "savelah-storage",
    storageBucket: "savelah-storage.appspot.com",
    messagingSenderId: "1064804271474",
    appId: "1:1064804271474:web:048861290fa8fb45fa89eb",
};

// init firebase
const fire = initializeApp(firebaseConfig);

// init service
const projectFireStore = getFirestore(fire);
const projectAuth = getAuth(fire);

export { projectFireStore, projectAuth };
