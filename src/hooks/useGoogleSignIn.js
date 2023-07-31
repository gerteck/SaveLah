import { useState, useEffect, useContext } from "react";
import { projectAuth } from "../firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { mapAuthCode } from "../firebase/mapAuthCode";
import { useFirestore } from "./useFirestore";
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin";
import auth from '@react-native-firebase/auth';

//initalize user profile document
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { getApp } from "firebase/app";
import { UserProfileContext } from "../context/UserProfileContext";
const app = getApp;
const db = getFirestore(app);

export const useGoogleSignIn = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [errorG, setErrorG] = useState(null);
    const [isPendingG, setIsPendingG] = useState(false);
    const { dispatch } = useAuthContext();

    const [userProfile, setUserProfile] = useContext(UserProfileContext);

    // configure google services
    GoogleSignin.configure({
        webClientId:
            "1064804271474-e321mmkgvf9ali5rur8dv21cghmmvcho.apps.googleusercontent.com",
    });

    const googleSignIn = async () => {
        try {
            setErrorG(null);
            setIsPendingG(true);

            // Check if your device supports Google Play
            await GoogleSignin.hasPlayServices({
                showPlayServicesUpdateDialog: true,
            });

            // Get the users ID token
            const { idToken } = await GoogleSignin.signIn();

            // Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            auth()
                .signInWithCredential(googleCredential)
                .then(async (userCredential) => {
                    const user = userCredential.user;
                    const docRef = doc(db, "users", user?.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        // dispatch login action
                        dispatch({ type: "LOGIN", payload: user });

                        // updating state
                        if (!isCancelled) {
                            setIsPendingG(false);
                            setErrorG(null);
                        }
                    } else {
                        //Initialize Profile Document
                        setDoc(
                            doc(db, "users", user.uid),
                            { registered: false, uid: user.uid, googleAccount: true },
                            { merge: true }
                        );
                        setUserProfile({ registered: false, uid: user.uid, googleAccount: true });

                        // dispatch login action
                        dispatch({ type: "LOGIN", payload: user });
                    }
                }).catch((err) => {
                    console.log(err.message);
                    console.log(err.code);
                    console.log(err.code);

                    if (!isCancelled) {
                        setErrorG(err.code);
                        setIsPendingG(false);
                    }
                });
                console.log("Signup Complete");

        } catch(err) {
            if (err.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
                console.log('user cancelled google sign in');
                setErrorG('google sign in cancelled');
                setIsPendingG(false);
              } else if (err.code === statusCodes.IN_PROGRESS) {
                // operation (e.g. sign in) is in progress already
                console.log('Sign in is in progress already');
              } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
                console.log('user play services not available');
                setErrorG('play services not available');
                setIsPendingG(false);
              } else {
                // some other error happened
                console.log('err.code');
                setErrorG(err.code);
                setIsPendingG(false);
              }
        }
    };

    // cleaner function
    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    return { googleSignIn, isPendingG, errorG };
};
