import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error, setError] = useState(null);
    const [isPending, setIsPending] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (displayName, email, password) => {
        setError(null);
        setIsPending(true);
        // signup user
        createUserWithEmailAndPassword(projectAuth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log(user);

                updateProfile(user, {
                    // add display name to user
                    displayName: displayName,

                }).catch((err) => {
                    console.log(err.message);
                    setError(err.message);
                    setIsPending(false);
                });

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
                if(!isCancelled) {
                    setError(err.message);
                    setIsPending(false);
                }
            });
    };

    // cleaner function
    useEffect(() => {
        return () => setIsCancelled(true);
    }, []);

    return { signup, isPending, error };
};