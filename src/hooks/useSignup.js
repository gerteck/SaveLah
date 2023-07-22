import { useState, useEffect, useContext } from "react";
import { projectAuth } from "../firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthContext } from './useAuthContext';
import { mapAuthCode } from "../firebase/mapAuthCode";
import { useFirestore } from "./useFirestore";

//initalize user profile document
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { getApp } from "firebase/app";
import { UserProfileContext } from "../context/UserProfileContext";
const app = getApp;
const db = getFirestore(app);


export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const [ userProfile, setUserProfile ] = useContext(UserProfileContext);

    const signup = async (email, password) => {
        setError(null);
        setIsPending(true);

        createUserWithEmailAndPassword(projectAuth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;

                //Initialize Profile Document
                setDoc( doc(db, 'users', user.uid), {registered: false, uid: user.uid}, { merge: true });
                setUserProfile({registered: false, uid: user.uid});

                // // add display name to user
                // updateProfile(user, {displayName: displayName,}).catch((err) => {
                //     console.log(err.message);
                //     setError(err.message);
                //     setIsPending(false);
                // });

                // dispatch login action
                dispatch({type: 'LOGIN', payload: user});

                // updating state
                if(!isCancelled) {                
                    setIsPending(false);
                    setError(null);
                }
            })
            .catch((err) => {
                console.log(err.message);
                console.log(err.code);
                console.log(mapAuthCode(err.code));
                if(!isCancelled) {
                    setError(mapAuthCode(err.code));
                    setIsPending(false);
                }
            });

        console.log("Signup Complete");
    };

    // cleaner function
    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    return { signup, isPending, error };
};