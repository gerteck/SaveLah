import { getApp, initializeApp } from "firebase/app";
import { getAuth, initializeAuth, onAuthStateChanged } from "firebase/auth";
import { Timestamp, getFirestore } from "firebase/firestore";
import { getReactNativePersistence } from 'firebase/auth/react-native';   
import AsyncStorage from "@react-native-async-storage/async-storage";

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

// Storage and persistence
const storage = getReactNativePersistence(AsyncStorage);
const app = getApp();

initializeAuth(app, {
    persistence: storage,
});

// init service
const projectFireStore = getFirestore(fire);
const projectAuth = getAuth(fire);

export { projectFireStore, projectAuth };
